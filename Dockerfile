# syntax=docker/dockerfile:1.28.0
#
# Web image: Next.js `output: "standalone"` (next.config.ts) run by plain Node, no pnpm at runtime.
#
#   docker buildx build -t trellis/web:local .
#
# Build context = this repo's root, filtered by .dockerignore.
#
# NEXT_PUBLIC_* values are inlined at build time. Anything that differs per environment (backend
# origin, IdP URL) must be read at runtime on the server instead, or "build once, promote by retag"
# breaks. The build args below are for values that are the same everywhere.

ARG NODE_IMAGE=node:22.23.5-trixie-slim@sha256:68c76cfad89921b927eae28ba21407475e29d0ce450afcdbe70c1532db042b64

FROM ${NODE_IMAGE} AS deps
# pnpm comes from the `packageManager` field in package.json through corepack, so the version is
# pinned in one place. Corepack verifies the download signature.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PNPM_HOME=/pnpm \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /repo
# .npmrc points the @trellis scope at the backend's GitLab Package Registry (decision T22). It holds
# no token: TRELLIS_CONTRACTS_* are passed as secrets by the build when that package is a dependency.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# --frozen-lockfile: a lock that disagrees with package.json fails the build.
RUN --mount=type=cache,id=trellis-pnpm-store,target=/pnpm/store \
    --mount=type=secret,id=npmrc_auth,target=/root/.npmrc,required=false \
    pnpm config set store-dir /pnpm/store \
 && pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------------------------------
FROM deps AS build
ARG NEXT_PUBLIC_MOCK_DOMAINS=false
ARG NEXT_PUBLIC_ANALYTICS_PROVIDER=none
ENV NEXT_PUBLIC_MOCK_DOMAINS=${NEXT_PUBLIC_MOCK_DOMAINS} \
    NEXT_PUBLIC_ANALYTICS_PROVIDER=${NEXT_PUBLIC_ANALYTICS_PROVIDER} \
    NODE_ENV=production \
    TRELLIS_NEXT_OUTPUT=standalone
COPY . ./
# next.config.ts sets `output: "standalone"` only when TRELLIS_NEXT_OUTPUT=standalone (so `pnpm start`
# keeps working on laptops). The check below turns a silent non-standalone build into a clear error
# instead of a confusing "COPY .next/standalone: not found".
# public/ is optional in Next; create it so the COPY in the final stage never fails.
RUN mkdir -p public && pnpm build
RUN test -f .next/standalone/server.js \
 || { echo ".next/standalone/server.js missing: next.config.ts must honour TRELLIS_NEXT_OUTPUT=standalone" >&2; exit 1; }

# ---------------------------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS prod
ARG VERSION=local
ARG REVISION=unknown
LABEL org.opencontainers.image.title="trellis-web" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${REVISION}"
# Patch OS packages fixed after the pinned base digest was published. Bump OS_PKG_REFRESH to force
# this layer to rebuild when a CVE fix lands.
ARG OS_PKG_REFRESH=2026-11-14
RUN apt-get update \
 && apt-get upgrade -y --no-install-recommends \
 && rm -rf /var/lib/apt/lists/*
RUN groupadd --system --gid 10001 app \
 && useradd --system --uid 10001 --gid app --home-dir /app --shell /usr/sbin/nologin app
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    TRELLIS_HEALTH_PATH=/api/health
COPY --from=build --chown=app:app /repo/.next/standalone/ ./
COPY --from=build --chown=app:app /repo/.next/static/ ./.next/static/
COPY --from=build --chown=app:app /repo/public/ ./public/
USER app
EXPOSE 3000
# src/app/api/health/route.ts answers 200 without auth and without calling the backend (liveness of
# the Node process only).
HEALTHCHECK --start-period=20s --interval=15s --timeout=3s --retries=4 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+process.env.TRELLIS_HEALTH_PATH,{redirect:'manual'}).then(r=>process.exit(r.status<400?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]

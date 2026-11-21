import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * The container image sets TRELLIS_NEXT_OUTPUT=standalone (the Dockerfile) and runs
 * `node server.js`. Left unset locally, because `next start` cannot serve a standalone build.
 */
const STANDALONE = "standalone";
const output = process.env.TRELLIS_NEXT_OUTPUT === STANDALONE ? STANDALONE : undefined;

const nextConfig: NextConfig = {
  output,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);

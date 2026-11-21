---
name: review
description: >
  Review a change in trellis-web against this repo's own rules: layer direction, the data pipeline
  (http.ts, entity api, query-key factories), no raw fetch, semantic colour tokens only, no
  barrels, no useEffect for derived state, i18n keys instead of literals, the five screen states.
  Use when reviewing a branch, an MR, or staged work before a commit.
---

# Trellis web review

Review the TypeScript/React change in front of you against `standards/typescript.md`. The rules
there are this repo's rules, taken from `../../AGENTS.md`; do not invent new ones, and do not
import conventions from other projects.

---

## Multi-agent compatibility

Everything here works in any agent (Claude Code, Cursor, Codex, Copilot, Gemini CLI): the skill is
Markdown plus `git` and `npm` commands. There is no agent-specific step.

Claude Code only, and safely ignorable: `.claude/settings.json` pre-allows the read-only commands
below, and `.claude/hooks/deny-git-no-verify.sh` blocks `git ... --no-verify`.

---

## 1. Scope the review

```bash
git diff --stat <base>...HEAD      # whole branch
git diff --stat                    # working tree
git diff --stat --cached           # staged
```

In scope: `src/`, `e2e/`, `eslint-rules/`, `scripts/`, the config files at the root.

Out of scope: `src/shared/api/generated/`, `src/shared/graphql/generated/` and anything else
ending `.generated.ts` — they carry a generated header and are excluded from lint and Prettier.
A hand edit to one of them **is** a finding ("Generated file edited by hand").

---

## 2. Read, in this order

1. The diff itself, in full.
2. For each touched file, the layer above and below it: a component change against the entity hook
   it calls, a `<d>.api.ts` change against `shared/api/http.ts`.
3. `standards/typescript.md` — the rule list. Keep it open; cite rule titles in findings.
4. Only when the change adds an entity, feature, locale, message namespace, feature flag or e2e
   test: the matching entry of "How to add..." in `../../AGENTS.md`, which lists the edit points a
   change of that kind must touch. A missing edit point is a finding.

---

## 3. Check mechanically what can be checked mechanically

Do not reason about what a command can answer:

```bash
npm run typecheck       # tsc --noEmit
npm run lint            # ESLint, zero warnings; includes the local rules
npm run format:check    # Prettier
npm run i18n:check      # locale parity: keys and {placeholders}
npm run contracts:check # this app and @trellis/contracts agree
npm test                # Vitest (tooling tests)
```

The local ESLint rules already enforce raw `fetch`, hardcoded colours, the `ui/` boundary, barrels,
`next/link`, `any` and literal JSX copy. If `npm run lint` passes, do not file those; review what it
cannot see: whether the query key is invalidated through the factory, whether an effect was the
wrong tool, whether all five screen states exist, whether a 404 is returned where a 403 would leak.

A change that touches route weight also needs `npm run build && npm run budget:check` — but a budget is
not raised to accommodate a feature.

---

## 4. Report

One section per finding, nothing else:

```text
### <Rule title from standards/typescript.md>
<path>:<line>
What is wrong, in one or two sentences. Then the fix, concretely.
Severity: blocking | high | medium
```

- **blocking** — wrong behaviour, a leak (403 where 404 is required, a backend origin in the
  bundle, a token in a URL), or authorization expressed only as a hidden button.
- **high** — would fail a gate, or breaks a rule with a runtime consequence (missing locale key,
  server state copied into `useState`, an inline query key that nothing invalidates).
- **medium** — a real rule break with no runtime consequence yet (a magic string, a barrel file,
  a raw colour that the baseline happens to exempt).

Rules: cite `file:line`; quote the offending line when it is short; never file a finding that
`npm run lint` or `npm run typecheck` already reports; no style comments that Prettier owns; if the diff
is clean, say so and name what you checked. Do not ask for feature tests — `../../AGENTS.md`
"Testing policy (decision T5)" says they are deliberately not written yet.

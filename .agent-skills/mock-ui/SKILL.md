---
name: mock-ui
description: >
  Build a screen mock in trellis-web that looks finished and still obeys the repo's rules: entity
  fixtures instead of handlers, semantic tokens only, i18n keys for every piece of copy, the
  app -> features -> entities -> shared -> ui direction. Use when asked to mock up a page, a flow
  or a dashboard from a screenshot or a description, before any backend endpoint exists.
---

# Mock a screen in trellis-web

A mock here is production code with fixture data behind it, not a throwaway. It ships through the
same gates as a feature (`pnpm typecheck && pnpm lint && pnpm i18n:check`), so build it the way the
repo builds features. The rules are in `../../AGENTS.md`; this skill is only the order of work and
the choices that need judgement.

The worked example is the learning (LMS) mock: five screens, one entity, one shell. Read
[`references/learning-mock.md`](references/learning-mock.md) before starting — it has the layout
recipes, the component inventory and the mistakes that cost time the first time round.

---

## Multi-agent compatibility

Everything here is Markdown plus `pnpm` commands. No agent-specific step.

---

## 1. Decide what is data and what is copy

This decision shapes everything after it, and it is the one most often got wrong.

- **Copy** — labels, headings, buttons, empty states, aria-labels, placeholders. Goes through
  next-intl in all three locales. `i18next/no-literal-string` is an **error**, so there is no
  "add i18n later": a literal in JSX fails lint.
- **Data** — course titles, user names, file names, question text, tags. Goes in the fixture and
  stays in its own language. It is content, not chrome, and translating it would be wrong.

A number that appears inside a sentence is copy with a placeholder (`"Lesson {number}: {title}"`),
never string concatenation.

## 2. Model the entity first

`src/entities/<domain>/`, three files, no API layer:

| File               | Holds                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| `<d>.constants.ts` | enum-like `as const` objects; **every value is also an i18n key segment** |
| `<d>.types.ts`     | UI-shaped read models, not the backend's entities                         |
| `<d>.fixtures.ts`  | the sample content, typed by the file above                               |

No `<d>.api.ts` / `<d>.queries.ts` and no `mocks/<d>.handlers.ts`: there is no endpoint to answer
yet. Say so in the fixture file's header comment, and name what replaces it when the contract
lands. Add handlers only when the mock has to exercise loading, error or empty states over HTTP.

Values are camelCase (`notStarted`, `selfPaced`) so `t(\`states.${value}\`)` resolves.

## 3. Build the frame before the screens

One shell component in `features/<f>/`, owning the sidebar, the top bar and the nav config.
Screens render only their own content. Nav entries whose screen does not exist yet render as inert
rows (`aria-disabled`, muted, a "coming soon" title) — never a link to a 404.

## 4. Write the screens outside-in

Page layout, then sections, then the small pieces. Reach for `ui/` first; add a component there
only when it is genuinely app-agnostic (`Badge`, `ProgressBar`, `ProgressRing` were), and follow
the `ui/` API conventions in `AGENTS.md` — `XxxPropsDefaults`, `className` on the root, no
`useTranslations` inside `ui/`.

Colour, spacing, radius, motion and z-index come from tokens only. If a screenshot shows a colour
the tokens do not have, use the nearest semantic token rather than adding a value — adding a token
is a separate, deliberate change to `tokens.css` plus `globals.css` plus `AGENTS.md`.

## 5. Routes last

`app/[locale]/<path>/page.tsx` renders the feature and nothing else; add the paths to `ROUTES`.

**Nested layouts compose.** A child `layout.tsx` cannot remove its parent's chrome. A screen that
needs focus mode (an exam, a checkout, a full-screen editor) belongs **outside** the shell's
segment, not inside it with a layout that returns `children`.

A detail route with no backend renders the one sample record whatever the parameter is. Say that
in a comment on the route so nobody looks for the lookup.

## 6. Run the gates, then look at it

```bash
pnpm typecheck && pnpm lint && pnpm i18n:check
```

Then run the dev server and open **every** route. A mock that was never rendered is not done:
layout nesting, overflow and empty branches only show up on screen. Check 375px and dark mode —
tokens handle the colours, multi-column layouts do not handle themselves.

# Worked example: the learning (LMS) mock

Five screens built from screenshots in one pass: learner dashboard, course catalog, course player,
instructor course studio, assessment. Everything below is what that code actually does — copy the
shapes, not the content.

```text
src/entities/learning/     learning.constants.ts   learning.types.ts   learning.fixtures.ts
src/features/learning/     LearningShell.tsx       CourseArtwork.tsx
                           learning.format.ts      learning.tones.ts
                           LearningDashboardPage.tsx  CourseCatalogPage.tsx
                           CoursePlayerPage.tsx       CourseStudioPage.tsx
                           AssessmentPage.tsx
src/ui/                    Badge.tsx  ProgressBar.tsx  ProgressRing.tsx
src/app/[locale]/learn/    layout.tsx (shell)  page.tsx  catalog/  courses/[courseSlug]/
src/app/[locale]/studio/courses/[courseSlug]/
src/app/[locale]/assessments/[assessmentId]/        ← outside the shell, on purpose
src/i18n/messages/{en,vi,zh}/learning.json
```

---

## 1. Layout recipes

The whole mock is four layouts. Each is a grid with a fixed sidebar column and a `min-w-0` content
column — **`min-w-0` is load-bearing**: without it a long title makes the grid column grow and the
page scrolls sideways.

| Screen          | Grid                                                          |
| --------------- | ------------------------------------------------------------- |
| Shell           | `lg:grid-cols-[16rem_1fr]`, sidebar `lg:sticky lg:top-4`      |
| Dashboard       | `xl:grid-cols-[1fr_20rem]` — main column plus rail            |
| Catalog         | `lg:grid-cols-[14rem_1fr]` — filters plus results             |
| Player / Studio | `xl:grid-cols-[18rem_1fr_18rem]` / `lg:grid-cols-[20rem_1fr]` |

Below the breakpoint every one of them collapses to a single column, and the sidebar nav becomes a
horizontal scroller: `flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible`.

Cards are uniform and dull on purpose, so the content carries the page:

```tsx
className = "rounded-card border border-border bg-surface p-5"; // section card
className = "rounded-card bg-info-subtle p-6 md:p-8"; // hero / banner
className = "rounded-control bg-surface-sunken px-2 py-1"; // inline meta chip
```

## 2. Token cheat sheet for this look

There is no brand-subtle token, so **`bg-info-subtle` + `text-fg-brand` is the tinted brand
surface**: heroes, the active nav row, selected list rows, icon tiles, promo cards.

| Need                   | Classes                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Active nav / selection | `bg-info-subtle font-medium text-fg-brand`                                                   |
| Icon tile              | `grid size-9 place-items-center rounded-control bg-info-subtle text-fg-brand`                |
| Checked box            | `border-brand bg-brand text-on-brand` + `<Icon icon={Check} size="xs" />`                    |
| Unchecked box          | `border-border-strong`                                                                       |
| Lesson states          | completed `text-success`, in progress `text-fg-brand`, not started `text-fg-subtle`          |
| Tab, selected          | `-mb-px border-b-2 border-brand font-medium text-fg-brand` on a `border-b border-border` row |
| Media duration overlay | `bg-overlay text-on-brand`                                                                   |

Icons inherit `currentColor`: colour the parent, never the `Icon`.

## 3. Component inventory

- **`CourseArtwork`** — the mock ships no images. A tinted tile with a topic icon, keyed by a
  `COURSE_ART` value on the fixture. One file to swap for `<Image>` later.
- **`learning.format.ts`** — `splitMinutes` (feeds `{hours}`/`{minutes}` into one ICU message),
  `formatClock` (`6:12` — digits, not prose, so it stays out of i18n), `toMegabytes`.
- **`learning.tones.ts`** — maps a domain value to a `Badge` tone. It exists because
  `tone="danger"` written inline is a lint error (see §5).
- **`ui/ProgressBar`, `ui/ProgressRing`** — both clamp 0–100 and **require a `label`**; a bare bar
  tells a screen reader nothing. The ring is one SVG with `stroke-surface-sunken` /
  `stroke-brand` and a `-rotate-90` wrapper.

## 4. Interaction state

Mocks still use real state, kept in `useState` in the page component and passed down: catalog
filters, selected lesson, open module, assessment answers and flags. No `useEffect` anywhere — the
derived values are computed during render (`courses.filter(...)`, `answeredCount`), as
`AGENTS.md` requires.

Controls with no behaviour yet (secondary facets, the player transport, Save Draft) are rendered
but inert, with a real `aria-label`. That is honest — a button that lies about doing something is
worse than one that visibly does nothing.

## 5. Traps that cost time

1. **`tone="danger"` fails lint.** `i18next/no-literal-string` checks _every_ JSX attribute not in
   the allow-list, so variant props too. Put the value in a `Record<DomainValue, Tone>` module
   constant and pass `tone={TONES[value]}`.
2. **A class string assigned inside JSX also fails it.** Hoist shared class strings to a
   module-level constant (`NAV_ITEM_CLASSES`).
3. **`ui/Select` has no `label` prop.** Use `aria-label`, and `className` to size it; `Field` is
   the labelled wrapper.
4. **Do not call a `useTranslations` wrapper inside `.map()`.** Hoist the translator to the top of
   the component. A hook in a loop is a rules-of-hooks error.
5. **A child `layout.tsx` cannot escape its parent.** `/learn/assessments/[id]` inherited the
   sidebar however the layout was written; the route had to move to `/assessments/[id]`.
6. **Check lucide names before importing.** `Lantern` does not exist in `lucide-react` 1.72.
   `node -e 'const m=require("lucide-react"); console.log(["A","B"].filter(n=>!(n in m)))'`
   settles a whole list in one go.
7. **`noUncheckedIndexedAccess` is on.** `array[0]` and `record[key]` are `T | undefined`; use
   `?? fallback` rather than `!`.

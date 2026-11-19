import { MARKETING_TOPICS } from "@/entities/marketing/marketing.fixtures";

/**
 * A strip of subjects sliding left under the hero. Decorative: the catalogue says the same things
 * in text, so the whole strip is hidden from assistive tech, and it pauses under the pointer.
 *
 * The track holds the list twice and slides by half its width, so the second copy lands exactly
 * where the first began and the loop has no seam.
 */
export function TopicMarquee() {
  return (
    <div aria-hidden className="group overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max animate-marquee group-hover:animation-paused">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {MARKETING_TOPICS.map((topic) => (
              <li
                key={topic}
                className="flex items-center text-2xl font-semibold tracking-tight text-fg-subtle md:text-3xl"
              >
                <span className="px-6 transition-colors duration-fast ease-standard hover:text-fg-brand md:px-8">
                  {topic}
                </span>
                <span className="size-1.5 rounded-full bg-border-strong" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

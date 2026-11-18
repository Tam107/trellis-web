import type { ReactNode } from "react";
import { AppHeader } from "../_components/AppHeader";

/**
 * The marketing and admin side of the app, which carries the global header. The LMS routes sit
 * outside this group because they bring their own chrome: a parent layout cannot be removed by a
 * child, so the header has to live down here rather than in the locale layout.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col bg-info-subtle">{children}</div>
    </>
  );
}

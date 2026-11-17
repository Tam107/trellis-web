import type { ReactNode } from "react";
import { LearningShell } from "@/features/learning/LearningShell";

/** The learner area shares one frame; the assessment route opts out with its own layout. */
export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearningShell>{children}</LearningShell>;
}

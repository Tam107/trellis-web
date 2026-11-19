import type { CourseEdition } from "@/entities/learning/course.types";
import type { EnrolmentState } from "@/entities/learning/learning.constants";
import type { CatalogCourse } from "./marketing.types";

/** A module as the public page lists it: counts for the whole module, titles for a first look. */
export type CourseLandingModule = {
  id: string;
  title: string;
  lessonCount: number;
  minutes: number;
  /** The first few lesson titles; the rest show as "N more lessons" (D-12: titles only). */
  lessons: readonly string[];
};

export type CourseInstructor = {
  name: string;
  role: string;
  bio: string;
  courseCount: number;
  /** Already abbreviated, like the catalogue's counts. */
  learnerCount: string;
  rating: number;
};

/** What a course page adds on top of its catalogue card. */
export type CourseLandingSpec = {
  /** Name of the instructor; resolved to a `CourseInstructor`. */
  instructor: string;
  /** ISO date of the last content update. */
  updatedAt: string;
  resourceCount: number;
  modules: readonly CourseLandingModule[];
  outcomes: readonly string[];
  requirements: readonly string[];
  audience: readonly string[];
};

export type CourseLandingDetail = Omit<CatalogCourse, "instructor"> &
  Omit<CourseLandingSpec, "instructor"> & {
    instructor: CourseInstructor;
    editions: readonly CourseEdition[];
    enrolment: EnrolmentState;
  };

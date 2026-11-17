/**
 * Every in-app path, without the locale prefix: link with `Link` from `@/i18n/navigation`,
 * which adds it. Build parameterised paths with the helpers, never by string concatenation.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  account: "/account",
  admin: "/admin",
  notices: "/notices",
  noticeDetail: (noticeCode: string) => `/notices/${encodeURIComponent(noticeCode)}`,

  /** Learning (LMS mock): learner area under /learn, instructor area under /studio. */
  learn: "/learn",
  catalog: "/learn/catalog",
  learnCourse: (courseSlug: string) => `/learn/courses/${encodeURIComponent(courseSlug)}`,
  myCourses: "/learn/courses",
  learnAssessment: (assessmentId: string) => `/assessments/${encodeURIComponent(assessmentId)}`,
  assessmentStart: (assessmentId: string) => `/assessments/${encodeURIComponent(assessmentId)}/start`,
  assessmentResult: (assessmentId: string, attemptId: string) =>
    `/assessments/${encodeURIComponent(assessmentId)}/attempts/${encodeURIComponent(attemptId)}`,
  /** Public course page, outside the learner shell: a visitor has no sidebar. */
  catalogCourse: (courseSlug: string) => `/catalog/courses/${encodeURIComponent(courseSlug)}`,
  studio: "/studio",
  studioNewCourse: "/studio/courses/new",
  studioQuestionBank: "/studio/question-bank",
  studioCourse: (courseSlug: string) => `/studio/courses/${encodeURIComponent(courseSlug)}`,
  studioPublish: (courseSlug: string) => `/studio/courses/${encodeURIComponent(courseSlug)}/publish`,
  studioAssessment: (assessmentId: string) => `/studio/assessments/${encodeURIComponent(assessmentId)}`,
} as const;

/** Query parameter carrying the path to return to after sign-in. */
export const REDIRECT_PARAM = "redirect";

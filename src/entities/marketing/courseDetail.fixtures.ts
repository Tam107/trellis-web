import { ENROLMENT_POLICIES, ENROLMENT_STATES } from "@/entities/learning/learning.constants";
import type { CourseEdition } from "@/entities/learning/course.types";
import { CATALOG_COURSES } from "./marketing.fixtures";
import type { CourseInstructor, CourseLandingDetail, CourseLandingSpec } from "./courseDetail.types";

/**
 * The public page of each catalogue course. The numbers on a card (lessons, length, rating) come
 * from `CATALOG_COURSES`; this file adds what only the page shows. Module lesson counts and
 * minutes add up to the card's figures, so the card and the page never disagree.
 */

const INSTRUCTORS: Readonly<Record<string, CourseInstructor>> = {
  "Ms Chen": {
    name: "Ms Chen",
    role: "Chinese language instructor",
    bio: "Ms Chen has taught Mandarin to adult learners for twelve years and writes the graded readers used across the catalogue. Her classes start with speaking and let reading follow.",
    courseCount: 5,
    learnerCount: "12.4k",
    rating: 4.8,
  },
  "Mr Hughes": {
    name: "Mr Hughes",
    role: "English communication coach",
    bio: "Mr Hughes coaches teams in international companies on meetings, writing and presentations. He builds each lesson around a real workplace situation.",
    courseCount: 4,
    learnerCount: "9.1k",
    rating: 4.7,
  },
  "Dr Alvarez": {
    name: "Dr Alvarez",
    role: "Academic writing and research lecturer",
    bio: "Dr Alvarez lectures on academic writing and research design, and supervises postgraduate projects. She is known for plain, practical feedback.",
    courseCount: 3,
    learnerCount: "4.0k",
    rating: 4.8,
  },
  "Ms Tran": {
    name: "Ms Tran",
    role: "Data educator",
    bio: "Ms Tran teaches non-specialists to read numbers critically. She has run data-literacy workshops for newsrooms and public agencies.",
    courseCount: 2,
    learnerCount: "3.5k",
    rating: 4.6,
  },
};

const SPECS: Readonly<Record<string, CourseLandingSpec>> = {
  "chinese-i-foundations": {
    instructor: "Ms Chen",
    updatedAt: "2026-01-12",
    resourceCount: 6,
    modules: [
      {
        id: "chinese-i-foundations-m1",
        title: "Getting started",
        lessonCount: 3,
        minutes: 45,
        lessons: ["Pinyin and the four tones", "Greetings and introductions", "Your first 20 characters"],
      },
      {
        id: "chinese-i-foundations-m2",
        title: "Numbers and dates",
        lessonCount: 4,
        minutes: 70,
        lessons: ["Counting to 100", "Telling the date", "Telling the time", "Prices and measure words"],
      },
      {
        id: "chinese-i-foundations-m3",
        title: "Everyday conversation",
        lessonCount: 5,
        minutes: 95,
        lessons: [
          "Ordering food",
          "Asking for directions",
          "Shopping and bargaining",
          "Talking about family",
          "Making plans",
        ],
      },
      {
        id: "chinese-i-foundations-m4",
        title: "Culture and daily life",
        lessonCount: 3,
        minutes: 50,
        lessons: ["Festivals and greetings", "Etiquette at the table", "Your first reading"],
      },
    ],
    outcomes: [
      "Introduce yourself and ask basic questions at CEFR A1",
      "Read and write about 150 high-frequency words (HSK 1)",
      "Pronounce the four tones and neutral tone clearly",
      "Handle simple shopping, food and travel conversations",
    ],
    requirements: ["No prior Chinese needed", "A headset or quiet space for speaking drills"],
    audience: [
      "Complete beginners who want a structured first term",
      "Travellers preparing for a first trip",
      "Learners restarting after a long break",
    ],
  },
  "english-everyday-communication": {
    instructor: "Mr Hughes",
    updatedAt: "2026-01-20",
    resourceCount: 8,
    modules: [
      {
        id: "english-everyday-communication-m1",
        title: "Meetings that finish on time",
        lessonCount: 5,
        minutes: 90,
        lessons: [
          "Opening and closing a meeting",
          "Interrupting politely",
          "Agreeing and disagreeing",
          "Summarising decisions",
          "Handling a long speaker",
        ],
      },
      {
        id: "english-everyday-communication-m2",
        title: "Email and chat",
        lessonCount: 5,
        minutes: 84,
        lessons: [
          "Subject lines that get opened",
          "Requests without sounding rude",
          "Following up",
          "Tone in chat",
          "Declining gracefully",
        ],
      },
      {
        id: "english-everyday-communication-m3",
        title: "Small talk and networking",
        lessonCount: 4,
        minutes: 72,
        lessons: [
          "Starting a conversation",
          "Keeping it going",
          "Talking about your work",
          "Leaving a conversation",
        ],
      },
      {
        id: "english-everyday-communication-m4",
        title: "Difficult conversations",
        lessonCount: 4,
        minutes: 66,
        lessons: ["Giving feedback", "Receiving feedback", "Disagreeing with a manager", "Saying no"],
      },
    ],
    outcomes: [
      "Run or contribute to a meeting in clear, natural English",
      "Write emails and chat messages in the right tone",
      "Make small talk and leave a conversation gracefully",
      "Give and receive feedback without friction",
    ],
    requirements: ["Everyday English at around B1 level", "Willingness to record yourself speaking"],
    audience: [
      "Professionals who use English at work but hesitate to speak",
      "Graduates preparing for a first job abroad",
      "Team leads onboarding international colleagues",
    ],
  },
  "english-academic-purposes": {
    instructor: "Dr Alvarez",
    updatedAt: "2026-01-18",
    resourceCount: 7,
    modules: [
      {
        id: "english-academic-purposes-m1",
        title: "Reading academic texts",
        lessonCount: 3,
        minutes: 45,
        lessons: ["Skimming for the argument", "Reading a research article", "Taking notes you can reuse"],
      },
      {
        id: "english-academic-purposes-m2",
        title: "Building an argument",
        lessonCount: 4,
        minutes: 70,
        lessons: [
          "Claim, evidence, reasoning",
          "Structuring a paragraph",
          "Writing an introduction",
          "Counter-arguments and rebuttals",
        ],
      },
      {
        id: "english-academic-purposes-m3",
        title: "Citing sources",
        lessonCount: 3,
        minutes: 50,
        lessons: [
          "Quoting, paraphrasing and summarising",
          "Citation styles compared",
          "Avoiding accidental plagiarism",
        ],
      },
      {
        id: "english-academic-purposes-m4",
        title: "Revising and feedback",
        lessonCount: 2,
        minutes: 40,
        lessons: ["Revising for structure", "Using reviewer comments"],
      },
    ],
    outcomes: [
      "Read an academic article and extract its argument quickly",
      "Plan and write a clear, well-structured paragraph and essay",
      "Quote, paraphrase and cite sources correctly",
      "Revise your own writing using feedback",
    ],
    requirements: ["English at around B2 level", "A short piece of your own writing to work on"],
    audience: [
      "University students writing essays in English",
      "Researchers preparing a first paper",
      "Exam candidates working on written tasks",
    ],
  },
  "business-chinese": {
    instructor: "Ms Chen",
    updatedAt: "2026-01-08",
    resourceCount: 5,
    modules: [
      {
        id: "business-chinese-m1",
        title: "Meeting and greeting",
        lessonCount: 3,
        minutes: 52,
        lessons: ["Titles and forms of address", "Exchanging business cards", "Introducing your company"],
      },
      {
        id: "business-chinese-m2",
        title: "Negotiation language",
        lessonCount: 4,
        minutes: 76,
        lessons: ["Making an offer", "Asking for concessions", "Politely refusing", "Closing a deal"],
      },
      {
        id: "business-chinese-m3",
        title: "Written business Chinese",
        lessonCount: 4,
        minutes: 64,
        lessons: [
          "Formal email openings",
          "Writing a proposal",
          "Reading a contract summary",
          "Follow-up messages",
        ],
      },
      {
        id: "business-chinese-m4",
        title: "Hosting and being hosted",
        lessonCount: 3,
        minutes: 52,
        lessons: ["Banquet etiquette", "Toasts and small talk", "Giving and receiving gifts"],
      },
    ],
    outcomes: [
      "Handle introductions and meetings with correct forms of address",
      "Negotiate using polite, indirect Chinese",
      "Write formal emails and short proposals",
      "Navigate a business banquet with confidence",
    ],
    requirements: ["Around HSK 3 level Chinese", "Familiarity with simplified characters"],
    audience: [
      "Professionals working with Chinese-speaking partners",
      "Students heading for an internship in China",
      "Learners who finished an intermediate course",
    ],
  },
  "presentation-skills": {
    instructor: "Mr Hughes",
    updatedAt: "2026-01-15",
    resourceCount: 4,
    modules: [
      {
        id: "presentation-skills-m1",
        title: "Open strong",
        lessonCount: 3,
        minutes: 48,
        lessons: ["The first 30 seconds", "Stating your point", "Hooks that are not jokes"],
      },
      {
        id: "presentation-skills-m2",
        title: "Structure and pace",
        lessonCount: 3,
        minutes: 48,
        lessons: ["Three-part structure", "Slides that help", "Using silence"],
      },
      {
        id: "presentation-skills-m3",
        title: "Questions and nerves",
        lessonCount: 3,
        minutes: 42,
        lessons: ["Answering hard questions", "Managing nerves", "Recovering from a mistake"],
      },
    ],
    outcomes: [
      "Open a talk so the audience knows why to listen",
      "Structure a short presentation around one message",
      "Design slides that support, not replace, you",
      "Answer unexpected questions calmly",
    ],
    requirements: ["Comfort with everyday English", "A real presentation you can prepare while you learn"],
    audience: [
      "Anyone presenting at work or at school",
      "Managers who report to senior teams",
      "Conference speakers giving a first talk",
    ],
  },
  "data-literacy": {
    instructor: "Ms Tran",
    updatedAt: "2026-01-10",
    resourceCount: 6,
    modules: [
      {
        id: "data-literacy-m1",
        title: "Reading charts",
        lessonCount: 3,
        minutes: 54,
        lessons: ["What a chart leaves out", "Truncated axes and other tricks", "Comparing groups fairly"],
      },
      {
        id: "data-literacy-m2",
        title: "Averages and spread",
        lessonCount: 4,
        minutes: 62,
        lessons: [
          "Mean, median and mode",
          "Why the average misleads",
          "Outliers",
          "Percentages and percentage points",
        ],
      },
      {
        id: "data-literacy-m3",
        title: "Asking where a number came from",
        lessonCount: 4,
        minutes: 60,
        lessons: [
          "Sources and sampling",
          "Correlation is not cause",
          "Writing a data caveat",
          "A checklist before you share",
        ],
      },
    ],
    outcomes: [
      "Read a chart critically and spot a misleading axis",
      "Choose between mean, median and mode for a question",
      "Tell correlation from causation in everyday claims",
      "Ask the right questions about where a number came from",
    ],
    requirements: ["No statistics background needed", "A spreadsheet tool, for optional exercises"],
    audience: [
      "Anyone who reads reports or dashboards at work",
      "Journalists and communicators",
      "Students starting a data course",
    ],
  },
  "research-methods": {
    instructor: "Dr Alvarez",
    updatedAt: "2026-01-05",
    resourceCount: 9,
    modules: [
      {
        id: "research-methods-m1",
        title: "Framing a question",
        lessonCount: 5,
        minutes: 80,
        lessons: [
          "From topic to question",
          "Reading the literature",
          "Finding the gap",
          "Hypotheses that can fail",
          "Scoping the project",
        ],
      },
      {
        id: "research-methods-m2",
        title: "Choosing a method",
        lessonCount: 5,
        minutes: 90,
        lessons: [
          "Qualitative and quantitative",
          "Sampling",
          "Surveys and interviews",
          "Experiments",
          "Mixed methods",
        ],
      },
      {
        id: "research-methods-m3",
        title: "Collecting and analysing",
        lessonCount: 6,
        minutes: 100,
        lessons: [
          "Data management",
          "Coding interviews",
          "Descriptive statistics",
          "Comparing groups",
          "Visualising results",
          "Checking your analysis",
        ],
      },
      {
        id: "research-methods-m4",
        title: "Reporting and limits",
        lessonCount: 4,
        minutes: 60,
        lessons: [
          "Structuring a report",
          "Writing the limitations",
          "Ethics and consent",
          "Presenting findings",
        ],
      },
    ],
    outcomes: [
      "Turn a topic into a research question that can be answered",
      "Match a method to the question and justify the choice",
      "Collect and analyse data with clear, documented steps",
      "Report results and state their limits honestly",
    ],
    requirements: ["Undergraduate-level reading in English", "A topic you would like to investigate"],
    audience: [
      "Postgraduate students starting a thesis",
      "Professionals running internal research",
      "Educators supervising student projects",
    ],
  },
  "chinese-reading-lab": {
    instructor: "Ms Chen",
    updatedAt: "2026-01-14",
    resourceCount: 10,
    modules: [
      {
        id: "chinese-reading-lab-m1",
        title: "Short texts",
        lessonCount: 4,
        minutes: 70,
        lessons: [
          "Signs and notices",
          "Messages and notes",
          "Menus and timetables",
          "A short story, part one",
        ],
      },
      {
        id: "chinese-reading-lab-m2",
        title: "Everyday articles",
        lessonCount: 4,
        minutes: 74,
        lessons: ["News in brief", "A recipe", "A product review", "A short blog post"],
      },
      {
        id: "chinese-reading-lab-m3",
        title: "Longer reading",
        lessonCount: 4,
        minutes: 76,
        lessons: ["A short story, part two", "An interview", "An opinion piece", "A letter"],
      },
      {
        id: "chinese-reading-lab-m4",
        title: "Reading strategy",
        lessonCount: 4,
        minutes: 70,
        lessons: [
          "Guessing from components",
          "Reading without a dictionary",
          "Building a personal word list",
          "Reading speed",
        ],
      },
    ],
    outcomes: [
      "Read short everyday Chinese texts without stopping at every word",
      "Guess the meaning of new characters from their components",
      "Build and review a personal vocabulary list",
      "Read a longer text for gist and detail",
    ],
    requirements: ["Around HSK 2 to HSK 3 level", "About 20 minutes of reading per day"],
    audience: [
      "Learners who can speak but read slowly",
      "Students preparing for HSK reading sections",
      "Self-learners who want graded reading practice",
    ],
  },
};

/** Chinese I keeps the editions it always had; every other course opens one spring run. */
const CHINESE_EDITIONS: readonly CourseEdition[] = [
  {
    id: "2026-spring",
    version: "v3",
    label: "Spring 2026",
    policy: ENROLMENT_POLICIES.FREE,
    seatsTaken: 212,
    seatsTotal: 300,
    isOpen: true,
  },
  {
    id: "2025-autumn",
    version: "v2",
    label: "Autumn 2025",
    policy: ENROLMENT_POLICIES.FREE,
    seatsTaken: 300,
    seatsTotal: 300,
    isOpen: false,
  },
];

const SEATS_TOTAL = 300;
const SEATS_TAKEN = 168;

function defaultEditions(): readonly CourseEdition[] {
  return [
    {
      id: "2026-spring",
      version: "v2",
      label: "Spring 2026",
      policy: ENROLMENT_POLICIES.FREE,
      seatsTaken: SEATS_TAKEN,
      seatsTotal: SEATS_TOTAL,
      isOpen: true,
    },
  ];
}

/** `undefined` for a slug the catalogue does not list: the route answers 404. */
export function getCourseLanding(slug: string): CourseLandingDetail | undefined {
  const card = CATALOG_COURSES.find((course) => course.slug === slug);
  const spec = SPECS[slug];
  if (!card || !spec) return undefined;
  const instructor = INSTRUCTORS[spec.instructor];
  if (!instructor) return undefined;
  return {
    ...card,
    ...spec,
    instructor,
    editions: slug === "chinese-i-foundations" ? CHINESE_EDITIONS : defaultEditions(),
    enrolment: ENROLMENT_STATES.NOT_ENROLLED,
  };
}

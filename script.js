const translations = {
  en: {
    systemSubtitle: "Biochemistry Registration Support",
    navDashboard: "Dashboard",
    navSearch: "Integrated Course Search",
    navPathway: "Pathway Planner",
    navAdvisor: "Advisor Evidence Pack",
    topTitle: "Biochemistry Registration Prototype",
    topDescription: "Personal course search, pathway, evaluation, and advising support.",
    notificationTitle: "Notifications",
    emptyNotification: "No new notifications.",
    messageTitle: "Messages",
    emptyMessage: "No new messages.",
    degreeTitle: "Degree Audit Preview",
    degreeIntro: "This prototype shows how Degree Works style information could support registration decisions. It is not an official degree audit.",
    projectNotice: "This is a student class project prototype. It is not an official Stony Brook University or SOLAR website.",
    searchPlaceholder: "Search by course, title, instructor, SBC, requirement, workload, or consequence",
    sentMessage: "Draft sent to Academic and Transfer Advising Services and the department coordinator in this prototype."
  },
  ko: {
    systemSubtitle: "Biochemistry 수강신청 지원",
    navDashboard: "대시보드",
    navSearch: "통합 과목 검색",
    navPathway: "수강 경로 계획",
    navAdvisor: "어드바이저 보고서",
    topTitle: "Biochemistry 수강신청 프로토타입",
    topDescription: "개인 맞춤 과목 검색, 수강 경로, 강의 평가, 상담 지원을 제공합니다.",
    notificationTitle: "알림",
    emptyNotification: "새로운 알림이 없습니다.",
    messageTitle: "메시지",
    emptyMessage: "새로운 메시지가 없습니다.",
    degreeTitle: "Degree Audit 미리보기",
    degreeIntro: "이 화면은 Degree Works 방식의 정보를 수강신청 결정에 활용하는 방식을 보여주는 프로토타입입니다. 공식 degree audit이 아닙니다.",
    projectNotice: "이 웹사이트는 수업 프로젝트용 프로토타입입니다. 공식 Stony Brook University 또는 SOLAR 웹사이트가 아닙니다.",
    searchPlaceholder: "과목, 제목, 교수, SBC, 요건, workload, 결과로 검색",
    sentMessage: "이 프로토타입에서는 Academic and Transfer Advising Services와 학과 코디네이터에게 초안이 전송된 것으로 표시됩니다."
  }
};

let currentLang = "en";
let currentPage = "dashboard";
let selectedCourseId = null;
let selectedDetailTab = "overview";
let plannedCourses = [];
let sentDraft = false;

const student = {
  name: "Kevin Ruiz",
  id: "0000000",
  major: "Biochemistry BS",
  standing: "Completed Year 1, Planning Year 2 Fall Enrollment",
  planningTerm: "Fall 2026",
  englishLevel: "WRT 102 completed",
  mathLevel: "MAT 123 and AMS 151 completed. AMS 161 is now available for Fall planning.",
  year: 2,
  mathAccess: 3,
  writingAccess: 2,
  completed: ["WRT102", "MAT123", "CHE131", "CHE133", "CHE132", "CHE134", "BIO201", "BIO202", "AMS151"],
  inProgress: []
};

const departments = ["All", "AMS", "BCH", "BIO", "CHE", "MAT", "MUS", "PHI", "PHY", "POL", "PSY", "WRT"];
const requirements = ["All", "Major Foundation", "Math", "Writing", "SBC", "Advanced Major", "Lab"];
const statusFilters = ["All", "Available", "Closed", "Waitlist", "Reserved"];
const readinessFilters = ["All", "Ready", "Caution", "Blocked"];
const workloadFilters = ["All", "Low", "Medium", "High"];

const mathLevelNames = {
  0: "No college math access",
  1: "MAT 123 eligible",
  2: "AMS 151 eligible",
  3: "AMS 161 eligible"
};

const fallRecommendedCourseIds = ["AMS161", "BIO203", "BIO204", "CHE321"];

function getPlanningStatus(course) {
  const readiness = checkReadiness(course);

  if (student.completed.includes(course.id)) {
    return {
      code: "completed",
      icon: "✓",
      label: lang("Completed previous year", "이전 학기 완료")
    };
  }

  if (fallRecommendedCourseIds.includes(course.id)) {
    return {
      code: "fall",
      icon: "+",
      label: lang("Recommended for Fall", "다가오는 Fall 추천")
    };
  }

  if (readiness.level === "Blocked") {
    return {
      code: "blocked",
      icon: "!",
      label: lang("Needs Advisor Check", "상담 확인 필요")
    };
  }

  return {
    code: "future",
    icon: "•",
    label: lang("Future or optional", "미래 또는 선택")
  };
}

const courseEvaluationStats = {
  WRT102: { enrolled: 155, responses: 64, rating: 4.1, grades: { A: 58, B: 54, C: 31, DF: 12 } },
  MAT123: { enrolled: 180, responses: 62, rating: 3.7, grades: { A: 42, B: 51, C: 56, DF: 31 } },
  AMS151: { enrolled: 240, responses: 95, rating: 4.0, grades: { A: 84, B: 78, C: 53, DF: 25 } },
  AMS161: { enrolled: 210, responses: 80, rating: 3.8, grades: { A: 62, B: 71, C: 48, DF: 29 } },
  CHE131: { enrolled: 260, responses: 110, rating: 3.6, grades: { A: 69, B: 82, C: 71, DF: 38 } },
  CHE133: { enrolled: 140, responses: 51, rating: 4.2, grades: { A: 55, B: 47, C: 28, DF: 10 } },
  CHE132: { enrolled: 238, responses: 94, rating: 3.7, grades: { A: 64, B: 81, C: 59, DF: 34 } },
  CHE134: { enrolled: 132, responses: 48, rating: 4.0, grades: { A: 49, B: 46, C: 27, DF: 10 } },
  BIO201: { enrolled: 220, responses: 86, rating: 4.2, grades: { A: 82, B: 74, C: 44, DF: 20 } },
  BIO202: { enrolled: 205, responses: 77, rating: 3.9, grades: { A: 65, B: 70, C: 48, DF: 22 } },
  BIO203: { enrolled: 190, responses: 70, rating: 3.5, grades: { A: 48, B: 61, C: 52, DF: 29 } },
  BIO204: { enrolled: 96, responses: 38, rating: 3.9, grades: { A: 34, B: 33, C: 20, DF: 9 } },
  CHE321: { enrolled: 175, responses: 72, rating: 3.4, grades: { A: 43, B: 55, C: 49, DF: 28 } },
  CHE322: { enrolled: 168, responses: 66, rating: 3.3, grades: { A: 39, B: 52, C: 48, DF: 29 } },
  BCH361: { enrolled: 112, responses: 45, rating: 3.8, grades: { A: 36, B: 39, C: 26, DF: 11 } },
  PHY131: { enrolled: 200, responses: 81, rating: 3.6, grades: { A: 51, B: 66, C: 55, DF: 28 } },
  PSY103: { enrolled: 280, responses: 110, rating: 4.3, grades: { A: 103, B: 91, C: 62, DF: 24 } },
  MUS105: { enrolled: 160, responses: 58, rating: 4.5, grades: { A: 71, B: 55, C: 25, DF: 9 } },
  PHI104: { enrolled: 145, responses: 53, rating: 4.0, grades: { A: 49, B: 50, C: 33, DF: 13 } },
  POL102: { enrolled: 175, responses: 61, rating: 3.9, grades: { A: 54, B: 62, C: 41, DF: 18 } }
};

const courseReviewData = {
  WRT102: [
    { likes: 42, text: "The feedback on drafts helped me improve my argument and organization." },
    { likes: 31, text: "The course is not difficult, but the revision deadlines come quickly." },
    { likes: 18, text: "Useful for lab reports and future writing, especially if you finish it early." }
  ],
  MAT123: [
    { likes: 39, text: "This course is helpful before calculus, but skipping practice makes exams difficult." },
    { likes: 26, text: "Algebra review is important. The workload feels high if you are rusty." },
    { likes: 14, text: "Good preparation for AMS 151, but it should not be paired with too many heavy STEM courses." }
  ],
  AMS151: [
    { likes: 45, text: "Weekly problem solving matters more than memorizing formulas before the exam." },
    { likes: 33, text: "Manageable if MAT 123 concepts are already comfortable." },
    { likes: 20, text: "The course is useful for science planning, but the pace can feel fast." }
  ],
  AMS161: [
    { likes: 37, text: "More demanding than AMS 151 because the concepts build quickly." },
    { likes: 28, text: "Do not take this without being confident in the first calculus course." },
    { likes: 16, text: "The workload is possible, but it becomes risky with organic chemistry." }
  ],
  CHE131: [
    { likes: 51, text: "The first exams are a wake up call. Weekly practice is necessary." },
    { likes: 36, text: "A good foundation course for Biochemistry, but the workload is real." },
    { likes: 22, text: "Taking the lab and lecture together makes the sequence easier to understand." }
  ],
  CHE133: [
    { likes: 34, text: "The lab is manageable if you prepare before arriving." },
    { likes: 25, text: "Lab reports take more time than expected for a one credit course." },
    { likes: 13, text: "Helpful for understanding the chemistry lecture, especially measurement topics." }
  ],
  CHE132: [
    { likes: 43, text: "This course feels more difficult if CHE 131 was weak." },
    { likes: 29, text: "Problem sets and exam review should start early each week." },
    { likes: 19, text: "Important for organic chemistry, so delaying it can affect the whole pathway." }
  ],
  CHE134: [
    { likes: 30, text: "The second lab is smoother if CHE 133 procedures are familiar." },
    { likes: 21, text: "Lab write ups need careful time management." },
    { likes: 12, text: "Not too difficult, but missing a lab section creates problems." }
  ],
  BIO201: [
    { likes: 48, text: "Clear introduction to biology and a good Year 1 science foundation." },
    { likes: 35, text: "Weekly quizzes keep you studying, which helps before exams." },
    { likes: 20, text: "Good choice with CHE 131 if you manage the schedule carefully." }
  ],
  BIO202: [
    { likes: 41, text: "The concepts connect well to later biochemistry, but the pace is faster than BIO 201." },
    { likes: 27, text: "Do not underestimate the amount of memorization and concept review." },
    { likes: 15, text: "Better after BIO 201 because the foundation matters." }
  ],
  BIO203: [
    { likes: 36, text: "Very content heavy. It is best after the foundation biology sequence is in place." },
    { likes: 24, text: "The exams require detailed understanding, not just memorization." },
    { likes: 14, text: "Good course later, but it should be planned around chemistry workload." }
  ],
  BIO204: [
    { likes: 33, text: "Lab reports are the main workload, so writing readiness matters." },
    { likes: 22, text: "Group coordination can be difficult when everyone has different schedules." },
    { likes: 11, text: "Useful lab experience, but reserved seats can create registration stress." }
  ],
  CHE321: [
    { likes: 49, text: "Organic chemistry requires consistent study from the first week." },
    { likes: 34, text: "This should not be taken before the general chemistry sequence is complete." },
    { likes: 23, text: "The course is central for Biochemistry, but the workload is one of the heaviest." }
  ],
  CHE322: [
    { likes: 40, text: "The second organic chemistry course builds directly from CHE 321." },
    { likes: 30, text: "Falling behind early makes the later exams much harder." },
    { likes: 18, text: "Closed sections make backup planning important." }
  ],
  BCH361: [
    { likes: 38, text: "This feels like the course where biology and chemistry finally connect." },
    { likes: 26, text: "It is interesting, but not a course to take before the foundations are ready." },
    { likes: 17, text: "Organic chemistry and molecular biology background are both important." }
  ],
  PHY131: [
    { likes: 35, text: "Physics is much easier when calculus preparation is stronger." },
    { likes: 25, text: "Problem solving practice is more important than reading alone." },
    { likes: 13, text: "This can become stressful if taken with organic chemistry." }
  ],
  PSY103: [
    { likes: 46, text: "A clear and manageable SBC course for balancing a heavy science schedule." },
    { likes: 32, text: "The exams are fair if you keep up with the main concepts." },
    { likes: 19, text: "Good option when you need a lighter course beside chemistry." }
  ],
  MUS105: [
    { likes: 44, text: "Interesting and not too stressful compared with STEM courses." },
    { likes: 28, text: "Good SBC choice if you want something different from science." },
    { likes: 16, text: "The evening time is the main thing to consider." }
  ],
  PHI104: [
    { likes: 29, text: "The discussions are useful, but readings require attention." },
    { likes: 21, text: "Good ethics course, especially if you want balance outside STEM." },
    { likes: 12, text: "Writing workload is moderate, so do not ignore the papers." }
  ],
  POL102: [
    { likes: 27, text: "The course is manageable, but there is a steady reading load." },
    { likes: 20, text: "Useful SBC option, though it does not support the Biochemistry sequence directly." },
    { likes: 10, text: "The long class block can feel tiring depending on the schedule." }
  ]
};

function makeCourse(data) {
  const stats = courseEvaluationStats[data.id] || {
    enrolled: 120,
    responses: 40,
    rating: 4.0,
    grades: { A: 40, B: 35, C: 25, DF: 10 }
  };

  return {
    term: "Sample Fall",
    enrolled: stats.enrolled,
    responses: stats.responses,
    rating: stats.rating,
    grades: stats.grades,
    reviews: courseReviewData[data.id] || [
      { likes: 12, text: "Students recommend checking prerequisites and workload before enrolling." },
      { likes: 8, text: "The course can be useful when it fits the degree pathway." }
    ],
    grading: "Mixed assignments and exams",
    exam: "Medium",
    group: "Low",
    clarity: "Moderate",
    usefulness: "High",
    comments: "Students recommend checking workload and prerequisites before enrolling.",
    consequences: ["May affect the Biochemistry sequence if taken too early or too late."],
    backups: ["Advisor confirmed alternative", "Future term section", "Lighter SBC option"],
    ...data
  };
}

const courses = [
  makeCourse({
    id: "WRT102",
    code: "WRT 102",
    title: "Intermediate Writing Workshop",
    instructor: "Prof. Sarah Bennett",
    department: "WRT",
    level: "100",
    credits: 3,
    requirementType: "Writing",
    sbc: "WRT",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 1 },
    prerequisite: "WRT 101 or writing placement",
    reservedSeats: "Open writing seats by placement group",
    days: "Tue Thu",
    start: "11:00 AM",
    end: "12:20 PM",
    location: "Humanities Building 201",
    catalog: "Sample writing course focused on argument, evidence, revision, and academic research writing.",
    planning: "Kevin is eligible for WRT 102. Completing it in Year 1 protects later lab reports and upper division writing.",
    impact: "Delaying WRT 102 can make later writing intensive work and lab reports harder.",
    comments: "Students say revision feedback is helpful, but deadlines require planning.",
    consequences: ["Writing requirement can remain unresolved if WRT 102 is delayed.", "Upper division writing tasks may become harder without early practice.", "Advisor may ask for a writing completion plan."],
    backups: ["WRT 101 if placement changes", "Summer WRT 102", "Advisor approved writing plan"]
  }),
  makeCourse({
    id: "MAT123",
    code: "MAT 123",
    title: "Precalculus",
    instructor: "Dr. Andrew Miller",
    department: "MAT",
    level: "100",
    credits: 3,
    requirementType: "Math",
    sbc: "QPS",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 0, year: 1 },
    prerequisite: "Math placement, MAP 103, or advisor confirmed equivalent",
    reservedSeats: "8 reserved seats for math sequence review",
    days: "Mon Wed",
    start: "10:00 AM",
    end: "11:20 AM",
    location: "Math Tower P 131",
    catalog: "Sample precalculus course for students preparing for calculus and quantitative science requirements.",
    planning: "Kevin can take MAT 123 now. This is the key math bridge before AMS 151.",
    impact: "If MAT 123 is delayed, AMS 151 and AMS 161 may move back and later science planning becomes tighter.",
    exam: "High",
    consequences: ["AMS 151 cannot be taken until the math sequence is cleared.", "AMS 161 may be pushed into Year 2.", "Physics and advanced quantitative planning may become delayed."],
    backups: ["MAP 103 review", "Math placement retake", "Advisor confirmed equivalent course"]
  }),
  makeCourse({
    id: "AMS151",
    code: "AMS 151",
    title: "Applied Calculus I",
    instructor: "Prof. Jennifer Lee",
    department: "AMS",
    level: "100",
    credits: 3,
    requirementType: "Math",
    sbc: "QPS",
    status: "Available",
    workload: "Medium",
    readiness: { math: 2, writing: 0, year: 1 },
    prerequisite: "MAT 123, placement, or equivalent preparation",
    reservedSeats: "12 seats reserved for major sequence students",
    days: "Tue Thu",
    start: "2:00 PM",
    end: "3:20 PM",
    location: "Engineering Building 143",
    catalog: "Sample applied calculus course used by science and applied fields.",
    planning: "AMS 151 is complete for Kevin and now supports AMS 161 planning.",
    impact: "Taking AMS 151 on time protects AMS 161 and later science sequencing.",
    clarity: "High",
    comments: "Students describe the course as manageable when weekly practice is consistent.",
    consequences: ["AMS 151 completion keeps AMS 161 available.", "Weak calculus preparation could still create grade risk.", "Delaying the calculus sequence may compress later STEM terms."],
    backups: ["MAT 123", "Math placement retake", "Summer AMS 151 after preparation"]
  }),
  makeCourse({
    id: "AMS161",
    code: "AMS 161",
    title: "Applied Calculus II",
    instructor: "Dr. Samuel Park",
    department: "AMS",
    level: "100",
    credits: 3,
    requirementType: "Math",
    sbc: "QPS",
    status: "Waitlist",
    workload: "High",
    readiness: { math: 3, writing: 0, year: 1 },
    prerequisite: "AMS 151 or equivalent",
    reservedSeats: "10 reserved seats for continuing calculus students",
    days: "Mon Wed",
    start: "3:30 PM",
    end: "4:50 PM",
    location: "Engineering Building 143",
    catalog: "Sample continuation of applied calculus with quantitative methods for science pathways.",
    planning: "AMS 161 is a Year 2 Fall planning course for Kevin after completing AMS 151.",
    impact: "AMS 161 should follow AMS 151 and should ideally be completed before later science overload.",
    exam: "High",
    consequences: ["Waitlist status requires a backup plan.", "High workload can conflict with organic chemistry.", "Delaying AMS 161 may create later pressure with physics and advanced biology."],
    backups: ["AMS 151", "Winter or summer AMS 161 if available", "Advisor approved equivalent"]
  }),
  makeCourse({
    id: "CHE131",
    code: "CHE 131",
    title: "General Chemistry I",
    instructor: "Prof. Maya Singh",
    department: "CHE",
    level: "100",
    credits: 4,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 0, year: 1 },
    prerequisite: "Math placement or equivalent preparation",
    reservedSeats: "15 seats reserved for science majors",
    days: "Mon Wed Fri",
    start: "9:00 AM",
    end: "9:50 AM",
    location: "Chemistry Building 100",
    catalog: "Sample first general chemistry course covering atomic structure, bonding, stoichiometry, and equilibrium.",
    planning: "CHE 131 was a key Biochemistry foundation course for Kevin and should remain visible as part of the completed sequence.",
    impact: "CHE 131 opens the path to CHE 132 and later organic chemistry.",
    exam: "High",
    comments: "Students say chemistry is manageable only with steady weekly practice.",
    consequences: ["Delaying CHE 131 may delay CHE 132 and organic chemistry.", "High workload can create pressure with MAT 123.", "Lab corequisite should be checked."],
    backups: ["BIO 201", "CHE 133 lab section", "Advisor supported chemistry plan"]
  }),
  makeCourse({
    id: "CHE133",
    code: "CHE 133",
    title: "General Chemistry Laboratory I",
    instructor: "Dr. Priya Nair",
    department: "CHE",
    level: "100",
    credits: 1,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 1, writing: 0, year: 1 },
    prerequisite: "CHE 131 corequisite or equivalent",
    reservedSeats: "Lab seats tied to chemistry sequence",
    days: "Thu",
    start: "1:00 PM",
    end: "3:50 PM",
    location: "Chemistry Lab 212",
    catalog: "Sample laboratory course supporting general chemistry concepts and scientific measurement.",
    planning: "CHE 133 should normally be planned with CHE 131 for a clean chemistry sequence.",
    impact: "Missing the lab can leave the chemistry sequence incomplete even if lecture is completed.",
    group: "Medium",
    consequences: ["Chemistry lab requirement may remain unresolved.", "Future lab scheduling may become crowded.", "Lecture and lab should be checked together."],
    backups: ["Different CHE 133 section", "Future lab section", "Advisor confirmed lab sequence"]
  }),
  makeCourse({
    id: "CHE132",
    code: "CHE 132",
    title: "General Chemistry II",
    instructor: "Prof. Maya Singh",
    department: "CHE",
    level: "100",
    credits: 4,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 0, year: 1, requires: ["CHE131"] },
    prerequisite: "CHE 131",
    reservedSeats: "Open after science major priority period",
    days: "Tue Thu",
    start: "10:00 AM",
    end: "11:20 AM",
    location: "Chemistry Building 100",
    catalog: "Sample second general chemistry course and key prerequisite for organic chemistry.",
    planning: "CHE 132 follows CHE 131 and is part of Kevin's completed chemistry foundation.",
    impact: "Delaying CHE 132 can push organic chemistry and upper division biochemistry later.",
    exam: "High",
    consequences: ["Organic chemistry sequence may be delayed.", "BIO and CHE workload may stack in Year 2.", "Advisor confirmation may be needed if CHE 131 is not complete."],
    backups: ["CHE 131", "Summer CHE 132", "Advisor approved equivalent"]
  }),
  makeCourse({
    id: "CHE134",
    code: "CHE 134",
    title: "General Chemistry Laboratory II",
    instructor: "Dr. Priya Nair",
    department: "CHE",
    level: "100",
    credits: 1,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 1, writing: 0, year: 1, requires: ["CHE133"] },
    prerequisite: "CHE 133 and CHE 132 corequisite or equivalent",
    reservedSeats: "Lab seats tied to chemistry sequence",
    days: "Fri",
    start: "1:00 PM",
    end: "3:50 PM",
    location: "Chemistry Lab 212",
    catalog: "Sample second chemistry laboratory course supporting general chemistry continuation.",
    planning: "CHE 134 should follow CHE 133 and align with CHE 132.",
    impact: "Missing this lab can keep chemistry foundation incomplete.",
    group: "Medium",
    consequences: ["Lab sequence may be delayed.", "Organic chemistry preparation may look incomplete.", "Future lab sections may conflict with BIO labs."],
    backups: ["CHE 133", "Future CHE 134 section", "Advisor confirmed lab substitute"]
  }),
  makeCourse({
    id: "BIO201",
    code: "BIO 201",
    title: "Fundamentals of Biology",
    instructor: "Dr. Elaine Mercer",
    department: "BIO",
    level: "200",
    credits: 3,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 0, year: 1 },
    prerequisite: "High school biology recommended",
    reservedSeats: "18 reserved seats for life science majors",
    days: "Mon Wed",
    start: "12:00 PM",
    end: "1:20 PM",
    location: "Life Sciences Building 038",
    catalog: "Sample introductory biology course covering major biological principles and scientific reasoning.",
    planning: "BIO 201 supports Kevin's completed Biochemistry foundation and opens later biology planning.",
    impact: "BIO 201 keeps the biology sequence open for later BIO 202 and advanced biology.",
    clarity: "High",
    comments: "Students mention clear lectures, weekly quizzes, and manageable workload.",
    consequences: ["Delaying BIO 201 can compress later biology requirements.", "Weekly quizzes require steady study.", "Useful evidence for science sequence planning."],
    backups: ["CHE 131", "SBC course if STEM workload is too high", "BIO 202 only if advisor approves readiness"]
  }),
  makeCourse({
    id: "BIO202",
    code: "BIO 202",
    title: "Molecular and Cellular Biology",
    instructor: "Dr. Nathan Brooks",
    department: "BIO",
    level: "200",
    credits: 3,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "High",
    readiness: { math: 0, writing: 0, year: 1, requires: ["BIO201"] },
    prerequisite: "BIO 201 recommended or required by sequence planning",
    reservedSeats: "Life science major priority seats",
    days: "Tue Thu",
    start: "12:30 PM",
    end: "1:50 PM",
    location: "Life Sciences Building 038",
    catalog: "Sample biology course focused on molecular and cellular concepts.",
    planning: "BIO 202 is complete for Kevin and supports Year 2 biology and biochemistry planning.",
    impact: "BIO 202 supports later advanced biology and biochemistry courses.",
    exam: "High",
    consequences: ["BIO 202 completion supports advanced biology timing.", "High biology workload should still be balanced with chemistry planning.", "Concept gaps can affect BIO 203 if the foundation is weak."],
    backups: ["BIO 201", "CHE 132", "Lighter SBC course"]
  }),
  makeCourse({
    id: "BIO203",
    code: "BIO 203",
    title: "Cellular and Organ Physiology",
    instructor: "Dr. Hannah Ortiz",
    department: "BIO",
    level: "200",
    credits: 3,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Waitlist",
    workload: "High",
    readiness: { math: 0, writing: 0, year: 2, requires: ["BIO201"] },
    prerequisite: "BIO 201 and biology sequence preparation",
    reservedSeats: "Seats prioritized for life science pathways",
    days: "Mon Wed",
    start: "2:00 PM",
    end: "3:20 PM",
    location: "Life Sciences Building 100",
    catalog: "Sample physiology course used in the biology foundation sequence.",
    planning: "BIO 203 is a Year 2 Fall planning course that should be balanced against chemistry and math workload.",
    impact: "BIO 203 timing should be coordinated with chemistry and math workload.",
    exam: "High",
    consequences: ["High content load may create pressure in a Year 2 Fall plan.", "Waitlist status needs a backup.", "BIO foundation should be confirmed before adding."],
    backups: ["BIO 201", "BIO 202", "PSY 103"]
  }),
  makeCourse({
    id: "BIO204",
    code: "BIO 204",
    title: "Fundamentals of Scientific Inquiry in Biology I",
    instructor: "Dr. Clara Kim",
    department: "BIO",
    level: "200",
    credits: 2,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Reserved",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 2, requires: ["BIO201"] },
    prerequisite: "BIO 201 and writing readiness recommended",
    reservedSeats: "Reserved biology lab seats",
    days: "Wed",
    start: "4:00 PM",
    end: "6:50 PM",
    location: "Biology Lab 240",
    catalog: "Sample biology lab course focused on scientific inquiry and lab communication.",
    planning: "BIO 204 is a later lab choice after Kevin has BIO foundation and stronger writing practice.",
    impact: "Biology lab timing affects advanced biology readiness and writing practice.",
    group: "High",
    consequences: ["Reserved seats may require advisor evidence.", "Lab reports can be difficult without writing foundation.", "Later labs may conflict with organic chemistry."],
    backups: ["BIO 201", "WRT 102", "Future BIO lab section"]
  }),
  makeCourse({
    id: "CHE321",
    code: "CHE 321",
    title: "Organic Chemistry I",
    instructor: "Prof. Victor Chen",
    department: "CHE",
    level: "300",
    credits: 4,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 0, year: 2, requires: ["CHE132"] },
    prerequisite: "CHE 132",
    reservedSeats: "Science major priority",
    days: "Tue Thu",
    start: "3:30 PM",
    end: "4:50 PM",
    location: "Chemistry Building 100",
    catalog: "Sample first organic chemistry course required for later biochemistry work.",
    planning: "Organic chemistry now belongs in Kevin's Year 2 Fall review because CHE 131 and CHE 132 are complete.",
    impact: "CHE 321 timing is central to the later Biochemistry sequence.",
    exam: "High",
    consequences: ["Blocked until CHE 132 is complete.", "Delay can affect CHE 322 and BCH 361.", "High workload may conflict with AMS 161."],
    backups: ["CHE 132", "BIO 202", "Advisor supported chemistry sequence"]
  }),
  makeCourse({
    id: "CHE322",
    code: "CHE 322",
    title: "Organic Chemistry II",
    instructor: "Prof. Victor Chen",
    department: "CHE",
    level: "300",
    credits: 4,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Closed",
    workload: "High",
    readiness: { math: 1, writing: 0, year: 2, requires: ["CHE321"] },
    prerequisite: "CHE 321",
    reservedSeats: "Closed sample section",
    days: "Mon Wed",
    start: "3:30 PM",
    end: "4:50 PM",
    location: "Chemistry Building 100",
    catalog: "Sample second organic chemistry course leading toward biochemistry requirements.",
    planning: "CHE 322 is a later course and is blocked by CHE 321 in this prototype.",
    impact: "CHE 322 completion supports later BCH and advanced biology planning.",
    exam: "High",
    consequences: ["Blocked until CHE 321 is complete.", "Closed section requires backup planning.", "Delay may affect BCH 361 timing."],
    backups: ["CHE 321", "Different CHE 322 section", "Future term planning"]
  }),
  makeCourse({
    id: "BCH361",
    code: "BCH 361",
    title: "Biochemistry I",
    instructor: "Dr. Miriam Stone",
    department: "BCH",
    level: "300",
    credits: 3,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 1, year: 3, requires: ["BIO202", "CHE322"] },
    prerequisite: "BIO 202 and organic chemistry sequence recommended",
    reservedSeats: "Biochemistry major priority",
    days: "Tue Thu",
    start: "9:30 AM",
    end: "10:50 AM",
    location: "Life Sciences Building 120",
    catalog: "Sample advanced biochemistry course connecting chemistry and molecular biology foundations.",
    planning: "BCH 361 is the major identity course, but it should wait until Kevin reaches Year 3 readiness.",
    impact: "This course depends on earlier chemistry and biology sequencing.",
    exam: "High",
    consequences: ["Blocked by biology and organic chemistry preparation.", "Taking it early would create major academic risk.", "Should be planned around Year 3 readiness."],
    backups: ["BIO 202", "CHE 322", "Advisor confirmed advanced course plan"]
  }),
  makeCourse({
    id: "PHY131",
    code: "PHY 131",
    title: "Classical Physics I",
    instructor: "Dr. Peter Walsh",
    department: "PHY",
    level: "100",
    credits: 3,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "High",
    readiness: { math: 2, writing: 0, year: 2 },
    prerequisite: "Calculus readiness recommended",
    reservedSeats: "Science sequence seats",
    days: "Mon Wed",
    start: "11:30 AM",
    end: "12:50 PM",
    location: "Physics Building 117",
    catalog: "Sample physics course often planned after calculus preparation in science pathways.",
    planning: "Physics should be balanced carefully after Kevin's calculus sequence planning is confirmed.",
    impact: "Physics timing can affect later science credit completion.",
    exam: "High",
    consequences: ["High workload can stack with organic chemistry.", "Should be placed after math planning.", "Advisor confirmation may help if physics competes with Year 2 Fall priorities."],
    backups: ["AMS 151", "BIO 202", "Future physics sequence"]
  }),
  makeCourse({
    id: "PSY103",
    code: "PSY 103",
    title: "Introduction to Psychology",
    instructor: "Dr. Olivia Grant",
    department: "PSY",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "SBS",
    status: "Available",
    workload: "Low",
    readiness: { math: 0, writing: 0, year: 1 },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    days: "Tue Thu",
    start: "9:30 AM",
    end: "10:50 AM",
    location: "Javits Lecture Center 100",
    catalog: "Sample social science course used as an SBC option.",
    planning: "PSY 103 can protect workload balance if Kevin already has heavy chemistry and math courses.",
    impact: "This course fills an SBC area without moving the Biochemistry sequence forward.",
    clarity: "High",
    consequences: ["Useful for workload balance.", "Does not replace BIO or CHE foundation.", "Can help avoid an overloaded STEM term."],
    backups: ["MUS 105", "PHI 104", "POL 102"]
  }),
  makeCourse({
    id: "MUS105",
    code: "MUS 105",
    title: "Music Cultures",
    instructor: "Prof. Yejin Park",
    department: "MUS",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "ARTS, GLO",
    status: "Available",
    workload: "Low",
    readiness: { math: 0, writing: 0, year: 1 },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    days: "Mon Wed",
    start: "5:00 PM",
    end: "6:20 PM",
    location: "Staller Center 011",
    catalog: "Sample arts and global cultures course used as an SBC option.",
    planning: "MUS 105 can help Kevin avoid too many heavy STEM courses in the same term.",
    impact: "This course helps SBC progress but does not replace major science foundation.",
    clarity: "High",
    consequences: ["Good workload balance option.", "Evening time may affect commuting.", "Does not unlock later Biochemistry courses."],
    backups: ["PSY 103", "PHI 104", "POL 102"]
  }),
  makeCourse({
    id: "PHI104",
    code: "PHI 104",
    title: "Moral Reasoning",
    instructor: "Dr. Julia Raymond",
    department: "PHI",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "CER, HUM",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 1 },
    prerequisite: "Writing readiness recommended",
    reservedSeats: "Open general seats",
    days: "Tue Thu",
    start: "2:00 PM",
    end: "3:20 PM",
    location: "Humanities Building 204",
    catalog: "Sample humanities and ethics course used as an SBC option.",
    planning: "PHI 104 can add humanities and ethics balance, but Kevin should consider writing workload.",
    impact: "This course supports SBC progress and ethical reasoning.",
    group: "Medium",
    consequences: ["Adds reading and writing workload.", "Does not unlock major sequence.", "Can be useful if STEM load is manageable."],
    backups: ["PSY 103", "MUS 105", "POL 102"]
  }),
  makeCourse({
    id: "POL102",
    code: "POL 102",
    title: "Introduction to American Government",
    instructor: "Prof. Mark Hill",
    department: "POL",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "SBS, USA",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 0, year: 1 },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    days: "Fri",
    start: "10:00 AM",
    end: "12:50 PM",
    location: "Social Sciences 101",
    catalog: "Sample social science course used as an SBC option.",
    planning: "POL 102 is an SBC option, but the long Friday block should be checked against study routines.",
    impact: "This course helps SBC progress but does not support the science sequence directly.",
    consequences: ["May add reading workload.", "Does not unlock major courses.", "Friday block may affect schedule balance."],
    backups: ["PSY 103", "MUS 105", "PHI 104"]
  })
];

const biochemPathway = [
  {
    year: "Year 1",
    focus: "Chemistry, biology, writing, and math placement foundation",
    semesters: [
      { name: "Fall", courses: ["WRT102", "MAT123", "CHE131", "CHE133", "BIO201"], note: "Finish WRT 102 and start MAT 123, CHE 131, CHE 133, and BIO 201 early." },
      { name: "Spring", courses: ["CHE132", "CHE134", "BIO202", "AMS151", "PSY103"], note: "Move into CHE 132 and AMS 151 only after the Fall foundation is clear." }
    ]
  },
  {
    year: "Year 2",
    focus: "Calculus continuation, biology continuation, and organic chemistry entry",
    semesters: [
      { name: "Fall", courses: ["AMS161", "BIO203", "BIO204", "CHE321"], note: "AMS 161 should ideally be finished by Year 2 to avoid later science overload." },
      { name: "Spring", courses: ["CHE322", "PHY131", "PHI104"], note: "Organic Chemistry II and Physics should be balanced carefully." }
    ]
  },
  {
    year: "Year 3",
    focus: "Advanced biochemistry and upper division biology preparation",
    semesters: [
      { name: "Fall", courses: ["BCH361"], note: "BCH 361 should wait until biology and organic chemistry foundations are ready." },
      { name: "Spring", courses: [], note: "Confirm remaining upper division BIO, CHE, BCH, lab, and writing requirements with an advisor." }
    ]
  },
  {
    year: "Year 4",
    focus: "Advanced electives, writing in the discipline, and graduation audit",
    semesters: [
      { name: "Fall", courses: [], note: "Confirm remaining advanced BIO, CHE, BCH, SBC, and writing requirements." },
      { name: "Spring", courses: ["MUS105", "POL102"], note: "Do not leave writing, lab, or advanced requirement checks until the last month." }
    ]
  }
];

const sbcCategories = [
  { code: "WRT", title: "Writing", examples: "WRT 102" },
  { code: "QPS", title: "Quantitative Problem Solving", examples: "MAT 123, AMS 151, AMS 161" },
  { code: "SNW", title: "Natural Sciences", examples: "BIO 201, CHE 131, CHE 132" },
  { code: "SBS", title: "Social and Behavioral Sciences", examples: "PSY 103, POL 102" },
  { code: "ARTS", title: "Arts", examples: "MUS 105" },
  { code: "HUM", title: "Humanities", examples: "PHI 104" },
  { code: "CER", title: "Ethics", examples: "PHI 104" },
  { code: "GLO", title: "Global Issues", examples: "MUS 105" }
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function tr(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

function lang(en, ko) {
  return currentLang === "ko" ? ko : en;
}

function safeList(items) {
  return Array.isArray(items) ? items : [];
}

function getCourse(id = selectedCourseId) {
  if (!id) return null;
  return courses.find(course => course.id === id) || null;
}

function isAdded(id) {
  return plannedCourses.includes(id);
}

function normalizeClass(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
}

function checkReadiness(course) {
  const readiness = course.readiness || {};
  const reasons = [];

  if (student.completed.includes(course.id)) {
    return {
      level: "Ready",
      label: lang("Completed", "완료"),
      reasons: [lang("Kevin completed this course in a previous semester.", "Kevin이 이전 학기에 완료한 과목입니다.")]
    };
  }

  if ((readiness.year || 1) > student.year) {
    reasons.push(`Designed for Year ${readiness.year}`);
  }

  if ((readiness.math || 0) > student.mathAccess) {
    reasons.push(`Math level needed: ${mathLevelNames[readiness.math]}`);
  }

  if ((readiness.writing || 0) > student.writingAccess) {
    reasons.push("Writing placement or WRT 102 completion needed");
  }

  safeList(readiness.requires).forEach(id => {
    if (!student.completed.includes(id) && !student.inProgress.includes(id) && !plannedCourses.includes(id)) {
      const needed = getCourse(id);
      reasons.push(`Requires ${needed ? needed.code : id}`);
    }
  });

  if (course.status === "Closed") {
    reasons.push("This sample section is closed");
  }

  if (course.status === "Reserved") {
    reasons.push("Reserved seats require evidence or advisor confirmation");
  }

  const blocked = reasons.some(reason =>
    reason.includes("Requires") ||
    reason.includes("Math level") ||
    reason.includes("Designed") ||
    reason.includes("closed")
  );

  if (blocked) {
    return { level: "Blocked", label: lang("Blocked", "제한됨"), reasons };
  }

  if (course.status === "Reserved" || course.status === "Waitlist" || course.workload === "High") {
    return {
      level: "Caution",
      label: lang("Caution", "주의"),
      reasons: reasons.length ? reasons : [lang("High workload or seat risk should be checked before adding.", "높은 workload 또는 좌석 위험을 확인해야 합니다.")]
    };
  }

  return {
    level: "Ready",
    label: lang("Ready", "수강 가능"),
    reasons: [lang("Fits Kevin's current Biochemistry Fall planning.", "Kevin의 현재 Biochemistry Fall 계획에 적합합니다.")]
  };
}

function needsAddCaution(course, state = checkReadiness(course)) {
  return state.level === "Caution" ||
    course.status === "Reserved" ||
    course.status === "Waitlist" ||
    course.workload === "High";
}

function getAddCourseLabel(course, state = checkReadiness(course)) {
  return needsAddCaution(course, state)
    ? lang("Add with Caution", "주의하고 추가")
    : lang("Add to Timetable", "시간표 추가");
}

function renderAddCaution(course, state = checkReadiness(course), added = false) {
  if (!needsAddCaution(course, state)) return "";

  const reasons = state.reasons.join(" · ");
  const message = added
    ? lang("Added with caution. Review the warning before relying on this plan.", "주의 상태로 추가되었습니다. 이 계획을 확정하기 전에 경고를 확인하세요.")
    : lang("This course can be added, but it should be reviewed before Kevin relies on the plan.", "이 과목은 추가할 수 있지만 Kevin이 계획에 의존하기 전에 검토해야 합니다.");

  return `
    <div class="info-box">
      <strong>${lang("Caution before adding", "추가 전 주의")}</strong>
      <p>${message}</p>
      <p><strong>${lang("Reason", "이유")}:</strong> ${reasons}</p>
    </div>
  `;
}

function getFilteredCourses() {
  const query = (qs("#courseSearchInput")?.value || "").trim().toLowerCase();
  const dept = qs("#departmentFilter")?.value || "All";
  const req = qs("#requirementFilter")?.value || "All";
  const seat = qs("#statusFilter")?.value || "All";
  const ready = qs("#readinessFilter")?.value || "All";
  const work = qs("#workloadFilter")?.value || "All";

  return courses.filter(course => {
    const state = checkReadiness(course);
    const searchable = [
      course.code,
      course.title,
      course.instructor,
      course.department,
      course.requirementType,
      course.sbc,
      course.status,
      course.workload,
      course.prerequisite,
      course.catalog,
      course.planning,
      course.impact,
      safeList(course.consequences).join(" "),
      safeList(course.backups).join(" ")
    ].join(" ").toLowerCase();

    return (!query || searchable.includes(query)) &&
      (dept === "All" || course.department === dept) &&
      (req === "All" || course.requirementType === req || (course.sbc || "").includes(req)) &&
      (seat === "All" || course.status === seat || (seat === "Reserved" && String(course.reservedSeats).toLowerCase().includes("reserved"))) &&
      (ready === "All" || state.level === ready) &&
      (work === "All" || course.workload === work);
  });
}

function applyTranslations() {
  qsa("[data-i18n]").forEach(element => {
    element.textContent = tr(element.dataset.i18n);
  });

  const input = qs("#courseSearchInput");
  if (input) input.placeholder = tr("searchPlaceholder");

  qs("#englishButton")?.classList.toggle("active-lang", currentLang === "en");
  qs("#koreanButton")?.classList.toggle("active-lang", currentLang === "ko");
}

function showPage(page) {
  currentPage = page;

  qsa(".nav").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  if (page === "dashboard") renderDashboard();
  if (page === "search") renderSearch();
  if (page === "pathway") renderPathway();
  if (page === "advisor") renderAdvisor();

  applyTranslations();
}

function renderDashboard() {
  const completedCodes = student.completed.map(id => getCourse(id)).filter(Boolean).map(course => course.code).join(", ");
  const fallCodes = fallRecommendedCourseIds.map(id => getCourse(id)).filter(Boolean).map(course => course.code).join(", ");

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Personal Biochemistry Dashboard", "개인 Biochemistry 대시보드")}</h2>
      <p>${lang("Kevin Ruiz has completed the first year foundation and is now planning Year 2 Fall enrollment.", "Kevin Ruiz는 1학년 foundation 과목들을 완료했고, 이제 2학년 Fall 수강신청을 계획하고 있습니다.")}</p>
    </section>

    <section class="card notice-card"><strong>${tr("projectNotice")}</strong></section>

    <section class="card ai-guidance" style="margin-top:20px">
      <h3>🤖 ${lang("AI Guidance for Kevin", "Kevin을 위한 AI Guidance")}</h3>
      <p>${lang("Kevin has already completed the Year 1 writing, math, chemistry, and biology foundation. For the coming Fall semester, ZOLAR recommends checking AMS 161, BIO 203, BIO 204, and CHE 321 together, because taking all of them at once may create workload pressure.", "Kevin은 1학년 writing, math, chemistry, biology foundation을 이미 완료했습니다. 다가오는 Fall 학기에는 AMS 161, BIO 203, BIO 204, CHE 321을 함께 검토하되, 네 과목을 모두 동시에 듣는 경우 workload 부담이 커질 수 있음을 확인해야 합니다.")}</p>
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("Student Profile", "학생 프로필")}</h3>
      <div class="profile-card">
        <div class="profile-item"><span>${lang("Student", "학생")}</span><strong>${student.name}</strong></div>
        <div class="profile-item"><span>${lang("Major", "전공")}</span><strong>${student.major}</strong></div>
        <div class="profile-item"><span>${lang("Standing", "학년")}</span><strong>${student.standing}</strong></div>
        <div class="profile-item"><span>${lang("Planning term", "계획 학기")}</span><strong>${student.planningTerm}</strong></div>
        <div class="profile-item"><span>${lang("English status", "영어 상태")}</span><strong>${student.englishLevel}</strong></div>
        <div class="profile-item"><span>${lang("Math status", "수학 상태")}</span><strong>${student.mathLevel}</strong></div>
        <div class="profile-item"><span>${lang("Completed courses", "완료 과목")}</span><strong>${student.completed.length} ${lang("courses", "개")}</strong></div>
        <div class="profile-item"><span>${lang("Current planned courses", "현재 추가한 과목")}</span><strong>${plannedCourses.length} ${lang("courses", "개")}</strong></div>
      </div>
    </section>

    <section class="grid two" style="margin-top:20px">
      <article class="card">
        <h3>${lang("Completed Previous Courses", "이전 학기 완료 과목")}</h3>
        <p>${completedCodes}</p>
      </article>
      <article class="card">
        <h3>${lang("Recommended for Coming Fall", "다가오는 Fall 추천 과목")}</h3>
        <p>${fallCodes}</p>
      </article>
    </section>

    <section class="grid three" style="margin-top:20px">
      <article class="card">
        <h3>${lang("Integrated Course Decision Hub", "통합 과목 결정 허브")}</h3>
        <p>${lang("Course Search connects catalog information, prerequisites, reviews, grade distribution, timetable, pathway consequences, and advising evidence.", "Course Search는 카탈로그, 선수 조건, 리뷰, 성적 분포, 시간표, 수강 경로 영향, 상담 근거를 연결합니다.")}</p>
      </article>
      <article class="card">
        <h3>${lang("Pathway Highlighting", "Pathway 강조 표시")}</h3>
        <p>${lang("Completed courses are marked in green. Fall planning courses are marked in red. Future or blocked courses stay visually separate.", "완료 과목은 초록색, Fall 계획 과목은 빨간색, 미래 또는 제한 과목은 구분되어 표시됩니다.")}</p>
      </article>
      <article class="card">
        <h3>${lang("Advisor Evidence", "상담 근거")}</h3>
        <p>${lang("If a course is blocked, reserved, or risky, ZOLAR prepares the detected rule, pathway risk, alternatives, and a message draft.", "과목이 제한, reserved, risky 상태라면 ZOLAR가 감지된 규칙, 경로 위험, 대안, 메시지 초안을 준비합니다.")}</p>
      </article>
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("Start from Course Search", "Course Search에서 시작")}</h3>
      <p>${lang("Click a course card to open Add to Timetable, Course Info, Reviews, Pathway Impact, and Advisor Evidence.", "과목 카드를 클릭하면 Add to Timetable, Course Info, Reviews, Pathway Impact, Advisor Evidence가 열립니다.")}</p>
      <div class="action-row">
        <button class="primary-button" data-go="search" type="button">${lang("Open Course Search", "Course Search 열기")}</button>
        <button class="secondary-button" data-go="pathway" type="button">${lang("Open Pathway Planner", "Pathway Planner 열기")}</button>
        <button class="secondary-button" data-open-degree type="button">${lang("Open Degree Audit Preview", "Degree Audit 미리보기 열기")}</button>
      </div>
    </section>
  `;
}

function renderSearch() {
  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Integrated Course Search", "통합 과목 검색")}</h2>
      <p>${lang("Click a course card. The action buttons will open immediately inside the card, and the full detail panel will update on the right.", "과목 카드를 클릭하세요. 카드 안에 선택 버튼이 바로 열리고, 오른쪽 세부 패널도 함께 업데이트됩니다.")}</p>
    </section>

    <section class="card notice-card"><strong>${lang("Sample prototype data only. This is not official course availability, degree audit, or SOLAR information.", "예시 프로토타입 데이터입니다. 공식 수강 가능 여부, degree audit, SOLAR 정보가 아닙니다.")}</strong></section>

    <section class="card ai-guidance" style="margin-top:20px">
      <h3>🤖 ${lang("AI Guidance for Course Search", "Course Search AI Guidance")}</h3>
      <p>${lang("ZOLAR labels each course as Completed, Recommended for Fall, Future, or Needs Advisor Check based on Kevin's previous coursework, math readiness, writing status, and Biochemistry pathway position.", "ZOLAR는 Kevin의 이전 이수 과목, 수학 준비도, writing 상태, Biochemistry pathway 위치를 바탕으로 각 과목을 Completed, Recommended for Fall, Future, Needs Advisor Check로 표시합니다.")}</p>
    </section>

    <section class="search-panel" style="margin-top:20px">
      <div class="search-row">
        <div>
          <label>${lang("Search course", "과목 검색")}</label>
          <input id="courseSearchInput" type="text" placeholder="${tr("searchPlaceholder")}">
        </div>
        <div>
          <label>${lang("Department", "학과")}</label>
          <select id="departmentFilter">${departments.map(x => `<option value="${x}">${x === "All" ? lang("All departments", "모든 학과") : x}</option>`).join("")}</select>
        </div>
        <div>
          <label>${lang("Requirement", "요건")}</label>
          <select id="requirementFilter">${requirements.map(x => `<option value="${x}">${x === "All" ? lang("All requirements", "모든 요건") : x}</option>`).join("")}</select>
        </div>
        <div>
          <label>${lang("Seat status", "좌석 상태")}</label>
          <select id="statusFilter">${statusFilters.map(x => `<option value="${x}">${x === "All" ? lang("All status", "모든 상태") : x}</option>`).join("")}</select>
        </div>
        <div>
          <label>${lang("Readiness", "수강 가능성")}</label>
          <select id="readinessFilter">${readinessFilters.map(x => `<option value="${x}">${x === "All" ? lang("All readiness", "모든 가능성") : x}</option>`).join("")}</select>
        </div>
        <div>
          <label>Workload</label>
          <select id="workloadFilter">${workloadFilters.map(x => `<option value="${x}">${x === "All" ? lang("All workloads", "모든 workload") : x}</option>`).join("")}</select>
        </div>
      </div>
    </section>

    <section class="search-layout">
      <div class="result-list-panel">
        <div class="result-header">
          <div>
            <h3>${lang("Biochemistry Course Results", "Biochemistry 과목 결과")}</h3>
            <p>${lang("Completed and Fall priority courses are visually highlighted.", "완료 과목과 Fall 우선 과목이 시각적으로 강조됩니다.")}</p>
          </div>
          <button id="clearFiltersButton" class="small-button" type="button">${lang("Clear", "초기화")}</button>
        </div>
        <div class="pathway-legend">
          <span class="status-completed">✓ ${lang("Completed", "완료")}</span>
          <span class="status-fall">+ ${lang("Recommended for Fall", "Fall 추천")}</span>
          <span class="status-blocked">! ${lang("Needs Advisor Check", "상담 확인")}</span>
          <span class="status-future">• ${lang("Future or optional", "미래/선택")}</span>
        </div>
        <p id="courseCount" class="course-count"></p>
        <div id="courseList" class="result-list"></div>
      </div>

      <div id="courseDetail" class="result-detail"></div>
    </section>

    <section class="grid two" style="margin-top:20px">
      <article class="card">
        <h3>${lang("Visual Timetable", "시각적 시간표")}</h3>
        <p class="muted">${lang("Added Fall courses appear here. Drop buttons remove them from the planned course list.", "추가된 Fall 과목이 여기에 표시됩니다. Drop 버튼을 누르면 planned course list에서 삭제됩니다.")}</p>
        <div id="visualTimetable"></div>
      </article>
      <article class="card">
        <h3>${lang("SBC Explorer inside Course Search", "Course Search 안의 SBC 탐색")}</h3>
        <p class="muted">${lang("SBC and catalog information stays inside the search flow instead of becoming a separate page.", "SBC와 catalog 정보는 별도 페이지가 아니라 Course Search 흐름 안에 유지됩니다.")}</p>
        <div class="sbc-grid">
          ${sbcCategories.map(item => `<div class="sbc-card"><strong>${item.code}</strong><p>${item.title}</p><small>${item.examples}</small></div>`).join("")}
        </div>
      </article>
    </section>
  `;

  ["courseSearchInput", "departmentFilter", "requirementFilter", "statusFilter", "readinessFilter", "workloadFilter"].forEach(id => {
    qs("#" + id).addEventListener("input", updateCourseList);
    qs("#" + id).addEventListener("change", updateCourseList);
  });

  qs("#clearFiltersButton").addEventListener("click", () => {
    qs("#courseSearchInput").value = "";
    ["departmentFilter", "requirementFilter", "statusFilter", "readinessFilter", "workloadFilter"].forEach(id => qs("#" + id).value = "All");
    updateCourseList();
  });

  updateCourseList();
  renderCourseDetail();
  renderTimetable();
}

function updateCourseList() {
  const list = getFilteredCourses();
  const count = qs("#courseCount");
  const target = qs("#courseList");
  if (!target) return;

  count.textContent = `${list.length} ${lang("courses shown", "개 과목 표시 중")}`;

  if (!list.length) {
    target.innerHTML = `
      <div class="empty-state">
        <strong>${lang("No matching results", "검색 결과 없음")}</strong>
        <p>${lang("Try clearing filters or searching by BIO, CHE, MAT, AMS, WRT, SBC, workload, or prerequisite.", "필터를 지우거나 BIO, CHE, MAT, AMS, WRT, SBC, workload, prerequisite으로 검색해보세요.")}</p>
      </div>
    `;
    return;
  }

  target.innerHTML = list.map(course => {
    const state = checkReadiness(course);
    const planning = getPlanningStatus(course);
    const added = isAdded(course.id);
    const selected = selectedCourseId === course.id;
    const blocked = state.level === "Blocked";
    const completed = planning.code === "completed";
    const cautionAdd = !completed && !blocked && needsAddCaution(course, state);
    const addLabel = getAddCourseLabel(course, state);

    return `
      <div class="result-card ${selected ? "active" : ""} ${added ? "added-card" : ""} ${planning.code === "completed" ? "completed-card" : ""} ${planning.code === "fall" ? "fall-card" : ""}" data-course-id="${course.id}">
        <div class="course-click-area" data-select-course="${course.id}">
          <div class="result-title-row">
            <div>
              <h4>${course.code}</h4>
              <div class="course-title">${course.title}</div>
            </div>
            <div class="chip-wrap" style="margin-top:0;justify-content:flex-end">
              ${added ? `<span class="badge added">✓ ${lang("Added", "추가됨")}</span>` : ""}
              <span class="badge status-${planning.code}">${planning.icon} ${planning.label}</span>
              <span class="badge ${normalizeClass(state.level)}">${state.label}</span>
            </div>
          </div>
          <p>${course.requirementType} · ${course.credits} credits · ${course.sbc || lang("Major only", "전공 전용")} · ${course.workload} workload</p>
          <div class="chip-wrap">
            <span>${course.department}</span>
            <span>${course.status}</span>
            <span>${course.days} ${course.start}</span>
          </div>
        </div>

        ${selected ? `
          <div class="quick-panel">
            <h5>${lang("Choose an action for", "선택 과목 기능")} ${course.code}</h5>
            ${cautionAdd ? renderAddCaution(course, state, added) : ""}
            <div class="quick-actions">
              ${completed
                ? `<button class="secondary-button" disabled type="button">✓ ${lang("Completed previous year", "이전 학기 완료")}</button>`
                : added
                  ? `<button class="secondary-button" data-drop-course="${course.id}" type="button">✓ ${cautionAdd ? lang("Added with Caution, Drop", "주의 추가됨, 삭제") : lang("Added, Drop", "추가됨, 삭제")}</button>`
                  : `<button class="primary-button" data-add-course="${course.id}" type="button" ${blocked ? "disabled" : ""}>${blocked ? lang("Locked", "제한됨") : addLabel}</button>`
              }
              <button class="small-button" data-set-tab="catalog" type="button">${lang("Course Info", "수업 정보")}</button>
              <button class="small-button" data-set-tab="evaluation" type="button">${lang("Reviews", "리뷰")}</button>
              <button class="small-button" data-set-tab="pathway" type="button">${lang("Pathway Impact", "경로 영향")}</button>
              <button class="small-button" data-set-tab="advisor" type="button">${lang("Advisor Evidence", "상담 근거")}</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");
}

function renderCourseDetail() {
  const target = qs("#courseDetail");
  const course = getCourse();
  if (!target) return;

  if (!course) {
    target.innerHTML = `
      <div class="empty-state">
        <h3>${lang("Select a course", "과목을 선택하세요")}</h3>
        <p>${lang("Click any course card to open Add to Timetable, Course Info, Reviews, Pathway Impact, and Advisor Evidence.", "과목 카드를 클릭하면 Add to Timetable, Course Info, Reviews, Pathway Impact, Advisor Evidence가 열립니다.")}</p>
      </div>
    `;
    return;
  }

  const state = checkReadiness(course);
  const planning = getPlanningStatus(course);
  const added = isAdded(course.id);
  const blocked = state.level === "Blocked";
  const completed = planning.code === "completed";
  const cautionAdd = !completed && !blocked && needsAddCaution(course, state);
  const addLabel = getAddCourseLabel(course, state);

  target.innerHTML = `
    <div class="detail-hero">
      <div>
        <h3>${course.code}</h3>
        <p class="course-title">${course.title}</p>
        <div class="chip-wrap">
          <span class="badge status-${planning.code}">${planning.icon} ${planning.label}</span>
          <span class="badge ${normalizeClass(course.status)}">${course.status}</span>
          <span class="badge ${normalizeClass(state.level)}">${state.label}</span>
          <span class="badge ${normalizeClass(course.workload)}">${course.workload} workload</span>
          ${added ? `<span class="badge added">✓ ${lang("Added to timetable", "시간표 추가됨")}</span>` : ""}
        </div>
      </div>
      <div class="detail-actions">
        ${completed
          ? `<button class="secondary-button" disabled type="button">✓ ${lang("Completed", "완료")}</button>`
          : added
            ? `<button class="secondary-button" data-drop-course="${course.id}" type="button">${lang("Drop", "삭제")}</button>`
            : `<button class="primary-button" data-add-course="${course.id}" type="button" ${blocked ? "disabled" : ""}>${blocked ? lang("Locked by Requirement", "요건 때문에 제한") : addLabel}</button>`
        }
      </div>
    </div>

    ${cautionAdd ? renderAddCaution(course, state, added) : ""}

    <div class="detail-tabs">
      ${["overview", "catalog", "evaluation", "pathway", "advisor"].map(tab => `<button class="tab-button ${selectedDetailTab === tab ? "active-tab" : ""}" data-set-tab="${tab}" type="button">${tabLabel(tab)}</button>`).join("")}
    </div>

    <div id="detailTabContent">${renderDetailTab(course)}</div>
  `;
}

function tabLabel(tab) {
  return {
    overview: lang("Overview", "개요"),
    catalog: lang("Course Info", "수업 정보"),
    evaluation: lang("Reviews", "리뷰"),
    pathway: lang("Pathway Impact", "경로 영향"),
    advisor: lang("Advisor Evidence", "상담 근거")
  }[tab] || tab;
}

function renderDetailTab(course) {
  if (selectedDetailTab === "catalog") return renderCatalogTab(course);
  if (selectedDetailTab === "evaluation") return renderEvaluationTab(course);
  if (selectedDetailTab === "pathway") return renderPathwayTab(course);
  if (selectedDetailTab === "advisor") return renderAdvisorTab(course);
  return renderOverviewTab(course);
}

function renderOverviewTab(course) {
  const state = checkReadiness(course);
  const planning = getPlanningStatus(course);

  return `
    <section class="detail-section">
      <h4>${lang("Integrated Decision Summary", "통합 결정 요약")}</h4>
      <div class="metric-grid">
        <div class="metric"><strong>${course.credits}</strong><span>Credits</span></div>
        <div class="metric"><strong>${course.rating}</strong><span>Rating</span></div>
        <div class="metric"><strong>${course.responses}</strong><span>Responses</span></div>
        <div class="metric"><strong>${planning.icon}</strong><span>${planning.label}</span></div>
      </div>
      <p>${course.planning}</p>
    </section>

    <section class="detail-section">
      <h4>🤖 ${lang("AI Guidance", "AI Guidance")}</h4>
      <p>${lang("This course is interpreted through Kevin's completed Year 1 courses, Fall planning term, math status, writing status, and Biochemistry pathway sequence.", "이 과목은 Kevin의 1학년 완료 과목, Fall 계획 학기, 수학 상태, writing 상태, Biochemistry pathway sequence를 기준으로 해석됩니다.")}</p>
    </section>

    <section class="detail-section">
      <h4>${lang("Prerequisite and placement check", "선수 조건과 레벨 확인")}</h4>
      <div class="catalog-grid">
        <div class="catalog-item"><span>${lang("Prerequisite", "선수 조건")}</span><strong>${course.prerequisite}</strong></div>
        <div class="catalog-item"><span>${lang("Kevin's English status", "Kevin의 영어 상태")}</span><strong>${student.englishLevel}</strong></div>
        <div class="catalog-item"><span>${lang("Kevin's math status", "Kevin의 수학 상태")}</span><strong>${student.mathLevel}</strong></div>
        <div class="catalog-item"><span>${lang("Detected result", "감지된 결과")}</span><strong>${state.reasons.join(" · ")}</strong></div>
      </div>
    </section>

    <section class="detail-section consequence-box">
      <h4>${lang("Possible Consequences", "가능한 결과")}</h4>
      ${safeList(course.consequences).map(item => `<div class="consequence-item">${item}</div>`).join("")}
    </section>
  `;
}

function renderCatalogTab(course) {
  return `
    <section class="detail-section">
      <h4>${lang("Course Information", "수업 정보")}</h4>
      <p>${course.catalog}</p>
      <div class="catalog-grid">
        <div class="catalog-item"><span>Course code</span><strong>${course.code}</strong></div>
        <div class="catalog-item"><span>Department</span><strong>${course.department}</strong></div>
        <div class="catalog-item"><span>Level</span><strong>${course.level}</strong></div>
        <div class="catalog-item"><span>Credits</span><strong>${course.credits}</strong></div>
        <div class="catalog-item"><span>SBC</span><strong>${course.sbc || lang("No SBC listed in sample", "예시 SBC 없음")}</strong></div>
        <div class="catalog-item"><span>Requirement</span><strong>${course.requirementType}</strong></div>
        <div class="catalog-item"><span>Reserved seats</span><strong>${course.reservedSeats}</strong></div>
        <div class="catalog-item"><span>Meeting</span><strong>${course.days} · ${course.start} to ${course.end} · ${course.location}</strong></div>
      </div>
    </section>
  `;
}

function renderEvaluationTab(course) {
  const grades = course.grades;
  const max = Math.max(grades.A, grades.B, grades.C, grades.DF, 1);
  const reviews = safeList(course.reviews).slice().sort((a, b) => b.likes - a.likes);

  return `
    <section class="detail-section">
      <h4>${lang("Course Evaluation DNA", "강의 평가 DNA")}</h4>
      <p class="muted">${lang("Reviews are integrated inside Course Search instead of being separated into another page.", "리뷰는 별도 페이지가 아니라 Course Search 안에 통합되어 있습니다.")}</p>
      <div class="dna-grid">
        <div class="dna-item"><strong>Workload</strong><p>${course.workload}</p></div>
        <div class="dna-item"><strong>${lang("Grading style", "채점 방식")}</strong><p>${course.grading}</p></div>
        <div class="dna-item"><strong>${lang("Clarity", "명확성")}</strong><p>${course.clarity}</p></div>
        <div class="dna-item"><strong>${lang("Exam difficulty", "시험 난이도")}</strong><p>${course.exam}</p></div>
        <div class="dna-item"><strong>${lang("Group work", "그룹 과제")}</strong><p>${course.group}</p></div>
        <div class="dna-item"><strong>${lang("Usefulness", "유용성")}</strong><p>${course.usefulness}</p></div>
      </div>
    </section>

    <section class="detail-section">
      <h4>${lang("Student Review Highlights", "학생 리뷰 하이라이트")}</h4>
      <p class="muted">${lang("Sample comments are sorted by likes to imitate a course evaluation preview.", "예시 댓글은 course evaluation preview처럼 좋아요 수가 높은 순서대로 표시됩니다.")}</p>
      <div class="review-list">
        ${reviews.map((review, index) => `
          <article class="review-card">
            <div class="review-top">
              <strong>${lang("Review", "리뷰")} ${index + 1}</strong>
              <span class="like-pill">👍 ${review.likes}</span>
            </div>
            <p>${review.text}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="detail-section">
      <h4>${lang("Grade Distribution", "성적 분포")}</h4>
      <p class="muted">${course.term} · ${course.enrolled} enrolled · ${course.responses} responses · rating ${course.rating}</p>
      ${Object.entries(grades).map(([grade, value]) => `
        <div class="grade-row">
          <strong>${grade === "DF" ? "D or F" : grade}</strong>
          <div class="grade-bar"><span style="width:${Math.round(value / max * 100)}%"></span></div>
          <span>${value} ${lang("students", "명")}</span>
        </div>
      `).join("")}
    </section>
  `;
}

function renderPathwayTab(course) {
  return `
    <section class="detail-section">
      <h4>${lang("AI Guided Planner", "AI 수강 계획 도우미")}</h4>
      <p>${course.planning}</p>
    </section>
    <section class="detail-section">
      <h4>${lang("Future Academic Impact", "미래 학업 영향")}</h4>
      <p>${course.impact}</p>
    </section>
    <section class="detail-section">
      <h4>${lang("Backup Options", "대안 과목")}</h4>
      <div class="chip-wrap">${safeList(course.backups).map(item => `<span>${item}</span>`).join("")}</div>
    </section>
  `;
}

function renderAdvisorTab(course) {
  const state = checkReadiness(course);

  return `
    <section class="detail-section">
      <h4>${lang("Advisor Ready Evidence", "어드바이저 제출용 근거")}</h4>
      <div class="report-box">
        <p><strong>${lang("Selected course", "선택 과목")}:</strong> ${course.code} ${course.title}</p>
        <p><strong>${lang("Detected rule", "감지된 규칙")}:</strong> ${state.reasons.join(" · ")}</p>
        <p><strong>${lang("Degree path risk", "졸업 경로 위험")}:</strong> ${course.impact}</p>
        <p><strong>${lang("Possible alternatives", "가능한 대안")}:</strong> ${safeList(course.backups).join(", ")}</p>
      </div>
      <div class="action-row">
        <button class="primary-button" data-go="advisor" type="button">${lang("Open Advisor Evidence Pack", "Advisor Evidence Pack 열기")}</button>
      </div>
    </section>
  `;
}

function addCourse(id) {
  const course = getCourse(id);
  if (!course) return;
  if (checkReadiness(course).level === "Blocked") return;

  if (!plannedCourses.includes(id)) {
    plannedCourses.push(id);
  }

  updateVisibleParts();
}

function dropCourse(id) {
  plannedCourses = plannedCourses.filter(courseId => courseId !== id);
  updateVisibleParts();
}

function updateVisibleParts() {
  if (currentPage === "search") {
    updateCourseList();
    renderCourseDetail();
    renderTimetable();
  }

  if (currentPage === "pathway") {
    renderPathway();
  }

  if (currentPage === "advisor") {
    renderAdvisor();
  }
}

function parseTimeToMinutes(time) {
  const match = String(time).match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 9 * 60;

  let hour = Number(match[1]);
  const minutes = Number(match[2]);

  if (match[3].toUpperCase() === "PM" && hour !== 12) {
    hour += 12;
  }

  if (match[3].toUpperCase() === "AM" && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minutes;
}

function courseMeetsOnDay(course, day) {
  return String(course.days).split(/\s+/).includes(day);
}

function coursesOverlapOnDay(first, second, day) {
  if (!courseMeetsOnDay(first, day) || !courseMeetsOnDay(second, day)) return false;

  const firstStart = parseTimeToMinutes(first.start);
  const firstEnd = parseTimeToMinutes(first.end);
  const secondStart = parseTimeToMinutes(second.start);
  const secondEnd = parseTimeToMinutes(second.end);

  return firstStart < secondEnd && secondStart < firstEnd;
}

function renderTimetable() {
  const target = qs("#visualTimetable");
  if (!target) return;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = Array.from({ length: 12 }, (_, index) => index + 9);
  const planned = plannedCourses.map(getCourse).filter(Boolean);

  let html = `<div class="timetable-wrap"><div class="timetable"><div class="day">Time</div>${days.map(day => `<div class="day">${day}</div>`).join("")}`;

  hours.forEach(hour => {
    html += `<div class="time">${hour <= 12 ? hour : hour - 12}:00 ${hour < 12 ? "AM" : "PM"}</div>`;

    days.forEach(day => {
      const slotStart = hour * 60;
      const slotEnd = slotStart + 60;
      const blocks = planned.filter(course => {
        const start = parseTimeToMinutes(course.start);
        return courseMeetsOnDay(course, day) && start >= slotStart && start < slotEnd;
      });

      html += `<div class="cell">${blocks.map(course => {
        const conflict = planned.some(other => other.id !== course.id && coursesOverlapOnDay(course, other, day));

        return `<div class="class-block ${conflict ? "conflict" : course.workload === "High" ? "heavy" : ""}">
          <strong>${course.code}</strong><br>
          ${course.start} to ${course.end}<br>
          ${course.location}
          <button class="small-button" data-drop-course="${course.id}" type="button">${lang("Drop", "삭제")}</button>
        </div>`;
      }).join("")}</div>`;
    });
  });

  html += `</div></div>`;
  html += `<p class="muted">${planned.length ? `${planned.length} ${lang("courses are currently planned.", "개 과목이 현재 시간표에 추가되어 있습니다.")}` : lang("No courses added yet. Select a course and click Add to Timetable.", "아직 추가된 과목이 없습니다. 과목을 선택한 뒤 Add to Timetable을 누르세요.")}</p>`;

  target.innerHTML = html;
}

function renderPathway() {
  const selected = getCourse();

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Biochemistry Pathway Planner", "Biochemistry 수강 경로 계획")}</h2>
      <p>${lang("The pathway now highlights what Kevin completed in previous semesters and what he should consider for the coming Fall registration.", "이 Pathway는 Kevin이 이전 학기에 완료한 과목과 다가오는 Fall 수강신청에서 고려해야 할 과목을 강조합니다.")}</p>
    </section>

    <section class="card notice-card"><strong>${lang("Prototype planning guide only. Students should confirm official requirements with advising and the department.", "프로토타입 계획 가이드입니다. 공식 요건은 advising과 학과를 통해 확인해야 합니다.")}</strong></section>

    <section class="card ai-guidance" style="margin-top:20px">
      <h3>🤖 ${lang("AI Pathway Guidance", "AI Pathway Guidance")}</h3>
      <p>${lang("Completed courses are highlighted in green. Coming Fall priorities are highlighted in red. Future courses stay gray, and courses with prerequisite or seat issues are flagged for advisor review.", "완료 과목은 초록색으로, 다가오는 Fall 우선 과목은 빨간색으로 강조됩니다. 미래 과목은 회색으로 유지되고, 선수 조건이나 좌석 문제가 있는 과목은 advisor review 대상으로 표시됩니다.")}</p>
      <div class="pathway-legend">
        <span class="status-completed">✓ ${lang("Completed previous year", "이전 학기 완료")}</span>
        <span class="status-fall">+ ${lang("Recommended for Fall", "Fall 추천")}</span>
        <span class="status-blocked">! ${lang("Needs Advisor Check", "상담 확인 필요")}</span>
        <span class="status-future">• ${lang("Future or optional", "미래 또는 선택")}</span>
      </div>
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("English and Math Timing Guide", "영어와 수학 완료 시점 가이드")}</h3>
      <div class="timeline">
        <div class="timeline-item"><strong>WRT 102</strong><div>${lang("Completed in Year 1. This supports later lab reports and upper division writing.", "1학년에 완료되었습니다. 이후 실험 보고서와 상위 writing을 지원합니다.")}</div></div>
        <div class="timeline-item"><strong>MAT 123</strong><div>${lang("Completed in Year 1. This opened the path to AMS 151.", "1학년에 완료되었습니다. AMS 151로 이어지는 경로를 열었습니다.")}</div></div>
        <div class="timeline-item"><strong>AMS 151</strong><div>${lang("Completed in Year 1. AMS 161 is now a realistic Year 2 Fall option.", "1학년에 완료되었습니다. 이제 AMS 161은 2학년 Fall의 현실적인 선택지입니다.")}</div></div>
        <div class="timeline-item"><strong>AMS 161</strong><div>${lang("Recommended for Year 2 Fall. Delaying it may create pressure with physics, organic chemistry, and advanced biology.", "2학년 Fall 추천 과목입니다. 늦어지면 physics, organic chemistry, advanced biology와 부담이 겹칠 수 있습니다.")}</div></div>
      </div>
    </section>

    <section class="roadmap-grid" style="margin-top:20px">
      ${biochemPathway.map(year => `
        <article class="year-card ${year.year === "Year 1" ? "completed-focus-card" : ""} ${year.year === "Year 2" ? "fall-focus-card" : ""}">
          <h3>${year.year}</h3>
          <p><strong>${year.focus}</strong></p>
          ${year.semesters.map(semester => `
            <div class="detail-section">
              <h4>${semester.name}</h4>
              ${semester.courses.map(id => {
                const course = getCourse(id);
                if (!course) return "";
                const planning = getPlanningStatus(course);
                return `
                  <div class="pathway-course-row">
                    <button class="small-button status-${planning.code} ${selectedCourseId === id ? "selected-course-button" : ""}" data-select-course="${id}" type="button">
                      ${planning.icon} ${course.code} · ${planning.label} ${isAdded(id) ? "✓ Added" : ""}
                    </button>
                    <small>${course.title}</small>
                  </div>
                `;
              }).join("")}
              <p class="muted">${semester.note}</p>
            </div>
          `).join("")}
        </article>
      `).join("")}
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("Selected Course Impact", "선택 과목 영향")}</h3>
      ${selected ? `<p><strong>${selected.code}:</strong> ${selected.impact}</p><div class="chip-wrap">${safeList(selected.consequences).map(item => `<span>${item}</span>`).join("")}</div>` : `<p class="muted">${lang("Select a course from the pathway or Course Search to see its impact.", "Pathway 또는 Course Search에서 과목을 선택하면 영향이 표시됩니다.")}</p>`}
      <div class="action-row"><button class="primary-button" data-go="search" type="button">${lang("Return to Course Search", "Course Search로 돌아가기")}</button></div>
    </section>
  `;
}

function renderAdvisor() {
  const course = getCourse();

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Advisor Evidence Pack", "어드바이저 보고서")}</h2>
      <p>${lang("This page turns course confusion into advisor ready evidence. It supports human agency instead of replacing human advising.", "이 페이지는 수강 혼란을 어드바이저에게 전달 가능한 근거로 바꿉니다. 사람의 상담을 대체하지 않고 연결합니다.")}</p>
    </section>

    <section class="card ai-guidance">
      <h3>🤖 ${lang("AI Advisor Guidance", "AI Advisor Guidance")}</h3>
      <p>${lang("If a course is completed, blocked, reserved, waitlisted, or risky for Kevin's Fall plan, ZOLAR prepares the detected rule, pathway risk, backup options, and an email draft for Academic and Transfer Advising Services and the department coordinator.", "과목이 완료, 제한, reserved, waitlist, 또는 Fall 계획에 위험한 경우 ZOLAR는 감지된 규칙, 경로 위험, 대안, Academic and Transfer Advising Services와 학과 코디네이터에게 보낼 이메일 초안을 준비합니다.")}</p>
    </section>

    ${course ? renderAdvisorReport(course) : `
      <section class="card empty-state" style="margin-top:20px">
        <h3>${lang("No course selected", "선택된 과목 없음")}</h3>
        <p>${lang("Go to Integrated Course Search and select a course first. Then this page will show blocked course evidence, detected rule, degree path risk, alternatives, and a prepared email draft.", "먼저 Integrated Course Search에서 과목을 선택하세요. 그러면 blocked course evidence, detected rule, degree path risk, alternatives, email draft가 여기에 표시됩니다.")}</p>
        <button class="primary-button" data-go="search" type="button">${lang("Go to Course Search", "Course Search로 이동")}</button>
      </section>
    `}
  `;
}

function renderAdvisorReport(course) {
  const state = checkReadiness(course);
  const email = `Subject: Registration question about ${course.code}

Dear Academic and Transfer Advising Services and Department Coordinator,

I am Kevin Ruiz, a Biochemistry student who has completed Year 1 and is planning Year 2 Fall enrollment. I am reviewing ${course.code} ${course.title} in the ZOLAR class project prototype.

The prototype detected the following issue: ${state.reasons.join("; ")}.

Possible degree path risk: ${course.impact}

Possible alternatives I am considering: ${safeList(course.backups).join(", ")}.

Could you please confirm whether I should add this course, choose one of the alternatives, or adjust my Biochemistry pathway plan?

Thank you,
Kevin Ruiz`;

  return `
    <section class="card">
      <h3>${course.code} ${course.title}</h3>
      <div class="report-box">
        <p><strong>${lang("Blocked course or concern", "제한 또는 우려 과목")}:</strong> ${course.code}</p>
        <p><strong>${lang("Detected rule", "감지된 규칙")}:</strong> ${state.reasons.join(" · ")}</p>
        <p><strong>${lang("Degree path risk", "졸업 경로 위험")}:</strong> ${course.impact}</p>
        <p><strong>${lang("Possible alternatives", "가능한 대안")}:</strong> ${safeList(course.backups).join(", ")}</p>
        <p><strong>${lang("Human support pathway", "사람의 도움 경로")}:</strong> Academic and Transfer Advising Services and department coordinator.</p>
      </div>
    </section>

    <section class="card">
      <h3>${lang("Prepared Email Draft", "준비된 이메일 초안")}</h3>
      <div class="email-box"><pre>${email}</pre></div>
      <button id="sendDraftButton" class="primary-button" type="button" style="margin-top:16px">${lang("Send Draft", "초안 보내기")}</button>
      ${sentDraft ? `<div class="success-box">${tr("sentMessage")}</div>` : ""}
    </section>
  `;
}

function renderDegreeAudit() {
  const credits = plannedCourses.map(getCourse).filter(Boolean).reduce((sum, course) => sum + course.credits, 0);
  const completedCredits = student.completed.map(getCourse).filter(Boolean).reduce((sum, course) => sum + course.credits, 0);
  const planned = plannedCourses.map(getCourse).filter(Boolean);

  qs("#degreeAuditContent").innerHTML = `
    <div class="profile-card">
      <div class="profile-item"><span>Student</span><strong>${student.name}</strong></div>
      <div class="profile-item"><span>Major</span><strong>${student.major}</strong></div>
      <div class="profile-item"><span>Standing</span><strong>${student.standing}</strong></div>
      <div class="profile-item"><span>Planning term</span><strong>${student.planningTerm}</strong></div>
      <div class="profile-item"><span>Completed sample credits</span><strong>${completedCredits}</strong></div>
      <div class="profile-item"><span>Planned Fall credits</span><strong>${credits}</strong></div>
      <div class="profile-item"><span>Completed courses</span><strong>${student.completed.length}</strong></div>
      <div class="profile-item"><span>Audit type</span><strong>Unofficial sample preview</strong></div>
    </div>

    <section class="detail-section">
      <h4>${lang("Prototype Degree Audit Status", "프로토타입 Degree Audit 상태")}</h4>
      <div class="catalog-grid">
        <div class="catalog-item"><span>Writing</span><strong>WRT 102 completed</strong></div>
        <div class="catalog-item"><span>Math bridge</span><strong>MAT 123 and AMS 151 completed</strong></div>
        <div class="catalog-item"><span>Chemistry foundation</span><strong>CHE 131, CHE 133, CHE 132, CHE 134 completed</strong></div>
        <div class="catalog-item"><span>Biology foundation</span><strong>BIO 201 and BIO 202 completed</strong></div>
        <div class="catalog-item"><span>Recommended Fall focus</span><strong>${fallRecommendedCourseIds.map(id => getCourse(id)).filter(Boolean).map(course => course.code).join(", ")}</strong></div>
        <div class="catalog-item"><span>Currently planned Fall courses</span><strong>${planned.length ? planned.map(course => course.code).join(", ") : "No courses added yet"}</strong></div>
      </div>
    </section>
  `;
}

function openDegreeModal() {
  renderDegreeAudit();
  qs("#degreeModal").classList.remove("hidden");
}

function closeDegreeModal() {
  qs("#degreeModal").classList.add("hidden");
}

function clearLoginValidation() {
  qs("#loginError").textContent = "";
  qs("#studentId").removeAttribute("aria-invalid");
  qs("#studentPassword").removeAttribute("aria-invalid");
}

function showLoginValidation(message, focusTarget) {
  const idInput = qs("#studentId");
  const passwordInput = qs("#studentPassword");

  qs("#loginError").textContent = message;
  if (idInput.value.trim()) {
    idInput.removeAttribute("aria-invalid");
  } else {
    idInput.setAttribute("aria-invalid", "true");
  }
  passwordInput.setAttribute("aria-invalid", "true");
  focusTarget?.focus();
}

function handleSignIn(event) {
  event?.preventDefault();

  const idInput = qs("#studentId");
  const passwordInput = qs("#studentPassword");
  const hasStudentId = Boolean(idInput.value.trim());
  const hasDemoPassword = Boolean(passwordInput.value.trim());

  passwordInput.value = "";

  if (!hasStudentId || !hasDemoPassword) {
    showLoginValidation(
      "Enter the sample ID and a demo password to continue. Do not enter a real university password.",
      hasStudentId ? passwordInput : idInput
    );
    return;
  }

  clearLoginValidation();
  qs("#loginScreen").classList.add("hidden");
  qs("#app").classList.remove("hidden");
  showPage("dashboard");
}

function resetPrototypeSession() {
  currentLang = "en";
  currentPage = "dashboard";
  selectedCourseId = null;
  selectedDetailTab = "overview";
  plannedCourses = [];
  sentDraft = false;

  qs("#noticePanel").classList.add("hidden");
  qs("#messagePanel").classList.add("hidden");
  qs("#userDropdown").classList.add("hidden");
  qs("#degreeModal").classList.add("hidden");
  qs("#mainContent").innerHTML = "";
  qs("#degreeAuditContent").innerHTML = "";
  qs("#studentId").value = student.id;
  qs("#studentPassword").value = "";
  qsa(".nav").forEach(button => {
    button.classList.toggle("active", button.dataset.page === "dashboard");
  });
  clearLoginValidation();
  applyTranslations();
}

function bindGlobalEvents() {
  qs("#loginForm").addEventListener("submit", handleSignIn);

  qs("#signOutButton").addEventListener("click", () => {
    resetPrototypeSession();
    qs("#app").classList.add("hidden");
    qs("#loginScreen").classList.remove("hidden");
  });

  qsa(".nav").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  qs("#noticeButton").addEventListener("click", () => {
    qs("#noticePanel").classList.toggle("hidden");
    qs("#messagePanel").classList.add("hidden");
    qs("#userDropdown").classList.add("hidden");
  });

  qs("#messageButton").addEventListener("click", () => {
    qs("#messagePanel").classList.toggle("hidden");
    qs("#noticePanel").classList.add("hidden");
    qs("#userDropdown").classList.add("hidden");
  });

  qs("#userMenuButton").addEventListener("click", () => {
    qs("#userDropdown").classList.toggle("hidden");
    qs("#noticePanel").classList.add("hidden");
    qs("#messagePanel").classList.add("hidden");
  });

  qs("#englishButton").addEventListener("click", () => {
    currentLang = "en";
    showPage(currentPage);
  });

  qs("#koreanButton").addEventListener("click", () => {
    currentLang = "ko";
    showPage(currentPage);
  });

  qs("#closeDegreeModal").addEventListener("click", closeDegreeModal);

  qs("#degreeModal").addEventListener("click", event => {
    if (event.target.id === "degreeModal") closeDegreeModal();
  });

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-course]");
    if (addButton) {
      addCourse(addButton.dataset.addCourse);
      return;
    }

    const dropButton = event.target.closest("[data-drop-course]");
    if (dropButton) {
      dropCourse(dropButton.dataset.dropCourse);
      return;
    }

    const tabButton = event.target.closest("[data-set-tab]");
    if (tabButton) {
      selectedDetailTab = tabButton.dataset.setTab;
      renderCourseDetail();
      updateCourseList();
      return;
    }

    const selectButton = event.target.closest("[data-select-course]");
    if (selectButton) {
      selectedCourseId = selectButton.dataset.selectCourse;
      selectedDetailTab = "overview";
      sentDraft = false;

      if (currentPage === "search") {
        updateCourseList();
        renderCourseDetail();
      }

      if (currentPage === "pathway") {
        renderPathway();
      }

      return;
    }

    const goButton = event.target.closest("[data-go]");
    if (goButton) {
      showPage(goButton.dataset.go);
      return;
    }

    const degreeButton = event.target.closest("[data-open-degree]");
    if (degreeButton) {
      openDegreeModal();
    }
  });

  document.addEventListener("click", event => {
    if (event.target && event.target.id === "sendDraftButton") {
      sentDraft = true;
      renderAdvisor();
    }
  });
}

bindGlobalEvents();
applyTranslations();

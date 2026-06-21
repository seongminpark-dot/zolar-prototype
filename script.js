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
let timetableConflictNotice = null;
let selectedChoices = {};

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

const sampleAuditNeedsSpk = true;

const departments = ["All", "AMS", "BIO", "BME", "CHE", "EBH", "MAT", "MUS", "PHI", "PHY", "POL", "PSY", "WRT"];
const requirements = ["All", "Major Foundation", "Math", "Writing", "SBC", "Advanced Major", "Lab", "Co-registration", "Choice Requirement", "Catalog Option"];
const statusFilters = ["All", "Available", "Closed", "Waitlist", "Reserved", "Catalog Option"];
const readinessFilters = ["All", "Ready", "Caution", "Blocked"];
const workloadFilters = ["All", "Low", "Medium", "High"];

const mathLevelNames = {
  0: "No college math access",
  1: "MAT 123 eligible",
  2: "AMS 151 eligible",
  3: "AMS 161 eligible"
};

const fallRecommendedCourseIds = ["AMS161", "BIO203", "BIO204", ...(sampleAuditNeedsSpk ? ["BIO458"] : []), "CHE321"];

const defaultChoiceSelections = {
  "genetics-choice": "BIO320",
  "second-biology-lab-choice": "BIO205",
  "organic-lab-choice": "CHE327",
  "physical-chemistry-choice": "CHE312",
  "advanced-elective-choice-1": "BIO314",
  "advanced-elective-choice-2": "BIO315"
};

selectedChoices = { ...defaultChoiceSelections };

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
  BIO205: { enrolled: 88, responses: 32, rating: 3.8, grades: { A: 31, B: 30, C: 19, DF: 8 } },
  BIO207: { enrolled: 72, responses: 26, rating: 3.7, grades: { A: 24, B: 26, C: 16, DF: 6 } },
  BIO310: { enrolled: 118, responses: 44, rating: 3.9, grades: { A: 36, B: 40, C: 29, DF: 13 } },
  BIO314: { enrolled: 92, responses: 39, rating: 4.2, grades: { A: 38, B: 31, C: 17, DF: 6 } },
  BIO315: { enrolled: 104, responses: 43, rating: 4.0, grades: { A: 36, B: 38, C: 22, DF: 8 } },
  BIO320: { enrolled: 132, responses: 52, rating: 3.8, grades: { A: 40, B: 45, C: 33, DF: 14 } },
  BIO361: { enrolled: 112, responses: 45, rating: 3.8, grades: { A: 36, B: 39, C: 26, DF: 11 } },
  BIO362: { enrolled: 104, responses: 40, rating: 3.7, grades: { A: 31, B: 37, C: 25, DF: 11 } },
  BIO365: { enrolled: 64, responses: 24, rating: 4.1, grades: { A: 27, B: 22, C: 11, DF: 4 } },
  CHE321: { enrolled: 175, responses: 72, rating: 3.4, grades: { A: 43, B: 55, C: 49, DF: 28 } },
  CHE322: { enrolled: 168, responses: 66, rating: 3.3, grades: { A: 39, B: 52, C: 48, DF: 29 } },
  CHE327: { enrolled: 84, responses: 33, rating: 3.6, grades: { A: 25, B: 29, C: 21, DF: 9 } },
  CHE312: { enrolled: 96, responses: 35, rating: 3.5, grades: { A: 27, B: 33, C: 24, DF: 12 } },
  PHY131: { enrolled: 200, responses: 81, rating: 3.6, grades: { A: 51, B: 66, C: 55, DF: 28 } },
  PHY132: { enrolled: 188, responses: 73, rating: 3.5, grades: { A: 48, B: 61, C: 52, DF: 27 } },
  PHY133: { enrolled: 120, responses: 42, rating: 3.9, grades: { A: 44, B: 42, C: 25, DF: 9 } },
  PHY134: { enrolled: 112, responses: 39, rating: 3.8, grades: { A: 39, B: 41, C: 23, DF: 9 } },
  PSY103: { enrolled: 280, responses: 110, rating: 4.3, grades: { A: 103, B: 91, C: 62, DF: 24 } },
  MUS105: { enrolled: 160, responses: 58, rating: 4.5, grades: { A: 71, B: 55, C: 25, DF: 9 } },
  PHI104: { enrolled: 145, responses: 53, rating: 4.0, grades: { A: 49, B: 50, C: 33, DF: 13 } },
  POL101: { enrolled: 190, responses: 68, rating: 3.8, grades: { A: 56, B: 69, C: 47, DF: 18 } },
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
  BIO205: [
    { likes: 29, text: "The second biology lab needs steady report writing and careful scheduling." },
    { likes: 18, text: "It pairs better after BIO 204 because expectations are clearer." },
    { likes: 10, text: "Good lab experience, but it should not be hidden behind lecture planning." }
  ],
  BIO207: [
    { likes: 24, text: "This alternative biology lab can work when the BIO 205 schedule does not fit." },
    { likes: 16, text: "Students recommend confirming the approved lab route before relying on it." },
    { likes: 9, text: "The workload is manageable when lab reports are started early." }
  ],
  BIO310: [
    { likes: 31, text: "Cell biology connects well with biochemistry but has a steady reading load." },
    { likes: 20, text: "Useful before advanced biology electives because core concepts repeat." },
    { likes: 12, text: "Best when paired with a lighter elective or SBC course." }
  ],
  BIO314: [
    { likes: 35, text: "Cancer biology is engaging and works well as an advanced elective sample." },
    { likes: 23, text: "The course is concept heavy but connects clearly to molecular biology." },
    { likes: 13, text: "Students recommend keeping up with pathway diagrams and review articles." }
  ],
  BIO315: [
    { likes: 33, text: "Microbiology is practical and broad, with consistent weekly study needed." },
    { likes: 22, text: "A strong sample advanced elective when Kevin wants biology breadth." },
    { likes: 14, text: "Lab background helps, but the lecture workload still needs planning." }
  ],
  BIO320: [
    { likes: 37, text: "General Genetics is a clear selected sample for the genetics requirement." },
    { likes: 25, text: "Problem solving practice matters more than passive review." },
    { likes: 15, text: "Confirm alternatives with advising if another genetics course fits better." }
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
  BIO361: [
    { likes: 38, text: "This feels like the course where biology and chemistry finally connect." },
    { likes: 26, text: "It is interesting, but not a course to take before the foundations are ready." },
    { likes: 17, text: "Organic chemistry and molecular biology background are both important." }
  ],
  BIO362: [
    { likes: 30, text: "Biochemistry II builds directly from BIO 361 and should follow it in sequence." },
    { likes: 21, text: "Metabolism topics are easier when the first biochemistry course is fresh." },
    { likes: 11, text: "Students recommend spacing it away from the heaviest lab term." }
  ],
  BIO365: [
    { likes: 28, text: "The biochemistry lab is writing intensive and benefits from strong planning." },
    { likes: 19, text: "BIO 459 co-registration should be checked early if WRTD is still needed." },
    { likes: 10, text: "Lab reports are rewarding but time consuming." }
  ],
  CHE327: [
    { likes: 26, text: "Organic chemistry lab requires careful preparation before each meeting." },
    { likes: 17, text: "It should be planned close to the organic chemistry lecture sequence." },
    { likes: 9, text: "Confirm CHE 383 only if an approved alternative route is needed." }
  ],
  CHE312: [
    { likes: 23, text: "Physical chemistry is quantitative and should be balanced with labs." },
    { likes: 16, text: "CHE 301 may be an approved alternative, but Kevin should confirm it." },
    { likes: 8, text: "Students recommend reviewing calculus and chemistry foundations." }
  ],
  PHY131: [
    { likes: 35, text: "Physics is much easier when calculus preparation is stronger." },
    { likes: 25, text: "Problem solving practice is more important than reading alone." },
    { likes: 13, text: "This can become stressful if taken with organic chemistry." }
  ],
  PHY132: [
    { likes: 28, text: "Physics II should follow PHY 131 and works best with steady problem practice." },
    { likes: 19, text: "The course can become heavy when paired with multiple biology labs." },
    { likes: 10, text: "Students recommend keeping the lab registration aligned." }
  ],
  PHY133: [
    { likes: 20, text: "The first physics lab is manageable when paired with the lecture." },
    { likes: 13, text: "Lab reports are short but still need time after each meeting." },
    { likes: 7, text: "Confirm the lab route with PHY 131 before registration." }
  ],
  PHY134: [
    { likes: 18, text: "The second physics lab should stay aligned with PHY 132." },
    { likes: 12, text: "Scheduling is the main challenge for this one-credit lab." },
    { likes: 7, text: "Students recommend avoiding overlap with biology lab blocks." }
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
  POL101: [
    { likes: 30, text: "World politics can be a useful sample GLO and SBS option." },
    { likes: 21, text: "The reading load is steady but manageable with a STEM schedule." },
    { likes: 12, text: "Good option if Degree Works confirms the remaining SBC categories." }
  ],
  POL102: [
    { likes: 27, text: "The course is manageable, but there is a steady reading load." },
    { likes: 20, text: "Useful SBC option, though it does not support the Biochemistry sequence directly." },
    { likes: 10, text: "The long class block can feel tiring depending on the schedule." }
  ]
};

function makeCourse(data) {
  const noSampleEvaluation = data.catalogOnly || data.noTimetable;
  const stats = noSampleEvaluation ? {
    enrolled: 0,
    responses: 0,
    rating: data.noTimetable ? "No section" : "Catalog",
    grades: null
  } : courseEvaluationStats[data.id] || {
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
    reviews: noSampleEvaluation ? [] : courseReviewData[data.id] || [
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

function makeCatalogOption(data) {
  const { credits, creditsVerified = false, ...rest } = data;

  return makeCourse({
    credits: creditsVerified ? credits : null,
    creditsVerified: Boolean(creditsVerified),
    requirementType: "Catalog Option",
    status: "Catalog Option",
    workload: "Varies",
    readiness: { year: 2 },
    prerequisite: "Verify official prerequisite and approved-use category",
    reservedSeats: "Catalog option — section and credits not selected",
    days: "",
    start: "",
    end: "",
    location: "No sample section selected",
    catalog: "Catalog option — section and credits not selected. Verify official prerequisites, credits, offering term, and approved requirement use with advising.",
    planning: "This approved option is searchable for requirement planning, but it cannot be added to the Visual Timetable or counted toward credits until Kevin selects a real section and verifies the credit value.",
    impact: "May satisfy an approved choice requirement only if selected and advisor-confirmed. Unverified catalog-only credits are excluded from credit totals, and the same course must not be double-counted across requirements.",
    comments: "Catalog-only option. No sample instructor, meeting time, review, rating, seat, grade data, or credit value is invented.",
    consequences: ["Requires advisor confirmation before counting.", "Cannot be added to the timetable without a selected section.", "Credit value must be verified in the official catalog."],
    backups: ["Select a sample pathway course", "Choose another approved option", "Advisor-confirmed alternative"],
    catalogOnly: true,
    ...rest
  });
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
    planning: "BIO 204 is a Year 2 Fall foundational biology lab in Kevin's sample plan. BIO 458 is shown separately only if the sample audit still needs SPK.",
    impact: "Biology lab timing affects the second foundational biology lab choice, advanced biology readiness, and writing practice.",
    group: "High",
    consequences: ["Reserved seats may require advisor evidence.", "Lab reports need writing readiness even though Kevin completed WRT 102.", "BIO 205 or BIO 207 should follow as the second foundational biology lab."],
    backups: ["BIO 205 or BIO 207 later in the sequence", "Future BIO 204 section", "Advisor-confirmed biology lab plan"]
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
    consequences: ["Blocked until CHE 132 is complete.", "Delay can affect CHE 322 and BIO 361.", "High workload may conflict with AMS 161."],
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
    impact: "CHE 322 completion supports later BIO 361, BIO 362, and advanced biology planning.",
    exam: "High",
    consequences: ["Blocked until CHE 321 is complete.", "Closed section requires backup planning.", "Delay may affect BIO 361 timing."],
    backups: ["CHE 321", "Different CHE 322 section", "Future term planning"]
  }),
  makeCourse({
    id: "BIO361",
    code: "BIO 361",
    title: "Biochemistry I",
    instructor: "Dr. Miriam Stone",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 1, year: 3, requires: ["BIO202", "CHE322"] },
    prerequisite: "BIO 202 and organic chemistry sequence recommended; confirm official prerequisites",
    reservedSeats: "Biochemistry pathway priority sample seats",
    days: "Tue Thu",
    start: "9:30 AM",
    end: "10:50 AM",
    location: "Life Sciences Building 120",
    catalog: "Sample advanced biochemistry course connecting chemistry and molecular biology foundations.",
    planning: "BIO 361 is the first Biochemistry course in Kevin's sample Year 3 sequence.",
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
    sbc: "CER, SBS",
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
    sbc: "ARTS",
    status: "Available",
    workload: "Low",
    readiness: { math: 0, writing: 0, year: 1 },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    days: "Mon Wed",
    start: "5:00 PM",
    end: "6:20 PM",
    location: "Staller Center 011",
    catalog: "Sample arts course used as an SBC option.",
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
  }),
  makeCourse({
    id: "POL101",
    code: "POL 101",
    title: "World Politics",
    instructor: "Prof. Lena Morales",
    department: "POL",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "GLO, SBS",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 0, year: 2 },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    days: "Mon Wed",
    start: "12:30 PM",
    end: "1:50 PM",
    location: "Social Sciences 203",
    catalog: "Sample world politics course used as a GLO and SBS SBC option.",
    planning: "POL 101 is an optional remaining SBC example for Kevin's mock transfer-credit evaluation, not a Biochemistry major course.",
    impact: "This course may help with remaining SBC planning but does not unlock the science sequence.",
    consequences: ["Useful for GLO and SBS planning if Degree Works confirms the need.", "Adds reading workload.", "Does not replace any BIO, CHE, PHY, or AMS major requirement."],
    backups: ["MUS 105", "PHI 104", "POL 102", "PSY 103"]
  }),
  makeCourse({
    id: "BIO458",
    code: "BIO 458",
    title: "Biology SPK Co-registration",
    instructor: "Department confirmation required",
    department: "BIO",
    level: "400",
    credits: 0,
    requirementType: "Co-registration",
    sbc: "SPK",
    status: "Available",
    workload: "Low",
    readiness: { math: 0, writing: 2, year: 2 },
    prerequisite: "BIO 204 or another approved BIO course; only if SPK remains after transfer-credit evaluation",
    reservedSeats: "Zero-credit co-registration; verify whether SPK is still needed",
    days: "",
    start: "",
    end: "",
    location: "No separate meeting time selected",
    catalog: "Sample zero-credit SPK co-registration connected to BIO 204 or another approved BIO course. It is not a laboratory course.",
    planning: "BIO 458 appears in Kevin's sample plan only if SPK remains after transfer-credit evaluation.",
    impact: "BIO 458 should not add credits or a timetable block. It flags an SPK route to confirm with advising.",
    consequences: ["Zero credits should not increase planned credits.", "SPK need must be verified in Degree Works.", "It should not be described as a laboratory course."],
    backups: ["Advisor-confirmed SPK route", "Different approved SPK course", "Remove if SPK is already satisfied"],
    noTimetable: true
  }),
  makeCourse({
    id: "BIO205",
    code: "BIO 205",
    title: "Fundamentals of Scientific Inquiry in Biology II",
    instructor: "Dr. Clara Kim",
    department: "BIO",
    level: "200",
    credits: 2,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 2, requires: ["BIO204"] },
    prerequisite: "BIO 204 or advisor-confirmed biology laboratory sequence",
    reservedSeats: "Life science laboratory seats",
    days: "Tue",
    start: "4:00 PM",
    end: "6:50 PM",
    location: "Biology Lab 242",
    catalog: "Sample second foundational biology laboratory option after BIO 204.",
    planning: "BIO 205 is Kevin's sample selected second foundational biology lab after BIO 204.",
    impact: "BIO 205 completes the visible foundational biology lab pair in the sample pathway.",
    group: "High",
    consequences: ["Should follow BIO 204 or an advisor-confirmed equivalent.", "Lab report workload should be balanced with organic chemistry.", "BIO 207 is the listed alternative in this prototype."],
    backups: ["BIO 207", "Future BIO 205 section", "Advisor-confirmed biology lab alternative"]
  }),
  makeCourse({
    id: "BIO207",
    code: "BIO 207",
    title: "Fundamentals of Scientific Inquiry in Biology Alternative",
    instructor: "Dr. Anika Shah",
    department: "BIO",
    level: "200",
    credits: 2,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 2, requires: ["BIO204"] },
    prerequisite: "BIO 204 or advisor-confirmed biology laboratory sequence",
    reservedSeats: "Life science laboratory seats",
    days: "Fri",
    start: "1:00 PM",
    end: "3:50 PM",
    location: "Biology Lab 245",
    catalog: "Sample approved second foundational biology laboratory alternative.",
    planning: "BIO 207 is shown as the other approved option for Kevin's second foundational biology laboratory choice.",
    impact: "BIO 207 can fill the same lab choice group as BIO 205 if advising confirms the route.",
    group: "High",
    consequences: ["Only one second biology lab option should count.", "Advisor confirmation is recommended before switching from BIO 205.", "Lab workload should be coordinated with other science courses."],
    backups: ["BIO 205", "Future BIO 207 section", "Advisor-confirmed biology lab alternative"]
  }),
  makeCourse({
    id: "CHE327",
    code: "CHE 327",
    title: "Organic Chemistry Laboratory",
    instructor: "Dr. Priya Nair",
    department: "CHE",
    level: "300",
    credits: 2,
    requirementType: "Lab",
    sbc: "",
    status: "Reserved",
    workload: "High",
    readiness: { math: 1, writing: 1, year: 2, requires: ["CHE321"] },
    prerequisite: "CHE 321 or advisor-confirmed organic chemistry laboratory preparation",
    reservedSeats: "Organic chemistry laboratory seats; major priority may apply",
    days: "Fri",
    start: "9:00 AM",
    end: "11:50 AM",
    location: "Chemistry Lab 310",
    catalog: "Sample organic chemistry laboratory connected to Kevin's organic chemistry sequence.",
    planning: "CHE 327 is Kevin's sample selected organic chemistry laboratory route.",
    impact: "CHE 327 supports the organic chemistry lab requirement and should be balanced against BIO and PHY labs.",
    group: "High",
    consequences: ["Reserved lab seats may require evidence.", "High workload should be planned away from multiple heavy labs when possible.", "CHE 383 is shown as the approved alternative route."],
    backups: ["CHE 383", "Future CHE 327 section", "Advisor-confirmed organic laboratory alternative"]
  }),
  makeCourse({
    id: "PHY132",
    code: "PHY 132",
    title: "Classical Physics II",
    instructor: "Dr. Peter Walsh",
    department: "PHY",
    level: "100",
    credits: 3,
    requirementType: "Major Foundation",
    sbc: "SNW",
    status: "Available",
    workload: "High",
    readiness: { math: 3, writing: 0, year: 3, requires: ["PHY131"] },
    prerequisite: "PHY 131 and calculus readiness",
    reservedSeats: "Science sequence seats",
    days: "Tue Thu",
    start: "11:30 AM",
    end: "12:50 PM",
    location: "Physics Building 117",
    catalog: "Sample second physics lecture in Kevin's selected PHY 131/132 sequence.",
    planning: "PHY 132 follows PHY 131 in Kevin's sample plan and should be paired with PHY 134.",
    impact: "Physics II timing affects completion of the selected physics lecture and lab route.",
    exam: "High",
    consequences: ["Should follow PHY 131.", "PHY 134 should be planned with the lecture.", "High workload should be balanced with BIO 361 and BIO 365."],
    backups: ["PHY 131", "Future PHY 132 section", "Advisor-confirmed physics sequence"]
  }),
  makeCourse({
    id: "PHY133",
    code: "PHY 133",
    title: "Classical Physics Laboratory I",
    instructor: "Dr. Mina Cho",
    department: "PHY",
    level: "100",
    credits: 1,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 2, writing: 1, year: 2 },
    prerequisite: "PHY 131 corequisite or advisor-confirmed physics lab route",
    reservedSeats: "Physics laboratory seats",
    days: "Mon",
    start: "1:00 PM",
    end: "2:50 PM",
    location: "Physics Lab 210",
    catalog: "Sample first physics laboratory paired with PHY 131.",
    planning: "PHY 133 should be planned with PHY 131 in Kevin's sample pathway.",
    impact: "PHY 133 keeps the physics lab route visible instead of hiding it inside lecture planning.",
    group: "Medium",
    consequences: ["Should be coordinated with PHY 131.", "One-credit lab still adds report time.", "Avoid overlapping with biology labs."],
    backups: ["Different PHY 133 section", "Future physics lab section", "Advisor-confirmed physics lab route"]
  }),
  makeCourse({
    id: "PHY134",
    code: "PHY 134",
    title: "Classical Physics Laboratory II",
    instructor: "Dr. Mina Cho",
    department: "PHY",
    level: "100",
    credits: 1,
    requirementType: "Lab",
    sbc: "SNW",
    status: "Available",
    workload: "Medium",
    readiness: { math: 2, writing: 1, year: 3, requires: ["PHY133"] },
    prerequisite: "PHY 133 and PHY 132 corequisite or advisor-confirmed physics lab route",
    reservedSeats: "Physics laboratory seats",
    days: "Tue",
    start: "1:00 PM",
    end: "2:50 PM",
    location: "Physics Lab 210",
    catalog: "Sample second physics laboratory paired with PHY 132.",
    planning: "PHY 134 should be planned with PHY 132 in Kevin's sample pathway.",
    impact: "PHY 134 completes the visible selected physics lab route.",
    group: "Medium",
    consequences: ["Should be coordinated with PHY 132.", "One-credit lab still adds report time.", "Avoid overlapping with biology labs."],
    backups: ["Different PHY 134 section", "Future physics lab section", "Advisor-confirmed physics lab route"]
  }),
  makeCourse({
    id: "BIO362",
    code: "BIO 362",
    title: "Biochemistry II",
    instructor: "Dr. Miriam Stone",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 1, writing: 1, year: 3, requires: ["BIO361"] },
    prerequisite: "BIO 361 or advisor-confirmed biochemistry sequence",
    reservedSeats: "Biochemistry pathway priority sample seats",
    days: "Mon Wed",
    start: "11:00 AM",
    end: "12:20 PM",
    location: "Life Sciences Building 120",
    catalog: "Sample second biochemistry course following BIO 361.",
    planning: "BIO 362 follows BIO 361 in Kevin's sample Year 3 sequence.",
    impact: "BIO 362 depends on completing the first biochemistry course in sequence.",
    exam: "High",
    consequences: ["Should follow BIO 361.", "High workload should be coordinated with genetics or advanced electives.", "Advisor confirmation is recommended before moving it earlier."],
    backups: ["BIO 361", "Future BIO 362 section", "Advisor-confirmed biochemistry sequence"]
  }),
  makeCourse({
    id: "BIO365",
    code: "BIO 365",
    title: "Biochemistry Laboratory",
    instructor: "Dr. Imani Brooks",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Lab",
    sbc: "",
    status: "Reserved",
    workload: "High",
    readiness: { math: 1, writing: 2, year: 3, requires: ["BIO361"] },
    prerequisite: "BIO 361 or advisor-confirmed biochemistry laboratory readiness",
    reservedSeats: "Biochemistry laboratory seats; advisor evidence may be needed",
    days: "Wed",
    start: "9:00 AM",
    end: "11:50 AM",
    location: "Life Sciences Lab 330",
    catalog: "Sample required biochemistry laboratory course.",
    planning: "BIO 365 is Kevin's sample Biochemistry Laboratory route and is paired with BIO 459 for WRTD if needed.",
    impact: "BIO 365 completes a major laboratory milestone and should be protected from overload.",
    group: "High",
    consequences: ["Reserved seats may require advisor evidence.", "WRTD co-registration via BIO 459 should be confirmed if Kevin still needs it.", "High workload should be balanced against PHY 132 and BIO 361."],
    backups: ["Future BIO 365 section", "Advisor-confirmed advanced lab route", "BIO 459 if WRTD remains"]
  }),
  makeCourse({
    id: "BIO459",
    code: "BIO 459",
    title: "Biology WRTD Co-registration",
    instructor: "Department confirmation required",
    department: "BIO",
    level: "400",
    credits: 0,
    requirementType: "Co-registration",
    sbc: "WRTD",
    status: "Available",
    workload: "Low",
    readiness: { math: 0, writing: 2, year: 3 },
    prerequisite: "BIO 365 or another approved advanced writing course; only if WRTD remains",
    reservedSeats: "Zero-credit WRTD registration; verify whether WRTD is still needed",
    days: "",
    start: "",
    end: "",
    location: "No separate meeting time selected",
    catalog: "Sample zero-credit WRTD co-registration connected to BIO 365 or another approved advanced writing course. It is not a laboratory course.",
    planning: "BIO 459 is Kevin's sample selected WRTD co-registration route with BIO 365.",
    impact: "BIO 459 should not add credits or a timetable block. It flags the WRTD route to confirm with advising.",
    consequences: ["Zero credits should not increase planned credits.", "WRTD need must be verified in Degree Works.", "It should not be described as a credit-bearing laboratory course."],
    backups: ["Advisor-confirmed WRTD route", "Different approved advanced writing course", "Remove if WRTD is already satisfied"],
    noTimetable: true
  }),
  makeCourse({
    id: "BIO310",
    code: "BIO 310",
    title: "Cell Biology",
    instructor: "Dr. Elaine Mercer",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Advanced Major",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 0, writing: 1, year: 4, requires: ["BIO202"] },
    prerequisite: "BIO 202 or advisor-confirmed cell biology readiness",
    reservedSeats: "Life science major priority seats",
    days: "Tue Thu",
    start: "2:00 PM",
    end: "3:20 PM",
    location: "Life Sciences Building 100",
    catalog: "Sample advanced biology course for cell biology planning.",
    planning: "BIO 310 appears in Kevin's sample Year 4 Fall plan.",
    impact: "BIO 310 supports advanced biology credit planning and should be sequenced after the biology foundation.",
    exam: "High",
    consequences: ["Should follow BIO 202 preparation.", "High workload should be balanced with physical chemistry.", "Does not replace genetics or advanced elective choice requirements."],
    backups: ["Future BIO 310 section", "Advisor-confirmed advanced biology plan", "Lighter approved elective term"]
  }),
  makeCourse({
    id: "BIO320",
    code: "BIO 320",
    title: "General Genetics",
    instructor: "Dr. Nathan Brooks",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 0, writing: 1, year: 3, requires: ["BIO202"] },
    prerequisite: "BIO 202 or advisor-confirmed genetics readiness",
    reservedSeats: "Life science major priority seats",
    days: "Mon Wed",
    start: "2:00 PM",
    end: "3:20 PM",
    location: "Life Sciences Building 038",
    catalog: "Sample genetics course selected for Kevin's personalized genetics requirement.",
    planning: "BIO 320 is Kevin's sample selected Genetics Requirement course. BIO 321 and EBH 302 are shown as approved alternatives.",
    impact: "BIO 320 fills the selected genetics choice group and should not be double-counted as an advanced elective.",
    exam: "High",
    consequences: ["Only one genetics option should count.", "BIO 321 or EBH 302 may be alternatives if advising confirms.", "The same course cannot count for both genetics and an advanced elective."],
    backups: ["BIO 321", "EBH 302", "Advisor-confirmed genetics alternative"]
  }),
  makeCourse({
    id: "BIO314",
    code: "BIO 314",
    title: "Cancer Biology",
    instructor: "Dr. Hannah Ortiz",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    sbc: "",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 3, requires: ["BIO202"] },
    prerequisite: "BIO 202 or advisor-confirmed advanced biology readiness",
    reservedSeats: "Life science major priority seats",
    days: "Tue Thu",
    start: "5:00 PM",
    end: "6:20 PM",
    location: "Life Sciences Building 038",
    catalog: "Sample section for Kevin's Approved Advanced Elective Choice 1.",
    planning: "BIO 314 is Kevin's sample personalized selection for Approved Advanced Elective Choice 1. It is not an official university recommendation.",
    impact: "BIO 314 contributes to the approved advanced elective requirement and upper-division credit preview.",
    consequences: ["Counts only once in the sample pathway.", "Should be advisor-confirmed against the approved elective list.", "Must be paired with another approved elective totaling at least five credits."],
    backups: ["BIO 315", "BIO 321", "EBH 302", "View all approved options"]
  }),
  makeCourse({
    id: "BIO315",
    code: "BIO 315",
    title: "Microbiology",
    instructor: "Dr. Anika Shah",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    sbc: "",
    status: "Available",
    workload: "Medium",
    readiness: { math: 0, writing: 1, year: 4, requires: ["BIO202"] },
    prerequisite: "BIO 202 or advisor-confirmed advanced biology readiness",
    reservedSeats: "Life science major priority seats",
    days: "Mon Wed",
    start: "5:00 PM",
    end: "6:20 PM",
    location: "Life Sciences Building 038",
    catalog: "Sample section for Kevin's Approved Advanced Elective Choice 2.",
    planning: "BIO 315 is Kevin's sample personalized selection for Approved Advanced Elective Choice 2. It is not an official university recommendation.",
    impact: "BIO 315 contributes to the approved advanced elective requirement and upper-division credit preview.",
    consequences: ["Counts only once in the sample pathway.", "Should be advisor-confirmed against the approved elective list.", "Must be paired with another approved elective totaling at least five credits."],
    backups: ["BIO 314", "BIO 321", "EBH 302", "View all approved options"]
  }),
  makeCourse({
    id: "CHE312",
    code: "CHE 312",
    title: "Physical Chemistry",
    instructor: "Prof. Victor Chen",
    department: "CHE",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    sbc: "",
    status: "Available",
    workload: "High",
    readiness: { math: 3, writing: 0, year: 4, requires: ["CHE322"] },
    prerequisite: "CHE 322 and calculus preparation; confirm official prerequisites",
    reservedSeats: "Chemistry major priority sample seats",
    days: "Mon Wed",
    start: "12:30 PM",
    end: "1:50 PM",
    location: "Chemistry Building 412",
    catalog: "Sample physical chemistry route for Kevin's Biochemistry plan.",
    planning: "CHE 312 is Kevin's sample selected physical chemistry option. CHE 301 is shown as an approved alternative to confirm.",
    impact: "CHE 312 supports physical chemistry planning and upper-division credit preview.",
    exam: "High",
    consequences: ["High quantitative workload should be balanced carefully.", "CHE 301 may be an approved alternative but needs confirmation.", "Should follow the organic chemistry sequence and calculus preparation."],
    backups: ["CHE 301", "Future CHE 312 section", "Advisor-confirmed physical chemistry route"]
  }),
  makeCatalogOption({
    id: "CHE383",
    code: "CHE 383",
    title: "Organic Chemistry Laboratory Alternative",
    department: "CHE",
    level: "300",
    credits: 2,
    requirementType: "Lab",
    prerequisite: "Verify official prerequisites and approved organic laboratory use",
    planning: "CHE 383 is a catalog-only approved alternative for the organic chemistry lab choice until a sample section is selected.",
    impact: "May satisfy the organic laboratory choice if selected and advisor-confirmed."
  }),
  makeCatalogOption({
    id: "CHE301",
    code: "CHE 301",
    title: "Physical Chemistry Alternative",
    department: "CHE",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    prerequisite: "Verify official prerequisites and approved physical chemistry use",
    planning: "CHE 301 is shown as a catalog-only alternative to CHE 312 for Kevin's physical chemistry choice.",
    impact: "May satisfy the physical chemistry choice if selected and advisor-confirmed."
  }),
  makeCatalogOption({
    id: "BIO321",
    code: "BIO 321",
    title: "Ecological Genetics",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    planning: "BIO 321 is an approved genetics alternative and may also appear in the approved advanced elective list, but it cannot count twice.",
    impact: "May satisfy either the genetics choice or an approved advanced elective choice if selected and advisor-confirmed."
  }),
  makeCatalogOption({
    id: "EBH302",
    code: "EBH 302",
    title: "Human Genetics",
    department: "EBH",
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    planning: "EBH 302 is an approved genetics alternative and may also appear in the approved advanced elective list, but it cannot count twice.",
    impact: "May satisfy either the genetics choice or an approved advanced elective choice if selected and advisor-confirmed."
  }),
  ...[
    ["AMS333", "AMS 333", "AMS", "Approved Advanced Elective Option"],
    ["BIO312", "BIO 312", "BIO", "Approved Advanced Elective Option"],
    ["BIO316", "BIO 316", "BIO", "Approved Advanced Elective Option"],
    ["BIO317", "BIO 317", "BIO", "Approved Advanced Elective Option"],
    ["BIO325", "BIO 325", "BIO", "Approved Advanced Elective Option"],
    ["BIO327", "BIO 327", "BIO", "Approved Advanced Elective Option"],
    ["BIO328", "BIO 328", "BIO", "Approved Advanced Elective Option"],
    ["BIO332", "BIO 332", "BIO", "Approved Advanced Elective Option"],
    ["BIO334", "BIO 334", "BIO", "Approved Advanced Elective Option"],
    ["BIO335", "BIO 335", "BIO", "Approved Advanced Elective Option"],
    ["BIO337", "BIO 337", "BIO", "Approved Advanced Elective Option"],
    ["BIO338", "BIO 338", "BIO", "Approved Advanced Elective Option"],
    ["BIO339", "BIO 339", "BIO", "Approved Advanced Elective Option"],
    ["BIO350", "BIO 350", "BIO", "Approved Advanced Elective Option"],
    ["BIO354", "BIO 354", "BIO", "Approved Advanced Elective Option"],
    ["BIO358", "BIO 358", "BIO", "Approved Advanced Elective Option"],
    ["BIO364", "BIO 364", "BIO", "Approved Advanced Elective Option"],
    ["BIO367", "BIO 367", "BIO", "Approved Advanced Elective Option"],
    ["BME304", "BME 304", "BME", "Approved Advanced Elective Option"],
    ["CHE346", "CHE 346", "CHE", "Approved Advanced Elective Option"],
    ["EBH380", "EBH 380", "EBH", "Approved Advanced Elective Option"]
  ].map(([id, code, department, title]) => makeCatalogOption({
    id,
    code,
    title,
    department,
    level: "300",
    credits: 3,
    requirementType: "Choice Requirement",
    planning: "Catalog-only approved advanced elective option. Kevin has not selected a sample section for this course.",
    impact: "May count toward an approved advanced elective choice only if Kevin selects it and advising confirms it."
  }))
];

const advancedElectiveOptionIds = [
  "AMS333", "BIO312", "BIO314", "BIO315", "BIO316", "BIO317", "BIO321", "BIO325", "BIO327", "BIO328",
  "BIO332", "BIO334", "BIO335", "BIO337", "BIO338", "BIO339", "BIO350", "BIO354", "BIO358", "BIO364",
  "BIO367", "BME304", "CHE346", "EBH302", "EBH380"
];

const choiceGroups = {
  "genetics-choice": {
    title: "Genetics Requirement",
    label: "Choose one genetics course",
    options: ["BIO320", "BIO321", "EBH302"],
    description: "BIO 320 is Kevin's sample selection. BIO 321 and EBH 302 are approved alternatives, but one course cannot count for both genetics and an advanced elective.",
    expandableLabel: "Other approved options"
  },
  "second-biology-lab-choice": {
    title: "Second Foundational Biology Laboratory",
    label: "Choose BIO 205 or BIO 207",
    options: ["BIO205", "BIO207"],
    description: "Kevin's sample route uses BIO 205 after BIO 204. BIO 207 remains the other approved option to confirm.",
    expandableLabel: "Other approved options"
  },
  "organic-lab-choice": {
    title: "Organic Chemistry Laboratory",
    label: "Choose CHE 327 or CHE 383",
    options: ["CHE327", "CHE383"],
    description: "Kevin's sample route uses CHE 327. CHE 383 is catalog-only here until an official section is selected.",
    expandableLabel: "Other approved options"
  },
  "physical-chemistry-choice": {
    title: "Physical Chemistry Requirement",
    label: "Choose CHE 312 or CHE 301",
    options: ["CHE312", "CHE301"],
    description: "Kevin's sample route uses CHE 312. CHE 301 is shown as an approved alternative to confirm.",
    expandableLabel: "Other approved options"
  },
  "advanced-elective-choice-1": {
    title: "Approved Advanced Elective Choice 1",
    label: "Choose one approved advanced elective",
    options: advancedElectiveOptionIds,
    description: "Kevin's sample personalized selection is BIO 314 Cancer Biology. This is not an official university recommendation.",
    expandableLabel: "View all approved options"
  },
  "advanced-elective-choice-2": {
    title: "Approved Advanced Elective Choice 2",
    label: "Choose one approved advanced elective",
    options: advancedElectiveOptionIds,
    description: "Kevin's sample personalized selection is BIO 315 Microbiology. At least two approved courses totaling at least five credits are required in this sample preview.",
    expandableLabel: "View all approved options"
  }
};

const biochemPathway = [
  {
    year: "Year 1",
    focus: "Completed chemistry, biology, writing, and math foundation",
    semesters: [
      {
        name: "Completed Fall",
        items: [
          { type: "course", id: "WRT102" },
          { type: "course", id: "MAT123" },
          { type: "course", id: "CHE131" },
          { type: "course", id: "CHE133" },
          { type: "course", id: "BIO201" }
        ],
        note: "Kevin completed WRT 102, MAT 123, CHE 131, CHE 133, and BIO 201 in the sample Year 1 foundation."
      },
      {
        name: "Completed Spring",
        items: [
          { type: "course", id: "CHE132" },
          { type: "course", id: "CHE134" },
          { type: "course", id: "BIO202" },
          { type: "course", id: "AMS151" }
        ],
        note: "Kevin completed CHE 132, CHE 134, BIO 202, and AMS 151 before planning Year 2 Fall."
      }
    ]
  },
  {
    year: "Year 2",
    focus: "Calculus continuation, biology labs, physics start, and organic chemistry",
    semesters: [
      {
        name: "Fall sample plan",
        items: [
          { type: "course", id: "AMS161" },
          { type: "course", id: "BIO203" },
          { type: "bundle", title: "BIO 204 plus SPK check", ids: ["BIO204", "BIO458"], note: "BIO 458 is zero-credit and appears only if SPK remains after transfer-credit evaluation." },
          { type: "course", id: "CHE321" }
        ],
        note: "AMS 161, BIO 203, BIO 204, BIO 458 if needed, and CHE 321 are Kevin's Year 2 Fall planning focus."
      },
      {
        name: "Spring sample plan",
        items: [
          { type: "course", id: "CHE322" },
          { type: "choice", groupId: "organic-lab-choice" },
          { type: "bundle", title: "Physics I lecture plus lab", ids: ["PHY131", "PHY133"], note: "PHY 133 should stay aligned with PHY 131." },
          { type: "choice", groupId: "second-biology-lab-choice" },
          { type: "note", title: "Optional remaining SBC", note: "Use Kevin's Sample Remaining SBC Plan below if Degree Works confirms these categories remain." }
        ],
        note: "This sample term makes the second biology lab, organic lab, and physics lab visible instead of hiding them inside lecture descriptions."
      }
    ]
  },
  {
    year: "Year 3",
    focus: "BIO 361/BIO 362 sequence, biochemistry lab, physics completion, and genetics",
    semesters: [
      {
        name: "Fall sample plan",
        items: [
          { type: "course", id: "BIO361" },
          { type: "bundle", title: "Biochemistry laboratory plus WRTD route", ids: ["BIO365", "BIO459"], note: "BIO 459 is zero-credit and appears only if WRTD remains." },
          { type: "bundle", title: "Physics II lecture plus lab", ids: ["PHY132", "PHY134"], note: "PHY 134 should stay aligned with PHY 132." }
        ],
        note: "BIO 361 should precede BIO 362, and BIO 365 plus BIO 459 should be confirmed for lab and WRTD planning."
      },
      {
        name: "Spring sample plan",
        items: [
          { type: "course", id: "BIO362" },
          { type: "choice", groupId: "genetics-choice" },
          { type: "choice", groupId: "advanced-elective-choice-1" }
        ],
        note: "Genetics and advanced elective choices should be advisor-confirmed and must not double-count the same course."
      }
    ]
  },
  {
    year: "Year 4",
    focus: "Cell biology, physical chemistry, advanced elective, and final audit",
    semesters: [
      {
        name: "Fall sample plan",
        items: [
          { type: "course", id: "BIO310" },
          { type: "choice", groupId: "physical-chemistry-choice" },
          { type: "choice", groupId: "advanced-elective-choice-2" }
        ],
        note: "BIO 310, physical chemistry, and a second approved advanced elective are sample Year 4 Fall planning items."
      },
      {
        name: "Spring advisor check",
        items: [
          { type: "note", title: "Remaining SBC or upper-division credits", note: "Confirm remaining SBC, upper-division credits, and any remaining approved elective in Degree Works." },
          { type: "note", title: "Graduation Audit / Advisor Check", note: "Use this prototype preview as evidence for an official advisor conversation, not as the final audit." }
        ],
        note: "Do not leave remaining SBC, upper-division, elective, or graduation audit checks until the final month."
      }
    ]
  }
];

const remainingSbcPlan = [
  { category: "ARTS", ids: ["MUS105"], note: "MUS 105" },
  { category: "GLO and SBS", ids: ["POL101"], note: "POL 101" },
  { category: "HUM and CER", ids: ["PHI104"], note: "PHI 104" },
  { category: "USA and SBS", ids: ["POL102"], note: "POL 102" },
  { category: "Additional CER and SBS option", ids: ["PSY103"], note: "PSY 103" }
];

const sbcCategories = [
  { code: "WRT", title: "Writing", examples: "WRT 102" },
  { code: "QPS", title: "Quantitative Problem Solving", examples: "MAT 123, AMS 151, AMS 161" },
  { code: "SNW", title: "Natural Sciences", examples: "BIO 201, CHE 131, CHE 132" },
  { code: "ARTS", title: "Arts", examples: "MUS 105" },
  { code: "GLO", title: "Global Issues", examples: "POL 101" },
  { code: "SBS", title: "Social and Behavioral Sciences", examples: "POL 101, POL 102, PSY 103" },
  { code: "HUM", title: "Humanities", examples: "PHI 104" },
  { code: "CER", title: "Ethics", examples: "PHI 104, PSY 103" },
  { code: "USA", title: "United States", examples: "POL 102" }
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

function getChoiceSelection(groupId) {
  const group = choiceGroups[groupId];
  return selectedChoices[groupId] || defaultChoiceSelections[groupId] || group?.options?.[0] || null;
}

function getChoiceGroupsForCourse(courseId) {
  return Object.entries(choiceGroups)
    .filter(([, group]) => group.options.includes(courseId))
    .map(([groupId]) => groupId);
}

function getSelectedChoiceGroupForCourse(courseId, exceptGroupId = null) {
  return Object.entries(choiceGroups).find(([groupId]) =>
    groupId !== exceptGroupId && getChoiceSelection(groupId) === courseId
  )?.[0] || null;
}

function isSelectedChoice(courseId) {
  return Object.keys(choiceGroups).some(groupId => getChoiceSelection(groupId) === courseId);
}

function setChoiceSelection(groupId, courseId) {
  const group = choiceGroups[groupId];
  if (!group || !group.options.includes(courseId)) return;

  const usedBy = getSelectedChoiceGroupForCourse(courseId, groupId);
  if (usedBy) {
    timetableConflictNotice = {
      type: "choice",
      attemptedId: courseId,
      existingGroupId: usedBy
    };
    updateVisibleParts();
    return;
  }

  selectedChoices[groupId] = courseId;
  selectedCourseId = courseId;
  selectedDetailTab = "pathway";
  timetableConflictNotice = null;
  updateVisibleParts();

  if (qs("#degreeModal") && !qs("#degreeModal").classList.contains("hidden")) {
    renderDegreeAudit();
  }
}

function formatCredits(value) {
  return `${value} ${value === 1 ? "credit" : "credits"}`;
}

function getCreditsLabel(course) {
  if (!course || course.credits === null || course.credits === undefined) {
    return lang("Credits: Verify in official catalog", "학점: 공식 카탈로그에서 확인");
  }

  return formatCredits(Number(course?.credits || 0));
}

function canAddToTimetable(course) {
  return Boolean(course && !course.catalogOnly && !course.noTimetable && course.days && course.start && course.end);
}

function getMeetingText(course) {
  if (!course) return "";
  if (course.catalogOnly) return lang("Catalog option — section and credits not selected", "카탈로그 옵션 — 분반 및 학점 미선택");
  if (course.noTimetable) return lang("No separate timetable block", "별도 시간표 블록 없음");
  return `${course.days} · ${course.start} to ${course.end} · ${course.location}`;
}

function getPathwayItemCourseIds(item) {
  if (!item) return [];
  if (item.type === "course") return [item.id];
  if (item.type === "bundle") return safeList(item.ids);
  if (item.type === "choice") return [getChoiceSelection(item.groupId)].filter(Boolean);
  return [];
}

function getSelectedPathwayCourseIds() {
  const ids = [];
  biochemPathway.forEach(year => {
    year.semesters.forEach(semester => {
      semester.items.forEach(item => {
        getPathwayItemCourseIds(item).forEach(id => {
          if (!ids.includes(id)) ids.push(id);
        });
      });
    });
  });
  return ids;
}

function isUpperDivision(course) {
  if (!course) return false;
  const level = Number(course.level);
  if (level >= 300) return true;
  const match = String(course.code || "").match(/\b[A-Z]{2,4}\s*([0-9]{3})\b/);
  return match ? Number(match[1]) >= 300 : false;
}

function shouldCountCredits(course, context = "pathway") {
  if (!course || typeof course.credits !== "number" || course.credits <= 0) return false;
  if (context === "planned") return !course.catalogOnly && !course.noTimetable;
  if (course.catalogOnly && !isSelectedChoice(course.id)) return false;
  return true;
}

function sumCredits(ids, context = "pathway", upperOnly = false) {
  const seen = new Set();
  return ids.reduce((sum, id) => {
    if (seen.has(id)) return sum;
    seen.add(id);
    const course = getCourse(id);
    if (!shouldCountCredits(course, context)) return sum;
    if (upperOnly && !isUpperDivision(course)) return sum;
    return sum + Number(course.credits || 0);
  }, 0);
}

function getUpperDivisionTracker() {
  const completedIds = student.completed;
  const plannedIds = plannedCourses;
  const plannedSet = new Set(plannedIds);
  const completedSet = new Set(completedIds);
  const futureIds = getSelectedPathwayCourseIds().filter(id => !completedSet.has(id) && !plannedSet.has(id));
  const completed = sumCredits(completedIds, "pathway", true);
  const planned = sumCredits(plannedIds, "planned", true);
  const projectedFuture = sumCredits(futureIds, "pathway", true);
  const total = completed + planned + projectedFuture;

  return {
    completed,
    planned,
    projectedFuture,
    total,
    remaining: Math.max(0, 39 - total)
  };
}

function getAdvancedElectiveSummary() {
  const ids = ["advanced-elective-choice-1", "advanced-elective-choice-2"].map(getChoiceSelection);
  const credits = sumCredits(ids, "pathway", false);
  return { ids, credits, complete: ids.filter(Boolean).length >= 2 && credits >= 5 };
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

function renderChoiceControls(course, compact = false) {
  const groups = getChoiceGroupsForCourse(course.id);
  if (!groups.length) return "";

  return `
    <div class="choice-actions ${compact ? "compact" : ""}">
      ${!compact ? `<strong>${lang("Choice requirement use", "선택 요건 적용")}</strong>` : ""}
      ${groups.map(groupId => {
        const group = choiceGroups[groupId];
        const selected = getChoiceSelection(groupId) === course.id;
        const usedBy = getSelectedChoiceGroupForCourse(course.id, groupId);
        const disabled = Boolean(usedBy);
        const label = selected
          ? lang("Selected for Kevin", "Kevin 선택됨")
          : disabled
            ? `${lang("Used by", "이미 사용 중")}: ${choiceGroups[usedBy].title}`
            : `${lang("Select for", "선택")}: ${group.title}`;

        return `<button class="${selected ? "primary-button" : "secondary-button"}" data-set-choice="${course.id}" data-choice-group="${groupId}" type="button" ${disabled ? "disabled" : ""}>${label}</button>`;
      }).join("")}
      ${!compact ? `<p class="muted">${lang("Advisor confirmation recommended. The same course cannot count in two choice groups at once.", "어드바이저 확인을 권장합니다. 같은 과목은 두 선택 요건에 동시에 계산될 수 없습니다.")}</p>` : ""}
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
	      getChoiceGroupsForCourse(course.id).map(groupId => choiceGroups[groupId].title).join(" "),
	      safeList(course.consequences).join(" "),
	      safeList(course.backups).join(" ")
	    ].join(" ").toLowerCase();

	    return (!query || searchable.includes(query)) &&
	      (dept === "All" || course.department === dept) &&
	      (req === "All" || course.requirementType === req || (req === "Catalog Option" && course.catalogOnly) || (course.sbc || "").includes(req)) &&
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
      <p>${lang("Kevin Ruiz has completed the Year 1 foundation and is now planning Year 2 Fall enrollment.", "Kevin Ruiz는 Year 1 foundation 과목들을 완료했고, 이제 2학년 Fall 수강신청을 계획하고 있습니다.")}</p>
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

	    <section class="card timetable-card" style="margin-top:20px">
	      <h3>${lang("Visual Timetable", "시각적 시간표")}</h3>
	      <p class="muted">${lang("Added Fall courses appear here across their full meeting duration. Drop buttons remove them from the planned course list.", "추가된 Fall 과목은 전체 수업 시간 길이로 표시됩니다. Drop 버튼을 누르면 planned course list에서 삭제됩니다.")}</p>
	      <div id="visualTimetable"></div>
	    </section>

	    <section class="card" style="margin-top:20px">
	      <h3>${lang("SBC Explorer inside Course Search", "Course Search 안의 SBC 탐색")}</h3>
	      <p class="muted">${lang("SBC and catalog information stays inside the search flow instead of becoming a separate page.", "SBC와 catalog 정보는 별도 페이지가 아니라 Course Search 흐름 안에 유지됩니다.")}</p>
	      <div class="sbc-grid">
	        ${sbcCategories.map(item => `<div class="sbc-card"><strong>${item.code}</strong><p>${item.title}</p><small>${item.examples}</small></div>`).join("")}
	      </div>
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
	    const addable = canAddToTimetable(course);
	    const meetingText = getMeetingText(course);

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
	              ${course.catalogOnly ? `<span class="badge catalogoption">Catalog only</span>` : ""}
	              ${course.noTimetable ? `<span class="badge catalogoption">No timetable block</span>` : ""}
	            </div>
	          </div>
	          <p class="course-meta">${course.requirementType} · ${getCreditsLabel(course)} · ${course.sbc || lang("Major only", "전공 전용")} · ${course.workload} workload</p>
	          <div class="chip-wrap course-chip-row">
	            <span>${course.department}</span>
	            <span>${course.status}</span>
	            <span>${meetingText}</span>
	          </div>
	        </div>

	        ${selected ? `
	          <div class="quick-panel">
	            <h5>${lang("Choose an action for", "선택 과목 기능")} ${course.code}</h5>
	            ${renderConflictNotice(course)}
	            ${cautionAdd ? renderAddCaution(course, state, added) : ""}
	            ${renderChoiceControls(course, true)}
	            <div class="quick-actions">
	              ${completed
	                ? `<button class="secondary-button" disabled type="button">✓ ${lang("Completed previous year", "이전 학기 완료")}</button>`
	                : added
	                  ? `<button class="secondary-button" data-drop-course="${course.id}" type="button">✓ ${cautionAdd ? lang("Added with Caution, Drop", "주의 추가됨, 삭제") : lang("Added, Drop", "추가됨, 삭제")}</button>`
	                  : `<button class="primary-button" data-add-course="${course.id}" type="button" ${blocked || !addable ? "disabled" : ""}>${blocked ? lang("Locked", "제한됨") : addable ? addLabel : lang("No timetable section", "시간표 분반 없음")}</button>`
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
  const addable = canAddToTimetable(course);

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
	          ${course.catalogOnly ? `<span class="badge catalogoption">Catalog only</span>` : ""}
	          ${course.noTimetable ? `<span class="badge catalogoption">No timetable block</span>` : ""}
	          ${added ? `<span class="badge added">✓ ${lang("Added to timetable", "시간표 추가됨")}</span>` : ""}
	        </div>
	      </div>
	      <div class="detail-actions">
	        ${completed
	          ? `<button class="secondary-button" disabled type="button">✓ ${lang("Completed", "완료")}</button>`
	          : added
	            ? `<button class="secondary-button" data-drop-course="${course.id}" type="button">${lang("Drop", "삭제")}</button>`
	            : `<button class="primary-button" data-add-course="${course.id}" type="button" ${blocked || !addable ? "disabled" : ""}>${blocked ? lang("Locked by Requirement", "요건 때문에 제한") : addable ? addLabel : lang("No timetable section", "시간표 분반 없음")}</button>`
	        }
	      </div>
	    </div>

	    ${renderConflictNotice(course)}
	    ${cautionAdd ? renderAddCaution(course, state, added) : ""}
	    ${renderChoiceControls(course)}

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
        <div class="metric"><strong>${getCreditsLabel(course)}</strong><span>Credits</span></div>
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
	        <div class="catalog-item"><span>Credits</span><strong>${getCreditsLabel(course)}</strong></div>
        <div class="catalog-item"><span>SBC</span><strong>${course.sbc || lang("No SBC listed in sample", "예시 SBC 없음")}</strong></div>
        <div class="catalog-item"><span>Requirement</span><strong>${course.requirementType}</strong></div>
        <div class="catalog-item"><span>Reserved seats</span><strong>${course.reservedSeats}</strong></div>
	        <div class="catalog-item"><span>Meeting</span><strong>${getMeetingText(course)}</strong></div>
      </div>
    </section>
  `;
}

function renderEvaluationTab(course) {
  const grades = course.grades;
  if (!grades) {
    return `
      <section class="detail-section">
        <h4>${lang("Course Evaluation DNA", "강의 평가 DNA")}</h4>
        <div class="empty-state">
          <strong>${course.noTimetable ? lang("No sample meeting section", "샘플 수업 시간 없음") : lang("Catalog option only", "카탈로그 옵션 전용")}</strong>
          <p>${lang("No sample instructor, availability, reviews, ratings, meeting time, or grade distribution is invented for this planning option.", "이 계획 옵션에는 샘플 교수, 수강 가능 여부, 리뷰, 평점, 수업 시간, 성적 분포를 임의로 만들지 않습니다.")}</p>
        </div>
      </section>
    `;
  }

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
  const choiceContext = getChoiceGroupsForCourse(course.id)
    .map(groupId => `${choiceGroups[groupId].title}: ${getChoiceSelection(groupId) === course.id ? "Selected for Kevin" : "Other approved option"}`)
    .join(" · ") || "No choose-one group";
  const alternatives = getAdvisorAlternatives(course);

  return `
    <section class="detail-section">
      <h4>${lang("Advisor Ready Evidence", "어드바이저 제출용 근거")}</h4>
      <div class="report-box">
        <p><strong>${lang("Selected course", "선택 과목")}:</strong> ${course.code} ${course.title}</p>
        <p><strong>${lang("Detected rule", "감지된 규칙")}:</strong> ${state.reasons.join(" · ")}</p>
        <p><strong>${lang("Requirement context", "요건 맥락")}:</strong> ${choiceContext}</p>
        <p><strong>${lang("Degree path risk", "졸업 경로 위험")}:</strong> ${course.impact}</p>
        <p><strong>${lang("Possible alternatives", "가능한 대안")}:</strong> ${alternatives.join(", ")}</p>
        ${course.noTimetable ? `<p><strong>${lang("Co-registration note", "공동 등록 메모")}:</strong> ${lang("Zero-credit co-registration. It should not increase planned credits or be described as a lab.", "0학점 공동 등록입니다. 계획 학점이 늘어나거나 실험 과목으로 설명되면 안 됩니다.")}</p>` : ""}
      </div>
      <div class="action-row">
        <button class="primary-button" data-go="advisor" type="button">${lang("Open Advisor Evidence Pack", "Advisor Evidence Pack 열기")}</button>
      </div>
    </section>
  `;
}

function getAdvisorAlternatives(course) {
  const groups = getChoiceGroupsForCourse(course.id);
  if (!groups.length) return safeList(course.backups);

  const alternatives = [];
  groups.forEach(groupId => {
    choiceGroups[groupId].options.forEach(id => {
      if (id !== course.id) {
        const option = getCourse(id);
        if (option) alternatives.push(`${option.code} (${choiceGroups[groupId].title})`);
      }
    });
  });
  return alternatives.length ? alternatives : safeList(course.backups);
}

function addCourse(id) {
  const course = getCourse(id);
  if (!course) return;
  if (checkReadiness(course).level === "Blocked") return;

  if (!canAddToTimetable(course)) {
    selectedCourseId = id;
    timetableConflictNotice = {
      type: "not-addable",
      attemptedId: id
    };
    updateVisibleParts();
    return;
  }

  const conflict = findTimetableConflict(course);
  if (conflict) {
    selectedCourseId = id;
    timetableConflictNotice = conflict;
    updateVisibleParts();
    return;
  }

  if (!plannedCourses.includes(id)) {
    plannedCourses.push(id);
  }

  if (timetableConflictNotice?.attemptedId === id) {
    timetableConflictNotice = null;
  }

  updateVisibleParts();
}

function dropCourse(id) {
  plannedCourses = plannedCourses.filter(courseId => courseId !== id);

  if (
    timetableConflictNotice?.attemptedId === id ||
    timetableConflictNotice?.existingId === id
  ) {
    timetableConflictNotice = null;
  }

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

  if (qs("#degreeModal") && !qs("#degreeModal").classList.contains("hidden")) {
    renderDegreeAudit();
  }
}

function parseTimeToMinutes(time) {
  const match = String(time).match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;

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

function formatMinutesAsTime(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
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
  if ([firstStart, firstEnd, secondStart, secondEnd].some(value => value === null)) return false;

  return firstStart < secondEnd && secondStart < firstEnd;
}

function getSharedMeetingDays(first, second) {
  return ["Mon", "Tue", "Wed", "Thu", "Fri"].filter(day => courseMeetsOnDay(first, day) && courseMeetsOnDay(second, day));
}

function findTimetableConflict(course) {
  if (!canAddToTimetable(course) || plannedCourses.includes(course.id)) return null;

  const firstStart = parseTimeToMinutes(course.start);
  const firstEnd = parseTimeToMinutes(course.end);
  if (firstStart === null || firstEnd === null || firstEnd <= firstStart) return null;

  for (const existingId of plannedCourses) {
    const existing = getCourse(existingId);
    if (!canAddToTimetable(existing)) continue;

    const secondStart = parseTimeToMinutes(existing.start);
    const secondEnd = parseTimeToMinutes(existing.end);
    if (secondStart === null || secondEnd === null || secondEnd <= secondStart) continue;

    for (const day of getSharedMeetingDays(course, existing)) {
      if (firstStart < secondEnd && secondStart < firstEnd) {
        return {
          type: "time",
          attemptedId: course.id,
          existingId: existing.id,
          day,
          overlapStart: Math.max(firstStart, secondStart),
          overlapEnd: Math.min(firstEnd, secondEnd)
        };
      }
    }
  }

  return null;
}

function renderConflictNotice(contextCourse = null) {
  if (!timetableConflictNotice) return "";

  if (contextCourse && timetableConflictNotice.attemptedId !== contextCourse.id) {
    return "";
  }

  if (timetableConflictNotice.type === "choice") {
    const attempted = getCourse(timetableConflictNotice.attemptedId);
    const group = choiceGroups[timetableConflictNotice.existingGroupId];
    if (!attempted || !group) return "";

    return `
      <div class="conflict-notice" role="alert">
        <strong>Choice conflict / 선택 요건 충돌</strong>
        <p>${attempted.code} ${lang("is already selected in", "은 이미 다음 선택 요건에 선택되어 있습니다")}: ${group.title}.</p>
        <p>${lang("Choose a different option so one course is not double-counted.", "한 과목이 두 번 계산되지 않도록 다른 옵션을 선택하세요.")}</p>
      </div>
    `;
  }

  if (timetableConflictNotice.type === "not-addable") {
    const attempted = getCourse(timetableConflictNotice.attemptedId);
    if (!attempted) return "";

    return `
      <div class="conflict-notice warning" role="alert">
        <strong>Not addable to timetable / 시간표에 추가할 수 없음</strong>
        <p>${attempted.code} ${lang("is searchable for planning, but no sample meeting section is selected for the Visual Timetable.", "은 계획 검색용으로 표시되지만 Visual Timetable에 넣을 샘플 수업 시간이 선택되지 않았습니다.")}</p>
        <p>${lang("Use the pathway choice controls or confirm an official section with an advisor.", "Pathway 선택 기능을 사용하거나 어드바이저와 공식 분반을 확인하세요.")}</p>
      </div>
    `;
  }

  const attempted = getCourse(timetableConflictNotice.attemptedId);
  const existing = getCourse(timetableConflictNotice.existingId);
  if (!attempted || !existing) return "";

  const overlap = `${formatMinutesAsTime(timetableConflictNotice.overlapStart)}-${formatMinutesAsTime(timetableConflictNotice.overlapEnd)}`;

  return `
    <div class="conflict-notice" role="alert">
      <strong>Timetable conflict / 시간표 충돌</strong>
      <p>Cannot add ${attempted.code}: it overlaps with ${existing.code} on ${timetableConflictNotice.day}, ${overlap}.</p>
      <p>${attempted.code}은(는) ${timetableConflictNotice.day} ${overlap}에 ${existing.code}와 시간이 겹쳐 추가할 수 없습니다.</p>
      <p>The existing course is never removed automatically. Use the button below only if you choose to drop the existing conflicting course.</p>
      <p>기존 과목은 자동으로 삭제되지 않습니다. 필요하면 아래 버튼으로 기존 충돌 과목을 직접 삭제하세요.</p>
      <button class="secondary-button" data-drop-course="${existing.id}" type="button">${lang("Drop existing conflict", "기존 충돌 과목 삭제")}: ${existing.code}</button>
    </div>
  `;
}

function renderTimetable() {
  const target = qs("#visualTimetable");
  if (!target) return;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const startMinute = 9 * 60;
  const endMinute = 20 * 60;
  const slotMinutes = 30;
  const slots = Array.from({ length: (endMinute - startMinute) / slotMinutes }, (_, index) => startMinute + index * slotMinutes);
  const planned = plannedCourses.map(getCourse).filter(Boolean);
  const timedPlanned = planned.filter(canAddToTimetable);

  let html = `
    ${renderConflictNotice()}
    <div class="timetable-legend">
      <span class="legend-normal">${lang("Planned course", "계획 과목")}</span>
      <span class="legend-heavy">${lang("High workload", "높은 workload")}</span>
      <span class="legend-conflict">${lang("Conflict/error notice", "충돌/오류 알림")}</span>
    </div>
    <div class="timetable-wrap">
      <div class="timetable-grid" style="--slot-count:${slots.length}">
        <div class="timetable-corner">Time</div>
        ${days.map((day, index) => `<div class="day" style="grid-column:${index + 2};grid-row:1">${day}</div>`).join("")}
        ${slots.map((slot, index) => `<div class="time" style="grid-column:1;grid-row:${index + 2}">${formatMinutesAsTime(slot)}</div>`).join("")}
        ${slots.map((slot, rowIndex) => days.map((day, dayIndex) => `<div class="slot-cell" style="grid-column:${dayIndex + 2};grid-row:${rowIndex + 2}"></div>`).join("")).join("")}
        ${timedPlanned.flatMap(course => {
          const start = parseTimeToMinutes(course.start);
          const end = parseTimeToMinutes(course.end);
          if (start === null || end === null || end <= start) return [];

          return days.filter(day => courseMeetsOnDay(course, day)).map(day => {
            const dayIndex = days.indexOf(day);
            const startRow = Math.max(0, Math.floor((Math.max(start, startMinute) - startMinute) / slotMinutes)) + 2;
            const endRow = Math.min(slots.length, Math.ceil((Math.min(end, endMinute) - startMinute) / slotMinutes)) + 2;
            const conflict = timedPlanned.some(other => other.id !== course.id && coursesOverlapOnDay(course, other, day));
            const classes = ["class-block", conflict ? "conflict" : "", course.workload === "High" ? "heavy" : ""].filter(Boolean).join(" ");

            return `
              <div class="${classes}" style="grid-column:${dayIndex + 2};grid-row:${startRow} / ${Math.max(startRow + 1, endRow)}">
                <strong>${course.code}</strong>
                <span>${course.start} to ${course.end}</span>
                <small>${course.location}</small>
                <button class="small-button" data-drop-course="${course.id}" type="button">${lang("Drop", "삭제")}</button>
              </div>
            `;
          });
        }).join("")}
      </div>
    </div>
    <div class="mobile-day-list">
      ${days.map(day => {
        const dayCourses = timedPlanned
          .filter(course => courseMeetsOnDay(course, day))
          .sort((a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start));

        return `
          <article class="mobile-day-card">
            <h4>${day}</h4>
            ${dayCourses.length ? dayCourses.map(course => `
              <div class="class-block ${course.workload === "High" ? "heavy" : ""}">
                <strong>${course.code}</strong>
                <span>${course.start} to ${course.end}</span>
                <small>${course.location}</small>
                <button class="small-button" data-drop-course="${course.id}" type="button">${lang("Drop", "삭제")}</button>
              </div>
            `).join("") : `<p class="muted">${lang("No planned course", "계획 과목 없음")}</p>`}
          </article>
        `;
      }).join("")}
    </div>
  `;
  html += `<p class="muted">${planned.length ? `${planned.length} ${lang("courses are currently planned.", "개 과목이 현재 시간표에 추가되어 있습니다.")}` : lang("No courses added yet. Select a course and click Add to Timetable.", "아직 추가된 과목이 없습니다. 과목을 선택한 뒤 Add to Timetable을 누르세요.")}</p>`;

  target.innerHTML = html;
}

function renderPathwayCourseButton(id) {
  const course = getCourse(id);
  if (!course) return "";

  const planning = getPlanningStatus(course);
  const selected = selectedCourseId === id;
  return `
    <div class="pathway-course-row">
      <button class="small-button status-${planning.code} ${selected ? "selected-course-button" : ""}" data-select-course="${id}" type="button">
        ${planning.icon} ${course.code} · ${planning.label} ${isAdded(id) ? "✓ Added" : ""}
      </button>
      <small>${course.title} · ${getCreditsLabel(course)}${course.noTimetable ? ` · ${lang("zero-credit co-registration", "0학점 공동 등록")}` : ""}${course.catalogOnly ? ` · ${lang("catalog option only", "카탈로그 옵션")}` : ""}</small>
    </div>
  `;
}

function renderChoiceOption(groupId, id) {
  const course = getCourse(id);
  const selected = getChoiceSelection(groupId) === id;
  const usedBy = getSelectedChoiceGroupForCourse(id, groupId);
  if (!course) return "";

  return `
    <div class="choice-option-row ${selected ? "selected" : ""}">
      <div>
        <strong>${course.code}</strong>
        <small>${course.title} · ${getCreditsLabel(course)}${course.catalogOnly ? ` · ${lang("Catalog option — section and credits not selected", "카탈로그 옵션 — 분반 및 학점 미선택")}` : ""}</small>
      </div>
      <button class="${selected ? "primary-button" : "secondary-button"}" data-set-choice="${id}" data-choice-group="${groupId}" type="button" ${selected || usedBy ? "disabled" : ""}>
        ${selected ? lang("Selected for Kevin", "Kevin 선택됨") : usedBy ? `${lang("Used by", "이미 사용 중")}: ${choiceGroups[usedBy].title}` : lang("Select", "선택")}
      </button>
    </div>
  `;
}

function renderChoiceRequirementCard(groupId) {
  const group = choiceGroups[groupId];
  if (!group) return "";

  const selectedId = getChoiceSelection(groupId);
  const selectedCourse = getCourse(selectedId);
  const alternatives = group.options.filter(id => id !== selectedId);

  return `
    <div class="choice-card">
      <div class="choice-card-header">
        <div>
          <strong>${group.title}</strong>
          <small>${group.label}</small>
        </div>
        <span>${lang("Advisor confirmation recommended", "어드바이저 확인 권장")}</span>
      </div>
      <div class="selected-choice-row">
        <span>${lang("Selected for Kevin", "Kevin 선택됨")}</span>
        ${selectedCourse ? renderPathwayCourseButton(selectedCourse.id) : `<p class="muted">${lang("No selection", "선택 없음")}</p>`}
      </div>
      <p class="muted">${group.description}</p>
      <details>
        <summary>${group.expandableLabel}</summary>
        <div class="option-list">
          ${alternatives.map(id => renderChoiceOption(groupId, id)).join("")}
        </div>
      </details>
    </div>
  `;
}

function renderPathwayItem(item) {
  if (item.type === "course") return renderPathwayCourseButton(item.id);
  if (item.type === "choice") return renderChoiceRequirementCard(item.groupId);
  if (item.type === "bundle") {
    return `
      <div class="requirement-card">
        <strong>${item.title}</strong>
        <div class="mini-course-list">
          ${safeList(item.ids).map(renderPathwayCourseButton).join("")}
        </div>
        <p class="muted">${item.note}</p>
      </div>
    `;
  }

  return `
    <div class="requirement-card note-card">
      <strong>${item.title}</strong>
      <p class="muted">${item.note}</p>
    </div>
  `;
}

function renderUpperDivisionTracker() {
  const tracker = getUpperDivisionTracker();

  return `
    <section class="card" style="margin-top:20px">
      <h3>${lang("Upper-Division Credit Tracker", "상위 학년 학점 추적")}</h3>
      <p class="muted">${lang("Prototype preview only. It counts actual credit-bearing 300- and 400-level selected courses and is not an official Degree Works calculation.", "프로토타입 미리보기입니다. 실제 학점이 있는 300/400 level 선택 과목만 계산하며 공식 Degree Works 계산이 아닙니다.")}</p>
      <div class="tracker-grid">
        <div class="metric"><strong>${tracker.completed}</strong><span>${lang("Completed upper-division credits", "완료된 상위 학년 학점")}</span></div>
        <div class="metric"><strong>${tracker.planned}</strong><span>${lang("Currently planned upper-division credits", "현재 계획된 상위 학년 학점")}</span></div>
        <div class="metric"><strong>${tracker.projectedFuture}</strong><span>${lang("Projected future selected credits", "향후 선택 경로 예상 학점")}</span></div>
        <div class="metric"><strong>${tracker.remaining}</strong><span>${lang("Remaining out of 39", "39학점 중 남은 학점")}</span></div>
      </div>
    </section>
  `;
}

function renderLabSequenceCard() {
  const rows = [
    { term: "Year 1 completed", ids: ["CHE133", "CHE134"], note: "General Chemistry Laboratories I and II" },
    { term: "Year 2 Fall", ids: ["BIO204", "BIO458"], note: "BIO 458 is zero-credit SPK co-registration only if SPK remains" },
    { term: "Year 2 Spring", ids: [getChoiceSelection("second-biology-lab-choice"), getChoiceSelection("organic-lab-choice"), "PHY131", "PHY133"], note: "Second biology lab, organic chemistry lab, and Physics I lab are visible choices" },
    { term: "Year 3 Fall", ids: ["PHY132", "PHY134", "BIO365", "BIO459"], note: "Physics II lab plus Biochemistry Laboratory and zero-credit WRTD route" }
  ];

  return `
    <section class="card" style="margin-top:20px">
      <h3>${lang("Visible Laboratory and Co-registration Sequence", "실험 및 공동 등록 순서")}</h3>
      <p class="muted">${lang("Exact semester placement is a sample plan requiring advisor confirmation.", "정확한 학기 배치는 어드바이저 확인이 필요한 샘플 계획입니다.")}</p>
      <div class="lab-sequence">
        ${rows.map(row => `
          <div class="lab-row">
            <strong>${row.term}</strong>
            <div class="chip-wrap">${row.ids.map(id => getCourse(id)).filter(Boolean).map(course => `<span>${course.code} · ${getCreditsLabel(course)}</span>`).join("")}</div>
            <p class="muted">${row.note}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderRemainingSbcPlan() {
  return `
    <section class="card" style="margin-top:20px">
      <h3>${lang("Kevin's Sample Remaining SBC Plan", "Kevin의 샘플 남은 SBC 계획")}</h3>
      <p class="muted">${lang("This sample assumes these SBC categories remain after Kevin's transfer-credit evaluation. Official remaining requirements must be confirmed in Degree Works.", "이 샘플은 Kevin의 편입 학점 평가 후 아래 SBC 카테고리가 남아 있다고 가정합니다. 공식 잔여 요건은 Degree Works에서 확인해야 합니다.")}</p>
      <div class="sbc-plan-grid">
        ${remainingSbcPlan.map(item => `
          <div class="sbc-card">
            <strong>${item.category}</strong>
            <p>${item.note}</p>
            <small>${item.ids.map(id => getCourse(id)).filter(Boolean).map(course => `${course.code}: ${course.sbc || "Verify official SBC designation"}`).join(", ")}</small>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPathway() {
  const selected = getCourse();
  const electiveSummary = getAdvancedElectiveSummary();

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Personalized Biochemistry Pathway Planner", "개인 맞춤 Biochemistry 수강 경로 계획")}</h2>
      <p>${lang("This sample planning guide reflects Kevin's completed Year 1 and Year 2 Fall planning status. It must be confirmed with a Biochemistry or Undergraduate Biology advisor.", "이 샘플 계획 가이드는 Kevin의 1학년 완료 상태와 2학년 Fall 계획 상태를 반영합니다. Biochemistry 또는 Undergraduate Biology 어드바이저 확인이 필요합니다.")}</p>
    </section>

    <section class="card notice-card"><strong>${lang("Prototype planning guide only. It is not an official Stony Brook, SOLAR, or Degree Works audit.", "프로토타입 계획 가이드일 뿐이며 공식 Stony Brook, SOLAR, Degree Works 감사가 아닙니다.")}</strong></section>

    <section class="card ai-guidance" style="margin-top:20px">
      <h3>🤖 ${lang("AI Pathway Guidance", "AI Pathway Guidance")}</h3>
      <p>${lang("The planner now shows Kevin's selected choose-one requirements, visible lab sequence, zero-credit co-registrations, and upper-division credit preview without treating catalog-only alternatives as real sections.", "이 플래너는 카탈로그 옵션을 실제 분반처럼 처리하지 않으면서 Kevin의 선택 요건, 실험 순서, 0학점 공동 등록, 상위 학년 학점 미리보기를 표시합니다.")}</p>
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
        <div class="timeline-item"><strong>AMS 151</strong><div>${lang("Completed in Year 1. AMS 161 is now a Year 2 Fall planning option.", "1학년에 완료되었습니다. 이제 AMS 161은 2학년 Fall 계획 선택지입니다.")}</div></div>
        <div class="timeline-item"><strong>AMS 161</strong><div>${lang("Recommended for Year 2 Fall. Delaying it may create pressure with physics, organic chemistry, and advanced biology.", "2학년 Fall 추천 과목입니다. 늦어지면 physics, organic chemistry, advanced biology와 부담이 겹칠 수 있습니다.")}</div></div>
      </div>
    </section>

    ${renderUpperDivisionTracker()}
    ${renderLabSequenceCard()}

    <section class="roadmap-grid" style="margin-top:20px">
      ${biochemPathway.map(year => `
        <article class="year-card ${year.year === "Year 1" ? "completed-focus-card" : ""} ${year.year === "Year 2" ? "fall-focus-card" : ""}">
          <h3>${year.year}</h3>
          <p><strong>${year.focus}</strong></p>
          ${year.semesters.map(semester => `
            <div class="detail-section">
              <h4>${semester.name}</h4>
              ${semester.items.map(renderPathwayItem).join("")}
              <p class="muted">${semester.note}</p>
            </div>
          `).join("")}
        </article>
      `).join("")}
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("Approved Advanced Elective Preview", "승인된 상위 선택 과목 미리보기")}</h3>
      <p>${lang("Kevin's sample selections are", "Kevin의 샘플 선택은")} ${electiveSummary.ids.map(id => getCourse(id)).filter(Boolean).map(course => course.code).join(" and ")}. ${lang("At least two approved courses totaling at least five credits are required in this sample preview.", "이 샘플 미리보기에서는 최소 두 개의 승인 과목과 총 5학점 이상이 필요합니다.")}</p>
      <p class="${electiveSummary.complete ? "success-inline" : "warning-inline"}">${electiveSummary.complete ? lang("Sample elective credit threshold met.", "샘플 선택 과목 학점 기준 충족.") : lang("Sample elective credit threshold not met.", "샘플 선택 과목 학점 기준 미충족.")} ${formatCredits(electiveSummary.credits)} ${lang("selected", "선택됨")}</p>
    </section>

    ${renderRemainingSbcPlan()}

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
  const alternatives = getAdvisorAlternatives(course);
  const choiceContext = getChoiceGroupsForCourse(course.id)
    .map(groupId => {
      const selected = getChoiceSelection(groupId);
      const selectedCourse = getCourse(selected);
      return `${choiceGroups[groupId].title}: ${selectedCourse ? selectedCourse.code : "No selection"}`;
    })
    .join("; ") || "No choose-one group";
  const coRegistrationNote = course.noTimetable
    ? "This is a zero-credit co-registration item and should not add credits or be described as a laboratory."
    : "No zero-credit co-registration issue detected for this selected course.";
  const email = `Subject: Registration question about ${course.code}

Dear Academic and Transfer Advising Services and Department Coordinator,

I am Kevin Ruiz, a Biochemistry student who has completed Year 1 and is planning Year 2 Fall enrollment. I am reviewing ${course.code} ${course.title} in the ZOLAR class project prototype.

The prototype detected the following issue: ${state.reasons.join("; ")}.

Possible degree path risk: ${course.impact}

Requirement or choice context: ${choiceContext}.

Co-registration note: ${coRegistrationNote}

Possible alternatives I am considering: ${alternatives.join(", ")}.

Could you please confirm whether I should add this course, choose one of the alternatives, or adjust my Biochemistry pathway plan?

Thank you,
Kevin Ruiz`;

  return `
	    <section class="card">
	      <h3>${course.code} ${course.title}</h3>
	      <div class="report-box">
	        <p><strong>${lang("Blocked course or concern", "제한 또는 우려 과목")}:</strong> ${course.code}</p>
	        <p><strong>${lang("Detected rule", "감지된 규칙")}:</strong> ${state.reasons.join(" · ")}</p>
	        <p><strong>${lang("Requirement context", "요건 맥락")}:</strong> ${choiceContext}</p>
	        <p><strong>${lang("Degree path risk", "졸업 경로 위험")}:</strong> ${course.impact}</p>
	        <p><strong>${lang("Possible alternatives", "가능한 대안")}:</strong> ${alternatives.join(", ")}</p>
	        <p><strong>${lang("Co-registration note", "공동 등록 메모")}:</strong> ${coRegistrationNote}</p>
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
  const credits = sumCredits(plannedCourses, "planned");
  const completedCredits = sumCredits(student.completed, "pathway");
  const planned = plannedCourses.map(getCourse).filter(Boolean);
  const tracker = getUpperDivisionTracker();
  const electiveSummary = getAdvancedElectiveSummary();
  const choiceRows = Object.keys(choiceGroups).map(groupId => {
    const course = getCourse(getChoiceSelection(groupId));
    return { group: choiceGroups[groupId], course };
  });

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
	        <div class="catalog-item"><span>Year 2 Fall focus</span><strong>${fallRecommendedCourseIds.map(id => getCourse(id)).filter(Boolean).map(course => `${course.code} (${getCreditsLabel(course)})`).join(", ")}</strong></div>
	        <div class="catalog-item"><span>Currently planned Fall courses</span><strong>${planned.length ? planned.map(course => `${course.code} (${getCreditsLabel(course)})`).join(", ") : "No courses added yet"}</strong></div>
	        <div class="catalog-item"><span>Biochemistry sequence</span><strong>BIO 361 followed by BIO 362</strong></div>
	        <div class="catalog-item"><span>Cell biology and genetics</span><strong>BIO 310 and ${getCourse(getChoiceSelection("genetics-choice"))?.code || "Genetics choice"}</strong></div>
	        <div class="catalog-item"><span>Biochemistry laboratory / WRTD</span><strong>BIO 365 plus BIO 459 if WRTD remains</strong></div>
	        <div class="catalog-item"><span>Physical chemistry</span><strong>${getCourse(getChoiceSelection("physical-chemistry-choice"))?.code || "CHE choice"} with CHE 301 as listed alternative</strong></div>
	      </div>
	    </section>

	    <section class="detail-section">
	      <h4>${lang("Choose-One Requirement Preview", "선택 요건 미리보기")}</h4>
	      <div class="catalog-grid">
	        ${choiceRows.map(row => `
	          <div class="catalog-item">
	            <span>${row.group.title}</span>
	            <strong>${row.course ? `${row.course.code} ${row.course.title} (${getCreditsLabel(row.course)})` : "No selection"}</strong>
	          </div>
	        `).join("")}
	      </div>
	      <p class="muted">${lang("Only the selected option in each group is counted. The same course is prevented from counting in two groups.", "각 그룹의 선택된 옵션 하나만 계산됩니다. 같은 과목이 두 그룹에 중복 계산되지 않도록 막습니다.")}</p>
	    </section>

	    <section class="detail-section">
	      <h4>${lang("Laboratory and Co-registration Preview", "실험 및 공동 등록 미리보기")}</h4>
	      <div class="catalog-grid">
	        <div class="catalog-item"><span>Completed labs</span><strong>CHE 133 (1), CHE 134 (1)</strong></div>
	        <div class="catalog-item"><span>Biology labs</span><strong>BIO 204 (2), ${getCourse(getChoiceSelection("second-biology-lab-choice"))?.code || "BIO 205/BIO 207"} (2)</strong></div>
	        <div class="catalog-item"><span>Organic lab</span><strong>${getCourse(getChoiceSelection("organic-lab-choice"))?.code || "CHE 327/CHE 383"} (${getCreditsLabel(getCourse(getChoiceSelection("organic-lab-choice")))})</strong></div>
	        <div class="catalog-item"><span>Physics labs</span><strong>PHY 133 (1), PHY 134 (1)</strong></div>
	        <div class="catalog-item"><span>Biochemistry lab</span><strong>BIO 365 (3)</strong></div>
	        <div class="catalog-item"><span>Zero-credit co-registrations</span><strong>BIO 458 (0), BIO 459 (0)</strong></div>
	      </div>
	      <p class="muted">${lang("Zero-credit BIO 458 and BIO 459 do not increase completed, planned, or projected credit totals.", "0학점 BIO 458과 BIO 459는 완료, 계획, 예상 학점 총합을 늘리지 않습니다.")}</p>
	    </section>

	    <section class="detail-section">
	      <h4>${lang("Upper-Division Credit Tracker", "상위 학년 학점 추적")}</h4>
	      <div class="tracker-grid">
	        <div class="metric"><strong>${tracker.completed}</strong><span>Completed</span></div>
	        <div class="metric"><strong>${tracker.planned}</strong><span>Planned</span></div>
	        <div class="metric"><strong>${tracker.projectedFuture}</strong><span>Projected future</span></div>
	        <div class="metric"><strong>${tracker.remaining}</strong><span>Remaining out of 39</span></div>
	      </div>
	      <p class="muted">${lang("Prototype preview only, not an official Degree Works calculation.", "프로토타입 미리보기이며 공식 Degree Works 계산이 아닙니다.")}</p>
	    </section>

	    <section class="detail-section">
	      <h4>${lang("Approved Advanced Electives", "승인된 상위 선택 과목")}</h4>
	      <p>${electiveSummary.ids.map(id => getCourse(id)).filter(Boolean).map(course => `${course.code} ${course.title}`).join(" and ")} · ${formatCredits(electiveSummary.credits)} selected.</p>
	      <p class="muted">${lang("At least two approved courses totaling at least five credits are represented in Kevin's sample selections.", "Kevin의 샘플 선택은 최소 두 개의 승인 과목과 총 5학점 이상을 나타냅니다.")}</p>
	    </section>

	    <section class="detail-section">
	      <h4>${lang("Kevin's Sample Remaining SBC Plan", "Kevin의 샘플 남은 SBC 계획")}</h4>
	      <p class="muted">${lang("This sample assumes these SBC categories remain after Kevin's transfer-credit evaluation. Official remaining requirements must be confirmed in Degree Works.", "이 샘플은 Kevin의 편입 학점 평가 후 아래 SBC 카테고리가 남아 있다고 가정합니다. 공식 잔여 요건은 Degree Works에서 확인해야 합니다.")}</p>
	      <div class="catalog-grid">
	        ${remainingSbcPlan.map(item => `<div class="catalog-item"><span>${item.category}</span><strong>${item.ids.map(id => getCourse(id)).filter(Boolean).map(course => `${course.code}: ${course.sbc || "Verify official SBC designation"}`).join(", ")}</strong></div>`).join("")}
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
  timetableConflictNotice = null;
  selectedChoices = { ...defaultChoiceSelections };

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

	    const choiceButton = event.target.closest("[data-set-choice]");
	    if (choiceButton) {
	      setChoiceSelection(choiceButton.dataset.choiceGroup, choiceButton.dataset.setChoice);
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

const translations = {
  en: {
    systemSubtitle: "Course Registration Support",
    navDashboard: "Dashboard",
    navPersonas: "Persona Needs",
    navSearch: "Integrated Course Search",
    navPathway: "Pathway Planner",
    navAdvisor: "Advisor Evidence Pack",
    topTitle: "Course Registration Prototype",
    topDescription: "Integrated search, evaluation, pathway, and advising support.",
    notificationTitle: "Notifications",
    emptyNotification: "No new notifications.",
    messageTitle: "Messages",
    emptyMessage: "No new messages.",
    chatTitle: "ZOLAR AI Assistant",
    degreeTitle: "Degree Audit Preview",
    degreeIntro: "This preview imitates how a degree audit can show completed, missing, and in progress requirements. It is part of the prototype, not an official audit.",
    searchPlaceholder: "Search by course, title, instructor, SBC, major, seat, workload",
    noCourses: "No courses added yet. Add a course from Integrated Course Search.",
    sentMessage: "Draft sent to Academic and Transfer Advising Services and the department coordinator in this prototype.",
    chatbotWelcome: "Hi. I can explain prerequisites, reserved seats, workload, SBC requirements, major requirements, pathway risk, and advisor next steps."
  },
  ko: {
    systemSubtitle: "수강신청 지원 시스템",
    navDashboard: "대시보드",
    navPersonas: "페르소나 필요 분석",
    navSearch: "통합 과목 검색",
    navPathway: "수강 경로 계획",
    navAdvisor: "어드바이저 보고서",
    topTitle: "수강신청 개선 프로토타입",
    topDescription: "검색, 강의 평가, 수강 경로, 상담 지원을 한곳에 통합합니다.",
    notificationTitle: "알림",
    emptyNotification: "새로운 알림이 없습니다.",
    messageTitle: "메시지",
    emptyMessage: "새로운 메시지가 없습니다.",
    chatTitle: "ZOLAR AI 도우미",
    degreeTitle: "Degree Audit 미리보기",
    degreeIntro: "이 화면은 이수 완료, 미충족, 진행 중인 요건을 보여주는 학위 감사 화면을 모방한 프로토타입입니다. 공식 감사 자료가 아닙니다.",
    searchPlaceholder: "과목, 제목, 교수, SBC, 전공, 좌석, workload로 검색",
    noCourses: "아직 추가된 과목이 없습니다. 통합 과목 검색에서 과목을 추가하세요.",
    sentMessage: "이 프로토타입에서는 Academic and Transfer Advising Services와 학과 코디네이터에게 초안이 전송된 것으로 표시됩니다.",
    chatbotWelcome: "안녕하세요. 선수 조건, reserved seats, workload, SBC 요건, 전공 요건, 수강 경로 위험, 어드바이저 다음 단계를 설명할 수 있습니다."
  }
}

let currentLang = "en"
let currentPage = "dashboard"
let selectedCourseId = "MAT123"
let selectedTerm = "Fall 2026"
let selectedMajor = "TSM"
let plannedCourses = ["EST202", "EST207", "MAT123"]
let scheduleShifted = false

const terms = ["Fall 2026", "Spring 2026", "Summer 2026"]
const departments = ["All", "AMS", "BIO", "BUS", "CHE", "CSE", "ECE", "EST", "MAT", "MEC", "PSY", "WRT"]
const requirements = ["All", "Major", "SBC", "Prerequisite", "Writing", "Technical", "Elective"]
const seatFilters = ["All", "Available", "Closed", "Waitlist", "Reserved"]
const workloadFilters = ["All", "Low", "Medium", "High"]

const courses = [
  {
    id: "MAT123",
    code: "MAT 123",
    title: "Precalculus",
    instructor: "Dr. Andrew Miller",
    department: "MAT",
    level: "100",
    credits: 3,
    requirementType: "Prerequisite",
    sbc: "QPS",
    majorFit: { TSM: "Math prerequisite support", Biochemistry: "Math preparation before calculus" },
    prerequisite: "Placement level or MAP 103 completion",
    reservedSeats: "8 reserved seats for students in math sequence review",
    status: "Available",
    workload: "High",
    time: { days: "Mon Wed", start: "10:00 AM", end: "11:20 AM", location: "Math Tower P 131" },
    evaluation: { enrolled: 180, responses: 62, rating: 3.8, grades: { A: 48, B: 55, C: 50, DF: 27 } },
    dna: { workload: "High", grading: "Exam based grading", exam: "High", discussion: "Low", clarity: "Moderate", comments: "Students say the course is useful but risky when taken without enough algebra preparation." },
    catalog: "Precalculus course for students preparing for calculus and quantitative degree requirements.",
    ai: "MAT 123 may be useful as preparation, but the student should confirm whether it is the correct next step before AMS 151 or AMS 161.",
    impact: "If MAT 123 is delayed, AMS 151 and AMS 161 can move back by one semester and create a graduation sequence issue.",
    backups: ["MAP 103 review", "AMS 151 if eligible", "Advisor confirmed equivalent course"]
  },
  {
    id: "AMS151",
    code: "AMS 151",
    title: "Applied Calculus I",
    instructor: "Prof. Jennifer Lee",
    department: "AMS",
    level: "100",
    credits: 3,
    requirementType: "Major",
    sbc: "QPS",
    majorFit: { TSM: "Required quantitative foundation", Biochemistry: "Calculus option or support course" },
    prerequisite: "Precalculus preparation or placement",
    reservedSeats: "12 seats reserved for major sequence students",
    status: "Available",
    workload: "Medium",
    time: { days: "Tue Thu", start: "2:00 PM", end: "3:20 PM", location: "Engineering Building 143" },
    evaluation: { enrolled: 240, responses: 95, rating: 4.1, grades: { A: 88, B: 76, C: 52, DF: 24 } },
    dna: { workload: "Moderate", grading: "Problem set and exam mix", exam: "Medium", discussion: "Low", clarity: "High", comments: "Students describe the course as manageable when weekly practice is consistent." },
    catalog: "Applied calculus course used by technology, management, and science pathways.",
    ai: "AMS 151 fits the TSM math path and can support future AMS 161 planning.",
    impact: "Taking AMS 151 on time protects the later AMS 161 sequence and reduces future scheduling pressure.",
    backups: ["MAT 123 if not eligible", "Summer AMS 151", "Advisor approved equivalent"]
  },
  {
    id: "AMS161",
    code: "AMS 161",
    title: "Applied Calculus II",
    instructor: "Dr. Samuel Park",
    department: "AMS",
    level: "100",
    credits: 3,
    requirementType: "Major",
    sbc: "QPS",
    majorFit: { TSM: "Required quantitative continuation", Biochemistry: "Calculus continuation option" },
    prerequisite: "AMS 151 or equivalent",
    reservedSeats: "10 reserved seats for students continuing from AMS 151",
    status: "Waitlist",
    workload: "High",
    time: { days: "Mon Wed", start: "3:30 PM", end: "4:50 PM", location: "Engineering Building 143" },
    evaluation: { enrolled: 210, responses: 80, rating: 3.9, grades: { A: 68, B: 70, C: 49, DF: 23 } },
    dna: { workload: "High", grading: "Exam heavy", exam: "High", discussion: "Low", clarity: "Moderate", comments: "Students recommend completing AMS 151 strongly before attempting this course." },
    catalog: "Continuation of applied calculus with quantitative methods for applied fields.",
    ai: "AMS 161 should not be selected until AMS 151 is completed or officially waived.",
    impact: "If AMS 151 is not completed first, AMS 161 can break the math sequence and delay upper division planning.",
    backups: ["AMS 151", "Winter AMS 161 if available", "Advisor approved equivalent"]
  },
  {
    id: "BIO201",
    code: "BIO 201",
    title: "Biology I",
    instructor: "Dr. Elaine Mercer",
    department: "BIO",
    level: "200",
    credits: 4,
    requirementType: "Major",
    sbc: "SNW",
    majorFit: { TSM: "Natural science SBC option", Biochemistry: "Foundation biology requirement" },
    prerequisite: "High school biology recommended",
    reservedSeats: "18 reserved seats for life science majors",
    status: "Available",
    workload: "Medium",
    time: { days: "Mon Wed Fri", start: "9:00 AM", end: "9:50 AM", location: "Life Sciences Building 038" },
    evaluation: { enrolled: 220, responses: 86, rating: 4.2, grades: { A: 84, B: 70, C: 42, DF: 24 } },
    dna: { workload: "Moderate", grading: "Weekly quiz and exam mix", exam: "Medium", discussion: "Low", clarity: "High", comments: "Students mention clear lectures, weekly quizzes, and manageable workload." },
    catalog: "Introductory biology course covering major biological principles and scientific reasoning.",
    ai: "BIO 201 satisfies SNW and supports Biochemistry foundation planning. For TSM, it can work as a natural science requirement.",
    impact: "Taking BIO 201 early keeps the biology sequence open for BIO 202 and later laboratory work.",
    backups: ["BIO 202 if prepared", "CHE 131", "PSY 103 for lighter SBC"]
  },
  {
    id: "BIO202",
    code: "BIO 202",
    title: "Biology II",
    instructor: "Prof. Nadia Kim",
    department: "BIO",
    level: "200",
    credits: 4,
    requirementType: "Major",
    sbc: "SNW",
    majorFit: { TSM: "Natural science elective", Biochemistry: "Foundation biology continuation" },
    prerequisite: "BIO 201 or equivalent preparation",
    reservedSeats: "12 reserved seats for declared life science majors",
    status: "Available",
    workload: "High",
    time: { days: "Tue Thu", start: "12:30 PM", end: "1:50 PM", location: "Life Sciences Building 038" },
    evaluation: { enrolled: 205, responses: 78, rating: 3.9, grades: { A: 62, B: 72, C: 49, DF: 22 } },
    dna: { workload: "High", grading: "Exam heavy", exam: "High", discussion: "Low", clarity: "Moderate", comments: "Students say the course is useful but reading intensive." },
    catalog: "Second biology course for life science pathways.",
    ai: "BIO 202 should be selected after BIO 201 preparation and should be balanced with workload.",
    impact: "BIO 202 supports upper division biology access, but taking it with CHE 132 can create workload pressure.",
    backups: ["BIO 201", "CHE 132", "A lighter SBC course"]
  },
  {
    id: "BIO361",
    code: "BIO 361",
    title: "Biochemistry I",
    instructor: "Dr. Rafael Chen",
    department: "BIO",
    level: "300",
    credits: 3,
    requirementType: "Major",
    sbc: "None",
    majorFit: { TSM: "Not a TSM major requirement", Biochemistry: "Upper division major requirement" },
    prerequisite: "BIO 201, BIO 202, CHE 131, and CHE 132 recommended",
    reservedSeats: "Priority seats for Biochemistry students",
    status: "Closed",
    workload: "High",
    time: { days: "Mon Wed", start: "2:30 PM", end: "3:50 PM", location: "Life Sciences Building 038" },
    evaluation: { enrolled: 126, responses: 54, rating: 3.7, grades: { A: 34, B: 45, C: 31, DF: 16 } },
    dna: { workload: "High", grading: "Concept heavy exams", exam: "High", discussion: "Medium", clarity: "Moderate", comments: "Students recommend completing biology and chemistry foundations first." },
    catalog: "Upper division biochemistry course on proteins, enzymes, metabolism, and molecular mechanisms.",
    ai: "BIO 361 is not a safe early choice. It should be taken after foundation biology and chemistry courses.",
    impact: "Delaying BIO 361 beyond Year 3 can delay BIO 362, advanced electives, and final graduation audit.",
    backups: ["BIO 202", "CHE 132", "CHE 321"]
  },
  {
    id: "CHE131",
    code: "CHE 131",
    title: "General Chemistry I",
    instructor: "Prof. Maya Singh",
    department: "CHE",
    level: "100",
    credits: 4,
    requirementType: "Major",
    sbc: "SNW",
    majorFit: { TSM: "Natural science SBC option", Biochemistry: "Chemistry foundation requirement" },
    prerequisite: "Math placement or equivalent preparation",
    reservedSeats: "15 seats reserved for science majors",
    status: "Available",
    workload: "High",
    time: { days: "Tue Thu", start: "11:00 AM", end: "12:20 PM", location: "Chemistry Building 100" },
    evaluation: { enrolled: 260, responses: 110, rating: 3.9, grades: { A: 82, B: 91, C: 55, DF: 32 } },
    dna: { workload: "High", grading: "Frequent problem sets and exams", exam: "High", discussion: "Low", clarity: "Moderate", comments: "Students say chemistry is manageable only with steady weekly practice." },
    catalog: "First general chemistry course covering atomic structure, bonding, stoichiometry, and equilibrium.",
    ai: "CHE 131 supports Biochemistry and can satisfy SNW, but it should be balanced with other heavy courses.",
    impact: "CHE 131 starts the chemistry sequence required for later CHE 132 and organic chemistry.",
    backups: ["BIO 201", "MEC 104", "PSY 103"]
  },
  {
    id: "CHE132",
    code: "CHE 132",
    title: "General Chemistry II",
    instructor: "Prof. Maya Singh",
    department: "CHE",
    level: "100",
    credits: 4,
    requirementType: "Major",
    sbc: "SNW",
    majorFit: { TSM: "Natural science elective", Biochemistry: "Chemistry foundation continuation" },
    prerequisite: "CHE 131",
    reservedSeats: "Open after major priority period",
    status: "Available",
    workload: "High",
    time: { days: "Mon Wed", start: "11:30 AM", end: "12:50 PM", location: "Chemistry Building 100" },
    evaluation: { enrolled: 238, responses: 94, rating: 3.8, grades: { A: 73, B: 86, C: 52, DF: 27 } },
    dna: { workload: "High", grading: "Exam and lab preparation", exam: "High", discussion: "Low", clarity: "Moderate", comments: "Students recommend not pairing it with too many demanding STEM courses." },
    catalog: "Second general chemistry course and key prerequisite for organic chemistry.",
    ai: "CHE 132 is important for Biochemistry, but it should follow CHE 131 and fit workload limits.",
    impact: "Completing CHE 132 opens the path to organic chemistry and later biochemistry.",
    backups: ["CHE 131", "BIO 201", "AMS 151"]
  },
  {
    id: "EST194",
    code: "EST 194",
    title: "Decision Making",
    instructor: "Prof. Neal Dreamson",
    department: "EST",
    level: "100",
    credits: 3,
    requirementType: "Major",
    sbc: "TECH",
    majorFit: { TSM: "Introductory major requirement", Biochemistry: "Elective or TECH SBC" },
    prerequisite: "None",
    reservedSeats: "Reserved seats for TSM students during priority enrollment",
    status: "Available",
    workload: "Medium",
    time: { days: "Tue Thu", start: "10:30 AM", end: "11:50 AM", location: "Academic Building A 301" },
    evaluation: { enrolled: 44, responses: 33, rating: 4.2, grades: { A: 18, B: 16, C: 7, DF: 3 } },
    dna: { workload: "Moderate", grading: "Project and participation based", exam: "Low", discussion: "High", clarity: "High", comments: "Students like the applied decision making format but mention group coordination." },
    catalog: "Introduces decision making methods for technology and society problems.",
    ai: "EST 194 is a strong early TSM course and supports the major foundation.",
    impact: "Taking EST 194 in Year 1 supports later EST courses and project based work.",
    backups: ["EST 202", "EST 205", "EST 207"]
  },
  {
    id: "EST202",
    code: "EST 202",
    title: "Introduction to Science, Technology, and Society",
    instructor: "Prof. Anthony Pennings",
    department: "EST",
    level: "200",
    credits: 3,
    requirementType: "Major",
    sbc: "STAS, TECH",
    majorFit: { TSM: "Required major foundation", Biochemistry: "TECH or STAS elective" },
    prerequisite: "None",
    reservedSeats: "Open seats with TSM priority section",
    status: "Available",
    workload: "Medium",
    time: { days: "Mon Wed", start: "9:30 AM", end: "10:50 AM", location: "Academic Building B 204" },
    evaluation: { enrolled: 49, responses: 36, rating: 4.0, grades: { A: 17, B: 18, C: 9, DF: 5 } },
    dna: { workload: "Moderate", grading: "Writing and presentation based", exam: "Low", discussion: "Medium", clarity: "Moderate", comments: "Students mention useful STS concepts and moderate writing workload." },
    catalog: "Introduces social, ethical, institutional, and cultural dimensions of science and technology.",
    ai: "EST 202 fits the TSM foundation and supports later STS analysis courses.",
    impact: "Taking EST 202 early makes later EST 304, EST 331, and project based courses easier to contextualize.",
    backups: ["EST 194", "EST 205", "EST 240"]
  },
  {
    id: "EST207",
    code: "EST 207",
    title: "Interaction Design",
    instructor: "Prof. Neal Dreamson",
    department: "EST",
    level: "200",
    credits: 3,
    requirementType: "Major",
    sbc: "TECH",
    majorFit: { TSM: "Design and technology support", Biochemistry: "Elective only" },
    prerequisite: "None",
    reservedSeats: "Priority seats for TSM and design related students",
    status: "Available",
    workload: "Medium",
    time: { days: "Mon Wed", start: "1:00 PM", end: "2:20 PM", location: "Computer Science Building 2120" },
    evaluation: { enrolled: 39, responses: 30, rating: 4.4, grades: { A: 18, B: 12, C: 6, DF: 3 } },
    dna: { workload: "Moderate", grading: "Prototype and group project based", exam: "Low", discussion: "High", clarity: "High", comments: "Students value the prototype work but need clear project management." },
    catalog: "Project based course focused on user needs, interface design, and interaction systems.",
    ai: "EST 207 fits TSM students who need design and user experience project experience.",
    impact: "This course supports Year 2 TSM design preparation and helps connect user analysis to prototype development.",
    backups: ["EST 205", "EST 240", "EST 304"]
  },
  {
    id: "EST240",
    code: "EST 240",
    title: "Visual Rhetoric and Digital Media",
    instructor: "Prof. Anthony Pennings",
    department: "EST",
    level: "200",
    credits: 3,
    requirementType: "Major",
    sbc: "TECH, STAS",
    majorFit: { TSM: "Digital media and technology elective", Biochemistry: "Elective only" },
    prerequisite: "None",
    reservedSeats: "Open seats for technology and communication students",
    status: "Available",
    workload: "Medium",
    time: { days: "Tue Thu", start: "5:30 PM", end: "6:50 PM", location: "Computer Science Building 2208" },
    evaluation: { enrolled: 35, responses: 27, rating: 4.3, grades: { A: 16, B: 10, C: 6, DF: 3 } },
    dna: { workload: "Moderate", grading: "Website and essay based", exam: "Low", discussion: "Medium", clarity: "High", comments: "Students mention creative assignments and manageable grading when drafts are revised." },
    catalog: "Studies visual communication, digital media, and rhetorical design.",
    ai: "EST 240 supports TSM digital communication and portfolio building.",
    impact: "This course can strengthen Year 2 or Year 3 TSM specialization planning.",
    backups: ["EST 202", "EST 207", "EST 304"]
  },
  {
    id: "EST304",
    code: "EST 304",
    title: "Communication for Engineers and Scientists",
    instructor: "Prof. Rachel Adams",
    department: "EST",
    level: "300",
    credits: 3,
    requirementType: "Writing",
    sbc: "SPK",
    majorFit: { TSM: "Professional communication support", Biochemistry: "Communication elective" },
    prerequisite: "Upper division standing recommended",
    reservedSeats: "Reserved seats for technical majors",
    status: "Available",
    workload: "Medium",
    time: { days: "Tue Thu", start: "11:00 AM", end: "12:20 PM", location: "Academic Building B 310" },
    evaluation: { enrolled: 46, responses: 33, rating: 4.2, grades: { A: 18, B: 15, C: 9, DF: 4 } },
    dna: { workload: "Moderate", grading: "Presentation and writing based", exam: "Low", discussion: "High", clarity: "High", comments: "Students say feedback improves technical communication skills." },
    catalog: "Technical communication course for scientific, engineering, and professional contexts.",
    ai: "EST 304 is useful for TSM and can help with presentation or writing outcomes.",
    impact: "Taking EST 304 before senior project work can improve communication readiness.",
    backups: ["WRT 102", "EST 240", "EST 331"]
  },
  {
    id: "EST320",
    code: "EST 320",
    title: "Communication Technology Systems",
    instructor: "Dr. Brian Walsh",
    department: "EST",
    level: "300",
    credits: 3,
    requirementType: "Technical",
    sbc: "TECH",
    majorFit: { TSM: "Upper division technology requirement", Biochemistry: "Elective only" },
    prerequisite: "Math and technology background recommended",
    reservedSeats: "Reserved seats for TSM students",
    status: "Waitlist",
    workload: "High",
    time: { days: "Mon Wed", start: "10:00 AM", end: "11:20 AM", location: "Computer Science Building 2208" },
    evaluation: { enrolled: 34, responses: 25, rating: 4.1, grades: { A: 13, B: 11, C: 7, DF: 3 } },
    dna: { workload: "High", grading: "Systems project and exam mix", exam: "Medium", discussion: "Medium", clarity: "High", comments: "Students recommend taking it after stronger technical preparation." },
    catalog: "Upper division course on communication technology systems and their social context.",
    ai: "EST 320 can fit the TSM path but should be checked against math and technical preparation.",
    impact: "If taken without preparation, EST 320 can increase upper division workload pressure.",
    backups: ["EST 304", "EST 331", "ECE 101"]
  },
  {
    id: "EST331",
    code: "EST 331",
    title: "Engineering Ethics and AI Technologies",
    instructor: "Dr. Mira Collins",
    department: "EST",
    level: "300",
    credits: 3,
    requirementType: "Major",
    sbc: "CER, STAS",
    majorFit: { TSM: "Required ethics and technology course", Biochemistry: "Ethics or elective option" },
    prerequisite: "Upper division standing recommended",
    reservedSeats: "Major seats released after priority period",
    status: "Closed",
    workload: "Medium",
    time: { days: "Mon Wed", start: "11:30 AM", end: "12:50 PM", location: "Academic Building B 214" },
    evaluation: { enrolled: 36, responses: 25, rating: 4.0, grades: { A: 13, B: 10, C: 8, DF: 5 } },
    dna: { workload: "Moderate", grading: "Essay and case analysis based", exam: "Medium", discussion: "High", clarity: "Moderate", comments: "Students find cases useful but want clearer grading rubrics." },
    catalog: "Studies engineering ethics, AI systems, responsibility, and social impact.",
    ai: "EST 331 is important for TSM but closed status means the student should prepare a backup.",
    impact: "Missing EST 331 may affect upper division sequence and ethics requirement planning.",
    backups: ["EST 304", "PHI 104", "EST 391"]
  },
  {
    id: "ECE101",
    code: "ECE 101",
    title: "Introduction to Electrical and Computer Engineering",
    instructor: "Prof. Daniel Cho",
    department: "ECE",
    level: "100",
    credits: 3,
    requirementType: "Technical",
    sbc: "TECH",
    majorFit: { TSM: "Technical support course", Biochemistry: "Elective only" },
    prerequisite: "None",
    reservedSeats: "Open seats with engineering priority",
    status: "Available",
    workload: "Medium",
    time: { days: "Mon Wed", start: "2:30 PM", end: "3:50 PM", location: "Engineering Building 201" },
    evaluation: { enrolled: 75, responses: 30, rating: 4.0, grades: { A: 25, B: 22, C: 18, DF: 10 } },
    dna: { workload: "Moderate", grading: "Lab and quiz based", exam: "Medium", discussion: "Medium", clarity: "Moderate", comments: "Students say it is a useful technical introduction but requires regular lab attention." },
    catalog: "Introductory electrical and computer engineering course used as a sample technical support course.",
    ai: "ECE 101 can support TSM technical breadth but should be balanced with other technical courses.",
    impact: "This course fits Year 2 TSM technical foundation planning.",
    backups: ["MEC 104", "CSE 114", "EST 207"]
  },
  {
    id: "MEC104",
    code: "MEC 104",
    title: "Practical Science of Things",
    instructor: "Prof. Laura Evans",
    department: "MEC",
    level: "100",
    credits: 3,
    requirementType: "Technical",
    sbc: "SNW, TECH",
    majorFit: { TSM: "Applied technical support course", Biochemistry: "Elective or SNW option" },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    status: "Available",
    workload: "Low",
    time: { days: "Tue Thu", start: "12:30 PM", end: "1:50 PM", location: "Engineering Building 115" },
    evaluation: { enrolled: 68, responses: 28, rating: 4.1, grades: { A: 24, B: 22, C: 15, DF: 7 } },
    dna: { workload: "Low", grading: "Project and quiz based", exam: "Low", discussion: "Medium", clarity: "High", comments: "Students like the applied format and practical examples." },
    catalog: "Introductory applied engineering course used for technical literacy and natural science planning.",
    ai: "MEC 104 is a safer technical support option when the student wants lower workload.",
    impact: "This course can help Year 1 or Year 2 TSM students complete technical breadth without overload.",
    backups: ["ECE 101", "EST 207", "BIO 201"]
  },
  {
    id: "CSE114",
    code: "CSE 114",
    title: "Introduction to Object Oriented Programming",
    instructor: "Dr. Helen Romero",
    department: "CSE",
    level: "100",
    credits: 4,
    requirementType: "Technical",
    sbc: "TECH",
    majorFit: { TSM: "Programming support for technical specialization", Biochemistry: "Elective only" },
    prerequisite: "Programming placement or prior experience recommended",
    reservedSeats: "Reserved seats for CSE and technical majors",
    status: "Available",
    workload: "High",
    time: { days: "Mon Wed", start: "4:00 PM", end: "5:20 PM", location: "Computer Science Building 1203" },
    evaluation: { enrolled: 180, responses: 72, rating: 3.7, grades: { A: 48, B: 54, C: 50, DF: 28 } },
    dna: { workload: "High", grading: "Programming assignment heavy", exam: "Medium", discussion: "Medium", clarity: "Moderate", comments: "Students warn that weekly coding assignments require consistent time." },
    catalog: "Programming course introducing object oriented design and problem solving.",
    ai: "CSE 114 can help TSM technical specialization but should not be paired with too many project heavy courses.",
    impact: "This course can open technical specialization options, but workload can affect Year 2 balance.",
    backups: ["ECE 101", "MEC 104", "EST 207"]
  },
  {
    id: "BUS348",
    code: "BUS 348",
    title: "Principles of Marketing",
    instructor: "Prof. Michelle Rivera",
    department: "BUS",
    level: "300",
    credits: 3,
    requirementType: "Elective",
    sbc: "SBS",
    majorFit: { TSM: "Management elective", Biochemistry: "Elective only" },
    prerequisite: "Upper division standing recommended",
    reservedSeats: "5 reserved seats for Business students",
    status: "Available",
    workload: "Medium",
    time: { days: "Thu", start: "6:00 PM", end: "8:50 PM", location: "Harriman Hall 137" },
    evaluation: { enrolled: 88, responses: 41, rating: 4.0, grades: { A: 31, B: 28, C: 20, DF: 9 } },
    dna: { workload: "Moderate", grading: "Case and exam mix", exam: "Medium", discussion: "High", clarity: "Moderate", comments: "Students mention practical cases and manageable but steady weekly work." },
    catalog: "Marketing course focused on consumer behavior, strategy, and applied business analysis.",
    ai: "BUS 348 may support a management oriented TSM pathway, but it does not replace core EST requirements.",
    impact: "This course can support career preparation but should not delay required major courses.",
    backups: ["EST 392", "EST 393", "PSY 103"]
  },
  {
    id: "PSY103",
    code: "PSY 103",
    title: "Introduction to Psychology",
    instructor: "Dr. Olivia Grant",
    department: "PSY",
    level: "100",
    credits: 3,
    requirementType: "SBC",
    sbc: "SBS",
    majorFit: { TSM: "SBC or user research support", Biochemistry: "SBC option" },
    prerequisite: "None",
    reservedSeats: "Open general seats",
    status: "Available",
    workload: "Low",
    time: { days: "Tue Thu", start: "9:30 AM", end: "10:50 AM", location: "Javits Lecture Center 100" },
    evaluation: { enrolled: 280, responses: 110, rating: 4.0, grades: { A: 90, B: 88, C: 70, DF: 32 } },
    dna: { workload: "Low", grading: "Exam and quiz based", exam: "Medium", discussion: "Low", clarity: "High", comments: "Students describe the course as broad, clear, and useful for understanding behavior." },
    catalog: "Survey course introducing psychological concepts, research, and human behavior.",
    ai: "PSY 103 can satisfy SBS and may help students who need a lighter SBC course.",
    impact: "This course can fill an SBC category without strongly affecting major sequence planning.",
    backups: ["POL 102", "MUS 105", "AAS 102"]
  },
  {
    id: "WRT102",
    code: "WRT 102",
    title: "Intermediate Writing Workshop",
    instructor: "Prof. Sarah Bennett",
    department: "WRT",
    level: "100",
    credits: 3,
    requirementType: "Writing",
    sbc: "WRT",
    majorFit: { TSM: "Required writing foundation", Biochemistry: "Required writing foundation" },
    prerequisite: "WRT 101 or placement",
    reservedSeats: "Open writing seats by placement group",
    status: "Available",
    workload: "Medium",
    time: { days: "Tue Thu", start: "11:00 AM", end: "12:20 PM", location: "Humanities Building 201" },
    evaluation: { enrolled: 155, responses: 64, rating: 4.0, grades: { A: 63, B: 50, C: 30, DF: 12 } },
    dna: { workload: "Moderate", grading: "Draft and revision based", exam: "Low", discussion: "Medium", clarity: "High", comments: "Students say revision feedback is helpful but deadlines require planning." },
    catalog: "Required writing course focused on argument, evidence, revision, and academic research writing.",
    ai: "WRT 102 should be completed early because it supports future upper division writing and communication tasks.",
    impact: "Delaying WRT 102 can affect later writing in the discipline planning.",
    backups: ["WRT 101", "EST 304", "Summer WRT 102"]
  }
]

const roadmaps = {
  TSM: {
    name: "Technological Systems Management",
    summary: "TSM planning combines writing, math, natural science, EST core, technical support, specialization, and senior project requirements.",
    years: [
      { year: "Year 1", focus: "Focus on SBC completion, introductory major courses, writing, math, and basic academic adjustment.", courses: ["WRT102", "MAT123", "EST194", "EST202", "BIO201"], advice: "Check math placement early because delayed math can affect AMS 151 and AMS 161." },
      { year: "Year 2", focus: "Start major foundation courses and check prerequisite chains early.", courses: ["AMS151", "AMS161", "EST207", "EST240", "ECE101", "MEC104"], advice: "Balance project courses with technical courses to avoid workload concentration." },
      { year: "Year 3", focus: "Prioritize upper division major courses, specialization courses, and internship preparation.", courses: ["EST304", "EST320", "EST331", "BUS348", "CSE114"], advice: "Confirm upper division credits and technical specialization progress before senior year." },
      { year: "Year 4", focus: "Complete remaining requirements, confirm graduation audit, and prepare career or graduate school materials.", courses: ["EST331", "BUS348", "WRT102"], advice: "Do not leave writing, capstone, or specialization requirements unresolved in the final semester." }
    ]
  },
  Biochemistry: {
    name: "Biochemistry",
    summary: "Biochemistry planning depends on biology, chemistry, calculus, laboratory sequence, advanced biology, and writing in the discipline.",
    years: [
      { year: "Year 1", focus: "Focus on introductory chemistry, biology, writing, calculus preparation, and basic academic adjustment.", courses: ["WRT102", "BIO201", "CHE131", "CHE132", "MAT123"], advice: "Complete CHE 131 and BIO 201 early to protect the science sequence." },
      { year: "Year 2", focus: "Start major foundation courses and check prerequisite chains early.", courses: ["BIO202", "CHE132", "AMS151", "AMS161"], advice: "Avoid combining too many high workload STEM courses in one term." },
      { year: "Year 3", focus: "Prioritize upper division major courses, laboratory work, and prerequisite dependent courses.", courses: ["BIO361", "BIO202", "CHE132"], advice: "BIO 361 should be taken after strong biology and chemistry preparation." },
      { year: "Year 4", focus: "Complete remaining advanced electives, confirm graduation audit, and prepare research or career materials.", courses: ["BIO361", "WRT102"], advice: "Confirm remaining advanced biology, chemistry, and writing in the discipline requirements." }
    ]
  }
}

const personas = [
  {
    name: "Jihoon",
    issue: "Language barrier and discomfort asking repeated advisor questions",
    need: "Culturally and linguistically supportive guidance",
    feature: "Guided Language Support and Advisor Ready Evidence Pack"
  },
  {
    name: "Kevin",
    issue: "Cannot verify prerequisites, SBC, and major requirements in one place",
    need: "Clear academic requirement verification",
    feature: "Integrated Course Search and AI Guided Planner"
  },
  {
    name: "Thomas",
    issue: "Needs quick comparison of open, closed, waitlist, and reserved seats",
    need: "Faster course availability decisions",
    feature: "Seat status filter and Visual Timetable Builder"
  },
  {
    name: "Looche",
    issue: "Needs trustworthy comparison of workload and grading styles",
    need: "Course evaluation comparison",
    feature: "Course Evaluation DNA"
  },
  {
    name: "Inso",
    issue: "Needs long term planning after returning from a break",
    need: "Future pathway planning",
    feature: "Pathway Planner and Degree Audit Preview"
  }
]

function qs(selector) {
  return document.querySelector(selector)
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector))
}

function tr(key) {
  return translations[currentLang][key] || translations.en[key] || key
}

function lang(en, ko) {
  return currentLang === "ko" ? ko : en
}

function getCourse(id = selectedCourseId) {
  return courses.find(course => course.id === id) || courses[0]
}

function getRoadmap() {
  return roadmaps[selectedMajor] || roadmaps.TSM
}

function statusClass(status) {
  if (status === "Available") return "safe"
  if (status === "Waitlist") return "warning"
  return "danger"
}

function riskLevel(course) {
  if (course.status === "Closed" || course.workload === "High" || course.requirementType === "Prerequisite") return "High"
  if (course.status === "Waitlist" || course.reservedSeats.toLowerCase().includes("reserved")) return "Medium"
  return "Low"
}

function isMajorFit(course) {
  const fit = course.majorFit[selectedMajor === "TSM" ? "TSM" : "Biochemistry"] || ""
  return !fit.toLowerCase().includes("not") && !fit.toLowerCase().includes("elective only")
}

function getFilteredCourses() {
  const searchInput = qs("#courseSearchInput")
  const departmentFilter = qs("#departmentFilter")
  const requirementFilter = qs("#requirementFilter")
  const seatFilter = qs("#seatFilter")
  const workloadFilter = qs("#workloadFilter")
  const query = searchInput ? searchInput.value.trim().toLowerCase() : ""
  const dept = departmentFilter ? departmentFilter.value : "All"
  const requirement = requirementFilter ? requirementFilter.value : "All"
  const seat = seatFilter ? seatFilter.value : "All"
  const workload = workloadFilter ? workloadFilter.value : "All"

  return courses.filter(course => {
    const haystack = [
      course.code,
      course.title,
      course.instructor,
      course.department,
      course.requirementType,
      course.sbc,
      course.status,
      course.workload,
      course.prerequisite,
      course.majorFit.TSM,
      course.majorFit.Biochemistry
    ].join(" ").toLowerCase()

    const queryMatch = !query || haystack.includes(query)
    const deptMatch = dept === "All" || course.department === dept
    const requirementMatch = requirement === "All" || course.requirementType === requirement || course.sbc.includes(requirement)
    const seatMatch = seat === "All" || course.status === seat || (seat === "Reserved" && course.reservedSeats.toLowerCase().includes("reserved"))
    const workloadMatch = workload === "All" || course.workload === workload

    return queryMatch && deptMatch && requirementMatch && seatMatch && workloadMatch
  })
}

function applyTranslations() {
  qsa("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n
    element.textContent = tr(key)
  })

  const input = qs("#courseSearchInput")
  if (input) input.placeholder = tr("searchPlaceholder")

  const englishButton = qs("#englishButton")
  const koreanButton = qs("#koreanButton")
  if (englishButton) englishButton.classList.toggle("active-lang", currentLang === "en")
  if (koreanButton) koreanButton.classList.toggle("active-lang", currentLang === "ko")
}

function renderDashboard() {
  const main = qs("#mainContent")
  main.innerHTML = `
    <section class="page active-page">
      <div class="page-title">
        <h2>${lang("Dashboard", "대시보드")}</h2>
        <p>${lang("ZOLAR is designed as an integrated course planning prototype rather than a simple course catalog.", "ZOLAR는 단순한 course catalog가 아니라 통합 수강 계획 프로토타입으로 설계되었습니다.")}</p>
      </div>

      <div class="disclaimer-card">${tr("projectNotice")}</div>

      <div class="grid three">
        <div class="card">
          <h3>${lang("Integrated Course Search", "통합 과목 검색")}</h3>
          <p>${lang("Students can view available courses, compare evaluation data, check requirements, identify conflicts, and receive planning suggestions in one place.", "학생은 한곳에서 수강 가능 과목, 강의 평가, 요건, 시간표 충돌, 계획 제안을 함께 확인할 수 있습니다.")}</p>
        </div>
        <div class="card">
          <h3>${lang("Evaluation DNA Inside Search", "검색 안의 강의 평가 DNA")}</h3>
          <p>${lang("Course Evaluation DNA is embedded in each course detail view rather than separated into another menu.", "Course Evaluation DNA는 별도 메뉴가 아니라 각 과목 상세 화면 안에 포함됩니다.")}</p>
        </div>
        <div class="card">
          <h3>${lang("Future Consequence Planning", "미래 결과 계획")}</h3>
          <p>${lang("The Pathway Planner explains how a single course can affect later prerequisites, major requirements, and graduation timing.", "Pathway Planner는 하나의 과목이 이후 선수 과목, 전공 요건, 졸업 시기에 어떤 영향을 주는지 보여줍니다.")}</p>
        </div>
      </div>

      <div class="card">
        <h3>${lang("Prototype Overview", "프로토타입 개요")}</h3>
        <p>${lang("ZOLAR responds to persona needs by connecting course search, requirement verification, course evaluation data, scheduling options, and long term pathway planning. The central screen is Integrated Course Search, where course cards show catalog details, prerequisites, SBC and major requirement relevance, reserved seats, evaluation summary, possible pathway impact, and backup options.", "ZOLAR는 과목 검색, 요건 확인, 강의 평가 자료, 시간표 선택지, 장기 수강 경로 계획을 연결하여 페르소나의 필요에 대응합니다. 중심 화면은 통합 과목 검색이며, 각 과목 카드는 카탈로그 정보, 선수 조건, SBC와 전공 요건, reserved seats, 강의 평가 요약, 수강 경로 영향, 대체 선택지를 보여줍니다.")}</p>
      </div>

      <div class="feature-chip-wrap">
        <span>Integrated Course Search</span>
        <span>Course Evaluation DNA</span>
        <span>AI Guided Planner</span>
        <span>Visual Timetable</span>
        <span>Backup Options</span>
        <span>Pathway Planner</span>
        <span>Advisor Evidence Pack</span>
        <span>Guided Language Support</span>
      </div>

      <button class="primary-button" data-go="search" type="button">${lang("Start Course Search", "과목 검색 시작")}</button>
    </section>
  `
}

function renderPersonas() {
  const main = qs("#mainContent")
  main.innerHTML = `
    <section class="page active-page">
      <div class="page-title">
        <h2>${lang("Persona Needs Analysis", "페르소나 필요 분석")}</h2>
        <p>${lang("The prototype compares different student needs and connects each need to a specific ZOLAR feature.", "이 프로토타입은 서로 다른 학생 필요를 비교하고 각 필요를 ZOLAR 기능과 연결합니다.")}</p>
      </div>

      <div class="grid two">
        ${personas.map(persona => `
          <div class="card persona-card">
            <h3>${persona.name}</h3>
            <p><strong>${lang("Problem", "문제")}:</strong> ${persona.issue}</p>
            <p><strong>${lang("Need", "필요")}:</strong> ${persona.need}</p>
            <p><strong>${lang("ZOLAR feature", "ZOLAR 기능")}:</strong> ${persona.feature}</p>
          </div>
        `).join("")}
      </div>

      <div class="card consequence-box">
        <h3>${lang("Critical and Comparative Analysis", "비교 분석")}</h3>
        <p>Overall, the persona comparison shows that ZOLAR must respond to different types of student needs rather than treating all users as the same. Jihoon needs culturally and linguistically supportive guidance, Kevin needs clearer academic requirement verification, Thomas needs faster course availability decisions, Looche needs trustworthy course evaluation comparisons, and Inso needs long term pathway planning. These differences justify a unified course planning platform that combines search, evaluation, scheduling, and advising support in one visual system.</p>
      </div>

      <div class="card">
        <h3>${lang("Power Distance Logic", "Power Distance 논리")}</h3>
        <p>High power distance students may need support because they can feel uncomfortable challenging advisors, asking repeated questions, or expressing confusion directly. For them, ZOLAR provides Guided Language Support and Advisor Ready Evidence Pack. Low power distance students may be more comfortable contacting advisors, but they still benefit from ZOLAR because it reduces information overload and makes course comparison more efficient. Both groups use ZOLAR for different reasons.</p>
      </div>
    </section>
  `
}

function renderSearch() {
  const main = qs("#mainContent")
  main.innerHTML = `
    <section class="page active-page">
      <div class="page-title">
        <h2>${lang("Integrated Course Search", "통합 과목 검색")}</h2>
        <p>${lang("All supported sample courses are displayed first. Search or filter by course code, title, instructor, requirement, availability, or workload.", "검색 전에도 지원되는 모든 예시 과목이 먼저 표시됩니다. 과목 코드, 제목, 교수, 요건, 좌석 상태, workload로 검색하거나 필터링할 수 있습니다.")}</p>
      </div>

      <div class="search-panel">
        <div class="search-row">
          <div>
            <label>${lang("Search course", "과목 검색")}</label>
            <input id="courseSearchInput" type="text" placeholder="${tr("searchPlaceholder")}" />
          </div>
          <div>
            <label>${lang("Department", "학과")}</label>
            <select id="departmentFilter">${departments.map(item => `<option value="${item}">${item === "All" ? lang("All departments", "모든 학과") : item}</option>`).join("")}</select>
          </div>
          <div>
            <label>${lang("Requirement", "요건")}</label>
            <select id="requirementFilter">${requirements.map(item => `<option value="${item}">${item === "All" ? lang("All requirements", "모든 요건") : item}</option>`).join("")}</select>
          </div>
          <div>
            <label>${lang("Seat status", "좌석 상태")}</label>
            <select id="seatFilter">${seatFilters.map(item => `<option value="${item}">${item === "All" ? lang("All seat status", "모든 좌석 상태") : item}</option>`).join("")}</select>
          </div>
          <div>
            <label>${lang("Workload", "Workload")}</label>
            <select id="workloadFilter">${workloadFilters.map(item => `<option value="${item}">${item === "All" ? lang("All workloads", "모든 workload") : item}</option>`).join("")}</select>
          </div>
        </div>
      </div>

      <div class="search-layout">
        <div class="result-list">
          <div class="result-header">
            <div>
              <h3>${lang("Search Results", "검색 결과")}</h3>
              <p>${lang("Click a course to update the integrated decision panel.", "과목을 클릭하면 통합 결정 패널이 바뀝니다.")}</p>
            </div>
            <select id="majorInSearch">
              <option value="TSM" ${selectedMajor === "TSM" ? "selected" : ""}>TSM</option>
              <option value="Biochemistry" ${selectedMajor === "Biochemistry" ? "selected" : ""}>Biochemistry</option>
            </select>
          </div>
          <div id="courseList"></div>
        </div>
        <div id="courseDetail" class="result-detail"></div>
      </div>
    </section>
  `

  bindSearchEvents()
  updateCourseList()
  renderCourseDetail()
}

function bindSearchEvents() {
  ["courseSearchInput", "departmentFilter", "requirementFilter", "seatFilter", "workloadFilter"].forEach(id => {
    const element = qs(`#${id}`)
    if (element) element.addEventListener("input", updateCourseList)
    if (element) element.addEventListener("change", updateCourseList)
  })

  const majorSelect = qs("#majorInSearch")
  if (majorSelect) {
    majorSelect.addEventListener("change", event => {
      selectedMajor = event.target.value
      renderCourseDetail()
      updateCourseList()
    })
  }
}

function updateCourseList() {
  const container = qs("#courseList")
  if (!container) return

  const filtered = getFilteredCourses()
  const list = filtered.length ? filtered : courses

  container.innerHTML = list.map(course => `
    <article class="result-card ${course.id === selectedCourseId ? "active" : ""}" data-course="${course.id}">
      <div class="result-title-row">
        <div>
          <h4>${course.code}</h4>
          <p class="course-title">${course.title}</p>
        </div>
        <span class="badge ${statusClass(course.status)}">${course.status}</span>
      </div>
      <p>${course.instructor} · ${course.time.days} · ${course.time.start} to ${course.time.end}</p>
      <p><strong>SBC:</strong> ${course.sbc} · <strong>${lang("Workload", "Workload")}:</strong> ${course.workload}</p>
      <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>
      <p><strong>${lang("Pathway", "수강 경로")}:</strong> ${course.majorFit[selectedMajor]}</p>
    </article>
  `).join("")

  qsa("[data-course]").forEach(card => {
    card.addEventListener("click", () => {
      selectedCourseId = card.dataset.course
      updateCourseList()
      renderCourseDetail()
    })
  })
}

function renderCourseDetail() {
  const detail = qs("#courseDetail")
  if (!detail) return

  const course = getCourse()
  const risk = riskLevel(course)
  const inPlan = plannedCourses.includes(course.id)

  detail.innerHTML = `
    <div class="detail-hero">
      <div>
        <h3>${course.code} ${course.title}</h3>
        <p>${course.instructor} · ${selectedTerm} · ${course.time.days} · ${course.time.start} to ${course.time.end} · ${course.time.location}</p>
      </div>
      <span class="badge ${statusClass(course.status)}">${course.status}</span>
    </div>

    <div class="metric-grid">
      <div class="metric"><strong>${course.evaluation.enrolled}</strong><span>${lang("Enrolled", "수강 인원")}</span></div>
      <div class="metric"><strong>${course.evaluation.responses}</strong><span>${lang("Responses", "응답 수")}</span></div>
      <div class="metric"><strong>${course.evaluation.rating}</strong><span>${lang("Rating", "평점")}</span></div>
      <div class="metric"><strong>${course.evaluation.grades.A}</strong><span>${lang("A grades", "A 성적")}</span></div>
    </div>

    <div class="detail-section">
      <h4>${lang("Catalog and Requirement Check", "카탈로그와 요건 확인")}</h4>
      <p>${course.catalog}</p>
      <p><strong>${lang("Credits", "학점")}:</strong> ${course.credits}</p>
      <p><strong>${lang("Prerequisite", "선수 조건")}:</strong> ${course.prerequisite}</p>
      <p><strong>SBC:</strong> ${course.sbc}</p>
      <p><strong>${lang("Major requirement", "전공 요건")}:</strong> ${course.majorFit[selectedMajor]}</p>
      <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>
    </div>

    <div class="detail-section">
      <h4>${lang("Course Evaluation DNA", "강의 평가 DNA")}</h4>
      <div class="grid two compact-grid">
        <p><strong>${lang("Workload", "Workload")}:</strong> ${course.dna.workload}</p>
        <p><strong>${lang("Grading style", "채점 방식")}:</strong> ${course.dna.grading}</p>
        <p><strong>${lang("Exam difficulty", "시험 난이도")}:</strong> ${course.dna.exam}</p>
        <p><strong>${lang("Discussion level", "토론 수준")}:</strong> ${course.dna.discussion}</p>
        <p><strong>${lang("Clarity", "명확성")}:</strong> ${course.dna.clarity}</p>
      </div>
      <p><strong>${lang("Student comments summary", "학생 의견 요약")}:</strong> ${course.dna.comments}</p>
      ${renderGradeBars(course)}
    </div>

    <div class="detail-section consequence-box">
      <h4>${lang("AI Guided Planner", "AI 수강 계획 도우미")}</h4>
      <p>${course.ai}</p>
      <p><strong>${lang("Detected risk", "감지된 위험")}:</strong> ${risk}</p>
      <p><strong>${lang("Future academic consequence", "미래 학업 결과")}:</strong> ${course.impact}</p>
      <ul>${course.consequences.map(item => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="detail-section">
      <h4>${lang("Recommended Backup Options", "추천 대체 선택지")}</h4>
      <div class="feature-chip-wrap">${course.backups.map(item => `<span>${item}</span>`).join("")}</div>
    </div>

    <div class="detail-actions">
      <button class="primary-button" data-action="togglePlan" type="button">${inPlan ? lang("Drop from Timetable", "시간표에서 제거") : lang("Add to Timetable", "시간표에 추가")}</button>
      <button data-action="audit" type="button">${lang("Check Degree Audit", "Degree Audit 확인")}</button>
      <button data-go="pathway" type="button">${lang("Open Pathway Planner", "수강 경로 계획 열기")}</button>
      <button data-go="advisor" type="button">${lang("Prepare Advisor Evidence", "어드바이저 보고서 준비")}</button>
    </div>

    <div class="detail-section">
      <h4>${lang("Visual Timetable Builder", "시각 시간표 빌더")}</h4>
      <p>${lang("Add and drop courses directly while checking time conflicts and workload concentration.", "시간 충돌과 workload 집중도를 확인하며 과목을 직접 추가하거나 제거할 수 있습니다.")}</p>
      <button id="simulateMoveButton" type="button">${lang("Simulate Drag and Drop", "드래그 앤 드롭 시뮬레이션")}</button>
      <div class="timetable-wrap integrated-timetable">
        <div class="timetable-card"><div id="timetableGrid" class="timetable-grid"></div></div>
        <div class="side-panel">
          <h4>${lang("Schedule Summary", "시간표 요약")}</h4>
          <div id="scheduleSummary"></div>
          <h4>${lang("Schedule Stress", "시간표 부담")}</h4>
          <div id="heatmap" class="heatmap"></div>
        </div>
      </div>
    </div>
  `

  bindDetailEvents()
  renderTimetable()
}

function renderGradeBars(course) {
  const total = course.evaluation.enrolled || 1
  return `
    <div class="grade-table-wrap">
      ${Object.entries(course.evaluation.grades).map(([grade, count]) => {
        const width = Math.round((count / total) * 100)
        return `
          <div class="grade-row">
            <span>${grade === "DF" ? "D or F" : grade}</span>
            <div class="grade-bar"><b style="width:${width}%"></b></div>
            <strong>${count} ${lang("students", "명")}</strong>
          </div>
        `
      }).join("")}
    </div>
  `
}

function bindDetailEvents() {
  const toggleButton = qs("[data-action='togglePlan']")
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      if (plannedCourses.includes(selectedCourseId)) {
        plannedCourses = plannedCourses.filter(id => id !== selectedCourseId)
      } else {
        plannedCourses.push(selectedCourseId)
      }
      renderCourseDetail()
    })
  }

  const auditButton = qs("[data-action='audit']")
  if (auditButton) {
    auditButton.addEventListener("click", openDegreeAudit)
  }

  const moveButton = qs("#simulateMoveButton")
  if (moveButton) {
    moveButton.addEventListener("click", () => {
      scheduleShifted = !scheduleShifted
      renderTimetable()
    })
  }
}

function renderTimetable() {
  const grid = qs("#timetableGrid")
  const summary = qs("#scheduleSummary")
  const heatmap = qs("#heatmap")
  if (!grid || !summary || !heatmap) return

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"]

  let html = `<div class="time"></div>`
  days.forEach(day => html += `<div class="day">${day}</div>`)

  times.forEach(time => {
    html += `<div class="time">${time}</div>`
    days.forEach(day => {
      const blocks = plannedCourses.map(getCourse).filter(course => course.time.days.includes(day) && toTimeSlot(course.time.start) === time)
      html += `<div class="slot">`
      if (blocks.length) {
        blocks.forEach(course => {
          html += `
            <div class="block ${riskLevel(course) === "High" ? "red" : "blue"} ${scheduleShifted ? "moved" : ""}">
              <strong>${course.code}</strong><br>
              ${course.time.start} to ${course.time.end}<br>
              ${course.time.location}
              <button data-drop-course="${course.id}" type="button">${lang("Drop", "제거")}</button>
            </div>
          `
        })
      } else {
        html += `<button data-add-selected="true" type="button">${lang("Add", "추가")}</button>`
      }
      html += `</div>`
    })
  })

  grid.innerHTML = html

  summary.innerHTML = plannedCourses.length ? plannedCourses.map(id => {
    const course = getCourse(id)
    return `<p><strong>${course.code}</strong> · ${course.time.days} · ${course.time.start} to ${course.time.end} · ${course.time.location}</p>`
  }).join("") : `<p>${tr("noCourses")}</p>`

  const heavy = plannedCourses.map(getCourse).filter(course => course.workload === "High").length
  const risk = plannedCourses.map(getCourse).some(course => course.status !== "Available")
  const levels = heavy >= 2 ? ["high", "mid", "high", "mid", "low"] : risk ? ["mid", "high", "mid", "low", "low"] : ["low", "mid", "mid", "low", "low"]
  heatmap.innerHTML = levels.map(level => `<span class="${level}"></span>`).join("")

  qsa("[data-drop-course]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation()
      plannedCourses = plannedCourses.filter(id => id !== button.dataset.dropCourse)
      renderCourseDetail()
    })
  })

  qsa("[data-add-selected]").forEach(button => {
    button.addEventListener("click", () => {
      if (!plannedCourses.includes(selectedCourseId)) plannedCourses.push(selectedCourseId)
      renderCourseDetail()
    })
  })
}

function toTimeSlot(start) {
  if (start.startsWith("9")) return "9 AM"
  if (start.startsWith("10")) return "10 AM"
  if (start.startsWith("11")) return "11 AM"
  if (start.startsWith("12")) return "12 PM"
  if (start.startsWith("1")) return "1 PM"
  if (start.startsWith("2")) return "2 PM"
  if (start.startsWith("3")) return "3 PM"
  if (start.startsWith("4")) return "4 PM"
  if (start.startsWith("5")) return "5 PM"
  if (start.startsWith("6")) return "6 PM"
  if (start.startsWith("7")) return "7 PM"
  if (start.startsWith("8")) return "8 PM"
  return "9 AM"
}

function renderPathway() {
  const main = qs("#mainContent")
  const roadmap = getRoadmap()
  const course = getCourse()

  main.innerHTML = `
    <section class="page active-page">
      <div class="page-title">
        <h2>${lang("Pathway Planner", "수강 경로 계획")}</h2>
        <p>${lang("This page shows what students should prioritize each year and how one course decision can affect future semesters.", "이 페이지는 각 학년에 무엇을 우선해야 하는지, 그리고 하나의 과목 선택이 미래 학기에 어떤 영향을 줄 수 있는지 보여줍니다.")}</p>
      </div>

      <div class="card roadmap-control">
        <div>
          <h3>${roadmap.name}</h3>
          <p>${roadmap.summary}</p>
        </div>
        <select id="majorPathwaySelect">
          <option value="TSM" ${selectedMajor === "TSM" ? "selected" : ""}>Technological Systems Management</option>
          <option value="Biochemistry" ${selectedMajor === "Biochemistry" ? "selected" : ""}>Biochemistry</option>
        </select>
      </div>

      <div class="roadmap-grid">
        ${roadmap.years.map(year => `
          <div class="roadmap-card">
            <span>${year.year}</span>
            <h3>${year.focus}</h3>
            <div class="roadmap-courses">
              ${year.courses.map(id => {
                const c = getCourse(id)
                return `<button class="${id === selectedCourseId ? "selected-roadmap-course" : ""}" data-roadmap-course="${id}" type="button">${c.code}</button>`
              }).join("")}
            </div>
            <p>${year.advice}</p>
          </div>
        `).join("")}
      </div>

      <div class="grid two">
        <div class="card degree-impact-card">
          <h3>${lang("Selected Course Impact", "선택 과목 영향")}</h3>
          <p><strong>${course.code} ${course.title}</strong></p>
          <p>${course.impact}</p>
          <p><strong>${lang("Major fit", "전공 적합성")}:</strong> ${course.majorFit[selectedMajor]}</p>
        </div>
        <div class="card consequence-box">
          <h3>${lang("Possible Consequences", "가능한 결과")}</h3>
          ${course.consequences.map(item => `<div class="consequence-item"><strong>${item}</strong><p>${course.ai}</p></div>`).join("")}
        </div>
      </div>
    </section>
  `

  const select = qs("#majorPathwaySelect")
  if (select) {
    select.addEventListener("change", event => {
      selectedMajor = event.target.value
      renderPathway()
    })
  }

  qsa("[data-roadmap-course]").forEach(button => {
    button.addEventListener("click", () => {
      selectedCourseId = button.dataset.roadmapCourse
      renderPathway()
    })
  })
}

function renderAdvisor() {
  const main = qs("#mainContent")
  const course = getCourse()
  const office = course.requirementType === "Major" || course.requirementType === "Prerequisite" ? "Academic and Transfer Advising Services and the department coordinator" : "Academic Advising Office"

  main.innerHTML = `
    <section class="page active-page">
      <div class="page-title">
        <h2>${lang("Advisor Ready Evidence Pack", "어드바이저 제출용 근거 패키지")}</h2>
        <p>${lang("This report helps students contact the correct human support office with specific evidence.", "이 보고서는 학생이 구체적인 근거를 가지고 적절한 지원 부서에 연락하도록 돕습니다.")}</p>
      </div>

      <div class="card">
        <h3>${lang("Selected course", "선택 과목")}</h3>
        <p><strong>${course.code} ${course.title}</strong> · ${course.instructor} · ${course.time.days} · ${course.time.start} to ${course.time.end}</p>

        <h3>${lang("Detected issue", "감지된 문제")}</h3>
        <p>${course.ai}</p>

        <h3>${lang("Requirement evidence", "요건 근거")}</h3>
        <p><strong>${lang("Prerequisite", "선수 조건")}:</strong> ${course.prerequisite}</p>
        <p><strong>SBC:</strong> ${course.sbc}</p>
        <p><strong>${lang("Major fit", "전공 적합성")}:</strong> ${course.majorFit[selectedMajor]}</p>
        <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>

        <h3>${lang("Possible consequences", "가능한 결과")}</h3>
        ${course.consequences.map(item => `<div class="consequence-item"><strong>${item}</strong><p>${course.impact}</p></div>`).join("")}

        <h3>${lang("Backup options", "대체 선택지")}</h3>
        <ul>${course.backups.map(item => `<li>${item}</li>`).join("")}</ul>

        <h3>${lang("Prepared email draft", "이메일 초안")}</h3>
        <div class="email-box">
          Dear ${office},<br><br>
          I am reviewing ${course.code} ${course.title} for ${selectedTerm}. ZOLAR shows that this course may affect my ${roadmaps[selectedMajor].name} pathway. The detected issue is: ${course.ai}<br><br>
          Could you confirm whether this course fits my prerequisite status, SBC requirement, major requirement, and graduation sequence?<br><br>
          Thank you.
        </div>

        <button id="sendAdvisorDraft" class="primary-button" type="button">${lang("Send Draft", "초안 보내기")}</button>
        <div id="sendStatus"></div>
      </div>
    </section>
  `

  const button = qs("#sendAdvisorDraft")
  if (button) {
    button.addEventListener("click", () => {
      qs("#sendStatus").innerHTML = `<div class="sent-box">${tr("sentMessage")}</div>`
    })
  }
}

function openDegreeAudit() {
  const modal = qs("#degreeModal")
  const content = qs("#degreeAuditContent")
  const course = getCourse()
  const roadmap = getRoadmap()
  if (!modal || !content) return

  content.innerHTML = `
    <div class="audit-grid">
      <div class="audit-box">
        <h3>${lang("Student Record", "학생 기록")}</h3>
        <p><strong>${lang("Student", "학생")}:</strong> Kevin Ruiz</p>
        <p><strong>${lang("Major", "전공")}:</strong> ${roadmap.name}</p>
        <p><strong>GPA:</strong> 3.18</p>
        <p><strong>${lang("Credits completed", "이수 학점")}:</strong> 45</p>
      </div>
      <div class="audit-box">
        <h3>${lang("Selected Course Fit", "선택 과목 적용 여부")}</h3>
        <p><strong>${course.code}</strong> ${course.title}</p>
        <p>${course.majorFit[selectedMajor]}</p>
        <p>${course.impact}</p>
      </div>
      <div class="audit-box">
        <h3>${lang("Requirement Progress", "요건 진행 상황")}</h3>
        <p>Writing: 70 percent complete</p>
        <p>Math or quantitative sequence: 45 percent complete</p>
        <p>Major foundation: 50 percent complete</p>
        <p>SBC categories: 60 percent complete</p>
      </div>
      <div class="audit-box">
        <h3>${lang("Advisor Note", "어드바이저 참고")}</h3>
        <p>${course.ai}</p>
      </div>
    </div>
  `

  modal.classList.remove("hidden")
}

function showPage(page) {
  currentPage = page
  qsa(".nav").forEach(button => button.classList.toggle("active", button.dataset.page === page))

  if (page === "dashboard") renderDashboard()
  if (page === "personas") renderPersonas()
  if (page === "search") renderSearch()
  if (page === "pathway") renderPathway()
  if (page === "advisor") renderAdvisor()
}

function sendChatMessage(text) {
  const messages = qs("#chatMessages")
  if (!messages || !text.trim()) return

  const course = getCourse()
  const lower = text.toLowerCase()
  let answer = "I can help with prerequisites, SBC, major requirements, workload, pathway risk, and advisor next steps."

  if (lower.includes("prereq") || lower.includes("선수")) answer = `${course.code} prerequisite: ${course.prerequisite}`
  if (lower.includes("sbc")) answer = `${course.code} SBC: ${course.sbc}`
  if (lower.includes("workload") || lower.includes("과제")) answer = `${course.code} workload is ${course.workload}. Student pattern: ${course.dna.comments}`
  if (lower.includes("path") || lower.includes("roadmap") || lower.includes("경로")) answer = `${course.code} pathway impact: ${course.impact}`
  if (lower.includes("advisor") || lower.includes("어드바이저")) answer = `Prepare an Advisor Evidence Pack for ${course.code}. It will include prerequisite, SBC, major fit, risk, consequences, and a draft message.`

  messages.innerHTML += `<div class="chatbot-message user">${text}</div>`
  messages.innerHTML += `<div class="chatbot-message bot">${answer}</div>`
  messages.scrollTop = messages.scrollHeight
}

function bindGlobalEvents() {
  qsa(".nav").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page))
  })

  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]")
    if (go) showPage(go.dataset.go)
  })

  const signIn = qs("#signInButton")
  if (signIn) {
    signIn.addEventListener("click", () => {
      qs("#loginScreen").classList.add("hidden")
      qs("#app").classList.remove("hidden")
      showPage("dashboard")
    })
  }

  const signOut = qs("#signOutButton")
  if (signOut) {
    signOut.addEventListener("click", () => {
      qs("#app").classList.add("hidden")
      qs("#loginScreen").classList.remove("hidden")
    })
  }

  const userMenu = qs("#userMenuButton")
  if (userMenu) userMenu.addEventListener("click", () => qs("#userDropdown").classList.toggle("hidden"))

  const noticeButton = qs("#noticeButton")
  const messageButton = qs("#messageButton")
  if (noticeButton) noticeButton.addEventListener("click", () => {
    qs("#noticePanel").classList.toggle("hidden")
    qs("#messagePanel").classList.add("hidden")
  })
  if (messageButton) messageButton.addEventListener("click", () => {
    qs("#messagePanel").classList.toggle("hidden")
    qs("#noticePanel").classList.add("hidden")
  })

  const englishButton = qs("#englishButton")
  const koreanButton = qs("#koreanButton")
  if (englishButton) englishButton.addEventListener("click", () => {
    currentLang = "en"
    applyTranslations()
    showPage(currentPage)
  })
  if (koreanButton) koreanButton.addEventListener("click", () => {
    currentLang = "ko"
    applyTranslations()
    showPage(currentPage)
  })

  const closeDegree = qs("#closeDegreeModal")
  if (closeDegree) closeDegree.addEventListener("click", () => qs("#degreeModal").classList.add("hidden"))

  const openChat = qs("#openChatButton")
  const closeChat = qs("#closeChatButton")
  const sendChat = qs("#sendChatButton")
  const chatInput = qs("#chatInput")

  if (openChat) openChat.addEventListener("click", () => {
    const panel = qs("#chatPanel")
    panel.classList.toggle("hidden")
    if (!panel.classList.contains("hidden") && qs("#chatMessages").innerHTML.trim() === "") {
      qs("#chatMessages").innerHTML = `<div class="chatbot-message bot">${tr("chatbotWelcome")}</div>`
    }
  })
  if (closeChat) closeChat.addEventListener("click", () => qs("#chatPanel").classList.add("hidden"))
  if (sendChat && chatInput) sendChat.addEventListener("click", () => {
    sendChatMessage(chatInput.value)
    chatInput.value = ""
  })
  if (chatInput) chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendChatMessage(chatInput.value)
      chatInput.value = ""
    }
  })
}

function init() {
  applyTranslations()
  bindGlobalEvents()
  renderDashboard()
}

document.addEventListener("DOMContentLoaded", init)

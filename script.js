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
    degreeIntro: "This prototype shows how Degree Works style information could support registration decisions. It is not an official degree audit.",
    projectNotice: "This is a student class project prototype. It is not an official Stony Brook University or SOLAR website.",
    searchPlaceholder: "Search by course, title, instructor, SBC, major, seat, workload",
    chatbotWelcome: "Hi. I can explain prerequisites, reserved seats, workload, SBC requirements, major requirements, pathway risk, and advisor next steps.",
    sentMessage: "Draft sent to Academic and Transfer Advising Services and the department coordinator in this prototype."
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
    degreeIntro: "이 화면은 Degree Works 방식의 정보를 수강신청 결정에 활용하는 방식을 보여주는 프로토타입입니다. 공식 degree audit이 아닙니다.",
    projectNotice: "이 웹사이트는 수업 프로젝트용 프로토타입입니다. 공식 Stony Brook University 또는 SOLAR 웹사이트가 아닙니다.",
    searchPlaceholder: "과목, 제목, 교수, SBC, 전공, 좌석, workload로 검색",
    chatbotWelcome: "안녕하세요. 선수 조건, reserved seats, workload, SBC 요건, 전공 요건, 수강 경로 위험, 어드바이저 다음 단계를 설명할 수 있습니다.",
    sentMessage: "이 프로토타입에서는 Academic and Transfer Advising Services와 학과 코디네이터에게 초안이 전송된 것으로 표시됩니다."
  }
};

let currentLang = "en";
let currentPage = "dashboard";
let selectedCourseId = null;
let selectedMajor = "TSM";
let selectedTerm = "Fall 2026";
let plannedCourses = ["EST202", "EST207", "MAT123"];

const departments = ["All", "AMS", "BIO", "BUS", "CHE", "CSE", "ECE", "EST", "MAT", "MEC", "PSY", "WRT"];
const requirements = ["All", "Major", "SBC", "Prerequisite", "Writing", "Technical", "Elective"];
const seatFilters = ["All", "Available", "Closed", "Waitlist", "Reserved"];
const workloadFilters = ["All", "Low", "Medium", "High"];

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
    majorFit: { TSM: "Math prerequisite support before AMS 151", Biochemistry: "Math preparation before calculus" },
    prerequisite: "Placement level, MAP 103, or advisor confirmed equivalent",
    reservedSeats: "8 reserved seats for students in math sequence review",
    status: "Available",
    workload: "High",
    time: { days: "Mon Wed", start: "10:00 AM", end: "11:20 AM", location: "Math Tower P 131" },
    evaluation: { enrolled: 180, responses: 62, rating: 3.8, grades: { A: 48, B: 55, C: 50, DF: 27 } },
    dna: { workload: "High", grading: "Exam based grading", exam: "High", group: "Low", clarity: "Moderate", usefulness: "High", comments: "Students say the course is useful but risky when taken without enough algebra preparation." },
    catalog: "Precalculus course for students preparing for calculus and quantitative degree requirements.",
    ai: "MAT 123 may be useful as preparation, but the student should confirm whether it is the correct next step before AMS 151 or AMS 161.",
    impact: "If MAT 123 is delayed, AMS 151 and AMS 161 may move back by one semester and create a graduation sequence issue.",
    consequences: ["Possible delay in the AMS 151 and AMS 161 sequence", "Possible overload if later math courses are compressed into winter or summer", "Advisor confirmation is needed before final enrollment"],
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
    dna: { workload: "Moderate", grading: "Problem set and exam mix", exam: "Medium", group: "Low", clarity: "High", usefulness: "High", comments: "Students describe the course as manageable when weekly practice is consistent." },
    catalog: "Applied calculus course used by technology, management, and science pathways.",
    ai: "AMS 151 fits the TSM math path and can support future AMS 161 planning.",
    impact: "Taking AMS 151 on time protects the later AMS 161 sequence and reduces future scheduling pressure.",
    consequences: ["Protects the later AMS 161 requirement", "May be difficult if MAT 123 or equivalent preparation is weak", "Should be balanced with project heavy EST courses"],
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
    dna: { workload: "High", grading: "Exam heavy", exam: "High", group: "Low", clarity: "Moderate", usefulness: "High", comments: "Students recommend completing AMS 151 strongly before attempting this course." },
    catalog: "Continuation of applied calculus with quantitative methods for applied fields.",
    ai: "AMS 161 should not be selected until AMS 151 is completed or officially waived.",
    impact: "If AMS 151 is not completed first, AMS 161 can break the math sequence and delay upper division planning.",
    consequences: ["Broken prerequisite chain if AMS 151 is not completed", "Potential graduation delay if the course is only offered in limited terms", "Higher workload may conflict with upper division EST courses"],
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
    dna: { workload: "Moderate", grading: "Weekly quiz and exam mix", exam: "Medium", group: "Low", clarity: "High", usefulness: "High", comments: "Students mention clear lectures, weekly quizzes, and manageable workload." },
    catalog: "Introductory biology course covering major biological principles and scientific reasoning.",
    ai: "BIO 201 satisfies SNW and supports Biochemistry foundation planning. For TSM, it can work as a natural science requirement.",
    impact: "Taking BIO 201 early keeps the biology sequence open for BIO 202 and later laboratory work.",
    consequences: ["Supports BIO 202 and later biology courses", "May add weekly quiz pressure", "Useful for students who need SNW evidence"],
    backups: ["BIO 202 if prepared", "CHE 131", "PSY 103 for lighter SBC"]
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
    dna: { workload: "High", grading: "Frequent problem sets and exams", exam: "High", group: "Low", clarity: "Moderate", usefulness: "High", comments: "Students say chemistry is manageable only with steady weekly practice." },
    catalog: "First general chemistry course covering atomic structure, bonding, stoichiometry, and equilibrium.",
    ai: "CHE 131 supports Biochemistry and can satisfy SNW, but it should be balanced with other heavy courses.",
    impact: "CHE 131 starts the chemistry sequence required for later CHE 132 and organic chemistry.",
    consequences: ["Supports later CHE 132 and organic chemistry", "May create overload if paired with BIO 202 and AMS 161", "Requires steady weekly problem solving"],
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
    dna: { workload: "High", grading: "Exam and lab preparation", exam: "High", group: "Low", clarity: "Moderate", usefulness: "High", comments: "Students recommend not pairing it with too many demanding STEM courses." },
    catalog: "Second general chemistry course and key prerequisite for organic chemistry.",
    ai: "CHE 132 is important for Biochemistry, but it should follow CHE 131 and fit workload limits.",
    impact: "Completing CHE 132 opens the path to organic chemistry and later biochemistry.",
    consequences: ["Supports organic chemistry preparation", "Creates heavy workload with BIO 202", "Delay may affect upper division biochemistry"],
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
    dna: { workload: "Moderate", grading: "Project and participation based", exam: "Low", group: "High", clarity: "High", usefulness: "High", comments: "Students like the applied decision making format but mention group coordination." },
    catalog: "Introduces decision making methods for technology and society problems.",
    ai: "EST 194 is a strong early TSM course and supports the major foundation.",
    impact: "Taking EST 194 in Year 1 supports later EST courses and project based work.",
    consequences: ["Builds early TSM foundation", "Group work requires communication planning", "Useful before higher level EST courses"],
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
    dna: { workload: "Moderate", grading: "Writing and presentation based", exam: "Low", group: "Medium", clarity: "Moderate", usefulness: "High", comments: "Students mention useful STS concepts and moderate writing workload." },
    catalog: "Introduces social, ethical, institutional, and cultural dimensions of science and technology.",
    ai: "EST 202 fits the TSM foundation and supports later STS analysis courses.",
    impact: "Taking EST 202 early makes later EST 304, EST 331, and project based courses easier to contextualize.",
    consequences: ["Supports later upper division EST analysis", "Writing workload should be checked", "Useful for STS based project work"],
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
    dna: { workload: "Moderate", grading: "Prototype and group project based", exam: "Low", group: "High", clarity: "High", usefulness: "High", comments: "Students value prototype work but need clear project management." },
    catalog: "Project based course focused on user needs, interface design, and interaction systems.",
    ai: "EST 207 fits TSM students who need design and user experience project experience.",
    impact: "This course supports Year 2 TSM design preparation and helps connect user analysis to prototype development.",
    consequences: ["Strengthens prototype development ability", "Group project workload may increase near deadlines", "Useful for UX based TSM work"],
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
    dna: { workload: "Moderate", grading: "Website and essay based", exam: "Low", group: "Medium", clarity: "High", usefulness: "High", comments: "Students mention creative assignments and manageable grading when drafts are revised." },
    catalog: "Studies visual communication, digital media, and rhetorical design.",
    ai: "EST 240 supports TSM digital communication and portfolio building.",
    impact: "This course can strengthen Year 2 or Year 3 TSM specialization planning.",
    consequences: ["Supports digital portfolio work", "Website and essay deadlines should be planned", "Useful for visual communication skills"],
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
    dna: { workload: "Moderate", grading: "Presentation and writing based", exam: "Low", group: "High", clarity: "High", usefulness: "High", comments: "Students say feedback improves technical communication skills." },
    catalog: "Technical communication course for scientific, engineering, and professional contexts.",
    ai: "EST 304 is useful for TSM and can help with presentation or writing outcomes.",
    impact: "Taking EST 304 before senior project work can improve communication readiness.",
    consequences: ["Improves technical writing and presentation readiness", "Should be taken before advanced project work", "May support SPK requirement planning"],
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
    dna: { workload: "High", grading: "Systems project and exam mix", exam: "Medium", group: "Medium", clarity: "High", usefulness: "High", comments: "Students recommend taking it after stronger technical preparation." },
    catalog: "Upper division course on communication technology systems and their social context.",
    ai: "EST 320 can fit the TSM path but should be checked against math and technical preparation.",
    impact: "If taken without preparation, EST 320 can increase upper division workload pressure.",
    consequences: ["May create workload pressure with AMS 161", "Technical preparation should be confirmed", "Waitlist status requires backup option"],
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
    dna: { workload: "Moderate", grading: "Essay and case analysis based", exam: "Medium", group: "High", clarity: "Moderate", usefulness: "High", comments: "Students find cases useful but want clearer grading rubrics." },
    catalog: "Studies engineering ethics, AI systems, responsibility, and social impact.",
    ai: "EST 331 is important for TSM but closed status means the student should prepare a backup.",
    impact: "Missing EST 331 may affect upper division sequence and ethics requirement planning.",
    consequences: ["Closed status requires an alternative section or future term", "Ethics requirement may be delayed", "Advisor confirmation may be needed if graduation timing is tight"],
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
    dna: { workload: "Moderate", grading: "Lab and quiz based", exam: "Medium", group: "Medium", clarity: "Moderate", usefulness: "High", comments: "Students say it is a useful technical introduction but requires regular lab attention." },
    catalog: "Introductory electrical and computer engineering course used as a sample technical support course.",
    ai: "ECE 101 can support TSM technical breadth but should be balanced with other technical courses.",
    impact: "This course fits Year 2 TSM technical foundation planning.",
    consequences: ["Adds technical breadth for TSM", "Lab time should be considered", "May support later technical specialization"],
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
    dna: { workload: "Low", grading: "Project and quiz based", exam: "Low", group: "Medium", clarity: "High", usefulness: "Medium", comments: "Students like the applied format and practical examples." },
    catalog: "Introductory applied engineering course used for technical literacy and natural science planning.",
    ai: "MEC 104 is a safer technical support option when the student wants lower workload.",
    impact: "This course can help Year 1 or Year 2 TSM students complete technical breadth without overload.",
    consequences: ["Safer technical option for workload balance", "May help with SNW and TECH planning", "Does not replace upper division EST requirements"],
    backups: ["ECE 101", "EST 207", "BIO 201"]
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
    dna: { workload: "Moderate", grading: "Case and exam mix", exam: "Medium", group: "High", clarity: "Moderate", usefulness: "High", comments: "Students mention practical cases and manageable but steady weekly work." },
    catalog: "Marketing course focused on consumer behavior, strategy, and applied business analysis.",
    ai: "BUS 348 may support a management oriented TSM pathway, but it does not replace core EST requirements.",
    impact: "This course can support career preparation but should not delay required major courses.",
    consequences: ["Can support career preparation", "Evening schedule may affect commuting or work", "Should not replace required EST credits"],
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
    dna: { workload: "Low", grading: "Exam and quiz based", exam: "Medium", group: "Low", clarity: "High", usefulness: "Medium", comments: "Students describe the course as broad, clear, and useful for understanding behavior." },
    catalog: "Survey course introducing psychological concepts, research, and human behavior.",
    ai: "PSY 103 can satisfy SBS and may help students who need a lighter SBC course.",
    impact: "This course can fill an SBC category without strongly affecting major sequence planning.",
    consequences: ["Useful as a lighter SBC course", "Does not move the TSM major sequence forward", "Can reduce semester workload pressure"],
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
    dna: { workload: "Moderate", grading: "Draft and revision based", exam: "Low", group: "Medium", clarity: "High", usefulness: "High", comments: "Students say revision feedback is helpful but deadlines require planning." },
    catalog: "Required writing course focused on argument, evidence, revision, and academic research writing.",
    ai: "WRT 102 should be completed early because it supports future upper division writing and communication tasks.",
    impact: "Delaying WRT 102 can affect later writing in the discipline planning.",
    consequences: ["Supports later academic writing", "Should be completed before upper division writing intensive work", "Revision deadlines require planning"],
    backups: ["WRT 101", "EST 304", "Summer WRT 102"]
  }
];

const roadmaps = {
  TSM: {
    name: "Technological Systems Management",
    summary: "TSM planning combines writing, math, natural science, EST core, technical support, specialization, and senior project requirements.",
    years: [
      { year: "Year 1", focus: "Writing, math, SBC, and introductory EST foundation", courses: ["WRT102", "MAT123", "EST194", "EST202", "BIO201"], note: "Students should confirm writing and math placement early because delays can affect later EST and AMS planning." },
      { year: "Year 2", focus: "EST foundation, applied math, and technical support", courses: ["AMS151", "AMS161", "EST207", "EST240", "ECE101", "MEC104"], note: "This year should balance project courses with technical courses to avoid workload concentration." },
      { year: "Year 3", focus: "Upper division EST courses and specialization preparation", courses: ["EST304", "EST320", "EST331", "BUS348"], note: "Students should confirm upper division credits and technical specialization progress before senior year." },
      { year: "Year 4", focus: "Advanced EST requirements and graduation audit", courses: ["EST331", "BUS348", "WRT102"], note: "The final year should not leave writing, capstone, or specialization requirements unresolved." }
    ]
  },
  Biochemistry: {
    name: "Biochemistry",
    summary: "Biochemistry planning depends on biology, chemistry, calculus, laboratory sequence, advanced biology, and writing in the discipline.",
    years: [
      { year: "Year 1", focus: "General chemistry, biology, writing, and calculus preparation", courses: ["WRT102", "BIO201", "CHE131", "MAT123"], note: "CHE 131 and BIO 201 should be completed early to protect the science sequence." },
      { year: "Year 2", focus: "Biology and chemistry continuation with calculus", courses: ["BIO201", "CHE132", "AMS151", "AMS161"], note: "Students should avoid combining too many high workload STEM courses in the same term." },
      { year: "Year 3", focus: "Upper division biology and biochemistry preparation", courses: ["BIO201", "CHE132"], note: "Students should confirm prerequisites before advanced biology or biochemistry courses." },
      { year: "Year 4", focus: "Advanced electives, writing, and graduation audit", courses: ["WRT102", "BIO201", "CHE132"], note: "Students should confirm remaining advanced biology, chemistry, and writing requirements." }
    ]
  }
};

const personas = [
  ["Jihoon", "Language barrier and discomfort asking repeated advisor questions", "Guided Language Support and Advisor Evidence Pack"],
  ["Kevin", "Cannot verify prerequisites, SBC, and major requirements in one place", "Integrated Course Search and AI Guided Planner"],
  ["Thomas", "Needs quick comparison of open, closed, waitlist, and reserved seats", "Seat filter and Visual Timetable"],
  ["Looche", "Needs trustworthy comparison of workload and grading styles", "Course Evaluation DNA"],
  ["Inso", "Needs long term planning after returning from a break", "Pathway Planner and Degree Audit Preview"]
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

function getCourse(id = selectedCourseId) {
  if (!id) return null;
  return courses.find(course => course.id === id) || null;
}

function getMajorFit(course) {
  return course.majorFit[selectedMajor] || course.majorFit.TSM || "Elective or requirement check needed";
}

function statusClass(status) {
  return status.toLowerCase();
}

function riskLevel(course) {
  if (course.status === "Closed" || course.workload === "High" || course.requirementType === "Prerequisite") return "High";
  if (course.status === "Waitlist" || course.reservedSeats.toLowerCase().includes("reserved")) return "Medium";
  return "Low";
}

function getFilteredCourses() {
  const query = (qs("#courseSearchInput")?.value || "").trim().toLowerCase();
  const dept = qs("#departmentFilter")?.value || "All";
  const req = qs("#requirementFilter")?.value || "All";
  const seat = qs("#seatFilter")?.value || "All";
  const workload = qs("#workloadFilter")?.value || "All";

  return courses.filter(course => {
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
      getMajorFit(course)
    ].join(" ").toLowerCase();

    const matchQuery = !query || searchable.includes(query);
    const matchDept = dept === "All" || course.department === dept;
    const matchReq = req === "All" || course.requirementType === req || course.sbc.includes(req);
    const matchSeat = seat === "All" || course.status === seat || (seat === "Reserved" && course.reservedSeats.toLowerCase().includes("reserved"));
    const matchWorkload = workload === "All" || course.workload === workload;

    return matchQuery && matchDept && matchReq && matchSeat && matchWorkload;
  });
}

function applyTranslations() {
  qsa("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = tr(key);
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
  if (page === "personas") renderPersonas();
  if (page === "search") renderSearch();
  if (page === "pathway") renderPathway();
  if (page === "advisor") renderAdvisor();

  applyTranslations();
}

function renderDashboard() {
  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Dashboard", "대시보드")}</h2>
      <p>${lang("A redesigned course registration experience centered on evidence based course decisions.", "근거 중심의 수강 결정을 돕기 위해 재구성한 수강신청 프로토타입입니다.")}</p>
    </section>

    <section class="card notice-card">
      <strong>${tr("projectNotice")}</strong>
    </section>

    <section class="grid three" style="margin-top:20px">
      <article class="card">
        <h3>${lang("Integrated Course Search", "통합 과목 검색")}</h3>
        <p>${lang("Course search is the center of the prototype. It combines availability, catalog information, prerequisites, SBC, major fit, evaluation data, and advising next steps.", "과목 검색은 이 프로토타입의 중심 기능입니다. 수강 가능 여부, 카탈로그 정보, 선수 조건, SBC, 전공 적합성, 강의 평가, 상담 단계를 함께 보여줍니다.")}</p>
      </article>
      <article class="card">
        <h3>${lang("Evidence Based Course Planning", "근거 기반 수강 계획")}</h3>
        <p>${lang("Students can compare grade distribution, workload, student comment patterns, and timetable pressure before enrollment.", "학생은 수강신청 전에 성적 분포, workload, 학생 의견 패턴, 시간표 부담을 비교할 수 있습니다.")}</p>
      </article>
      <article class="card">
        <h3>${lang("Human Support Pathway", "사람의 도움으로 이어지는 경로")}</h3>
        <p>${lang("The system does not replace advisors. It prepares evidence, explains possible consequences, and helps students contact the right support office.", "이 시스템은 어드바이저를 대체하지 않습니다. 근거를 정리하고 가능한 결과를 설명하며 적절한 지원 부서에 연락하도록 돕습니다.")}</p>
      </article>
    </section>

    <section class="card" style="margin-top:20px">
      <h3>${lang("Key Features Applied", "반영된 핵심 기능")}</h3>
      <div class="chip-wrap">
        <span>Integrated Course Search</span>
        <span>Course Evaluation DNA</span>
        <span>Visual Timetable</span>
        <span>AI Guided Planner</span>
        <span>Backup Options</span>
        <span>Pathway Planner</span>
        <span>Advisor Evidence Pack</span>
        <span>Guided Language Support</span>
      </div>
      <button class="primary-button" data-go="search" type="button" style="margin-top:18px">${lang("Start Course Search", "과목 검색 시작")}</button>
    </section>
  `;
}

function renderPersonas() {
  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Persona Needs", "페르소나 필요 분석")}</h2>
      <p>${lang("Each persona need is connected to a visible prototype feature.", "각 페르소나의 필요가 실제 프로토타입 기능과 연결됩니다.")}</p>
    </section>

    <section class="card">
      <table class="persona-table">
        <thead>
          <tr>
            <th>${lang("Persona", "페르소나")}</th>
            <th>${lang("User need", "사용자 필요")}</th>
            <th>${lang("Prototype response", "프로토타입 대응")}</th>
          </tr>
        </thead>
        <tbody>
          ${personas.map(persona => `
            <tr>
              <td><strong>${persona[0]}</strong></td>
              <td>${persona[1]}</td>
              <td>${persona[2]}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>

    <section class="card consequence-box">
      <h3>${lang("Comparative Analysis Logic", "비교 분석 논리")}</h3>
      <p>${lang("The prototype does not assume that all students need the same support. Some students need language support, some need faster comparison, some need long term planning, and some need evidence before contacting an advisor. ZOLAR connects these different needs through Course Search rather than separating them into disconnected pages.", "이 프로토타입은 모든 학생이 같은 지원을 필요로 한다고 가정하지 않습니다. 어떤 학생은 언어 지원이 필요하고, 어떤 학생은 빠른 비교가 필요하며, 어떤 학생은 장기 계획이 필요하고, 어떤 학생은 어드바이저에게 연락하기 전 근거가 필요합니다. ZOLAR는 이 요구들을 분리된 페이지가 아니라 Course Search를 중심으로 연결합니다.")}</p>
    </section>
  `;
}

function renderSearch() {
  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Integrated Course Search", "통합 과목 검색")}</h2>
      <p>${lang("All supported sample courses are shown first. Use the search bar or filters to narrow the list.", "지원되는 모든 예시 과목이 먼저 표시됩니다. 검색창이나 필터를 사용해 목록을 좁힐 수 있습니다.")}</p>
    </section>

    <section class="search-panel">
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
          <select id="seatFilter">${seatFilters.map(x => `<option value="${x}">${x === "All" ? lang("All seat status", "모든 좌석 상태") : x}</option>`).join("")}</select>
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
            <h3>${lang("Search Results", "검색 결과")}</h3>
            <p>${lang("Click a course to update the integrated decision panel.", "과목을 클릭하면 통합 결정 패널이 업데이트됩니다.")}</p>
          </div>
          <select id="majorSelect">
            <option value="TSM" ${selectedMajor === "TSM" ? "selected" : ""}>TSM</option>
            <option value="Biochemistry" ${selectedMajor === "Biochemistry" ? "selected" : ""}>Biochemistry</option>
          </select>
        </div>
        <p id="courseCount" class="course-count"></p>
        <div id="courseList" class="result-list"></div>
      </div>

      <div id="courseDetail" class="result-detail"></div>
    </section>
  `;

  ["courseSearchInput", "departmentFilter", "requirementFilter", "seatFilter", "workloadFilter"].forEach(id => {
    qs("#" + id).addEventListener("input", updateCourseList);
    qs("#" + id).addEventListener("change", updateCourseList);
  });

  qs("#majorSelect").addEventListener("change", event => {
    selectedMajor = event.target.value;
    updateCourseList();
    renderCourseDetail();
  });

  updateCourseList();
  renderCourseDetail();
}

function updateCourseList() {
  const list = getFilteredCourses();
  qs("#courseCount").textContent = `${list.length} ${lang("courses shown", "개 과목 표시")}`;

  qs("#courseList").innerHTML = list.length ? list.map(course => `
    <button class="result-card ${selectedCourseId === course.id ? "active" : ""}" data-course="${course.id}" type="button">
      <div class="result-title-row">
        <div>
          <h4>${course.code}</h4>
          <p class="course-title">${course.title}</p>
        </div>
        <span class="badge ${statusClass(course.status)}">${course.status}</span>
      </div>
      <p>${course.instructor} · ${course.time.days} · ${course.time.start} to ${course.time.end}</p>
      <p><strong>SBC:</strong> ${course.sbc} · <strong>Workload:</strong> ${course.workload}</p>
      <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>
      <p><strong>${lang("Pathway", "수강 경로")}:</strong> ${getMajorFit(course)}</p>
    </button>
  `).join("") : `<div class="empty-state">${lang("No matching courses. Clear filters to return to the full list.", "일치하는 과목이 없습니다. 필터를 해제하면 전체 목록으로 돌아갑니다.")}</div>`;

  qsa("[data-course]").forEach(button => {
    button.addEventListener("click", () => {
      selectedCourseId = button.dataset.course;
      updateCourseList();
      renderCourseDetail();
    });
  });
}

function renderCourseDetail() {
  const course = getCourse();

  if (!course) {
    qs("#courseDetail").innerHTML = `
      <div class="empty-state">
        <h3>${lang("Select a course", "과목을 선택하세요")}</h3>
        <p>${lang("The integrated decision panel will show catalog information, prerequisites, evaluation DNA, AI planning advice, possible consequences, backup options, and timetable impact.", "통합 결정 패널에는 카탈로그 정보, 선수 조건, 강의 평가 DNA, AI 계획 조언, 가능한 결과, 대체 선택지, 시간표 영향이 표시됩니다.")}</p>
      </div>
    `;
    return;
  }

  const inPlan = plannedCourses.includes(course.id);
  const gradeTotal = Object.values(course.evaluation.grades).reduce((a, b) => a + b, 0);

  qs("#courseDetail").innerHTML = `
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
      <div class="metric"><strong>${riskLevel(course)}</strong><span>${lang("Risk", "위험도")}</span></div>
    </div>

    <section class="detail-section">
      <h4>${lang("Catalog and Requirement Check", "카탈로그와 요건 확인")}</h4>
      <p>${course.catalog}</p>
      <p><strong>${lang("Credits", "학점")}:</strong> ${course.credits}</p>
      <p><strong>${lang("Prerequisite", "선수 조건")}:</strong> ${course.prerequisite}</p>
      <p><strong>SBC:</strong> ${course.sbc}</p>
      <p><strong>${lang("Major fit", "전공 적합성")}:</strong> ${getMajorFit(course)}</p>
      <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>
    </section>

    <section class="detail-section">
      <h4>${lang("Course Evaluation DNA", "강의 평가 DNA")}</h4>
      <div class="dna-grid">
        <div class="dna-item"><strong>Workload</strong>${course.dna.workload}</div>
        <div class="dna-item"><strong>${lang("Grading", "채점")}</strong>${course.dna.grading}</div>
        <div class="dna-item"><strong>${lang("Exam difficulty", "시험 난이도")}</strong>${course.dna.exam}</div>
        <div class="dna-item"><strong>${lang("Group work", "그룹 과제")}</strong>${course.dna.group}</div>
        <div class="dna-item"><strong>${lang("Clarity", "명확성")}</strong>${course.dna.clarity}</div>
        <div class="dna-item"><strong>${lang("Usefulness", "유용성")}</strong>${course.dna.usefulness}</div>
      </div>
      <p><strong>${lang("Student comment pattern", "학생 의견 패턴")}:</strong> ${course.dna.comments}</p>
      ${Object.entries(course.evaluation.grades).map(([grade, count]) => `
        <div class="grade-row">
          <span>${grade === "DF" ? "D or F" : grade}</span>
          <div class="grade-bar"><span style="width:${Math.round((count / gradeTotal) * 100)}%"></span></div>
          <strong>${count}</strong>
        </div>
      `).join("")}
    </section>

    <section class="detail-section consequence-box">
      <h4>${lang("AI Guided Planner and Possible Consequences", "AI 수강 계획 도우미와 가능한 결과")}</h4>
      <p>${course.ai}</p>
      <p><strong>${lang("Future academic impact", "미래 학업 영향")}:</strong> ${course.impact}</p>
      ${course.consequences.map(item => `<div class="consequence-item">${item}</div>`).join("")}
    </section>

    <section class="detail-section">
      <h4>${lang("Backup Option Generator", "대체 선택지 생성")}</h4>
      <div class="chip-wrap">${course.backups.map(item => `<span>${item}</span>`).join("")}</div>
    </section>

    <div class="detail-actions">
      <button id="planToggleButton" class="primary-button" type="button">${inPlan ? lang("Drop from Timetable", "시간표에서 제거") : lang("Add to Timetable", "시간표에 추가")}</button>
      <button class="secondary-button" data-go="pathway" type="button">${lang("Open Pathway Planner", "수강 경로 열기")}</button>
      <button class="secondary-button" data-go="advisor" type="button">${lang("Prepare Advisor Evidence", "어드바이저 보고서 준비")}</button>
      <button id="auditButton" class="secondary-button" type="button">${lang("Degree Audit Preview", "Degree Audit 미리보기")}</button>
    </div>

    <section class="detail-section">
      <h4>${lang("Visual Timetable Builder", "시각 시간표 빌더")}</h4>
      <p>${lang("Students can add or drop courses directly and check conflicts, gaps, and workload pressure.", "학생은 과목을 직접 추가하거나 제거하면서 충돌, 공강, workload 부담을 확인할 수 있습니다.")}</p>
      <div class="timetable-wrap">
        <div id="timetable" class="timetable"></div>
      </div>
      <h4>${lang("Schedule Stress Heatmap", "시간표 부담 히트맵")}</h4>
      <div id="heatmap" class="heatmap"></div>
    </section>
  `;

  qs("#planToggleButton").addEventListener("click", () => {
    if (plannedCourses.includes(course.id)) {
      plannedCourses = plannedCourses.filter(id => id !== course.id);
    } else {
      plannedCourses.push(course.id);
    }
    renderCourseDetail();
  });

  qs("#auditButton").addEventListener("click", openDegreeAudit);
  renderTimetable();
}

function timeSlot(start) {
  if (start.startsWith("9")) return "9 AM";
  if (start.startsWith("10")) return "10 AM";
  if (start.startsWith("11")) return "11 AM";
  if (start.startsWith("12")) return "12 PM";
  if (start.startsWith("1")) return "1 PM";
  if (start.startsWith("2")) return "2 PM";
  if (start.startsWith("3")) return "3 PM";
  if (start.startsWith("4")) return "4 PM";
  if (start.startsWith("5")) return "5 PM";
  if (start.startsWith("6")) return "6 PM";
  if (start.startsWith("7")) return "7 PM";
  if (start.startsWith("8")) return "8 PM";
  return "9 AM";
}

function renderTimetable() {
  const selected = getCourse();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];

  let html = `<div class="time"></div>`;
  days.forEach(day => html += `<div class="day">${day}</div>`);

  times.forEach(time => {
    html += `<div class="time">${time}</div>`;
    days.forEach(day => {
      const blocks = plannedCourses
        .map(id => courses.find(course => course.id === id))
        .filter(Boolean)
        .filter(course => course.time.days.includes(day) && timeSlot(course.time.start) === time);

      html += `<div class="cell">`;

      if (blocks.length) {
        blocks.forEach(course => {
          const conflict = blocks.length > 1;
          const heavy = course.workload === "High";
          html += `
            <div class="class-block ${conflict ? "conflict" : ""} ${heavy ? "heavy" : ""}">
              <strong>${course.code}</strong><br>
              ${course.time.start} to ${course.time.end}<br>
              ${course.time.location}
              <button class="small-button" data-drop="${course.id}" type="button">${lang("Drop", "제거")}</button>
            </div>
          `;
        });
      } else {
        html += selected ? `<button class="small-button" data-add="${selected.id}" type="button">${lang("Add", "추가")}</button>` : "";
      }

      html += `</div>`;
    });
  });

  qs("#timetable").innerHTML = html;

  const highCount = plannedCourses.map(id => courses.find(course => course.id === id)).filter(course => course && course.workload === "High").length;
  const hasRisk = plannedCourses.map(id => courses.find(course => course.id === id)).some(course => course && course.status !== "Available");
  const levels = highCount >= 2 ? ["high", "mid", "high", "mid", "low"] : hasRisk ? ["mid", "high", "mid", "low", "low"] : ["low", "mid", "mid", "low", "low"];
  qs("#heatmap").innerHTML = levels.map(level => `<span class="${level}"></span>`).join("");

  qsa("[data-drop]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      plannedCourses = plannedCourses.filter(id => id !== button.dataset.drop);
      renderCourseDetail();
    });
  });

  qsa("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      if (!plannedCourses.includes(button.dataset.add)) plannedCourses.push(button.dataset.add);
      renderCourseDetail();
    });
  });
}

function renderPathway() {
  const roadmap = roadmaps[selectedMajor];
  const course = getCourse();

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Pathway Planner", "수강 경로 계획")}</h2>
      <p>${lang("The planner shows how current course choices may affect future semesters and graduation requirements.", "이 계획 도구는 현재 과목 선택이 미래 학기와 졸업 요건에 어떤 영향을 줄 수 있는지 보여줍니다.")}</p>
    </section>

    <section class="card roadmap-control">
      <div>
        <h3>${roadmap.name}</h3>
        <p>${roadmap.summary}</p>
      </div>
      <select id="pathwayMajorSelect">
        <option value="TSM" ${selectedMajor === "TSM" ? "selected" : ""}>TSM</option>
        <option value="Biochemistry" ${selectedMajor === "Biochemistry" ? "selected" : ""}>Biochemistry</option>
      </select>
    </section>

    <section class="roadmap-grid">
      ${roadmap.years.map(year => `
        <article class="year-card">
          <h3>${year.year}</h3>
          <p><strong>${year.focus}</strong></p>
          ${year.courses.map(id => {
            const c = courses.find(course => course.id === id);
            return c ? `<button class="small-button ${id === selectedCourseId ? "selected-course-button" : ""}" data-roadmap-course="${id}" type="button">${c.code} ${c.title}</button>` : "";
          }).join("")}
          <p>${year.note}</p>
        </article>
      `).join("")}
    </section>

    <section class="grid two" style="margin-top:20px">
      <article class="card">
        <h3>${lang("Selected Course Impact", "선택 과목 영향")}</h3>
        ${course ? `
          <p><strong>${course.code} ${course.title}</strong></p>
          <p>${course.impact}</p>
          <p><strong>${lang("Major fit", "전공 적합성")}:</strong> ${getMajorFit(course)}</p>
        ` : `<p>${lang("Select a course first in Integrated Course Search or from the roadmap.", "통합 과목 검색이나 로드맵에서 먼저 과목을 선택하세요.")}</p>`}
      </article>

      <article class="card consequence-box">
        <h3>${lang("Possible Consequences", "가능한 결과")}</h3>
        ${course ? course.consequences.map(item => `<div class="consequence-item">${item}</div>`).join("") : `<p>${lang("No course selected yet.", "아직 선택된 과목이 없습니다.")}</p>`}
      </article>
    </section>
  `;

  qs("#pathwayMajorSelect").addEventListener("change", event => {
    selectedMajor = event.target.value;
    renderPathway();
  });

  qsa("[data-roadmap-course]").forEach(button => {
    button.addEventListener("click", () => {
      selectedCourseId = button.dataset.roadmapCourse;
      renderPathway();
    });
  });
}

function renderAdvisor() {
  const course = getCourse();
  const office = course && (course.requirementType === "Major" || course.requirementType === "Prerequisite")
    ? "Academic and Transfer Advising Services and the department coordinator"
    : "Academic Advising Office";

  qs("#mainContent").innerHTML = `
    <section class="page-title">
      <h2>${lang("Advisor Ready Evidence Pack", "어드바이저 제출용 근거 패키지")}</h2>
      <p>${lang("This report helps students contact the correct human support office with specific evidence rather than vague confusion.", "이 보고서는 학생이 막연한 혼란이 아니라 구체적인 근거를 가지고 적절한 지원 부서에 연락하도록 돕습니다.")}</p>
    </section>

    ${course ? `
      <section class="card">
        <h3>${lang("Selected course", "선택 과목")}</h3>
        <p><strong>${course.code} ${course.title}</strong> · ${course.instructor} · ${course.time.days} · ${course.time.start} to ${course.time.end}</p>

        <h3>${lang("Detected issue", "감지된 문제")}</h3>
        <p>${course.ai}</p>

        <h3>${lang("Requirement evidence", "요건 근거")}</h3>
        <p><strong>${lang("Prerequisite", "선수 조건")}:</strong> ${course.prerequisite}</p>
        <p><strong>SBC:</strong> ${course.sbc}</p>
        <p><strong>${lang("Major fit", "전공 적합성")}:</strong> ${getMajorFit(course)}</p>
        <p><strong>${lang("Reserved seats", "Reserved seats")}:</strong> ${course.reservedSeats}</p>

        <h3>${lang("Possible consequences", "가능한 결과")}</h3>
        ${course.consequences.map(item => `<div class="consequence-item">${item}</div>`).join("")}

        <h3>${lang("Backup options", "대체 선택지")}</h3>
        <div class="chip-wrap">${course.backups.map(item => `<span>${item}</span>`).join("")}</div>

        <h3>${lang("Prepared email draft", "이메일 초안")}</h3>
        <div class="email-box">Dear ${office},

I am reviewing ${course.code} ${course.title} for ${selectedTerm}. ZOLAR shows that this course may affect my ${roadmaps[selectedMajor].name} pathway.

Detected issue:
${course.ai}

Could you confirm whether this course fits my prerequisite status, SBC requirement, major requirement, reserved seat status, and graduation sequence?

Thank you.</div>

        <button id="sendAdvisorDraft" class="primary-button" type="button">${lang("Send Draft", "초안 보내기")}</button>
        <div id="sendStatus"></div>
      </section>
    ` : `
      <section class="card empty-state">
        <h3>${lang("No course selected", "선택된 과목 없음")}</h3>
        <p>${lang("Select a course in Integrated Course Search first. Then this page will generate an advisor ready report.", "먼저 통합 과목 검색에서 과목을 선택하세요. 그러면 이 페이지가 어드바이저 제출용 보고서를 생성합니다.")}</p>
        <button class="primary-button" data-go="search" type="button">${lang("Go to Course Search", "과목 검색으로 이동")}</button>
      </section>
    `}
  `;

  const sendButton = qs("#sendAdvisorDraft");
  if (sendButton) {
    sendButton.addEventListener("click", () => {
      qs("#sendStatus").innerHTML = `<div class="sent-box">${tr("sentMessage")}</div>`;
    });
  }
}

function openDegreeAudit() {
  const course = getCourse();
  const modal = qs("#degreeModal");
  const content = qs("#degreeAuditContent");

  content.innerHTML = `
    <div class="audit-grid">
      <div class="audit-box">
        <h3>${lang("Student Record", "학생 기록")}</h3>
        <p><strong>${lang("Student", "학생")}:</strong> Kevin Ruiz</p>
        <p><strong>${lang("Major", "전공")}:</strong> ${roadmaps[selectedMajor].name}</p>
        <p><strong>GPA:</strong> 3.18</p>
        <p><strong>${lang("Credits completed", "이수 학점")}:</strong> 45</p>
      </div>

      <div class="audit-box">
        <h3>${lang("Requirement Progress", "요건 진행 상황")}</h3>
        <p>Writing: 70 percent complete</p>
        <p>Math or quantitative sequence: 45 percent complete</p>
        <p>Major foundation: 50 percent complete</p>
        <p>SBC categories: 60 percent complete</p>
      </div>

      <div class="audit-box">
        <h3>${lang("Selected Course Fit", "선택 과목 적용 여부")}</h3>
        ${course ? `<p><strong>${course.code}</strong> ${course.title}</p><p>${getMajorFit(course)}</p><p>${course.impact}</p>` : `<p>${lang("Select a course to check how it may apply to the degree audit.", "과목을 선택하면 degree audit 적용 가능성을 확인할 수 있습니다.")}</p>`}
      </div>

      <div class="audit-box">
        <h3>${lang("Advisor Note", "어드바이저 참고")}</h3>
        <p>${course ? course.ai : lang("Degree audit information can guide planning, but students should confirm unusual sequence or transfer questions with an advisor.", "Degree audit 정보는 계획을 도울 수 있지만, 특이한 수강 순서나 편입 관련 질문은 어드바이저에게 확인해야 합니다.")}</p>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function sendChatMessage(text) {
  const messages = qs("#chatMessages");
  if (!text.trim()) return;

  const course = getCourse();
  const lower = text.toLowerCase();
  let answer = tr("chatbotWelcome");

  if (course) {
    if (lower.includes("prereq") || lower.includes("선수")) answer = `${course.code} prerequisite: ${course.prerequisite}`;
    else if (lower.includes("sbc")) answer = `${course.code} SBC: ${course.sbc}`;
    else if (lower.includes("workload") || lower.includes("과제")) answer = `${course.code} workload is ${course.workload}. ${course.dna.comments}`;
    else if (lower.includes("path") || lower.includes("roadmap") || lower.includes("경로")) answer = `${course.code} pathway impact: ${course.impact}`;
    else if (lower.includes("advisor") || lower.includes("어드바이저")) answer = `Use the Advisor Evidence Pack for ${course.code}. It includes prerequisite, SBC, major fit, risks, consequences, backup options, and an email draft.`;
    else answer = `${course.code}: ${course.ai}`;
  }

  messages.innerHTML += `<div class="chatbot-message user">${text}</div>`;
  messages.innerHTML += `<div class="chatbot-message bot">${answer}</div>`;
  messages.scrollTop = messages.scrollHeight;
}

function bindGlobalEvents() {
  qsa(".nav").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go) showPage(go.dataset.go);
  });

  qs("#signInButton").addEventListener("click", () => {
    qs("#loginScreen").classList.add("hidden");
    qs("#app").classList.remove("hidden");
    showPage("dashboard");
  });

  qs("#signOutButton").addEventListener("click", () => {
    qs("#app").classList.add("hidden");
    qs("#loginScreen").classList.remove("hidden");
  });

  qs("#userMenuButton").addEventListener("click", () => {
    qs("#userDropdown").classList.toggle("hidden");
  });

  qs("#noticeButton").addEventListener("click", () => {
    qs("#noticePanel").classList.toggle("hidden");
    qs("#messagePanel").classList.add("hidden");
  });

  qs("#messageButton").addEventListener("click", () => {
    qs("#messagePanel").classList.toggle("hidden");
    qs("#noticePanel").classList.add("hidden");
  });

  qs("#englishButton").addEventListener("click", () => {
    currentLang = "en";
    showPage(currentPage);
  });

  qs("#koreanButton").addEventListener("click", () => {
    currentLang = "ko";
    showPage(currentPage);
  });

  qs("#closeDegreeModal").addEventListener("click", () => {
    qs("#degreeModal").classList.add("hidden");
  });

  qs("#degreeModal").addEventListener("click", event => {
    if (event.target.id === "degreeModal") qs("#degreeModal").classList.add("hidden");
  });

  qs("#openChatButton").addEventListener("click", () => {
    qs("#chatPanel").classList.toggle("hidden");
    if (!qs("#chatPanel").classList.contains("hidden") && qs("#chatMessages").innerHTML.trim() === "") {
      qs("#chatMessages").innerHTML = `<div class="chatbot-message bot">${tr("chatbotWelcome")}</div>`;
    }
  });

  qs("#closeChatButton").addEventListener("click", () => {
    qs("#chatPanel").classList.add("hidden");
  });

  qs("#sendChatButton").addEventListener("click", () => {
    const input = qs("#chatInput");
    sendChatMessage(input.value);
    input.value = "";
  });

  qs("#chatInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendChatMessage(event.target.value);
      event.target.value = "";
    }
  });
}

function init() {
  bindGlobalEvents();
  applyTranslations();
  renderDashboard();
}

document.addEventListener("DOMContentLoaded", init);

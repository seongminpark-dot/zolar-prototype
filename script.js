const state = {
  currentLang: "en",
  currentPage: "dashboard",
  selectedCourseId: "BIO 201",
  selectedTerm: "Fall 2026",
  selectedMajor: "Technological Systems Management",
  plannedCourses: ["WRT 102", "AMS 151", "EST 202", "EST 194"],
  moved: false
}

const translations = {
  en: {
    prototypeLabel: "Course Registration Support",
    navDashboard: "Dashboard",
    navSearch: "Course Search",
    navCatalog: "Course Catalog",
    navTimetable: "Visual Timetable",
    navEvaluation: "Course Evaluation",
    navPathway: "Course Pathway",
    navAdvisor: "Advisor Report",
    navAssistant: "AI Guided Planner",
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "A redesigned course registration experience for safer, clearer, and more evidence based course decisions.",
    degreeWorksTitle: "Degree Works Audit Preview",
    degreeWorksText: "ZOLAR connects course decisions to a Degree Works style audit preview, showing the student’s major, GPA, completed requirements, missing requirements, and whether a selected course helps complete a degree requirement.",
    openDegreeWorks: "Open Audit Preview",
    needOneTitle: "Integrated Course Decision Hub",
    needOneText: "When a student searches for one course, ZOLAR combines registration status, catalog information, course evaluation patterns, SBC category, timetable fit, four year roadmap impact, possible consequences, and advisor next steps on one decision page.",
    needTwoTitle: "Four Year Degree Roadmap",
    needTwoText: "The prototype shows how a selected course fits into a sample four year plan for Biochemistry or Technological Systems Management.",
    needThreeTitle: "Decision Assistant With Consequences",
    needThreeText: "When a course may create a sequence, workload, seat, or graduation risk, ZOLAR explains possible consequences and suggests a safer next step before enrollment.",
    scenarioTitle: "Student Scenario Context",
    scenarioText: "This prototype is designed for students comparing course registration choices across degree requirements, SBC categories, course evaluation data, timetable pressure, and advisor support.",
    keyFeaturesTitle: "Key Features Included",
    startSearch: "Start Course Search",
    searchTitle: "Course Search",
    searchSubtitle: "Search courses and review registration status, catalog information, evaluation data, SBC category, roadmap impact, possible consequences, timetable fit, and advisor support in one screen.",
    searchCourseLabel: "Search course",
    departmentLabel: "Department",
    levelLabel: "Course Level",
    termLabel: "Term",
    searchButton: "Search",
    clearFilters: "Clear all",
    searchResultsTitle: "Search Results",
    emptySearchTitle: "Search for a course",
    emptySearchText: "Enter a course code or name to view catalog information, evaluation data, pathway risk, timetable options, and advisor support.",
    catalogTitle: "Course Catalog and SBC Explorer",
    catalogSubtitle: "Search sample catalog courses, review credits and prerequisites, and explore SBC general education categories.",
    timetableTitle: "Visual Timetable Builder",
    timetableSubtitle: "Add and drop courses directly from the weekly timetable while checking schedule pressure and time conflicts.",
    simulateDrag: "Simulate Drag and Drop",
    returnSearch: "Return to Course Search",
    schedulePanelTitle: "Schedule Summary",
    stressTitle: "Schedule Stress Heatmap",
    evaluationTitle: "Course Evaluation DNA",
    evaluationSubtitle: "Evaluation data is translated into decision categories such as workload, exam difficulty, grading fairness, clarity, group work, and usefulness.",
    pathwayTitle: "Course Pathway and Four Year Roadmap",
    pathwaySubtitle: "Review how a selected course affects preparation, current registration, future semesters, and the student’s four year degree plan.",
    advisorTitle: "Advisor Ready Evidence Pack",
    advisorSubtitle: "Create a short advisor report with the selected course, detected rule, degree path risk, possible consequences, alternatives, and an email draft.",
    assistantTitle: "AI Guided Planning Assistant",
    assistantSubtitle: "The assistant does not replace human advising. It identifies the registration problem, explains the likely rule, shows possible consequences, suggests safer alternatives, and prepares the student to contact the correct support office.",
    notificationTitle: "Notifications",
    notificationEmpty: "No new notifications.",
    messageTitle: "Messages",
    messageEmpty: "No new messages.",
    degreeWorksModalTitle: "Degree Works Audit Preview",
    degreeWorksModalNote: "This prototype does not replace Degree Works. It shows how a course registration system could use degree audit style information before a student confirms enrollment.",
    studentRecordTitle: "Student Record",
    requirementProgressTitle: "Requirement Progress",
    selectedCourseFitTitle: "Selected Course Fit",
    advisorNoteTitle: "Advisor Note",
    advisorNoteText: "Degree audit information can guide planning, but students should confirm unusual sequence or transfer questions with an advisor."
  },
  ko: {
    prototypeLabel: "수강신청 지원 시스템",
    navDashboard: "대시보드",
    navSearch: "과목 검색",
    navCatalog: "과목 카탈로그",
    navTimetable: "시각 시간표",
    navEvaluation: "강의 평가",
    navPathway: "수강 경로",
    navAdvisor: "어드바이저 보고서",
    navAssistant: "AI 수강 계획 도우미",
    dashboardTitle: "대시보드",
    dashboardSubtitle: "더 안전하고 명확하며 근거 중심적인 수강 결정을 위한 수강신청 개선 프로토타입입니다.",
    degreeWorksTitle: "Degree Works 감사 미리보기",
    degreeWorksText: "ZOLAR는 과목 선택을 Degree Works 방식의 졸업요건 감사 정보와 연결하여 학생의 전공, GPA, 충족된 요건, 남은 요건, 선택한 과목이 졸업요건에 적용되는지를 보여줍니다.",
    openDegreeWorks: "감사 미리보기 열기",
    needOneTitle: "통합 과목 결정 허브",
    needOneText: "학생이 하나의 과목을 검색하면 ZOLAR는 수강 상태, 카탈로그 정보, 강의 평가 패턴, SBC 카테고리, 시간표 적합성, 4년 로드맵 영향, 가능한 결과, 어드바이저 다음 단계를 한 화면에 보여줍니다.",
    needTwoTitle: "4년 학위 로드맵",
    needTwoText: "이 프로토타입은 선택한 과목이 Biochemistry 또는 Technological Systems Management 예시 4년 계획에 어떻게 들어가는지 보여줍니다.",
    needThreeTitle: "결과를 보여주는 의사결정 도우미",
    needThreeText: "과목이 수강 순서, 과제량, 좌석 제한, 졸업 위험을 만들 수 있을 때, ZOLAR는 수강 확정 전에 가능한 결과와 더 안전한 다음 단계를 설명합니다.",
    scenarioTitle: "학생 시나리오 맥락",
    scenarioText: "이 프로토타입은 학생이 졸업요건, SBC 카테고리, 강의 평가, 시간표 부담, 어드바이저 지원을 함께 비교하며 수강 결정을 내리는 상황을 보여줍니다.",
    keyFeaturesTitle: "포함된 주요 기능",
    startSearch: "과목 검색 시작",
    searchTitle: "과목 검색",
    searchSubtitle: "수강 상태, 카탈로그 정보, 강의 평가, SBC 카테고리, 로드맵 영향, 가능한 결과, 시간표 적합성, 어드바이저 지원을 한 화면에서 확인합니다.",
    searchCourseLabel: "과목 검색",
    departmentLabel: "학과",
    levelLabel: "과목 레벨",
    termLabel: "학기",
    searchButton: "검색",
    clearFilters: "전체 초기화",
    searchResultsTitle: "검색 결과",
    emptySearchTitle: "과목을 검색하세요",
    emptySearchText: "과목 코드나 이름을 입력하면 카탈로그 정보, 강의 평가, 수강 경로 위험, 시간표 선택지, 어드바이저 지원을 볼 수 있습니다.",
    catalogTitle: "과목 카탈로그와 SBC 탐색",
    catalogSubtitle: "예시 카탈로그 과목을 검색하고 학점, 선수 과목, SBC 교양 카테고리를 확인합니다.",
    timetableTitle: "시각 시간표",
    timetableSubtitle: "주간 시간표에서 과목을 직접 추가하거나 삭제하면서 시간표 부담과 시간 충돌을 확인합니다.",
    simulateDrag: "드래그 앤 드롭 시뮬레이션",
    returnSearch: "과목 검색으로 돌아가기",
    schedulePanelTitle: "시간표 요약",
    stressTitle: "시간표 부담 히트맵",
    evaluationTitle: "강의 평가 DNA",
    evaluationSubtitle: "강의 평가 자료를 과제량, 시험 난이도, 채점 공정성, 명확성, 그룹 활동, 유용성 같은 결정 기준으로 바꿔 보여줍니다.",
    pathwayTitle: "수강 경로와 4년 로드맵",
    pathwaySubtitle: "선택한 과목이 준비 과정, 현재 수강신청, 미래 학기, 4년 학업 계획에 어떤 영향을 주는지 검토합니다.",
    advisorTitle: "어드바이저 제출용 근거 패키지",
    advisorSubtitle: "선택 과목, 감지된 규칙, 졸업 경로 위험, 가능한 결과, 대안, 이메일 초안을 포함한 짧은 보고서를 만듭니다.",
    assistantTitle: "AI 수강 계획 도우미",
    assistantSubtitle: "이 도우미는 사람의 advising을 대체하지 않습니다. 등록 문제를 파악하고 가능한 규칙을 설명하며, 가능한 결과를 보여주고, 더 안전한 대안을 제시하고 학생이 적절한 지원 부서에 연락할 수 있도록 준비시킵니다.",
    notificationTitle: "알림",
    notificationEmpty: "새로운 알림이 없습니다.",
    messageTitle: "메시지",
    messageEmpty: "새로운 메시지가 없습니다.",
    degreeWorksModalTitle: "Degree Works 감사 미리보기",
    degreeWorksModalNote: "이 프로토타입은 Degree Works를 대체하지 않습니다. 학생이 수강을 확정하기 전에 수강신청 시스템이 degree audit 방식의 정보를 어떻게 활용할 수 있는지 보여줍니다.",
    studentRecordTitle: "학생 기록",
    requirementProgressTitle: "요건 진행 상황",
    selectedCourseFitTitle: "선택 과목 적용 여부",
    advisorNoteTitle: "어드바이저 참고 사항",
    advisorNoteText: "Degree audit 정보는 계획을 도울 수 있지만, 특이한 수강 순서나 transfer 질문은 어드바이저와 확인해야 합니다."
  }
}

const courseList = [
  c("WRT 101", "Introductory Writing Workshop", "WRT", "100", 3, "Writing foundation course that prepares students for university level academic writing.", "Placement or program requirement.", ["WRT"], "Humanities Building 201", "Mon Wed", "9:00 AM", "10:20 AM", "Available", 168, 68, 4.1, 70, 55, 31, 12, "Moderate", "Medium", "Positive", "Low", "High"),
  c("WRT 102", "Intermediate Writing Workshop", "WRT", "100", 3, "Required writing course focused on argument, evidence, revision, and academic research writing.", "WRT 101 or writing placement.", ["WRT"], "Humanities Building 201", "Tue Thu", "11:00 AM", "12:20 PM", "Available", 155, 64, 4.0, 63, 50, 30, 12, "Moderate", "Medium", "Positive", "Low", "High"),
  c("FYS 101", "First Year Seminar I", "FYS", "100", 1, "First year transition seminar for academic planning and campus engagement.", "First year standing.", [], "Academic Building A 110", "Fri", "9:00 AM", "9:50 AM", "Available", 28, 22, 4.4, 18, 7, 2, 1, "Low", "Low", "Positive", "Moderate", "High"),
  c("FYS 102", "First Year Seminar II", "FYS", "100", 1, "Second first year seminar focused on academic planning and university transition.", "FYS 101 or first year standing.", [], "Academic Building A 110", "Fri", "10:00 AM", "10:50 AM", "Available", 26, 20, 4.3, 16, 7, 2, 1, "Low", "Low", "Positive", "Moderate", "High"),

  c("AMS 151", "Applied Calculus I", "AMS", "100", 3, "Applied calculus course used for quantitative preparation in several science, technology, and management pathways.", "Appropriate math placement or prerequisite preparation.", ["QPS"], "Engineering Building 143", "Tue Thu", "2:00 PM", "3:20 PM", "Available", 240, 95, 4.1, 88, 76, 52, 24, "Moderate", "Medium", "Positive", "Low", "High"),
  c("AMS 161", "Applied Calculus II", "AMS", "100", 3, "Continuation of applied calculus with methods used in quantitative fields.", "AMS 151 or equivalent calculus preparation.", ["QPS"], "Engineering Building 143", "Mon Wed", "3:30 PM", "4:50 PM", "Prerequisite Sensitive", 210, 80, 3.9, 68, 70, 49, 23, "High", "High", "Mixed Positive", "Low", "Moderate"),
  c("MAT 123", "Precalculus", "MAT", "100", 3, "Precalculus preparation for students who need stronger preparation before calculus.", "Placement or prior math preparation.", ["QPS"], "Math Tower P 131", "Mon Wed", "10:00 AM", "11:20 AM", "Sequence Risk", 180, 62, 3.8, 48, 55, 50, 27, "High", "High", "Mixed", "Low", "Moderate"),
  c("MAT 125", "Calculus A", "MAT", "100", 3, "First course in the MAT 125, MAT 126, MAT 127 calculus sequence.", "Appropriate math placement or MAT 123.", ["QPS"], "Math Tower P 131", "Tue Thu", "9:30 AM", "10:50 AM", "Available", 230, 82, 3.9, 75, 72, 55, 28, "Moderate High", "High", "Mixed Positive", "Low", "Moderate"),
  c("MAT 126", "Calculus B", "MAT", "100", 3, "Second course in the MAT 125, MAT 126, MAT 127 calculus sequence.", "MAT 125 or equivalent.", ["QPS"], "Math Tower P 131", "Mon Wed", "12:30 PM", "1:50 PM", "Prerequisite Sensitive", 218, 75, 3.8, 66, 70, 55, 27, "High", "High", "Mixed", "Low", "Moderate"),
  c("MAT 127", "Calculus C", "MAT", "100", 3, "Third course in the MAT 125, MAT 126, MAT 127 calculus sequence.", "MAT 126 or equivalent.", ["QPS"], "Math Tower P 131", "Tue Thu", "12:30 PM", "1:50 PM", "Prerequisite Sensitive", 190, 68, 3.8, 58, 61, 49, 22, "High", "High", "Mixed", "Low", "Moderate"),
  c("MAT 131", "Calculus I", "MAT", "100", 4, "Calculus I option for students in STEM pathways.", "Appropriate math placement or prerequisite preparation.", ["QPS"], "Math Tower P 131", "Mon Wed Fri", "9:00 AM", "9:50 AM", "Available", 265, 105, 3.9, 83, 85, 62, 35, "Moderate High", "High", "Mixed Positive", "Low", "Moderate"),
  c("MAT 132", "Calculus II", "MAT", "100", 4, "Calculus II option for students in STEM pathways.", "MAT 131 or equivalent.", ["QPS"], "Math Tower P 131", "Mon Wed Fri", "10:00 AM", "10:50 AM", "Prerequisite Sensitive", 238, 92, 3.8, 70, 77, 61, 30, "High", "High", "Mixed", "Low", "Moderate"),

  c("BIO 201", "Fundamentals of Biology: Organisms to Ecosystems", "BIO", "200", 3, "Biology course emphasizing organisms, ecosystems, evolution, and biological systems.", "Introductory biology preparation recommended.", ["SNW"], "Life Sciences Building 038", "Mon Wed Fri", "9:00 AM", "9:50 AM", "Available", 220, 86, 4.2, 84, 70, 42, 24, "Moderate", "Medium", "Positive", "Low", "High"),
  c("BIO 202", "Fundamentals of Biology: Molecular and Cellular Biology", "BIO", "200", 3, "Biology course focused on molecular and cellular processes.", "Introductory biology or chemistry preparation recommended.", ["STEM+"], "Life Sciences Building 038", "Tue Thu", "12:30 PM", "1:50 PM", "Available", 190, 71, 4.1, 66, 58, 44, 22, "Moderate High", "Medium", "Positive", "Low", "High"),
  c("BIO 203", "Fundamentals of Biology: Cellular and Organ Physiology", "BIO", "200", 3, "Biology course focused on physiology and organismal systems.", "BIO 202 or equivalent preparation recommended.", ["STEM+"], "Life Sciences Building 038", "Mon Wed", "2:30 PM", "3:50 PM", "High Workload", 174, 68, 3.9, 52, 54, 43, 25, "High", "High", "Mixed", "Low", "Moderate"),
  c("BIO 204", "Fundamentals of Scientific Inquiry in Biology I", "BIO", "200", 2, "Biology laboratory course emphasizing scientific inquiry and biological investigation.", "BIO 201 or BIO 202 recommended.", [], "Life Sciences Building 102", "Wed", "2:00 PM", "4:50 PM", "Limited Seats", 96, 40, 4.0, 35, 30, 21, 10, "Moderate High", "Medium", "Positive", "High", "Moderate High"),
  c("BIO 205", "Fundamentals of Scientific Inquiry in Biology II", "BIO", "200", 2, "Second biology laboratory course in scientific inquiry.", "BIO 204 or equivalent laboratory preparation.", [], "Life Sciences Building 102", "Thu", "2:00 PM", "4:50 PM", "Limited Seats", 88, 34, 3.8, 26, 28, 22, 12, "High", "Medium", "Mixed", "High", "Moderate"),
  c("BIO 207", "Fundamentals of Scientific Inquiry in Biology II B", "BIO", "200", 2, "Alternative second biology laboratory course.", "BIO 204 or equivalent preparation.", [], "Life Sciences Building 102", "Fri", "1:00 PM", "3:50 PM", "Limited Seats", 82, 31, 3.9, 27, 25, 20, 10, "Moderate High", "Medium", "Mixed Positive", "High", "Moderate"),
  c("BIO 310", "Cell Biology", "BIO", "300", 3, "Advanced course on cellular structures, functions, and mechanisms.", "BIO 202 and related biology preparation.", [], "Life Sciences Building 038", "Tue Thu", "11:00 AM", "12:20 PM", "Prerequisite Sensitive", 120, 48, 3.9, 36, 38, 30, 16, "High", "High", "Mixed Positive", "Low", "Moderate"),
  c("BIO 320", "General Genetics", "BIO", "300", 3, "Advanced course on genetics and heredity.", "BIO 201 and BIO 202 recommended.", [], "Life Sciences Building 038", "Mon Wed", "4:00 PM", "5:20 PM", "Available", 130, 52, 4.0, 43, 39, 31, 17, "Moderate High", "High", "Mixed Positive", "Low", "Moderate"),
  c("BIO 361", "Biochemistry I", "BIO", "300", 3, "First course in the biochemistry sequence.", "BIO 202 and organic chemistry sequence preparation.", [], "Life Sciences Building 038", "Mon Wed", "11:30 AM", "12:50 PM", "High Workload", 142, 55, 3.7, 36, 43, 39, 24, "Very High", "High", "Mixed", "Low", "Moderate"),
  c("BIO 362", "Biochemistry II", "BIO", "300", 3, "Second course in the biochemistry sequence.", "BIO 361.", [], "Life Sciences Building 038", "Tue Thu", "10:30 AM", "11:50 AM", "Prerequisite Sensitive", 136, 50, 3.8, 38, 40, 36, 22, "High", "High", "Mixed Positive", "Low", "Moderate"),
  c("BIO 365", "Biochemistry Laboratory", "BIO", "300", 3, "Advanced laboratory course for biochemistry majors.", "BIO 361 and laboratory preparation.", ["ESI"], "Life Sciences Building 108", "Fri", "9:00 AM", "11:50 AM", "Limited Seats", 72, 28, 3.8, 21, 22, 18, 11, "High", "Medium High", "Mixed", "High", "Moderate"),
  c("BIO 458", "Speak Effectively in Biology", "BIO", "400", 0, "Biology speaking requirement support course.", "Corequisite with approved biology course.", ["SPK"], "Life Sciences Building 210", "Thu", "5:00 PM", "5:50 PM", "Corequisite Sensitive", 45, 20, 4.1, 20, 14, 8, 3, "Low", "Low", "Positive", "Moderate", "High"),
  c("BIO 459", "Write Effectively in Biology", "BIO", "400", 0, "Biology writing in the discipline support course.", "Corequisite with approved upper division biology or chemistry course.", ["WRTD"], "Life Sciences Building 210", "Wed", "5:00 PM", "5:50 PM", "Corequisite Sensitive", 52, 23, 4.0, 21, 16, 10, 5, "Moderate", "Low", "Positive", "Low", "High"),

  c("CHE 131", "General Chemistry I", "CHE", "100", 4, "General chemistry course for science majors.", "Math placement or chemistry placement may be required.", ["SNW"], "Chemistry Building 100", "Tue Thu", "11:00 AM", "12:20 PM", "High Workload", 310, 130, 3.6, 72, 90, 96, 52, "Very High", "High", "Mixed", "Low", "Moderate"),
  c("CHE 132", "General Chemistry II", "CHE", "100", 4, "Second general chemistry course for science majors.", "CHE 131 or equivalent.", ["SNW"], "Chemistry Building 100", "Tue Thu", "11:00 AM", "12:20 PM", "Prerequisite Sensitive", 295, 115, 3.8, 79, 85, 86, 45, "High", "High", "Mixed Positive", "Low", "Moderate"),
  c("CHE 133", "General Chemistry Laboratory I", "CHE", "100", 1, "Laboratory course accompanying general chemistry.", "CHE 131 or corequisite.", [], "Chemistry Lab 120", "Wed", "1:00 PM", "3:50 PM", "Limited Seats", 140, 55, 3.9, 42, 44, 35, 19, "Moderate High", "Medium", "Mixed Positive", "High", "Moderate"),
  c("CHE 134", "General Chemistry Laboratory II", "CHE", "100", 1, "Second laboratory course accompanying general chemistry.", "CHE 132 or corequisite.", [], "Chemistry Lab 120", "Thu", "1:00 PM", "3:50 PM", "Limited Seats", 128, 50, 3.8, 38, 41, 32, 17, "Moderate High", "Medium", "Mixed", "High", "Moderate"),
  c("CHE 321", "Organic Chemistry I", "CHE", "300", 4, "First course in the organic chemistry sequence.", "CHE 132 or equivalent.", ["STEM+"], "Chemistry Building 130", "Mon Wed", "10:00 AM", "11:20 AM", "High Workload", 190, 70, 3.5, 42, 55, 62, 31, "Very High", "High", "Mixed", "Low", "Moderate"),
  c("CHE 322", "Organic Chemistry II", "CHE", "300", 4, "Second course in the organic chemistry sequence.", "CHE 321.", [], "Chemistry Building 130", "Tue Thu", "10:00 AM", "11:20 AM", "Prerequisite Sensitive", 175, 64, 3.6, 44, 51, 55, 25, "Very High", "High", "Mixed", "Low", "Moderate"),
  c("CHE 327", "Organic Chemistry Laboratory", "CHE", "300", 2, "Laboratory course in organic chemistry techniques.", "CHE 321 and CHE 322 sequence preparation.", [], "Chemistry Lab 220", "Fri", "1:00 PM", "4:50 PM", "Limited Seats", 82, 29, 3.7, 24, 25, 21, 12, "High", "Medium High", "Mixed", "High", "Moderate"),
  c("CHE 301", "Physical Chemistry I", "CHE", "300", 3, "Physical chemistry option for science majors.", "Calculus and chemistry preparation.", ["STEM+"], "Chemistry Building 130", "Mon Wed", "2:30 PM", "3:50 PM", "Limited Capacity", 72, 25, 3.6, 18, 21, 22, 11, "High", "High", "Mixed", "Low", "Moderate"),
  c("CHE 312", "Physical Chemistry for Life Sciences", "CHE", "300", 3, "Physical chemistry option often used by life science students.", "General chemistry and calculus preparation.", ["STEM+"], "Chemistry Building 130", "Tue Thu", "2:30 PM", "3:50 PM", "Prerequisite Sensitive", 95, 34, 3.8, 28, 30, 25, 12, "High", "High", "Mixed Positive", "Low", "Moderate"),

  c("PHY 121", "Physics for the Life Sciences I", "PHY", "100", 4, "Physics course for life science students.", "Calculus or equivalent quantitative preparation.", ["SNW"], "Physics Building 101", "Mon Wed", "1:00 PM", "2:20 PM", "Available", 150, 58, 3.8, 45, 48, 38, 19, "High", "High", "Mixed", "Low", "Moderate"),
  c("PHY 122", "Physics for the Life Sciences II", "PHY", "100", 4, "Second physics course for life science students.", "PHY 121.", ["SNW"], "Physics Building 101", "Tue Thu", "1:00 PM", "2:20 PM", "Prerequisite Sensitive", 142, 52, 3.8, 42, 45, 37, 18, "High", "High", "Mixed", "Low", "Moderate"),

  c("LANG 111", "Elementary Language I", "LANG", "100", 4, "First semester elementary language course used for language learning objective planning.", "Placement may be required.", ["LANG"], "Humanities Building 110", "Mon Wed", "11:30 AM", "12:50 PM", "Available", 32, 24, 4.2, 17, 10, 4, 1, "Moderate", "Low", "Positive", "Moderate", "High"),
  c("LANG 112", "Elementary Language II", "LANG", "100", 4, "Second semester elementary language course.", "LANG 111 or placement.", ["LANG"], "Humanities Building 110", "Tue Thu", "11:30 AM", "12:50 PM", "Prerequisite Sensitive", 30, 22, 4.1, 15, 10, 4, 1, "Moderate", "Low", "Positive", "Moderate", "High"),

  c("EST 194", "Decision Making", "EST", "100", 3, "Introduces decision making methods for technology and society problems.", "None.", ["TECH"], "Academic Building A 301", "Tue Thu", "10:30 AM", "11:50 AM", "Project Based", 44, 33, 4.2, 18, 16, 7, 3, "Moderate", "Low", "Positive", "High", "High"),
  c("EST 202", "Introduction to Science, Technology, and Society Studies", "EST", "200", 3, "Introduces social, ethical, institutional, and cultural dimensions of science and technology.", "None.", ["TECH", "STAS"], "Academic Building B 204", "Mon Wed", "9:30 AM", "10:50 AM", "Writing Intensive", 49, 36, 4.0, 17, 18, 9, 5, "Moderate", "Low", "Mixed Positive", "Moderate", "Moderate High"),
  c("EST 205", "Technology Assessment", "EST", "200", 3, "Covers ways of evaluating technology impacts, risks, and social consequences.", "EST 202 recommended.", ["STAS"], "Academic Building A 208", "Mon Wed", "12:30 PM", "1:50 PM", "Available", 41, 29, 4.0, 15, 13, 9, 4, "Moderate", "Medium", "Mixed Positive", "Moderate", "Moderate High"),
  c("EST 207", "Interaction Design", "EST", "200", 3, "Project based course focused on interface, user needs, and interaction design.", "None.", ["TECH"], "Computer Science Building 2120", "Mon Wed", "1:00 PM", "2:20 PM", "Project Based", 39, 30, 4.4, 18, 12, 6, 3, "Moderate", "Low", "Positive", "High", "High"),
  c("EST 240", "Visual Rhetoric and Digital Media", "EST", "200", 3, "Studies visual communication, digital media, and rhetorical design.", "None.", ["TECH", "STAS"], "Computer Science Building 2208", "Tue Thu", "5:30 PM", "6:50 PM", "Project Based", 35, 27, 4.3, 16, 10, 6, 3, "Moderate", "Low", "Positive", "High", "High"),
  c("EST 304", "Communication for Engineers and Scientists", "EST", "300", 3, "Communication course for technical, scientific, and professional contexts.", "Upper division standing recommended.", ["SPK"], "Academic Building B 310", "Tue Thu", "11:00 AM", "12:20 PM", "Available", 46, 33, 4.2, 18, 15, 9, 4, "Moderate", "Low", "Positive", "Moderate", "High"),
  c("EST 320", "Communication Technology Systems", "EST", "300", 3, "Upper division course on communication technology systems.", "Math and technology background recommended.", ["TECH"], "Computer Science Building 2208", "Mon Wed", "10:00 AM", "11:20 AM", "Prerequisite Sensitive", 34, 25, 4.1, 13, 11, 7, 3, "Moderate High", "Medium", "Positive", "Moderate", "High"),
  c("EST 331", "Engineering Ethics and AI Technologies", "EST", "300", 3, "Studies engineering ethics, AI systems, responsibility, and social impact.", "Upper division standing recommended.", ["CER", "STAS"], "Academic Building B 214", "Mon Wed", "11:30 AM", "12:50 PM", "Available", 36, 25, 4.0, 13, 10, 8, 5, "Moderate High", "Medium", "Mixed Positive", "Moderate", "Moderate"),
  c("EST 391", "Technology Assessment", "EST", "300", 3, "Required TSM course focused on assessment of technologies and systems.", "TSM major or department permission.", ["STAS"], "Academic Building A 312", "Mon Wed", "3:30 PM", "4:50 PM", "Available", 38, 28, 4.1, 16, 12, 7, 3, "Moderate High", "Medium", "Positive", "Moderate", "High"),
  c("EST 392", "Engineering and Managerial Economics", "EST", "300", 3, "Economic analysis course for engineering and technology management decisions.", "Quantitative preparation recommended.", ["QPS"], "Academic Building A 305", "Tue Thu", "3:30 PM", "4:50 PM", "High Workload", 40, 26, 3.9, 12, 13, 10, 5, "High", "Medium High", "Mixed", "Low", "Moderate"),
  c("EST 393", "Project Management", "EST", "300", 3, "Covers project management methods, planning, team coordination, and implementation.", "TSM major or department permission.", [], "Academic Building A 301", "Fri", "1:00 PM", "3:50 PM", "Project Based", 42, 30, 4.2, 17, 13, 8, 4, "Moderate", "Low", "Positive", "High", "High"),
  c("EST 440", "Interdisciplinary Research Methods", "EST", "400", 3, "Research methods course for interdisciplinary TSM work and senior project preparation.", "Upper division TSM standing.", ["WRTD"], "Academic Building B 310", "Tue Thu", "9:30 AM", "10:50 AM", "Prerequisite Sensitive", 28, 20, 4.1, 12, 9, 5, 2, "Moderate High", "Medium", "Positive", "Moderate", "High"),
  c("EST 441", "Interdisciplinary Senior Project", "EST", "400", 3, "Senior project course for TSM students.", "EST 440 or department permission.", ["WRTD", "EXP+"], "Academic Building B 310", "Wed", "6:00 PM", "8:50 PM", "Capstone", 26, 19, 4.2, 12, 8, 4, 2, "High", "Medium", "Positive", "High", "High"),

  c("ECE 101", "Introduction to Electrical and Computer Engineering", "ECE", "100", 3, "Introductory engineering course used here as a sample technical support course for the TSM roadmap.", "None.", ["TECH"], "Engineering Building 201", "Mon Wed", "2:30 PM", "3:50 PM", "Available", 75, 30, 4.0, 25, 22, 18, 10, "Moderate", "Medium", "Mixed Positive", "Moderate", "Moderate"),
  c("MEC 104", "Practical Science of Things", "MEC", "100", 3, "Introductory mechanical engineering style course used here as a sample applied technical course for the TSM roadmap.", "None.", ["SNW", "TECH"], "Engineering Building 115", "Tue Thu", "12:30 PM", "1:50 PM", "Available", 68, 28, 4.1, 24, 22, 15, 7, "Moderate", "Medium", "Positive", "Moderate", "High"),
  c("CSE 114", "Introduction to Object Oriented Programming", "CSE", "100", 4, "Programming course that can support technology and information systems pathways.", "Programming placement or prior experience recommended.", ["TECH"], "Computer Science Building 1203", "Mon Wed", "4:00 PM", "5:20 PM", "High Workload", 180, 72, 3.7, 48, 54, 50, 28, "High", "Medium High", "Mixed", "Low", "Moderate"),
  c("ISE 305", "Database Design and Practice", "ISE", "300", 3, "Database course used as a sample specialization course for information systems style planning.", "CSE 114 or programming preparation.", ["TECH"], "Computer Science Building 2208", "Tue Thu", "2:00 PM", "3:20 PM", "Prerequisite Sensitive", 60, 24, 4.0, 20, 19, 14, 7, "Moderate High", "Medium", "Mixed Positive", "Moderate", "Moderate High"),

  c("AAS 102", "Eastern Religions", "AAS", "100", 3, "General education course used as an example of GLO and HUM categories.", "None.", ["GLO", "HUM"], "Humanities Building 120", "Mon Wed", "1:00 PM", "2:20 PM", "Available", 80, 36, 4.2, 33, 27, 15, 5, "Moderate", "Low", "Positive", "Low", "High"),
  c("MUS 105", "Music Cultures of the World", "MUS", "100", 3, "General education course exploring world music cultures.", "None.", ["ARTS", "GLO"], "Arts Building 101", "Tue Thu", "4:00 PM", "5:20 PM", "Available", 90, 40, 4.3, 38, 30, 16, 6, "Low", "Low", "Positive", "Low", "High"),
  c("PHI 104", "Moral Reasoning", "PHI", "100", 3, "General education course focused on ethical reasoning.", "None.", ["CER", "HUM"], "Humanities Building 140", "Mon Wed", "3:30 PM", "4:50 PM", "Available", 88, 34, 4.0, 30, 28, 20, 10, "Moderate", "Medium", "Positive", "Low", "Moderate"),
  c("POL 102", "Introduction to American Government", "POL", "100", 3, "General education course introducing American political institutions.", "None.", ["SBS", "USA"], "Social Science Building 101", "Tue Thu", "9:30 AM", "10:50 AM", "Available", 120, 50, 3.9, 38, 40, 30, 12, "Moderate", "Medium", "Mixed Positive", "Low", "Moderate"),
  c("PSY 103", "Introduction to Psychology", "PSY", "100", 3, "General education course introducing psychology and human behavior.", "None.", ["SBS"], "Javits Lecture Center 100", "Tue Thu", "9:30 AM", "10:50 AM", "Available", 280, 110, 4.0, 90, 88, 70, 32, "Moderate", "Medium", "Positive", "Low", "High")
]

const courses = Object.fromEntries(courseList.map(course => [course.code, course]))

const roadmaps = {
  "Biochemistry": {
    gpa: "3.21",
    credits: 42,
    note: "Sample roadmap based on Biochemistry major sequence. Students should confirm actual requirements in the official bulletin and Degree Works.",
    semesters: [
      s("Year 1 Fall", "Writing, chemistry, and calculus foundation", ["FYS 101", "WRT 101", "CHE 131", "CHE 133", "MAT 125"], "Foundation year starts chemistry and calculus. Missing math placement may create a sequence delay."),
      s("Year 1 Spring", "Writing, biology, chemistry, and calculus continuation", ["FYS 102", "WRT 102", "BIO 201", "CHE 132", "CHE 134", "MAT 126"], "BIO and CHE courses begin the science sequence. WRT 102 should be completed early."),
      s("Year 2 Fall", "Biology core, organic chemistry, laboratory, language", ["BIO 203", "CHE 321", "MAT 127", "BIO 204", "BIO 458", "LANG 111"], "Organic chemistry and biology lab create workload risk if paired with too many heavy courses."),
      s("Year 2 Spring", "Biology option, organic chemistry continuation, laboratory, language", ["BIO 202", "CHE 322", "CHE 327", "BIO 205", "LANG 112"], "CHE 322 and CHE 327 should be checked carefully because later BIO 361 depends on organic chemistry preparation."),
      s("Year 3 Fall", "Biochemistry and physics sequence", ["BIO 361", "PHY 121", "BIO 365", "BIO 459", "SBC"], "BIO 361 is a critical sequence course. Delaying it can affect BIO 362 and senior planning."),
      s("Year 3 Spring", "Biochemistry continuation, genetics, physics", ["BIO 362", "BIO 320", "PHY 122", "SBC"], "BIO 361 and BIO 362 should be taken in sequence. Physics and genetics add workload pressure."),
      s("Year 4 Fall", "Advanced biology electives and SBC completion", ["BIO Elective", "BIO Elective", "SBC", "SBC"], "Senior fall should reduce risk by completing remaining electives and SBC gaps."),
      s("Year 4 Spring", "Cell biology, physical chemistry, final audit", ["BIO 310", "CHE 312", "BIO Elective", "SBC"], "Final semester should not carry unresolved writing or prerequisite risks.")
    ],
    requirements: [
      r("Writing", 70, "WRT 101 and WRT 102"),
      r("Chemistry Sequence", 55, "CHE 131, 132, 133, 134, 321, 322, 327, physical chemistry"),
      r("Biology Core", 45, "BIO 201, 202, 203, 204, 205 or 207"),
      r("Advanced Biology", 28, "BIO 310, 320, 361, 362, 365, electives"),
      r("Math and Physics", 40, "Calculus sequence and physics sequence"),
      r("SBC and WRTD", 35, "SBC categories and BIO 459")
    ]
  },
  "Technological Systems Management": {
    gpa: "3.18",
    credits: 45,
    note: "Sample roadmap based on TSM required courses, math, writing, natural science, EST core, technical support, specialization, and capstone planning.",
    semesters: [
      s("Year 1 Fall", "Writing, math, introductory technology, natural science", ["FYS 101", "WRT 101", "EST 202", "AMS 151", "BIO 201"], "The first semester connects writing, TECH, QPS, and SNW. Missing math affects later AMS 161 and technical courses."),
      s("Year 1 Spring", "Writing completion, decision making, calculus continuation, natural science", ["FYS 102", "WRT 102", "EST 194", "AMS 161", "MEC 104"], "WRT 102 and AMS 161 should be completed early to protect upper division progress."),
      s("Year 2 Fall", "EST design, communication, and technical support", ["EST 207", "EST 304", "ECE 101", "SBC"], "This semester shows the mix of EST design, communication, and one ECE style technical support course."),
      s("Year 2 Spring", "Technology assessment and applied systems", ["EST 205", "EST 240", "CSE 114", "SBC"], "Project based courses and programming can create workload pressure if placed together."),
      s("Year 3 Fall", "Upper division TSM and specialization", ["EST 320", "EST 331", "ISE 305", "SBC"], "Upper division courses should connect to the selected specialization and degree audit blocks."),
      s("Year 3 Spring", "Assessment, economics, project management", ["EST 391", "EST 392", "EST 393", "SBC"], "EST 391, 392, and 393 create a decision heavy semester with writing, analysis, and group project risk."),
      s("Year 4 Fall", "Research methods and advanced elective", ["EST 440", "Advanced EST Elective", "SBC"], "EST 440 prepares the senior project and should not be delayed."),
      s("Year 4 Spring", "Senior project and graduation audit", ["EST 441", "Advanced EST Elective", "Remaining SBC"], "Final semester should complete capstone, upper division credits, specialization, and SBC gaps.")
    ],
    requirements: [
      r("Writing", 75, "WRT 101 and WRT 102"),
      r("Math", 55, "AMS 151 and AMS 161"),
      r("Natural Science", 50, "Two SNW style natural science courses"),
      r("EST Required Core", 42, "EST 194, 202, 304, 331, 391, 392, 393, 440, 441"),
      r("Technical Support", 35, "ECE, MEC, CSE, ISE, or related applied courses"),
      r("SBC and Upper Division", 38, "Remaining SBC and 300 plus credit planning")
    ]
  }
}

const sbcCategories = {
  ARTS: {
    title: "Explore and Understand the Fine and Performing Arts",
    courses: ["MUS 105"],
    text: "Courses that introduce artistic practice, music, visual culture, or performance."
  },
  CER: {
    title: "Practice and Respect Critical and Ethical Reasoning",
    courses: ["PHI 104", "EST 331"],
    text: "Courses that develop ethical reasoning and responsible decision making."
  },
  GLO: {
    title: "Engage Global Issues",
    courses: ["AAS 102", "MUS 105"],
    text: "Courses that examine global cultures, systems, or international issues."
  },
  HUM: {
    title: "Address Problems Using Critical Analysis and the Methods of the Humanities",
    courses: ["AAS 102", "PHI 104"],
    text: "Courses focused on humanistic analysis, interpretation, and critical reasoning."
  },
  LANG: {
    title: "Communicate in a Human Language Other Than English",
    courses: ["LANG 111", "LANG 112"],
    text: "Language courses used for communication across cultures."
  },
  QPS: {
    title: "Master Quantitative Problem Solving",
    courses: ["AMS 151", "AMS 161", "MAT 123", "MAT 125", "MAT 126", "MAT 127", "MAT 131", "MAT 132", "EST 392"],
    text: "Courses that build quantitative reasoning and problem solving."
  },
  SBS: {
    title: "Understand Human Behavior and Social Systems",
    courses: ["PSY 103", "POL 102"],
    text: "Courses that study behavior, institutions, society, and social structures."
  },
  SNW: {
    title: "Study the Natural World",
    courses: ["BIO 201", "CHE 131", "CHE 132", "PHY 121", "PHY 122", "MEC 104"],
    text: "Courses that study natural, physical, or biological systems."
  },
  SPK: {
    title: "Speak Effectively Before an Audience",
    courses: ["EST 304", "BIO 458"],
    text: "Courses that build presentation and speaking skills."
  },
  STAS: {
    title: "Understand Relationships Between Science or Technology and Society",
    courses: ["EST 202", "EST 205", "EST 240", "EST 331", "EST 391"],
    text: "Courses that connect science or technology with society, values, policy, and culture."
  },
  TECH: {
    title: "Understand Technology",
    courses: ["EST 194", "EST 202", "EST 207", "EST 240", "ECE 101", "CSE 114", "ISE 305"],
    text: "Courses that examine technology, systems, design, and technical literacy."
  },
  USA: {
    title: "Understand United States History and Society",
    courses: ["POL 102"],
    text: "Courses related to United States society, politics, history, or culture."
  },
  WRT: {
    title: "Write Effectively in English",
    courses: ["WRT 101", "WRT 102"],
    text: "Courses that build academic writing and evidence based communication."
  },
  WRTD: {
    title: "Write Effectively Within One’s Discipline",
    courses: ["BIO 459", "EST 440", "EST 441"],
    text: "Upper division writing within the major or discipline."
  },
  "EXP+": {
    title: "Engage in Experiential Learning",
    courses: ["EST 441"],
    text: "Courses with project, internship, research, or experiential learning elements."
  },
  "STEM+": {
    title: "Pursue Deeper Understanding in STEM",
    courses: ["BIO 202", "BIO 203", "CHE 301", "CHE 312", "CHE 321"],
    text: "Upper level STEM depth courses."
  }
}

function c(code, title, dept, level, credits, description, prerequisite, sbc, location, days, start, end, status, enrolled, responses, rating, A, B, C, DF, workload, exam, fairness, group, clarity) {
  const base = {
    section: "Section 01",
    days,
    start,
    end,
    status,
    location,
    enrolled,
    responses,
    rating,
    grades: { A, B, C, DF },
    dna: {
      workload,
      exam,
      fairness,
      group,
      clarity,
      usefulness: rating >= 4.1 ? "High" : rating >= 3.8 ? "Moderate High" : "Moderate",
      comment: buildComment(status, workload)
    }
  }

  return {
    code,
    title,
    dept,
    level,
    credits,
    description,
    prerequisite,
    sbc,
    location,
    offerings: {
      "Fall 2026": base,
      "Spring 2026": alterOffering(base, "Spring 2026"),
      "Summer 2026": alterOffering(base, "Summer 2026")
    }
  }
}

function alterOffering(base, term) {
  const copy = JSON.parse(JSON.stringify(base))

  if (term === "Spring 2026") {
    copy.section = "Section 02"
    copy.enrolled = Math.max(18, base.enrolled - 12)
    copy.responses = Math.max(10, base.responses - 6)
    copy.rating = Math.max(3.2, Math.round((base.rating - 0.1) * 10) / 10)
    copy.grades.A = Math.max(4, base.grades.A - 5)
    copy.grades.B = Math.max(4, base.grades.B - 4)
    copy.grades.C = Math.max(2, base.grades.C - 3)
    copy.grades.DF = Math.max(1, base.grades.DF - 2)
    if (base.days === "Mon Wed") copy.days = "Tue Thu"
    else if (base.days === "Tue Thu") copy.days = "Mon Wed"
    return copy
  }

  copy.section = "Summer or Online Section"
  copy.enrolled = Math.max(0, Math.round(base.enrolled * 0.42))
  copy.responses = Math.max(0, Math.round(base.responses * 0.42))
  copy.rating = Math.max(3.1, Math.round((base.rating - 0.2) * 10) / 10)
  copy.grades.A = Math.max(0, Math.round(base.grades.A * 0.42))
  copy.grades.B = Math.max(0, Math.round(base.grades.B * 0.42))
  copy.grades.C = Math.max(0, Math.round(base.grades.C * 0.42))
  copy.grades.DF = Math.max(0, Math.round(base.grades.DF * 0.42))
  copy.days = base.status.includes("Not Offered") ? "Not Offered" : "Online"
  copy.start = base.status.includes("Not Offered") ? "Not Offered" : "Asynchronous"
  copy.end = base.status.includes("Not Offered") ? "Not Offered" : "Asynchronous"
  copy.status = base.status.includes("Prerequisite") ? "Prerequisite Sensitive" : base.status.includes("High") ? "Intensive Format" : "Available Online"
  return copy
}

function s(term, focus, courses, note) {
  return { term, focus, courses, note }
}

function r(name, percent, note) {
  return { name, percent, note }
}

function buildComment(status, workload) {
  if (status.includes("Sequence")) return "Students should confirm prerequisite and degree sequence before building a plan around this course."
  if (status.includes("Prerequisite")) return "Students recommend checking prerequisites before final enrollment."
  if (status.includes("Limited")) return "Students mention that seats can disappear quickly and backup sections are helpful."
  if (status.includes("High") || workload.includes("High")) return "Students report a heavier weekly workload and recommend steady preparation."
  if (status.includes("Project")) return "Students value the course when project expectations and team roles are clear."
  return "Students mention clear organization, manageable workload, and useful course structure."
}

function init() {
  ensureCatalogPage()
  applyStaticTranslations()
  attachGlobalEvents()
  renderSearch()
  renderTimetable()
  renderEvaluation()
  renderPathway()
  renderAdvisor()
  renderAssistant()
  renderCatalog()
  applyLanguage()
}

function ensureCatalogPage() {
  const sidebar = document.querySelector(".sidebar")
  const searchNav = document.querySelector('.nav[data-page="search"]')

  if (sidebar && searchNav && !document.querySelector('.nav[data-page="catalog"]')) {
    const button = document.createElement("button")
    button.className = "nav"
    button.dataset.page = "catalog"
    button.dataset.i18n = "navCatalog"
    button.textContent = "Course Catalog"
    searchNav.insertAdjacentElement("afterend", button)
  }

  const main = document.querySelector(".main")
  if (main && !document.getElementById("catalog")) {
    const section = document.createElement("section")
    section.id = "catalog"
    section.className = "page"
    section.innerHTML = `
      <div class="page-title">
        <h2 data-i18n="catalogTitle">Course Catalog and SBC Explorer</h2>
        <p data-i18n="catalogSubtitle">Search sample catalog courses, review credits and prerequisites, and explore SBC general education categories.</p>
      </div>

      <div class="catalog-layout">
        <div class="catalog-left">
          <div class="card">
            <h3>Catalog Search</h3>
            <input id="catalogSearchInput" class="catalog-input" type="text" placeholder="Search WRT, BIO, CHE, EST, AMS, SBC, prerequisite">
            <div id="catalogResults" class="catalog-results"></div>
          </div>
        </div>

        <div class="catalog-right">
          <div id="catalogDetail" class="card"></div>
          <div class="card">
            <h3>SBC General Education Explorer</h3>
            <p>Click a category to see sample courses that may satisfy each general education area in this prototype.</p>
            <div id="sbcExplorer" class="sbc-accordion"></div>
          </div>
        </div>
      </div>
    `
    const timetable = document.getElementById("timetable")
    if (timetable) main.insertBefore(section, timetable)
    else main.appendChild(section)
  }
}

function t(key) {
  return translations[state.currentLang][key] || key
}

function lang(en, ko) {
  return state.currentLang === "ko" ? ko : en
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n
    if (translations[state.currentLang][key]) {
      element.textContent = translations[state.currentLang][key]
    }
  })
}

function applyLanguage() {
  applyStaticTranslations()

  const englishButton = document.getElementById("englishButton")
  const koreanButton = document.getElementById("koreanButton")

  if (englishButton) englishButton.classList.toggle("active-lang", state.currentLang === "en")
  if (koreanButton) koreanButton.classList.toggle("active-lang", state.currentLang === "ko")

  renderCurrentPage()
}

function showPage(pageId) {
  state.currentPage = pageId

  document.querySelectorAll(".page").forEach(page => page.classList.remove("active-page"))
  document.querySelectorAll(".nav").forEach(button => button.classList.remove("active"))

  const page = document.getElementById(pageId)
  if (page) page.classList.add("active-page")

  const nav = document.querySelector(`.nav[data-page="${pageId}"]`)
  if (nav) nav.classList.add("active")

  renderCurrentPage()
}

function renderCurrentPage() {
  if (state.currentPage === "search") renderSearch()
  if (state.currentPage === "catalog") renderCatalog()
  if (state.currentPage === "timetable") renderTimetable()
  if (state.currentPage === "evaluation") renderEvaluation()
  if (state.currentPage === "pathway") renderPathway()
  if (state.currentPage === "advisor") renderAdvisor()
  if (state.currentPage === "assistant") renderAssistant()
}

function getCourse(code = state.selectedCourseId) {
  return courses[code] || null
}

function getOffering(course = getCourse(), term = state.selectedTerm) {
  if (!course) return null
  return course.offerings[term] || course.offerings["Fall 2026"]
}

function isRisk(offering) {
  if (!offering) return false
  return ["Risk", "Sensitive", "Limited", "High", "Intensive", "Corequisite", "Capacity", "Capstone"].some(word => offering.status.includes(word))
}

function riskLevel(offering) {
  if (!offering) return "Low"
  if (offering.status.includes("Sequence")) return "High"
  if (offering.status.includes("Prerequisite")) return "Medium High"
  if (offering.status.includes("Limited") || offering.status.includes("High")) return "Medium High"
  if (offering.status.includes("Corequisite")) return "Medium"
  return "Low"
}

function translateStatus(value) {
  if (state.currentLang === "en") return value

  const map = {
    "Available": "수강 가능",
    "Available Online": "온라인 가능",
    "Limited Seats": "잔여 좌석 제한",
    "Limited Capacity": "정원 제한",
    "Prerequisite Sensitive": "선수 과목 주의",
    "Corequisite Sensitive": "동시 수강 주의",
    "High Workload": "높은 과제량",
    "Intensive Format": "집중 수업 형식",
    "Project Based": "프로젝트 중심",
    "Writing Intensive": "글쓰기 중심",
    "Sequence Risk": "수강 순서 위험",
    "Capstone": "캡스톤",
    "Low": "낮음",
    "Medium": "중간",
    "Medium High": "중간 이상",
    "High": "높음",
    "Very High": "매우 높음",
    "Positive": "긍정적",
    "Mixed": "혼합",
    "Mixed Positive": "다소 긍정적",
    "Moderate": "보통",
    "Moderate High": "보통 이상"
  }

  return map[value] || value
}

function roadmapImpact(course) {
  if (!course) return null

  const roadmap = roadmaps[state.selectedMajor]
  if (!roadmap) return null

  for (const semester of roadmap.semesters) {
    if (semester.courses.includes(course.code)) {
      return {
        term: semester.term,
        focus: semester.focus,
        text: `${course.code} appears in ${semester.term} of the ${state.selectedMajor} sample roadmap. It supports ${semester.focus.toLowerCase()}.`
      }
    }
  }

  const deptFit = state.selectedMajor === "Biochemistry" && ["BIO", "CHE", "MAT", "AMS", "PHY", "WRT", "LANG"].includes(course.dept)
  const tsmFit = state.selectedMajor === "Technological Systems Management" && ["EST", "AMS", "WRT", "ECE", "MEC", "CSE", "ISE", "BIO"].includes(course.dept)

  if (deptFit || tsmFit) {
    return {
      term: "Requirement or support area",
      focus: "Degree audit confirmation needed",
      text: `${course.code} may support the selected major, but the exact audit block should be confirmed before enrollment.`
    }
  }

  return {
    term: "Elective or SBC area",
    focus: "SBC or elective planning",
    text: `${course.code} may work as an SBC or elective course rather than a direct major requirement.`
  }
}

function courseAdvice(course, offering) {
  if (!course || !offering) return ""

  if (offering.status.includes("Sequence")) {
    return `${course.code} may create a math or prerequisite sequence issue. The student should check Degree Works and advisor guidance before enrollment.`
  }

  if (offering.status.includes("Prerequisite")) {
    return `${course.code} depends on earlier coursework. The student should confirm prerequisites before building future semesters around it.`
  }

  if (offering.status.includes("Limited") || offering.status.includes("Capacity")) {
    return `${course.code} has seat or capacity risk. The student should prepare a backup section or alternate course.`
  }

  if (offering.status.includes("High") || offering.dna.workload.includes("High")) {
    return `${course.code} may create workload pressure. The student should compare it with the weekly timetable and other heavy courses.`
  }

  return `${course.code} appears manageable in this prototype, but the student should still check catalog information, evaluation patterns, SBC fit, and roadmap placement.`
}

function possibleConsequences(course, offering) {
  if (!course || !offering) return []

  const items = []

  if (offering.status.includes("Sequence")) {
    items.push({
      title: "Graduation sequence risk",
      text: "If the required prior course or placement condition is missing, this course may not be the correct next step and later requirements may be delayed.",
      action: "Open Degree Works preview, check the four year roadmap, and prepare an advisor report."
    })
  }

  if (offering.status.includes("Prerequisite") || offering.status.includes("Corequisite")) {
    items.push({
      title: "Prerequisite or corequisite risk",
      text: "The course may appear searchable, but enrollment or degree progress can fail if the connected prerequisite or corequisite is missing.",
      action: "Check the catalog prerequisite and confirm the course with an advisor before final enrollment."
    })
  }

  if (offering.status.includes("Limited") || offering.status.includes("Capacity")) {
    items.push({
      title: "Seat availability risk",
      text: "The student may plan around the course but lose access if the section closes or seats are restricted.",
      action: "Use the backup option generator and keep another section or term ready."
    })
  }

  if (offering.status.includes("High") || offering.dna.workload.includes("High")) {
    items.push({
      title: "Workload overload risk",
      text: "Adding this course with other heavy courses may reduce performance and increase schedule stress.",
      action: "Check the Visual Timetable Builder and move one heavy course if needed."
    })
  }

  if (items.length === 0) {
    items.push({
      title: "Low immediate risk",
      text: "No major warning is detected in this prototype, but catalog fit and degree audit should still be checked.",
      action: "Compare evaluation DNA, SBC category, and roadmap placement before enrollment."
    })
  }

  return items
}

function backupOptions(course, offering) {
  if (!course || !offering) return []

  if (offering.status.includes("Sequence")) {
    return ["Check the previous math or prerequisite course first.", "Choose a safer requirement this semester.", "Generate an advisor evidence pack."]
  }

  if (offering.status.includes("Prerequisite")) {
    return ["Confirm prerequisite completion in Degree Works.", "Choose a lower level preparation course.", "Ask the department whether an exception applies."]
  }

  if (offering.status.includes("Limited") || offering.status.includes("Capacity")) {
    return ["Choose another section.", "Monitor the waitlist.", "Prepare an alternate course in the same requirement area."]
  }

  if (offering.dna.workload.includes("High")) {
    return ["Move another heavy course to a later semester.", "Choose a lighter SBC course.", "Check student comment patterns before enrolling."]
  }

  return ["Keep the course if it fits the schedule.", "Review evaluation DNA.", "Confirm degree requirement fit."]
}

function filterCourses(query, dept, level, day, risk) {
  const q = query.trim().toLowerCase()

  return courseList.filter(course => {
    const offering = getOffering(course)
    const text = `${course.code} ${course.title} ${course.dept} ${course.description} ${course.prerequisite} ${course.sbc.join(" ")}`.toLowerCase()
    const matchQuery = !q || text.includes(q) || course.code.toLowerCase().startsWith(q) || course.dept.toLowerCase() === q
    const matchDept = dept === "All" || course.dept === dept
    const matchLevel = level === "All" || course.level === level
    const matchDay = day === "Any" || offering.days.includes(day)
    const matchRisk = risk === "All" || (risk === "Risk" && isRisk(offering)) || (risk === "Safe" && !isRisk(offering))

    return matchQuery && matchDept && matchLevel && matchDay && matchRisk
  })
}

function renderSearch() {
  const input = document.getElementById("courseSearchInput")
  const termSelect = document.getElementById("courseSearchTerm")
  const deptSelect = document.getElementById("departmentFilter")
  const levelSelect = document.getElementById("levelFilter")
  const daySelect = document.getElementById("dayFilter")
  const riskSelect = document.getElementById("riskFilter")
  const sortSelect = document.getElementById("sortFilter")
  const results = document.getElementById("courseSearchResults")

  if (!results) return

  if (termSelect) state.selectedTerm = termSelect.value

  const query = input ? input.value : ""
  const dept = deptSelect ? deptSelect.value : "All"
  const level = levelSelect ? levelSelect.value : "All"
  const day = daySelect ? daySelect.value : "Any"
  const risk = riskSelect ? riskSelect.value : "All"
  const sort = sortSelect ? sortSelect.value : "relevance"

  let list = filterCourses(query, dept, level, day, risk)

  if (list.length === 0) {
    list = courseList
  }

  if (sort === "rating") {
    list.sort((a, b) => getOffering(b).rating - getOffering(a).rating)
  } else if (sort === "workload") {
    list.sort((a, b) => workloadScore(getOffering(b).dna.workload) - workloadScore(getOffering(a).dna.workload))
  } else {
    list.sort((a, b) => a.code.localeCompare(b.code))
  }

  if (!state.selectedCourseId || !courses[state.selectedCourseId]) {
    state.selectedCourseId = list[0].code
  }

  results.innerHTML = `
    <div class="major-strip">
      <label>${lang("Selected roadmap", "선택 로드맵")}</label>
      <select id="majorSelectorSearch">
        ${Object.keys(roadmaps).map(major => `<option value="${major}" ${major === state.selectedMajor ? "selected" : ""}>${major}</option>`).join("")}
      </select>
    </div>

    ${list.map(course => {
      const offering = getOffering(course)
      const impact = roadmapImpact(course)
      return `
        <div class="result-card ${state.selectedCourseId === course.code ? "active" : ""}" data-select="${course.code}">
          <div class="result-title-row">
            <h4>${course.code}</h4>
            <span class="badge ${isRisk(offering) ? "warning" : "safe"}">${translateStatus(offering.status)}</span>
          </div>
          <p class="course-title">${course.title}</p>
          <p>${state.selectedTerm} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end}</p>
          <p>${offering.enrolled} ${lang("enrolled", "수강 인원")} · ${offering.responses} ${lang("responses", "응답")} · ${offering.rating} / 5</p>
          <p><strong>${lang("Catalog", "카탈로그")}:</strong> ${course.credits} credits · ${course.sbc.length ? course.sbc.join(", ") : "No SBC"}</p>
          <p><strong>${lang("Roadmap", "로드맵")}:</strong> ${impact.term} · ${impact.focus}</p>
        </div>
      `
    }).join("")}
  `

  const majorSelector = document.getElementById("majorSelectorSearch")
  if (majorSelector) {
    majorSelector.addEventListener("change", event => {
      state.selectedMajor = event.target.value
      renderSearch()
      renderPathway()
      updateDegreeWorksFit()
    })
  }

  renderCourseDetail()
}

function renderCourseDetail() {
  const detail = document.getElementById("courseDetail")
  const course = getCourse()

  if (!detail || !course) return

  const offering = getOffering(course)
  const impact = roadmapImpact(course)
  const consequences = possibleConsequences(course, offering)

  detail.innerHTML = `
    <div class="detail-hero">
      <div>
        <h3>${course.code} ${course.title}</h3>
        <p>${state.selectedTerm} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end} · ${offering.location}</p>
      </div>
      <span class="badge ${isRisk(offering) ? "warning" : "safe"}">${translateStatus(offering.status)}</span>
    </div>

    <div class="metric-grid">
      <div class="metric"><strong>${offering.enrolled}</strong><span>${lang("Enrolled", "수강 인원")}</span></div>
      <div class="metric"><strong>${offering.responses}</strong><span>${lang("Responses", "응답 수")}</span></div>
      <div class="metric"><strong>${offering.rating}</strong><span>${lang("Rating", "평점")}</span></div>
      <div class="metric"><strong>${offering.grades.A}</strong><span>${lang("A grades", "A 성적 수")}</span></div>
    </div>

    <div class="detail-section catalog-mini">
      <h4>${lang("Catalog Information", "카탈로그 정보")}</h4>
      <p><strong>${lang("Credits", "학점")}:</strong> ${course.credits}</p>
      <p><strong>${lang("Prerequisite", "선수 과목")}:</strong> ${course.prerequisite}</p>
      <p><strong>SBC:</strong> ${course.sbc.length ? course.sbc.join(", ") : lang("None listed in prototype", "프로토타입에 표시된 SBC 없음")}</p>
      <p>${course.description}</p>
    </div>

    <div class="detail-section">
      <h4>${lang("Four Year Roadmap Impact", "4년 로드맵 영향")}</h4>
      <p><strong>${state.selectedMajor}</strong> · ${impact.term} · ${impact.focus}</p>
      <p>${impact.text}</p>
    </div>

    <div class="detail-section consequence-box">
      <h4>${lang("Possible Consequences Before Enrollment", "수강 확정 전 가능한 결과")}</h4>
      ${consequences.map(item => `
        <div class="consequence-item">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <p><em>${item.action}</em></p>
        </div>
      `).join("")}
    </div>

    <p><strong>${lang("ZOLAR recommendation", "ZOLAR 추천")}:</strong> ${courseAdvice(course, offering)}</p>

    <div class="detail-actions">
      <button class="primary" data-action="addCourse">${state.plannedCourses.includes(course.code) ? lang("Added to Plan", "계획에 추가됨") : lang("Add to Plan", "계획에 추가")}</button>
      <button data-go="catalog">${lang("Open Catalog", "카탈로그 열기")}</button>
      <button data-go="evaluation">${lang("View Evaluation DNA", "강의 평가 DNA 보기")}</button>
      <button data-go="timetable">${lang("Open Timetable", "시간표 열기")}</button>
      <button data-go="pathway">${lang("Open Four Year Roadmap", "4년 로드맵 열기")}</button>
      <button data-go="advisor">${lang("Prepare Advisor Report", "어드바이저 보고서 준비")}</button>
      <button data-go="assistant">${lang("Ask AI Guided Planner", "AI 수강 계획 도우미에게 묻기")}</button>
    </div>
  `
}

function workloadScore(value) {
  if (!value) return 1
  if (value.includes("Very")) return 5
  if (value.includes("High")) return 4
  if (value.includes("Moderate High")) return 3
  if (value.includes("Moderate")) return 2
  return 1
}

function renderCatalog() {
  const input = document.getElementById("catalogSearchInput")
  const results = document.getElementById("catalogResults")
  const detail = document.getElementById("catalogDetail")
  const sbc = document.getElementById("sbcExplorer")

  if (!results || !detail || !sbc) return

  const query = input ? input.value.trim().toLowerCase() : ""
  let list = courseList.filter(course => {
    const text = `${course.code} ${course.title} ${course.dept} ${course.description} ${course.prerequisite} ${course.sbc.join(" ")}`.toLowerCase()
    return !query || text.includes(query)
  })

  if (list.length === 0) list = courseList

  results.innerHTML = list.map(course => `
    <div class="catalog-card small ${course.code === state.selectedCourseId ? "active" : ""}" data-catalog-select="${course.code}">
      <h3>${course.code}</h3>
      <p>${course.title}</p>
      <div class="catalog-meta">
        <span>${course.credits} credits</span>
        <span>${course.dept}</span>
        <span>${course.sbc.length ? course.sbc.join(", ") : "No SBC"}</span>
      </div>
    </div>
  `).join("")

  renderCatalogDetail()

  sbc.innerHTML = Object.entries(sbcCategories).map(([code, item]) => `
    <div class="sbc-item">
      <button data-sbc-toggle="${code}">
        <span><strong>${code}</strong>: ${item.title}</span>
        <span>＋</span>
      </button>
      <div id="sbc-${code}" class="sbc-content hidden">
        <p>${item.text}</p>
        <ul>
          ${item.courses.map(courseCode => {
            const course = getCourse(courseCode)
            return `<li><button data-catalog-select="${courseCode}">${courseCode}</button> ${course ? course.title : ""}</li>`
          }).join("")}
        </ul>
      </div>
    </div>
  `).join("")
}

function renderCatalogDetail() {
  const detail = document.getElementById("catalogDetail")
  const course = getCourse()
  if (!detail || !course) return

  const offering = getOffering(course)
  const impact = roadmapImpact(course)

  detail.innerHTML = `
    <h3>${course.code} ${course.title}</h3>
    <div class="catalog-meta">
      <span>${course.credits} credits</span>
      <span>${course.dept}</span>
      <span>${course.level} level</span>
      <span>${course.sbc.length ? course.sbc.join(", ") : "No SBC"}</span>
    </div>

    <p>${course.description}</p>

    <h4>Prerequisite</h4>
    <p>${course.prerequisite}</p>

    <h4>Sample Offering</h4>
    <p>${state.selectedTerm} · ${offering.days} · ${offering.start} to ${offering.end} · ${offering.location}</p>

    <h4>Degree Roadmap Connection</h4>
    <p><strong>${state.selectedMajor}</strong> · ${impact.term} · ${impact.focus}</p>
    <p>${impact.text}</p>

    <h4>Prerequisite Chain View</h4>
    <div class="prereq-chain">
      ${buildPrereqChain(course).map(item => `<span>${item}</span>`).join("<span>→</span>")}
    </div>

    <div class="detail-actions">
      <button class="primary" data-action="addCourse">Add to Plan</button>
      <button data-go="search">Open in Course Search</button>
      <button data-go="pathway">View Roadmap</button>
    </div>
  `
}

function buildPrereqChain(course) {
  if (course.code === "BIO 361") return ["BIO 202", "CHE 321", "BIO 361", "BIO 362"]
  if (course.code === "BIO 362") return ["BIO 361", "BIO 362"]
  if (course.code === "CHE 322") return ["CHE 131", "CHE 132", "CHE 321", "CHE 322"]
  if (course.code === "AMS 161") return ["AMS 151", "AMS 161"]
  if (course.code === "MAT 127") return ["MAT 125", "MAT 126", "MAT 127"]
  if (course.code === "EST 441") return ["EST 440", "EST 441"]
  if (course.code === "EST 440") return ["EST 391", "EST 440", "EST 441"]
  if (course.code === "ISE 305") return ["CSE 114", "ISE 305"]
  return [course.code]
}

function renderTimetable() {
  const grid = document.getElementById("timetableGrid")
  const summary = document.getElementById("scheduleSummary")
  const heatmap = document.getElementById("heatmap")

  if (!grid || !summary || !heatmap) return

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"]

  grid.classList.add("hourly")

  let html = `<div class="time"></div>`
  days.forEach(day => {
    html += `<div class="day">${day}</div>`
  })

  times.forEach(time => {
    html += `<div class="time">${time}</div>`
    days.forEach(day => {
      const blocks = state.plannedCourses
        .map(code => getCourse(code))
        .filter(Boolean)
        .filter(course => {
          const offering = getOffering(course)
          return offering.days.includes(day) && getTimeSlot(offering.start) === time
        })

      html += `<div class="slot">`
      if (blocks.length) {
        blocks.forEach(course => {
          const offering = getOffering(course)
          html += `
            <div class="block ${isRisk(offering) ? "red" : "blue"} ${state.moved ? "moved" : ""}">
              <strong>${course.code}</strong><br>
              ${offering.start} to ${offering.end}<br>
              ${offering.location}
              <button data-drop="${course.code}">${lang("Drop", "삭제")}</button>
            </div>
          `
        })
      } else {
        html += `<button data-add-empty="${day}-${time}">${lang("Add", "추가")}</button>`
      }
      html += `</div>`
    })
  })

  grid.innerHTML = html

  summary.innerHTML = state.plannedCourses.map(code => {
    const course = getCourse(code)
    const offering = getOffering(course)
    return `<p><strong>${course.code}</strong> · ${offering.days} · ${offering.start} to ${offering.end} · ${offering.location}</p>`
  }).join("") || `<p>${lang("No courses added yet.", "아직 추가된 과목이 없습니다.")}</p>`

  const hasRisk = state.plannedCourses.some(code => isRisk(getOffering(getCourse(code))))
  const heavyCount = state.plannedCourses.filter(code => workloadScore(getOffering(getCourse(code)).dna.workload) >= 4).length
  const levels = hasRisk && heavyCount >= 2 ? ["high", "mid", "high", "mid", "low"] : hasRisk ? ["mid", "high", "mid", "low", "low"] : ["low", "mid", "mid", "low", "low"]

  heatmap.innerHTML = levels.map(level => `<span class="${level}"></span>`).join("")
}

function getTimeSlot(start) {
  if (!start || start === "Asynchronous") return "9 AM"
  if (start.includes("9:")) return "9 AM"
  if (start.includes("10:")) return "10 AM"
  if (start.includes("11:")) return "11 AM"
  if (start.includes("12:")) return "12 PM"
  if (start.includes("1:")) return "1 PM"
  if (start.includes("2:")) return "2 PM"
  if (start.includes("3:")) return "3 PM"
  if (start.includes("4:")) return "4 PM"
  if (start.includes("5:")) return "5 PM"
  if (start.includes("6:")) return "6 PM"
  if (start.includes("7:")) return "7 PM"
  if (start.includes("8:")) return "8 PM"
  return "9 AM"
}

function renderEvaluation() {
  const el = document.getElementById("evaluationContent")
  const course = getCourse()

  if (!el || !course) return

  const offering = getOffering(course)
  const total = Math.max(1, offering.enrolled)

  el.innerHTML = `
    <div class="grid two">
      <div class="card">
        <h3>${course.code} ${course.title}</h3>
        <p>${state.selectedTerm} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end} · ${offering.location}</p>
        ${gradeRow("A", offering.grades.A, total)}
        ${gradeRow("B", offering.grades.B, total)}
        ${gradeRow("C", offering.grades.C, total)}
        ${gradeRow("D or F", offering.grades.DF, total)}

        <table class="grade-table">
          <tr>
            <th>Semester</th>
            <th>Enrolled</th>
            <th>Responses</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D or F</th>
            <th>Rating</th>
          </tr>
          <tr>
            <td>${state.selectedTerm}</td>
            <td>${offering.enrolled}</td>
            <td>${offering.responses}</td>
            <td>${offering.grades.A}</td>
            <td>${offering.grades.B}</td>
            <td>${offering.grades.C}</td>
            <td>${offering.grades.DF}</td>
            <td>${offering.rating}</td>
          </tr>
        </table>
      </div>

      <div class="card">
        <h3>Course Evaluation DNA</h3>
        <ul class="dna">
          <li>Workload: ${translateStatus(offering.dna.workload)}</li>
          <li>Exam Difficulty: ${translateStatus(offering.dna.exam)}</li>
          <li>Grading Fairness: ${translateStatus(offering.dna.fairness)}</li>
          <li>Group Work: ${translateStatus(offering.dna.group)}</li>
          <li>Clarity: ${translateStatus(offering.dna.clarity)}</li>
          <li>Usefulness: ${translateStatus(offering.dna.usefulness)}</li>
        </ul>
        <h4>Student Comment Pattern</h4>
        <p>${offering.dna.comment}</p>
      </div>
    </div>
  `
}

function gradeRow(label, count, total) {
  const width = Math.round((count / total) * 100)
  return `
    <div class="grade-row">
      <span>${label}</span>
      <div class="grade-bar"><b style="width:${width}%"></b></div>
      <strong>${count} ${lang("students", "명")}</strong>
    </div>
  `
}

function renderPathway() {
  const el = document.getElementById("pathwayContent")
  const course = getCourse()
  const roadmap = roadmaps[state.selectedMajor]

  if (!el || !roadmap) return

  const offering = getOffering(course)
  const impact = roadmapImpact(course)
  const consequences = possibleConsequences(course, offering)

  el.innerHTML = `
    <div class="card roadmap-control">
      <div>
        <h3>${lang("Student Four Year Study Roadmap", "학생 4년 학업 로드맵")}</h3>
        <p>${roadmap.note}</p>
      </div>
      <select id="majorSelectorPathway">
        ${Object.keys(roadmaps).map(major => `<option value="${major}" ${major === state.selectedMajor ? "selected" : ""}>${major}</option>`).join("")}
      </select>
    </div>

    <div class="requirement-progress">
      ${roadmap.requirements.map(item => `
        <div class="requirement-row">
          <strong>${item.name}</strong>
          <div class="requirement-bar"><span style="width:${item.percent}%"></span></div>
          <em>${item.percent}%</em>
          <small>${item.note}</small>
        </div>
      `).join("")}
    </div>

    <div class="roadmap-grid semester-grid">
      ${roadmap.semesters.map(semester => `
        <div class="roadmap-card">
          <span>${semester.term}</span>
          <h3>${semester.focus}</h3>
          <div class="roadmap-courses">
            ${semester.courses.map(code => `<button class="${course && course.code === code ? "selected-roadmap-course" : ""}" data-roadmap-course="${code}">${code}</button>`).join("")}
          </div>
          <p>${semester.note}</p>
        </div>
      `).join("")}
    </div>

    <div class="grid two">
      <div class="card degree-impact-card">
        <h3>${lang("Selected Course Roadmap Impact", "선택 과목의 로드맵 영향")}</h3>
        <p><strong>${course.code} ${course.title}</strong></p>
        <p>${impact.term} · ${impact.focus}</p>
        <p>${impact.text}</p>
      </div>

      <div class="card consequence-box">
        <h3>${lang("Possible Consequences", "가능한 결과")}</h3>
        ${consequences.map(item => `
          <div class="consequence-item">
            <strong>${item.title}</strong>
            <p>${item.text}</p>
            <p><em>${item.action}</em></p>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Peer Pathway Map</h3>
        <p>${lang("Similar students compare course sequence, workload, SBC fit, and future requirement blocks before enrollment.", "비슷한 학생들은 수강 전에 수강 순서, 과제량, SBC 적합성, 미래 요건 블록을 비교합니다.")}</p>
        <ol>
          <li>${lang("Check catalog prerequisite", "카탈로그 선수 과목 확인")}</li>
          <li>${lang("Check degree roadmap placement", "학위 로드맵 위치 확인")}</li>
          <li>${lang("Compare course evaluation DNA", "강의 평가 DNA 비교")}</li>
          <li>${lang("Generate advisor evidence if risk appears", "위험이 있으면 어드바이저 근거 생성")}</li>
        </ol>
      </div>

      <div class="card">
        <h3>Backup Option Generator</h3>
        ${backupOptions(course, offering).map(option => `<p><strong>Option:</strong> ${option}</p>`).join("")}
        <button class="primary" data-go="advisor">${lang("Prepare Advisor Report", "어드바이저 보고서 준비")}</button>
      </div>
    </div>
  `

  const majorSelector = document.getElementById("majorSelectorPathway")
  if (majorSelector) {
    majorSelector.addEventListener("change", event => {
      state.selectedMajor = event.target.value
      renderPathway()
      renderSearch()
      updateDegreeWorksFit()
    })
  }
}

function renderAdvisor() {
  const el = document.getElementById("advisorContent")
  const course = getCourse()

  if (!el || !course) return

  const offering = getOffering(course)
  const impact = roadmapImpact(course)
  const recipient = offering.status.includes("Prerequisite") || offering.status.includes("Sequence") ? "Academic and Transfer Advising Services" : course.dept === "EST" ? "Technology and Society Department Coordinator" : "Major Advisor"

  el.innerHTML = `
    <div class="card">
      <h3>Detected Problem</h3>
      <p>${courseAdvice(course, offering)}</p>

      <h3>Catalog Evidence</h3>
      <p><strong>${course.code} ${course.title}</strong> · ${course.credits} credits · SBC: ${course.sbc.length ? course.sbc.join(", ") : "None listed"}</p>
      <p><strong>Prerequisite:</strong> ${course.prerequisite}</p>

      <h3>Four Year Roadmap Evidence</h3>
      <p>${state.selectedMajor} · ${impact.term} · ${impact.focus}</p>
      <p>${impact.text}</p>

      <h3>Possible Consequences</h3>
      ${possibleConsequences(course, offering).map(item => `
        <div class="consequence-item">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <p><em>${item.action}</em></p>
        </div>
      `).join("")}

      <h3>Recommended Office</h3>
      <p>${recipient}</p>

      <h3>Email Draft</h3>
      <div class="email-box">
        Dear ${recipient},<br><br>
        I am reviewing ${course.code} ${course.title} for ${state.selectedTerm}. ZOLAR shows that this course may affect my ${state.selectedMajor} four year roadmap. The detected issue is: ${courseAdvice(course, offering)}
        Could you confirm whether this course fits my degree path, prerequisite status, and graduation sequence?<br><br>
        Thank you.
      </div>

      <button class="primary" data-action="sendAdvisorEmail">Send Email Draft</button>
      <div id="advisorSendStatus"></div>
    </div>
  `
}

function renderAssistant() {
  const el = document.getElementById("assistantContent")
  const course = getCourse()

  if (!el || !course) return

  const offering = getOffering(course)
  const impact = roadmapImpact(course)

  el.innerHTML = `
    <div class="grid two">
      <div class="card">
        <h3>AI Guided Planning Assistant</h3>
        <p>This assistant does not replace human advising. It turns catalog rules, SBC categories, evaluation patterns, timetable pressure, and four year roadmap impact into clearer next steps.</p>
        <div class="ai-box"><strong>Selected major:</strong> ${state.selectedMajor}</div>
        <div class="ai-box"><strong>Selected course:</strong> ${course.code} ${course.title}</div>
        <div class="ai-box"><strong>Catalog prerequisite:</strong> ${course.prerequisite}</div>
        <div class="ai-box"><strong>SBC category:</strong> ${course.sbc.length ? course.sbc.join(", ") : "None listed"}</div>
        <div class="ai-box"><strong>Roadmap placement:</strong> ${impact.term} · ${impact.focus}</div>
        <div class="ai-box"><strong>Detected risk:</strong> ${translateStatus(offering.status)} · ${translateStatus(riskLevel(offering))}</div>
        <div class="ai-box"><strong>Planning advice:</strong> ${courseAdvice(course, offering)}</div>
      </div>

      <div class="card consequence-box">
        <h3>Possible Consequences</h3>
        ${possibleConsequences(course, offering).map(item => `
          <div class="consequence-item">
            <strong>${item.title}</strong>
            <p>${item.text}</p>
            <p><em>${item.action}</em></p>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="toolbar">
      <button data-go="catalog">Open Course Catalog</button>
      <button data-go="pathway">View Four Year Roadmap</button>
      <button data-go="advisor">Generate Advisor Report</button>
      <button data-go="search">Return to Search</button>
    </div>
  `
}

function renderChatbotGreeting() {
  const messages = document.getElementById("chatMessages")
  if (!messages) return

  messages.innerHTML = `
    <div class="chatbot-message bot">Hi. I am ZOLAR Chat. I can explain catalog prerequisites, SBC categories, four year roadmap impact, backup options, advisor reports, and schedule issues.</div>
    <div class="chatbot-message bot">Try asking: What happens if BIO 361 is delayed? or Does EST 304 fit TSM?</div>
  `
}

function sendChatMessage(text) {
  const messages = document.getElementById("chatMessages")
  if (!messages) return

  const clean = text.trim()
  if (!clean) return

  messages.innerHTML += `<div class="chatbot-message user">${clean}</div>`
  messages.innerHTML += `<div class="chatbot-message bot">${getChatbotResponse(clean)}</div>`
  messages.scrollTop = messages.scrollHeight
}

function getChatbotResponse(text) {
  const lower = text.toLowerCase()
  const course = getCourse()
  const offering = getOffering(course)
  const impact = roadmapImpact(course)

  if (lower.includes("sbc")) {
    return `${course.code} has these SBC categories in this prototype: ${course.sbc.length ? course.sbc.join(", ") : "none listed"}.`
  }

  if (lower.includes("catalog") || lower.includes("prereq")) {
    return `${course.code} prerequisite: ${course.prerequisite}`
  }

  if (lower.includes("roadmap") || lower.includes("four") || lower.includes("4")) {
    return `${course.code} appears as ${impact.term} in the ${state.selectedMajor} roadmap. ${impact.text}`
  }

  if (lower.includes("consequence") || lower.includes("risk") || lower.includes("happen")) {
    return possibleConsequences(course, offering).map(item => `• ${item.title}: ${item.text}`).join("<br>")
  }

  if (lower.includes("bio 361")) {
    state.selectedCourseId = "BIO 361"
    return "BIO 361 is a critical Biochemistry sequence course. If delayed, BIO 362 and later advanced biology planning can also be delayed."
  }

  if (lower.includes("est 304")) {
    state.selectedCourseId = "EST 304"
    return "EST 304 supports TSM communication requirements and can also connect to speaking or professional communication preparation."
  }

  return "I can help with course catalog information, SBC category, four year roadmap impact, possible consequences, timetable planning, and advisor reports."
}

function updateDegreeWorksFit() {
  const fit = document.getElementById("degreeWorksCourseFit")
  if (!fit) return

  const course = getCourse()
  const impact = roadmapImpact(course)

  fit.textContent = `${course.code} is checked against the ${state.selectedMajor} sample roadmap. ${impact.text}`
}

function attachGlobalEvents() {
  document.addEventListener("click", event => {
    const nav = event.target.closest(".nav")
    if (nav && nav.dataset.page) {
      showPage(nav.dataset.page)
      return
    }

    const go = event.target.closest("[data-go]")
    if (go) {
      showPage(go.dataset.go)
      return
    }

    const select = event.target.closest("[data-select]")
    if (select) {
      state.selectedCourseId = select.dataset.select
      renderSearch()
      renderCatalogDetail()
      return
    }

    const catalogSelect = event.target.closest("[data-catalog-select]")
    if (catalogSelect) {
      state.selectedCourseId = catalogSelect.dataset.catalogSelect
      renderCatalog()
      renderSearch()
      renderEvaluation()
      renderPathway()
      return
    }

    const roadmapCourse = event.target.closest("[data-roadmap-course]")
    if (roadmapCourse && courses[roadmapCourse.dataset.roadmapCourse]) {
      state.selectedCourseId = roadmapCourse.dataset.roadmapCourse
      renderPathway()
      renderSearch()
      return
    }

    const sbcToggle = event.target.closest("[data-sbc-toggle]")
    if (sbcToggle) {
      const box = document.getElementById(`sbc-${sbcToggle.dataset.sbcToggle}`)
      if (box) box.classList.toggle("hidden")
      return
    }

    const action = event.target.closest("[data-action]")
    if (action && action.dataset.action === "addCourse") {
      if (state.selectedCourseId && !state.plannedCourses.includes(state.selectedCourseId)) {
        state.plannedCourses.push(state.selectedCourseId)
      }
      renderCourseDetail()
      renderCatalogDetail()
      renderTimetable()
      return
    }

    if (action && action.dataset.action === "sendAdvisorEmail") {
      const status = document.getElementById("advisorSendStatus")
      if (status) {
        status.innerHTML = `<div class="sent-box">Email draft sent to the recommended office for review.</div>`
      }
      return
    }

    const drop = event.target.closest("[data-drop]")
    if (drop) {
      state.plannedCourses = state.plannedCourses.filter(code => code !== drop.dataset.drop)
      renderTimetable()
      return
    }

    const addEmpty = event.target.closest("[data-add-empty]")
    if (addEmpty) {
      if (state.selectedCourseId && !state.plannedCourses.includes(state.selectedCourseId)) {
        state.plannedCourses.push(state.selectedCourseId)
        renderTimetable()
      } else {
        showPage("search")
      }
      return
    }

    const suggestion = event.target.closest("[data-chat-suggestion]")
    if (suggestion) {
      sendChatMessage(suggestion.dataset.chatSuggestion)
      return
    }
  })

  const courseSearchInput = document.getElementById("courseSearchInput")
  if (courseSearchInput) {
    courseSearchInput.addEventListener("input", renderSearch)
    courseSearchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") renderSearch()
    })
  }

  const courseSearchButton = document.getElementById("courseSearchButton")
  if (courseSearchButton) courseSearchButton.addEventListener("click", renderSearch)

  ;["courseSearchTerm", "departmentFilter", "levelFilter", "dayFilter", "riskFilter", "sortFilter"].forEach(id => {
    const element = document.getElementById(id)
    if (element) {
      element.addEventListener("change", () => {
        if (id === "courseSearchTerm") state.selectedTerm = element.value
        renderSearch()
        renderEvaluation()
        renderPathway()
      })
    }
  })

  const clearFiltersButton = document.getElementById("clearFiltersButton")
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
      const input = document.getElementById("courseSearchInput")
      if (input) input.value = ""
      const dept = document.getElementById("departmentFilter")
      const level = document.getElementById("levelFilter")
      const day = document.getElementById("dayFilter")
      const risk = document.getElementById("riskFilter")
      const sort = document.getElementById("sortFilter")
      if (dept) dept.value = "All"
      if (level) level.value = "All"
      if (day) day.value = "Any"
      if (risk) risk.value = "All"
      if (sort) sort.value = "relevance"
      renderSearch()
    })
  }

  const catalogInput = document.getElementById("catalogSearchInput")
  if (catalogInput) {
    catalogInput.addEventListener("input", renderCatalog)
    catalogInput.addEventListener("keydown", event => {
      if (event.key === "Enter") renderCatalog()
    })
  }

  const simulateMoveButton = document.getElementById("simulateMoveButton")
  if (simulateMoveButton) {
    simulateMoveButton.addEventListener("click", () => {
      state.moved = !state.moved
      renderTimetable()
    })
  }

  const englishButton = document.getElementById("englishButton")
  const koreanButton = document.getElementById("koreanButton")

  if (englishButton) {
    englishButton.addEventListener("click", () => {
      state.currentLang = "en"
      applyLanguage()
    })
  }

  if (koreanButton) {
    koreanButton.addEventListener("click", () => {
      state.currentLang = "ko"
      applyLanguage()
    })
  }

  const signInButton = document.getElementById("signInButton")
  const signOutButton = document.getElementById("signOutButton")
  const loginScreen = document.getElementById("loginScreen")
  const app = document.getElementById("app")

  if (signInButton && loginScreen && app) {
    signInButton.addEventListener("click", () => {
      loginScreen.classList.add("hidden")
      app.classList.remove("hidden")
      showPage("dashboard")
    })
  }

  if (signOutButton && loginScreen && app) {
    signOutButton.addEventListener("click", () => {
      app.classList.add("hidden")
      loginScreen.classList.remove("hidden")
    })
  }

  const userMenuButton = document.getElementById("userMenuButton")
  const userDropdown = document.getElementById("userDropdown")

  if (userMenuButton && userDropdown) {
    userMenuButton.addEventListener("click", () => {
      userDropdown.classList.toggle("hidden")
    })
  }

  const notificationButton = document.getElementById("notificationButton")
  const notificationPopup = document.getElementById("notificationPopup")
  const messageButton = document.getElementById("messageButton")
  const messagePopup = document.getElementById("messagePopup")

  if (notificationButton && notificationPopup) {
    notificationButton.addEventListener("click", event => {
      event.stopPropagation()
      notificationPopup.classList.toggle("hidden")
      if (messagePopup) messagePopup.classList.add("hidden")
    })
  }

  if (messageButton && messagePopup) {
    messageButton.addEventListener("click", event => {
      event.stopPropagation()
      messagePopup.classList.toggle("hidden")
      if (notificationPopup) notificationPopup.classList.add("hidden")
    })
  }

  const openDegreeWorksButton = document.getElementById("openDegreeWorksButton")
  const closeDegreeWorksButton = document.getElementById("closeDegreeWorksButton")
  const degreeWorksModal = document.getElementById("degreeWorksModal")

  if (openDegreeWorksButton && degreeWorksModal) {
    openDegreeWorksButton.addEventListener("click", () => {
      updateDegreeWorksFit()
      degreeWorksModal.classList.remove("hidden")
    })
  }

  if (closeDegreeWorksButton && degreeWorksModal) {
    closeDegreeWorksButton.addEventListener("click", () => {
      degreeWorksModal.classList.add("hidden")
    })
  }

  const chatbotButton = document.getElementById("chatbotButton")
  const chatbotWindow = document.getElementById("chatbotWindow")
  const closeChatbot = document.getElementById("closeChatbot")
  const sendChatButton = document.getElementById("sendChatButton")
  const chatInput = document.getElementById("chatInput")

  if (chatbotButton && chatbotWindow) {
    chatbotButton.addEventListener("click", () => {
      chatbotWindow.classList.toggle("hidden")
      if (!chatbotWindow.classList.contains("hidden")) renderChatbotGreeting()
    })
  }

  if (closeChatbot && chatbotWindow) {
    closeChatbot.addEventListener("click", () => {
      chatbotWindow.classList.add("hidden")
    })
  }

  if (sendChatButton && chatInput) {
    sendChatButton.addEventListener("click", () => {
      sendChatMessage(chatInput.value)
      chatInput.value = ""
    })
  }

  if (chatInput) {
    chatInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        sendChatMessage(chatInput.value)
        chatInput.value = ""
      }
    })
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

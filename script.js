const navButtons = document.querySelectorAll(".nav")
const pages = document.querySelectorAll(".page")
const goButtons = document.querySelectorAll("[data-go]")

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.remove("active-page")
  })

  navButtons.forEach(button => {
    button.classList.remove("active")
  })

  document.getElementById(pageId).classList.add("active-page")

  const activeButton = document.querySelector(`.nav[data-page="${pageId}"]`)
  if (activeButton) {
    activeButton.classList.add("active")
  }
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page)
  })
})

goButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go)
  })
})

const moveButton = document.getElementById("moveCourse")
const movableCourse = document.getElementById("movableCourse")

if (moveButton && movableCourse) {
  moveButton.addEventListener("click", () => {
    movableCourse.classList.toggle("moved")

    if (movableCourse.classList.contains("moved")) {
      moveButton.textContent = "Reset Timetable"
    } else {
      moveButton.textContent = "Simulate Drag and Drop"
    }
  })
}

const semesterSelect = document.getElementById("semesterSelect")

const semesterData = {
  fall2025: {
    label: "Fall 2025",
    enrolled: 220,
    responses: 86,
    rating: 4.2,
    grades: {
      A: 84,
      B: 70,
      C: 42,
      DF: 24
    },
    dna: {
      workload: "Workload: Moderate",
      exam: "Exam Difficulty: Medium",
      fairness: "Grading Fairness: Positive",
      group: "Group Work: Low",
      clarity: "Clarity: High",
      comment: "Students mention clear lectures, weekly quizzes, and manageable workload."
    }
  },
  spring2025: {
    label: "Spring 2025",
    enrolled: 198,
    responses: 74,
    rating: 4.0,
    grades: {
      A: 69,
      B: 61,
      C: 44,
      DF: 24
    },
    dna: {
      workload: "Workload: High",
      exam: "Exam Difficulty: Medium High",
      fairness: "Grading Fairness: Mixed",
      group: "Group Work: Low",
      clarity: "Clarity: Moderate",
      comment: "Students mention heavier weekly workload, more reading, and some unclear exam preparation."
    }
  },
  fall2024: {
    label: "Fall 2024",
    enrolled: 214,
    responses: 91,
    rating: 4.3,
    grades: {
      A: 82,
      B: 68,
      C: 46,
      DF: 18
    },
    dna: {
      workload: "Workload: Moderate",
      exam: "Exam Difficulty: Medium",
      fairness: "Grading Fairness: Positive",
      group: "Group Work: Low",
      clarity: "Clarity: High",
      comment: "Students mention helpful lecture slides, fair quizzes, and predictable grading structure."
    }
  }
}

function updateEvaluation(value) {
  const data = semesterData[value]
  if (!data) return

  const total = data.enrolled

  document.getElementById("semesterData").textContent =
    `${data.label} · ${data.enrolled} enrolled · ${data.responses} responses · Overall rating ${data.rating} out of 5`

  document.getElementById("countA").textContent = `${data.grades.A} students`
  document.getElementById("countB").textContent = `${data.grades.B} students`
  document.getElementById("countC").textContent = `${data.grades.C} students`
  document.getElementById("countDF").textContent = `${data.grades.DF} students`

  document.getElementById("barA").style.width = `${Math.round((data.grades.A / total) * 100)}%`
  document.getElementById("barB").style.width = `${Math.round((data.grades.B / total) * 100)}%`
  document.getElementById("barC").style.width = `${Math.round((data.grades.C / total) * 100)}%`
  document.getElementById("barDF").style.width = `${Math.round((data.grades.DF / total) * 100)}%`

  document.getElementById("gradeTableBody").innerHTML = `
    <tr>
      <td>${data.label}</td>
      <td>${data.enrolled}</td>
      <td>${data.responses}</td>
      <td>${data.grades.A}</td>
      <td>${data.grades.B}</td>
      <td>${data.grades.C}</td>
      <td>${data.grades.DF}</td>
      <td>${data.rating}</td>
    </tr>
  `

  document.getElementById("dnaWorkload").textContent = data.dna.workload
  document.getElementById("dnaExam").textContent = data.dna.exam
  document.getElementById("dnaFairness").textContent = data.dna.fairness
  document.getElementById("dnaGroup").textContent = data.dna.group
  document.getElementById("dnaClarity").textContent = data.dna.clarity
  document.getElementById("commentPattern").textContent = data.dna.comment
}

if (semesterSelect) {
  semesterSelect.addEventListener("change", () => {
    updateEvaluation(semesterSelect.value)
  })

  updateEvaluation(semesterSelect.value)
}

const courseSearchInput = document.getElementById("courseSearchInput")
const courseSearchTerm = document.getElementById("courseSearchTerm")
const courseSearchButton = document.getElementById("courseSearchButton")
const courseSearchResults = document.getElementById("courseSearchResults")

const courseDatabase = [
  {
    code: "BIO 201",
    title: "Biology I",
    term: "Fall 2026",
    section: "Section 01",
    time: "Mon Wed Fri 9:00 AM to 9:50 AM",
    credits: "4 credits",
    status: "Available",
    riskLevel: "safe",
    evaluation: {
      enrolled: 220,
      responses: 86,
      rating: 4.2,
      a: 84,
      b: 70,
      c: 42,
      df: 24
    },
    features: [
      "Integrated Course Evaluation Preview shows enrollment, responses, grade distribution, and rating.",
      "Course Evaluation DNA summarizes workload, clarity, exam difficulty, and grading fairness.",
      "Visual Timetable Builder checks whether this course creates morning workload concentration.",
      "Course Twin Simulator previews how this course may feel in the student’s weekly schedule."
    ],
    recommendation: "This course is available and has moderate workload. It is a safe option if the student prefers structured science requirements."
  },
  {
    code: "MAT 123",
    title: "Calculus I",
    term: "Fall 2026",
    section: "Section 01",
    time: "Mon Wed 10:00 AM to 11:20 AM",
    credits: "4 credits",
    status: "Sequence Risk",
    riskLevel: "risk",
    evaluation: {
      enrolled: 180,
      responses: 62,
      rating: 3.8,
      a: 48,
      b: 55,
      c: 50,
      df: 27
    },
    features: [
      "Hidden Rule Decoder explains that MAP 103 or MAT 119 may need to be checked.",
      "Course Pathway Checker compares the course with the student’s degree sequence.",
      "Advisor Ready Evidence Pack creates a report for the coordinator or advisor.",
      "Regret Preview Before Enroll warns that this course may delay the math sequence."
    ],
    recommendation: "This course should be checked with an advisor before enrollment because it may not fit the current degree path."
  },
  {
    code: "CHE 131",
    title: "General Chemistry I",
    term: "Fall 2026",
    section: "Section 03",
    time: "Tue Thu 11:00 AM to 12:20 PM",
    credits: "4 credits",
    status: "High Workload",
    riskLevel: "risk",
    evaluation: {
      enrolled: 310,
      responses: 130,
      rating: 3.6,
      a: 72,
      b: 90,
      c: 96,
      df: 52
    },
    features: [
      "Schedule Stress Heatmap warns when CHE 131 is combined with other heavy science courses.",
      "Course Evaluation DNA shows exam difficulty and workload patterns from student comments.",
      "What If Schedule Lab compares safe schedule, fast graduation schedule, and low workload schedule.",
      "AI Registration Risk Coach explains why this course may create overload."
    ],
    recommendation: "This course is possible, but the student should check workload concentration before adding another difficult STEM course."
  },
  {
    code: "AMS 151",
    title: "Applied Calculus I",
    term: "Fall 2026",
    section: "Section 02",
    time: "Tue Thu 2:00 PM to 3:20 PM",
    credits: "3 credits",
    status: "Available",
    riskLevel: "safe",
    evaluation: {
      enrolled: 240,
      responses: 95,
      rating: 4.1,
      a: 88,
      b: 76,
      c: 52,
      df: 24
    },
    features: [
      "Peer Pathway Map shows how similar students used this course in their pathway.",
      "Visual Timetable Builder confirms fewer conflicts with morning courses.",
      "Course Evaluation Preview shows grade distribution and response count by semester.",
      "Backup Option Generator can compare this course with MAT 123."
    ],
    recommendation: "This course may be a practical alternative depending on the student’s major requirement and advisor approval."
  },
  {
    code: "EST 207",
    title: "Interaction Design",
    term: "Fall 2026",
    section: "Section 01",
    time: "Mon Wed 1:00 PM to 2:20 PM",
    credits: "3 credits",
    status: "Project Based",
    riskLevel: "safe",
    evaluation: {
      enrolled: 39,
      responses: 30,
      rating: 4.4,
      a: 18,
      b: 12,
      c: 6,
      df: 3
    },
    features: [
      "Course Experience Forecast predicts strong fit for students who prefer project based learning.",
      "Course Evaluation DNA summarizes teamwork, feedback quality, and project workload.",
      "Visual Timetable Builder shows how group work time fits into the weekly schedule.",
      "Integrated Course Evaluation Preview helps students compare past student comments before registration."
    ],
    recommendation: "This course is suitable for students who prefer project development, feedback, and applied design work."
  },
  {
    code: "PSY 103",
    title: "Introduction to Psychology",
    term: "Fall 2026",
    section: "Section 04",
    time: "Tue Thu 9:30 AM to 10:50 AM",
    credits: "3 credits",
    status: "Available",
    riskLevel: "safe",
    evaluation: {
      enrolled: 280,
      responses: 110,
      rating: 4.0,
      a: 90,
      b: 88,
      c: 70,
      df: 32
    },
    features: [
      "Course Evaluation Preview shows grade distribution and student comment patterns.",
      "Schedule Stress Heatmap checks whether the morning class fits the student’s routine.",
      "Course Twin Simulator previews workload risk for non major students.",
      "Backup Option Generator compares this course with other general education options."
    ],
    recommendation: "This course is a flexible option for students looking for a general education course with predictable workload."
  },
  {
    code: "BUS 348",
    title: "Strategic Management",
    term: "Fall 2026",
    section: "Section 01",
    time: "Wed 6:00 PM to 8:50 PM",
    credits: "3 credits",
    status: "Reserved Seats",
    riskLevel: "risk",
    evaluation: {
      enrolled: 160,
      responses: 58,
      rating: 3.9,
      a: 50,
      b: 48,
      c: 42,
      df: 20
    },
    features: [
      "Hidden Rule Decoder explains why the course may show open seats but still block enrollment.",
      "Advisor Ready Evidence Pack summarizes the reserved seat issue for official support.",
      "AI Registration Risk Coach suggests whether to wait, choose another section, or contact the department.",
      "Visual Timetable Builder checks whether the evening section conflicts with work or internship time."
    ],
    recommendation: "This course may require department confirmation because open seats may be reserved for a specific student group."
  }
]

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim()
}

function renderCourseResults() {
  if (!courseSearchResults) return

  const query = normalizeText(courseSearchInput.value)
  const selectedTerm = courseSearchTerm.options[courseSearchTerm.selectedIndex].text

  const results = courseDatabase.filter(course => {
    const courseText = normalizeText(`${course.code} ${course.title}`)
    return courseText.includes(query) || query.includes(normalizeText(course.code)) || query === ""
  })

  if (results.length === 0) {
    courseSearchResults.innerHTML = `
      <div class="search-empty">
        <h3>No matching sample course found</h3>
        <p>Try BIO 201, MAT 123, CHE 131, AMS 151, EST 207, PSY 103, or BUS 348.</p>
      </div>
    `
    return
  }

  courseSearchResults.innerHTML = results.map(course => {
    const cardClass = course.riskLevel === "risk" ? "risk" : "safe-result"
    const badgeClass = course.riskLevel === "risk" ? "warning" : "safe"

    return `
      <div class="course-result-grid">
        <div class="course-main-card ${cardClass}">
          <div class="course-main-top">
            <div>
              <h3>${course.code} ${course.title}</h3>
              <p class="course-meta">${selectedTerm} · ${course.section} · ${course.time} · ${course.credits}</p>
            </div>
            <span class="badge ${badgeClass}">${course.status}</span>
          </div>

          <div class="mini-metric-grid">
            <div class="mini-metric">
              <strong>${course.evaluation.enrolled}</strong>
              <span>Enrolled</span>
            </div>
            <div class="mini-metric">
              <strong>${course.evaluation.responses}</strong>
              <span>Responses</span>
            </div>
            <div class="mini-metric">
              <strong>${course.evaluation.rating}</strong>
              <span>Rating</span>
            </div>
            <div class="mini-metric">
              <strong>${course.evaluation.a}</strong>
              <span>A grades</span>
            </div>
          </div>

          <p><strong>ZOLAR recommendation:</strong> ${course.recommendation}</p>

          <div class="course-actions">
            <button class="primary" data-go="evaluation">View Evaluation DNA</button>
            <button data-go="timetable">Add to Timetable</button>
            <button data-go="pathway">Check Pathway</button>
            <button data-go="advisor">Prepare Advisor Report</button>
          </div>
        </div>

        <div class="course-feature-card">
          <h3>Key Features Applied</h3>
          <ul class="feature-list">
            ${course.features.map(feature => `<li>${feature}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
  }).join("")

  const newGoButtons = courseSearchResults.querySelectorAll("[data-go]")
  newGoButtons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go)
    })
  })
}

if (courseSearchButton) {
  courseSearchButton.addEventListener("click", renderCourseResults)
}

if (courseSearchInput) {
  courseSearchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      renderCourseResults()
    }
  })
}

if (courseSearchTerm) {
  courseSearchTerm.addEventListener("change", renderCourseResults)
}

renderCourseResults()

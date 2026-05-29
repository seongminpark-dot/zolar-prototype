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

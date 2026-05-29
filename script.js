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
const semesterData = document.getElementById("semesterData")

if (semesterSelect && semesterData) {
  semesterSelect.addEventListener("change", () => {
    if (semesterSelect.value === "fall2025") {
      semesterData.textContent = "Fall 2025 · 220 enrolled · 86 responses · Overall rating 4.2 out of 5"
    }

    if (semesterSelect.value === "spring2025") {
      semesterData.textContent = "Spring 2025 · 198 enrolled · 74 responses · Overall rating 4.0 out of 5"
    }

    if (semesterSelect.value === "fall2024") {
      semesterData.textContent = "Fall 2024 · 214 enrolled · 91 responses · Overall rating 4.3 out of 5"
    }
  })
}

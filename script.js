const navButtons = document.querySelectorAll(".nav")
const pages = document.querySelectorAll(".page")

let selectedCourseId = "BIO 201"
let selectedTerm = "Fall 2026"
let moved = false

const courses = {
  "BIO 201": {
    code: "BIO 201",
    title: "Biology I",
    location: "Life Sciences Building 038",
    credits: "4 credits",
    category: "Structured science requirement",
    statusByTerm: {
      "Fall 2026": "Available",
      "Spring 2026": "Available",
      "Summer 2026": "Limited Seats"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 01",
        days: "Mon Wed Fri",
        start: "9:00 AM",
        end: "9:50 AM",
        evaluation: {
          enrolled: 220,
          responses: 86,
          rating: 4.2,
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
      "Spring 2026": {
        section: "Section 02",
        days: "Tue Thu",
        start: "11:00 AM",
        end: "12:20 PM",
        evaluation: {
          enrolled: 198,
          responses: 74,
          rating: 4.0,
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
      "Summer 2026": {
        section: "Section 90",
        days: "Mon Tue Wed Thu",
        start: "10:00 AM",
        end: "11:15 AM",
        evaluation: {
          enrolled: 88,
          responses: 39,
          rating: 3.9,
          A: 29,
          B: 27,
          C: 21,
          DF: 11
        },
        dna: {
          workload: "Workload: High",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention the course moves quickly during summer and requires consistent review."
        }
      }
    },
    features: [
      "Integrated Course Evaluation Preview shows enrollment, responses, grade distribution, and rating.",
      "Course Evaluation DNA summarizes workload, clarity, exam difficulty, and grading fairness.",
      "Visual Timetable Builder checks whether this course creates morning workload concentration.",
      "Course Twin Simulator previews how this course may feel in the student’s weekly schedule."
    ],
    recommendation: "This course is available and has moderate workload. It is a safe option if the student prefers structured science requirements.",
    pathway: {
      past: "Past: completed introductory science preparation",
      current: "Current: BIO 201 selected",
      future: "Future: BIO 202 or lab requirement",
      peerText: "Similar science major students usually use BIO 201 as an early foundation course.",
      peerSteps: [
        "Complete introductory science or placement expectation",
        "Take BIO 201 with a balanced science schedule",
        "Continue to BIO 202 or required lab sequence"
      ],
      options: [
        "Keep BIO 201 if the schedule remains balanced.",
        "Avoid pairing it with too many heavy STEM courses in the same semester.",
        "Use Course Evaluation DNA to check workload patterns before final enrollment."
      ],
      problem: "No serious registration problem is detected for BIO 201.",
      cause: "The course fits a common science sequence, but workload should still be checked.",
      risk: "The main risk is workload concentration if BIO 201 is combined with multiple lab or chemistry courses.",
      agency: "Contact an academic advisor only if this course is being used to satisfy a specific major or transfer requirement."
    }
  },

  "MAT 123": {
    code: "MAT 123",
    title: "Calculus I",
    location: "Math Tower P 131",
    credits: "4 credits",
    category: "Math sequence requirement",
    statusByTerm: {
      "Fall 2026": "Sequence Risk",
      "Spring 2026": "Sequence Risk",
      "Summer 2026": "External Option Recommended"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 01",
        days: "Mon Wed",
        start: "10:00 AM",
        end: "11:20 AM",
        evaluation: {
          enrolled: 180,
          responses: 62,
          rating: 3.8,
          A: 48,
          B: 55,
          C: 50,
          DF: 27
        },
        dna: {
          workload: "Workload: High",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention fast pacing, frequent problem sets, and the need to confirm prerequisite expectations early."
        }
      },
      "Spring 2026": {
        section: "Section 03",
        days: "Tue Thu",
        start: "8:30 AM",
        end: "9:50 AM",
        evaluation: {
          enrolled: 166,
          responses: 58,
          rating: 3.6,
          A: 39,
          B: 50,
          C: 48,
          DF: 29
        },
        dna: {
          workload: "Workload: High",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Low Moderate",
          comment: "Students mention that early morning sections are difficult when paired with heavy science courses."
        }
      },
      "Summer 2026": {
        section: "Equivalent Course Search",
        days: "Online or partner campus",
        start: "Varies",
        end: "Varies",
        evaluation: {
          enrolled: 72,
          responses: 28,
          rating: 3.7,
          A: 21,
          B: 20,
          C: 19,
          DF: 12
        },
        dna: {
          workload: "Workload: Intensive",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Varies by institution",
          comment: "Students mention that summer math courses require daily practice and advisor confirmation before transfer."
        }
      }
    },
    features: [
      "Hidden Rule Decoder explains that MAP 103 or MAT 119 may need to be checked.",
      "Course Pathway Checker compares the course with the student’s degree sequence.",
      "Advisor Ready Evidence Pack creates a report for the coordinator or advisor.",
      "Regret Preview Before Enroll warns that this course may delay the math sequence."
    ],
    recommendation: "This course should be checked with an advisor before enrollment because it may not fit the current degree path.",
    pathway: {
      past: "Past: MAP 103 or placement expected",
      current: "Current: MAT 123 selected",
      future: "Future: AMS 161 may be delayed",
      peerText: "Similar students usually confirm the math sequence before using MAT 123 to satisfy a requirement.",
      peerSteps: [
        "Check MAP 103 or placement status",
        "Confirm whether MAT 119 is required with MAT 123",
        "Ask advisor whether an approved summer equivalent can satisfy the sequence"
      ],
      options: [
        "Check whether MAT 119 can be added.",
        "Find an approved summer equivalent course.",
        "Replace MAT 123 with another required course this semester."
      ],
      problem: "The selected course may not fit the student’s current math sequence.",
      cause: "MAP 103 or MAT 119 may need to be checked before MAT 123 can safely count toward the degree path.",
      risk: "This choice may delay the math sequence and affect future semester planning.",
      agency: "Contact Academic and Transfer Advising Services or the department coordinator with this evidence pack."
    }
  },

  "CHE 131": {
    code: "CHE 131",
    title: "General Chemistry I",
    location: "Chemistry Building 100",
    credits: "4 credits",
    category: "High workload STEM course",
    statusByTerm: {
      "Fall 2026": "High Workload",
      "Spring 2026": "Available",
      "Summer 2026": "Intensive Format"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 03",
        days: "Tue Thu",
        start: "11:00 AM",
        end: "12:20 PM",
        evaluation: {
          enrolled: 310,
          responses: 130,
          rating: 3.6,
          A: 72,
          B: 90,
          C: 96,
          DF: 52
        },
        dna: {
          workload: "Workload: Very High",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention heavy homework, difficult exams, and the need for steady weekly preparation."
        }
      },
      "Spring 2026": {
        section: "Section 04",
        days: "Mon Wed",
        start: "2:30 PM",
        end: "3:50 PM",
        evaluation: {
          enrolled: 276,
          responses: 101,
          rating: 3.7,
          A: 70,
          B: 82,
          C: 83,
          DF: 41
        },
        dna: {
          workload: "Workload: High",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention that afternoon sections are easier to manage but still require frequent review."
        }
      },
      "Summer 2026": {
        section: "Section 90",
        days: "Mon Tue Wed Thu",
        start: "9:00 AM",
        end: "10:50 AM",
        evaluation: {
          enrolled: 118,
          responses: 47,
          rating: 3.4,
          A: 24,
          B: 34,
          C: 38,
          DF: 22
        },
        dna: {
          workload: "Workload: Intensive",
          exam: "Exam Difficulty: High",
          fairness: "Grading Fairness: Mixed Negative",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention the summer version is compressed and difficult when taken with other science courses."
        }
      }
    },
    features: [
      "Schedule Stress Heatmap warns when CHE 131 is combined with other heavy science courses.",
      "Course Evaluation DNA shows exam difficulty and workload patterns from student comments.",
      "What If Schedule Lab compares safe schedule, fast graduation schedule, and low workload schedule.",
      "AI Registration Risk Coach explains why this course may create overload."
    ],
    recommendation: "This course is possible, but the student should check workload concentration before adding another difficult STEM course.",
    pathway: {
      past: "Past: Chemistry preparation expected",
      current: "Current: CHE 131 selected",
      future: "Future: CHE 132 or lab sequence",
      peerText: "Similar STEM students often avoid pairing CHE 131 with too many other high workload courses.",
      peerSteps: [
        "Confirm chemistry placement or preparation",
        "Take CHE 131 with a manageable weekly schedule",
        "Continue to CHE 132 or required lab sequence"
      ],
      options: [
        "Use the timetable heatmap to check workload concentration.",
        "Move one heavy course to another semester if possible.",
        "Ask an advisor whether the current course combination is realistic."
      ],
      problem: "The course is available, but workload concentration may become too high.",
      cause: "CHE 131 has high exam difficulty and heavy weekly preparation.",
      risk: "The student may experience schedule overload if this course is combined with other heavy STEM courses.",
      agency: "Contact an academic advisor if the course combination affects major progress or academic standing."
    }
  },

  "AMS 151": {
    code: "AMS 151",
    title: "Applied Calculus I",
    location: "Engineering Building 143",
    credits: "3 credits",
    category: "Applied math option",
    statusByTerm: {
      "Fall 2026": "Available",
      "Spring 2026": "Available",
      "Summer 2026": "Available Online"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 02",
        days: "Tue Thu",
        start: "2:00 PM",
        end: "3:20 PM",
        evaluation: {
          enrolled: 240,
          responses: 95,
          rating: 4.1,
          A: 88,
          B: 76,
          C: 52,
          DF: 24
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: Low",
          clarity: "Clarity: High",
          comment: "Students mention practical examples, steady assignments, and clear grading expectations."
        }
      },
      "Spring 2026": {
        section: "Section 01",
        days: "Mon Wed",
        start: "12:30 PM",
        end: "1:50 PM",
        evaluation: {
          enrolled: 230,
          responses: 82,
          rating: 4.0,
          A: 80,
          B: 75,
          C: 53,
          DF: 22
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate High",
          comment: "Students mention clear lectures but recommend not falling behind on weekly problem sets."
        }
      },
      "Summer 2026": {
        section: "Online Section",
        days: "Online",
        start: "Asynchronous",
        end: "Asynchronous",
        evaluation: {
          enrolled: 104,
          responses: 41,
          rating: 3.9,
          A: 34,
          B: 31,
          C: 25,
          DF: 14
        },
        dna: {
          workload: "Workload: Moderate High",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention flexibility but warn that online pacing requires self discipline."
        }
      }
    },
    features: [
      "Peer Pathway Map shows how similar students used this course in their pathway.",
      "Visual Timetable Builder confirms fewer conflicts with morning courses.",
      "Course Evaluation Preview shows grade distribution and response count by semester.",
      "Backup Option Generator can compare this course with MAT 123."
    ],
    recommendation: "This course may be a practical alternative depending on the student’s major requirement and advisor approval.",
    pathway: {
      past: "Past: math preparation or placement",
      current: "Current: AMS 151 selected",
      future: "Future: applied statistics or next quantitative requirement",
      peerText: "Similar students use AMS 151 when their major allows an applied calculus pathway.",
      peerSteps: [
        "Confirm the major accepts AMS 151",
        "Compare AMS 151 with MAT 123 or other math options",
        "Continue to the next quantitative requirement if approved"
      ],
      options: [
        "Confirm whether AMS 151 satisfies the student’s requirement.",
        "Compare workload with MAT 123.",
        "Use the advisor report if the requirement is unclear."
      ],
      problem: "The course looks available, but requirement fit must be confirmed.",
      cause: "Some majors accept applied calculus while others require a different math path.",
      risk: "The student may take a course that is useful but does not satisfy the intended requirement.",
      agency: "Contact the department advisor to confirm whether AMS 151 fits the degree plan."
    }
  },

  "EST 207": {
    code: "EST 207",
    title: "Interaction Design",
    location: "Computer Science Building 2120",
    credits: "3 credits",
    category: "Project based design course",
    statusByTerm: {
      "Fall 2026": "Project Based",
      "Spring 2026": "Project Based",
      "Summer 2026": "Not Offered"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 01",
        days: "Mon Wed",
        start: "1:00 PM",
        end: "2:20 PM",
        evaluation: {
          enrolled: 39,
          responses: 30,
          rating: 4.4,
          A: 18,
          B: 12,
          C: 6,
          DF: 3
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Low",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: High",
          clarity: "Clarity: High",
          comment: "Students mention useful feedback, persona design, and practical group project experience."
        }
      },
      "Spring 2026": {
        section: "Section 01",
        days: "Tue Thu",
        start: "3:00 PM",
        end: "4:20 PM",
        evaluation: {
          enrolled: 42,
          responses: 31,
          rating: 4.5,
          A: 21,
          B: 13,
          C: 6,
          DF: 2
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Low",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: High",
          clarity: "Clarity: High",
          comment: "Students mention inclusive class discussion, consistent feedback, and applied design practice."
        }
      },
      "Summer 2026": {
        section: "Not Offered",
        days: "Not Offered",
        start: "Not Offered",
        end: "Not Offered",
        evaluation: {
          enrolled: 0,
          responses: 0,
          rating: 0,
          A: 0,
          B: 0,
          C: 0,
          DF: 0
        },
        dna: {
          workload: "Workload: Not Available",
          exam: "Exam Difficulty: Not Available",
          fairness: "Grading Fairness: Not Available",
          group: "Group Work: Not Available",
          clarity: "Clarity: Not Available",
          comment: "This course is not offered in Summer 2026 in this prototype."
        }
      }
    },
    features: [
      "Course Experience Forecast predicts strong fit for students who prefer project based learning.",
      "Course Evaluation DNA summarizes teamwork, feedback quality, and project workload.",
      "Visual Timetable Builder shows how group work time fits into the weekly schedule.",
      "Integrated Course Evaluation Preview helps students compare past student comments before registration."
    ],
    recommendation: "This course is suitable for students who prefer project development, feedback, and applied design work.",
    pathway: {
      past: "Past: introductory design or technology foundation",
      current: "Current: EST 207 selected",
      future: "Future: advanced interaction or project design course",
      peerText: "Similar students take EST 207 when they want project based interaction design experience.",
      peerSteps: [
        "Complete introductory technology or design foundation",
        "Take EST 207 for applied interaction design practice",
        "Use the project experience for later design or UX related work"
      ],
      options: [
        "Keep EST 207 if group project time fits the weekly schedule.",
        "Check course evaluation comments about teamwork and feedback.",
        "Avoid pairing it with too many other group intensive courses."
      ],
      problem: "No serious registration problem is detected, but group project workload should be considered.",
      cause: "Project based courses require steady communication and revision time.",
      risk: "The student may underestimate group coordination workload.",
      agency: "Contact the instructor only if project expectations or participation requirements are unclear."
    }
  },

  "PSY 103": {
    code: "PSY 103",
    title: "Introduction to Psychology",
    location: "Javits Lecture Center 100",
    credits: "3 credits",
    category: "General education option",
    statusByTerm: {
      "Fall 2026": "Available",
      "Spring 2026": "Available",
      "Summer 2026": "Online Available"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 04",
        days: "Tue Thu",
        start: "9:30 AM",
        end: "10:50 AM",
        evaluation: {
          enrolled: 280,
          responses: 110,
          rating: 4.0,
          A: 90,
          B: 88,
          C: 70,
          DF: 32
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: Low",
          clarity: "Clarity: High",
          comment: "Students mention organized slides, predictable exams, and useful examples."
        }
      },
      "Spring 2026": {
        section: "Section 02",
        days: "Mon Wed",
        start: "4:00 PM",
        end: "5:20 PM",
        evaluation: {
          enrolled: 255,
          responses: 93,
          rating: 3.9,
          A: 78,
          B: 82,
          C: 68,
          DF: 27
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Mixed Positive",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate High",
          comment: "Students mention interesting lectures but recommend steady review before exams."
        }
      },
      "Summer 2026": {
        section: "Online Section",
        days: "Online",
        start: "Asynchronous",
        end: "Asynchronous",
        evaluation: {
          enrolled: 142,
          responses: 61,
          rating: 3.8,
          A: 44,
          B: 45,
          C: 36,
          DF: 17
        },
        dna: {
          workload: "Workload: Moderate High",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: Low",
          clarity: "Clarity: Moderate",
          comment: "Students mention flexibility but say online exams require careful preparation."
        }
      }
    },
    features: [
      "Course Evaluation Preview shows grade distribution and student comment patterns.",
      "Schedule Stress Heatmap checks whether the morning class fits the student’s routine.",
      "Course Twin Simulator previews workload risk for non major students.",
      "Backup Option Generator compares this course with other general education options."
    ],
    recommendation: "This course is a flexible option for students looking for a general education course with predictable workload.",
    pathway: {
      past: "Past: general education planning",
      current: "Current: PSY 103 selected",
      future: "Future: SBC or elective progress",
      peerText: "Similar students often use PSY 103 to satisfy a general education or elective need.",
      peerSteps: [
        "Check whether PSY 103 satisfies the intended SBC or elective category",
        "Compare workload with other general education options",
        "Use the course as a flexible schedule filler if it does not block required courses"
      ],
      options: [
        "Keep PSY 103 if it satisfies the intended requirement.",
        "Compare with another general education course if the schedule is tight.",
        "Check evaluation comments for exam style and workload."
      ],
      problem: "No serious registration problem is detected.",
      cause: "The main issue is whether the course satisfies the intended requirement.",
      risk: "The course may fill time but may not satisfy the requirement the student expected.",
      agency: "Contact an advisor only if the requirement category is unclear."
    }
  },

  "BUS 348": {
    code: "BUS 348",
    title: "Strategic Management",
    location: "Harriman Hall 137",
    credits: "3 credits",
    category: "Reserved seat management course",
    statusByTerm: {
      "Fall 2026": "Reserved Seats",
      "Spring 2026": "Reserved Seats",
      "Summer 2026": "Not Offered"
    },
    offerings: {
      "Fall 2026": {
        section: "Section 01",
        days: "Wed",
        start: "6:00 PM",
        end: "8:50 PM",
        evaluation: {
          enrolled: 160,
          responses: 58,
          rating: 3.9,
          A: 50,
          B: 48,
          C: 42,
          DF: 20
        },
        dna: {
          workload: "Workload: Moderate High",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Mixed",
          group: "Group Work: High",
          clarity: "Clarity: Moderate",
          comment: "Students mention useful cases but note that group work and reserved seats can affect planning."
        }
      },
      "Spring 2026": {
        section: "Section 02",
        days: "Fri",
        start: "1:00 PM",
        end: "3:50 PM",
        evaluation: {
          enrolled: 150,
          responses: 52,
          rating: 4.0,
          A: 51,
          B: 46,
          C: 38,
          DF: 15
        },
        dna: {
          workload: "Workload: Moderate",
          exam: "Exam Difficulty: Medium",
          fairness: "Grading Fairness: Positive",
          group: "Group Work: High",
          clarity: "Clarity: Moderate High",
          comment: "Students mention strong case discussions and manageable grading when group work is organized early."
        }
      },
      "Summer 2026": {
        section: "Not Offered",
        days: "Not Offered",
        start: "Not Offered",
        end: "Not Offered",
        evaluation: {
          enrolled: 0,
          responses: 0,
          rating: 0,
          A: 0,
          B: 0,
          C: 0,
          DF: 0
        },
        dna: {
          workload: "Workload: Not Available",
          exam: "Exam Difficulty: Not Available",
          fairness: "Grading Fairness: Not Available",
          group: "Group Work: Not Available",
          clarity: "Clarity: Not Available",
          comment: "This course is not offered in Summer 2026 in this prototype."
        }
      }
    },
    features: [
      "Hidden Rule Decoder explains why the course may show open seats but still block enrollment.",
      "Advisor Ready Evidence Pack summarizes the reserved seat issue for official support.",
      "AI Registration Risk Coach suggests whether to wait, choose another section, or contact the department.",
      "Visual Timetable Builder checks whether the evening section conflicts with work or internship time."
    ],
    recommendation: "This course may require department confirmation because open seats may be reserved for a specific student group.",
    pathway: {
      past: "Past: business core progress",
      current: "Current: BUS 348 selected",
      future: "Future: graduation or capstone requirement",
      peerText: "Similar business students usually check reserved seats before relying on BUS 348 for graduation planning.",
      peerSteps: [
        "Confirm major standing and reserved seat eligibility",
        "Check whether the section is open to the student’s group",
        "Prepare advisor or department message if enrollment is blocked"
      ],
      options: [
        "Check whether the reserved seats apply to the student.",
        "Prepare an advisor report with the blocked enrollment message.",
        "Choose a backup section or course if the restriction remains."
      ],
      problem: "The course may show available seats but still block enrollment because of reserved seats.",
      cause: "Some seats may be reserved for a specific major, year level, or student group.",
      risk: "The student may lose time waiting for a seat that is not actually open to them.",
      agency: "Contact the department coordinator or advisor with the reserved seat evidence."
    }
  }
}

function getCourse() {
  return courses[selectedCourseId] || courses["BIO 201"]
}

function getOffering(course, term) {
  return course.offerings[term] || course.offerings["Fall 2026"] || Object.values(course.offerings)[0]
}

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim()
}

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

  renderDynamicPage(pageId)
}

function renderDynamicPage(pageId) {
  if (pageId === "search") renderCourseResults()
  if (pageId === "timetable") renderTimetable()
  if (pageId === "evaluation") renderEvaluation()
  if (pageId === "pathway") renderPathway()
  if (pageId === "advisor") renderAdvisor()
  if (pageId === "chatbot") renderChatbot()
}

document.addEventListener("click", event => {
  const goButton = event.target.closest("[data-go]")
  if (goButton) {
    showPage(goButton.dataset.go)
    return
  }

  const selectButton = event.target.closest("[data-select-course]")
  if (selectButton) {
    selectedCourseId = selectButton.dataset.selectCourse
    selectedTerm = selectButton.dataset.selectTerm
    renderCourseResults()
    return
  }
})

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page)
  })
})

const courseSearchInput = document.getElementById("courseSearchInput")
const courseSearchTerm = document.getElementById("courseSearchTerm")
const courseSearchButton = document.getElementById("courseSearchButton")
const courseSearchResults = document.getElementById("courseSearchResults")

function renderCourseResults() {
  if (!courseSearchResults) return

  const query = normalizeText(courseSearchInput.value)
  const term = courseSearchTerm.value

  const results = Object.values(courses).filter(course => {
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
    const offering = getOffering(course, term)
    const status = course.statusByTerm[term] || "Check Required"
    const isRisk = status.includes("Risk") || status.includes("Reserved") || status.includes("High") || status.includes("Intensive") || status.includes("External") || status.includes("Not Offered")
    const cardClass = isRisk ? "risk" : "safe-result"
    const badgeClass = isRisk ? "warning" : "safe"
    const evalData = offering.evaluation

    return `
      <div class="course-result-grid">
        <div class="course-main-card ${cardClass}">
          <div class="course-main-top">
            <div>
              <h3>${course.code} ${course.title}</h3>
              <p class="course-meta">${term} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end} · ${course.location} · ${course.credits}</p>
            </div>
            <span class="badge ${badgeClass}">${status}</span>
          </div>

          <div class="mini-metric-grid">
            <div class="mini-metric">
              <strong>${evalData.enrolled}</strong>
              <span>Enrolled</span>
            </div>
            <div class="mini-metric">
              <strong>${evalData.responses}</strong>
              <span>Responses</span>
            </div>
            <div class="mini-metric">
              <strong>${evalData.rating}</strong>
              <span>Rating</span>
            </div>
            <div class="mini-metric">
              <strong>${evalData.A}</strong>
              <span>A grades</span>
            </div>
          </div>

          <p><strong>ZOLAR recommendation:</strong> ${course.recommendation}</p>

          <div class="course-actions">
            <button class="primary" data-select-course="${course.code}" data-select-term="${term}">Select This Course</button>
            <button data-go="evaluation" onclick="selectedCourseId='${course.code}'; selectedTerm='${term}'">View Evaluation DNA</button>
            <button data-go="timetable" onclick="selectedCourseId='${course.code}'; selectedTerm='${term}'">Add to Timetable</button>
            <button data-go="pathway" onclick="selectedCourseId='${course.code}'; selectedTerm='${term}'">Check Pathway</button>
            <button data-go="advisor" onclick="selectedCourseId='${course.code}'; selectedTerm='${term}'">Prepare Advisor Report</button>
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
  courseSearchTerm.addEventListener("change", () => {
    selectedTerm = courseSearchTerm.value
    renderCourseResults()
  })
}

function renderBanner(elementId) {
  const el = document.getElementById(elementId)
  if (!el) return

  const course = getCourse()
  const offering = getOffering(course, selectedTerm)

  el.innerHTML = `
    <h3>${course.code} ${course.title}</h3>
    <p>${selectedTerm} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end} · ${course.location} · ${course.credits}</p>
  `
}

function renderTimetable() {
  renderBanner("selectedCourseBanner")

  const course = getCourse()
  const offering = getOffering(course, selectedTerm)
  const grid = document.getElementById("timetableGrid")
  const heatmap = document.getElementById("heatmap")
  const summary = document.getElementById("stressSummary")
  const subtitle = document.getElementById("timetableSubtitle")

  if (!grid || !heatmap || !summary) return

  subtitle.textContent = `Selected course: ${course.code} in ${selectedTerm}. Click the button to simulate a drag and drop adjustment.`

  const baseBlocks = [
    { day: "Mon", time: "9 AM", text: "BIO 201<br>9:00 to 9:50<br>Life Sci 038", color: "green" },
    { day: "Wed", time: "9 AM", text: "CHE 230<br>9:00 to 10:20<br>Chem 100", color: "red" },
    { day: "Fri", time: "9 AM", text: "BIO 201<br>9:00 to 9:50<br>Life Sci 038", color: "green" },
    { day: "Mon", time: "1 PM", text: "EST 207<br>1:00 to 2:20<br>CS 2120", color: "yellow" },
    { day: "Wed", time: "1 PM", text: "EST 207<br>1:00 to 2:20<br>CS 2120", color: "yellow" },
    { day: "Tue", time: "3 PM", text: "Work Shift<br>3:00 to 7:00", color: "purple" },
    { day: "Thu", time: "3 PM", text: "Work Shift<br>3:00 to 7:00", color: "purple" }
  ]

  const selectedBlock = {
    day: getPrimaryDay(offering.days),
    time: getTimeSlot(offering.start),
    text: `${course.code}<br>${offering.start} to ${offering.end}<br>${course.location}`,
    color: course.code === "MAT 123" || course.code === "CHE 131" || course.code === "BUS 348" ? "red" : "blue",
    selected: true
  }

  const allBlocks = [...baseBlocks, selectedBlock]
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const times = ["8 AM", "9 AM", "11 AM", "1 PM", "3 PM", "6 PM"]

  let html = `<div class="time"></div>`
  days.forEach(day => {
    html += `<div class="day">${day}</div>`
  })

  times.forEach(time => {
    html += `<div class="time">${time}</div>`
    days.forEach(day => {
      const block = allBlocks.find(item => item.day === day && item.time === time)
      if (block) {
        const movedClass = block.selected && moved ? "moved" : ""
        html += `<div class="slot"><div id="${block.selected ? "movableCourse" : ""}" class="block ${block.color} ${movedClass}">${block.text}</div></div>`
      } else {
        html += `<div class="slot"></div>`
      }
    })
  })

  grid.innerHTML = html

  const stress = getStress(course.code)
  heatmap.innerHTML = stress.map(level => `<span class="${level}"></span>`).join("")

  summary.innerHTML = `
    <p><strong>Selected course:</strong> ${course.code} ${course.title}</p>
    <p><strong>Start and end time:</strong> ${offering.start} to ${offering.end}</p>
    <p><strong>Location:</strong> ${course.location}</p>
    <p><strong>Detected issue:</strong> ${course.pathway.risk}</p>
    <p><strong>Drag and drop simulation:</strong> Use the button to test whether moving the selected course reduces conflict or workload concentration.</p>
  `

  const moveButton = document.getElementById("moveCourse")
  if (moveButton) {
    moveButton.textContent = moved ? "Reset Timetable" : "Simulate Drag and Drop"
  }
}

function getPrimaryDay(days) {
  if (days.includes("Tue")) return "Tue"
  if (days.includes("Wed")) return "Wed"
  if (days.includes("Fri")) return "Fri"
  return "Mon"
}

function getTimeSlot(start) {
  if (start.includes("8:")) return "8 AM"
  if (start.includes("9:")) return "9 AM"
  if (start.includes("10:") || start.includes("11:")) return "11 AM"
  if (start.includes("12:") || start.includes("1:")) return "1 PM"
  if (start.includes("2:") || start.includes("3:") || start.includes("4:")) return "3 PM"
  if (start.includes("6:")) return "6 PM"
  return "11 AM"
}

function getStress(code) {
  if (code === "CHE 131") return ["mid", "high", "high", "mid", "low"]
  if (code === "MAT 123") return ["mid", "high", "mid", "mid", "low"]
  if (code === "BUS 348") return ["low", "mid", "high", "mid", "mid"]
  if (code === "EST 207") return ["low", "mid", "mid", "mid", "low"]
  return ["low", "mid", "mid", "low", "low"]
}

const moveButton = document.getElementById("moveCourse")
if (moveButton) {
  moveButton.addEventListener("click", () => {
    moved = !moved
    renderTimetable()
  })
}

function renderEvaluation() {
  renderBanner("evaluationBanner")

  const course = getCourse()
  const semesterSelect = document.getElementById("semesterSelect")
  if (!semesterSelect) return

  semesterSelect.innerHTML = Object.keys(course.offerings).map(term => {
    return `<option value="${term}" ${term === selectedTerm ? "selected" : ""}>${term}</option>`
  }).join("")

  updateEvaluation(selectedTerm)
}

function updateEvaluation(term) {
  const course = getCourse()
  const offering = getOffering(course, term)
  const data = offering.evaluation
  const total = data.enrolled || 1

  document.getElementById("evaluationCourseTitle").textContent = `${course.code} ${course.title}`
  document.getElementById("semesterData").textContent =
    `${term} · ${offering.section} · ${offering.days} · ${offering.start} to ${offering.end} · ${course.location} · ${data.enrolled} enrolled · ${data.responses} responses · Overall rating ${data.rating} out of 5`

  document.getElementById("countA").textContent = `${data.A} students`
  document.getElementById("countB").textContent = `${data.B} students`
  document.getElementById("countC").textContent = `${data.C} students`
  document.getElementById("countDF").textContent = `${data.DF} students`

  document.getElementById("barA").style.width = `${Math.round((data.A / total) * 100)}%`
  document.getElementById("barB").style.width = `${Math.round((data.B / total) * 100)}%`
  document.getElementById("barC").style.width = `${Math.round((data.C / total) * 100)}%`
  document.getElementById("barDF").style.width = `${Math.round((data.DF / total) * 100)}%`

  document.getElementById("gradeTableBody").innerHTML = `
    <tr>
      <td>${term}</td>
      <td>${course.location}</td>
      <td>${data.enrolled}</td>
      <td>${data.responses}</td>
      <td>${data.A}</td>
      <td>${data.B}</td>
      <td>${data.C}</td>
      <td>${data.DF}</td>
      <td>${data.rating}</td>
    </tr>
  `

  document.getElementById("dnaWorkload").textContent = offering.dna.workload
  document.getElementById("dnaExam").textContent = offering.dna.exam
  document.getElementById("dnaFairness").textContent = offering.dna.fairness
  document.getElementById("dnaGroup").textContent = offering.dna.group
  document.getElementById("dnaClarity").textContent = offering.dna.clarity
  document.getElementById("commentPattern").textContent = offering.dna.comment
}

const semesterSelect = document.getElementById("semesterSelect")
if (semesterSelect) {
  semesterSelect.addEventListener("change", () => {
    selectedTerm = semesterSelect.value
    updateEvaluation(selectedTerm)
    renderBanner("evaluationBanner")
  })
}

function renderPathway() {
  renderBanner("pathwayBanner")

  const course = getCourse()
  const path = course.pathway

  document.getElementById("pathwayCards").innerHTML = `
    <div class="path-item done">${path.past}</div>
    <div class="path-item ${course.statusByTerm[selectedTerm].includes("Risk") || course.statusByTerm[selectedTerm].includes("Reserved") || course.statusByTerm[selectedTerm].includes("High") ? "risk-path" : "done"}">${path.current}</div>
    <div class="path-item future">${path.future}</div>
  `

  document.getElementById("peerPathwayText").textContent = path.peerText
  document.getElementById("peerPathwayList").innerHTML = path.peerSteps.map(step => `<li>${step}</li>`).join("")
  document.getElementById("recommendedOptions").innerHTML = path.options.map(option => `<p><strong>Option:</strong> ${option}</p>`).join("")
}

function renderAdvisor() {
  renderBanner("advisorBanner")

  const course = getCourse()
  const path = course.pathway
  const offering = getOffering(course, selectedTerm)

  document.getElementById("advisorProblem").textContent = path.problem
  document.getElementById("advisorCause").textContent = path.cause
  document.getElementById("advisorRisk").textContent = path.risk
  document.getElementById("advisorAgency").textContent = path.agency

  document.getElementById("advisorMessage").innerHTML = `
    Dear Advisor,<br><br>
    I am reviewing ${course.code} ${course.title} for ${selectedTerm}. ZOLAR shows that this course has the following issue: ${path.problem}
    The course is listed as ${offering.section}, ${offering.days}, ${offering.start} to ${offering.end}, at ${course.location}. 
    Could you confirm whether this course fits my current degree path, or whether I should choose one of the recommended alternatives?<br><br>
    Thank you.
  `
}

function renderChatbot() {
  renderBanner("chatbotBanner")

  const course = getCourse()
  const path = course.pathway

  document.getElementById("chatBox").innerHTML = `
    <div class="message user">Why should I check ${course.code} before enrolling?</div>
    <div class="message bot">ZOLAR detected this issue: ${path.problem}</div>
    <div class="message bot">Possible reason: ${path.cause}</div>
    <div class="message bot">Recommended next step: ${path.agency}</div>
  `
}

const applyEvaluationButton = document.getElementById("applyEvaluationButton")
if (applyEvaluationButton) {
  applyEvaluationButton.addEventListener("click", () => {
    selectedTerm = document.getElementById("semesterSelect").value
    updateEvaluation(selectedTerm)
  })
}

renderCourseResults()
renderTimetable()
renderEvaluation()
renderPathway()
renderAdvisor()
renderChatbot()

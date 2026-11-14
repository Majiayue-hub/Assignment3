/* Task manager: login, validation, CRUD with localStorage, live clock */

let tasks = [];
let editIndex = -1;

/* ---------- load saved tasks ---------- */
function loadTasks() {
  const raw = localStorage.getItem("studyPlannerTasks");
  if (!raw) {
    tasks = [];
    return;
  }
  try {
    tasks = JSON.parse(raw);
  } catch (e) {
    tasks = [];
    localStorage.removeItem("studyPlannerTasks");
  }
}

function saveTasks() {
  localStorage.setItem("studyPlannerTasks", JSON.stringify(tasks));
}

/* ---------- login ---------- */
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  if (user === "" || pass === "") {
    message.textContent = "Username and password cannot be empty.";
    message.style.color = "#b4432c";
    return;
  }

  if (user === "student" && pass === "info1012") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("taskArea").style.display = "block";
    message.textContent = "";
  } else {
    message.textContent = "Incorrect username or password. Please try again.";
    message.style.color = "#b4432c";
  }
}

/* ---------- validation ---------- */
function validateTask(title, code, due) {
  if (title === "" || code === "" || due === "") {
    return "Task title, course code and due date are required.";
  }
  if (title.length < 3) {
    return "Task title must be at least 3 characters.";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due)) {
    return "Due date must use the format YYYY-MM-DD.";
  }
  const parsed = new Date(due);
  if (isNaN(parsed.getTime())) {
    return "Due date is not a valid date.";
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed < today) {
    return "Due date cannot be earlier than today.";
  }
  return "";
}

/* ---------- create / update ---------- */
function saveTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const code = document.getElementById("courseCode").value.trim();
  const name = document.getElementById("courseName").value.trim();
  const due = document.getElementById("dueDate").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  const notes = document.getElementById("taskNotes").value.trim();
  const message = document.getElementById("formMessage");

  const error = validateTask(title, code, due);
  if (error !== "") {
    message.textContent = error;
    message.style.color = "#b4432c";
    return;
  }

  const task = {
    title: title,
    code: code,
    name: name,
    due: due,
    desc: desc,
    notes: notes
  };

  if (editIndex === -1) {
    tasks.push(task);
    message.textContent = "Task added.";
  } else {
    tasks[editIndex] = task;
    message.textContent = "Task updated.";
    editIndex = -1;
    document.getElementById("formTitle").textContent = "Add a new study task";
  }

  message.style.color = "#1f6f94";
  saveTasks();
  resetForm();
  renderTasks();
}

/* ---------- edit ---------- */
function editTask(index) {
  const task = tasks[index];
  editIndex = index;

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("courseCode").value = task.code;
  document.getElementById("courseName").value = task.name;
  document.getElementById("dueDate").value = task.due;
  document.getElementById("taskDesc").value = task.desc;
  document.getElementById("taskNotes").value = task.notes;

  document.getElementById("formTitle").textContent = "Edit task";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- delete ---------- */
function deleteTask(index) {
  if (!confirm("Delete this task? This action cannot be undone.")) {
    return;
  }
  tasks.splice(index, 1);
  if (editIndex === index) {
    editIndex = -1;
    resetForm();
  }
  saveTasks();
  renderTasks();
}

/* ---------- render ---------- */
function renderTasks() {
  const body = document.getElementById("taskBody");
  const emptyMessage = document.getElementById("emptyMessage");
  body.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }
  emptyMessage.style.display = "none";

  tasks.forEach(function (task, index) {
    const row = document.createElement("tr");

    row.innerHTML =
      "<td><strong>" + escapeHtml(task.title) + "</strong><br>" +
        daysLeft(task.due) + "</td>" +
      "<td><span class='tag'>" + escapeHtml(task.code) + "</span><br>" +
        escapeHtml(task.name) + "</td>" +
      "<td class='date'>" + escapeHtml(task.due) + "</td>" +
      "<td>" + escapeHtml(task.desc) + "</td>" +
      "<td>" + escapeHtml(task.notes) + "</td>" +
      "<td class='actions'>" +
        "<button class='btn btn-light' onclick='editTask(" + index + ")'>Edit</button>" +
        " <button class='btn btn-danger' onclick='deleteTask(" + index + ")'>Delete</button>" +
      "</td>";

    body.appendChild(row);
  });
}

function daysLeft(due) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(due);
  const diff = Math.round((target - today) / 86400000);

  if (diff === 0) return "<span class='tag'>Due today</span>";
  if (diff === 1) return "<span class='tag'>1 day left</span>";
  return "<span class='tag'>" + diff + " days left</span>";
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- helpers ---------- */
function resetForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("courseCode").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskNotes").value = "";
  document.getElementById("formMessage").textContent = "";
  editIndex = -1;
  document.getElementById("formTitle").textContent = "Add a new study task";
}

/* ---------- live clock ---------- */
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleString("en-AU");
}

/* ---------- start ---------- */
loadTasks();
renderTasks();
updateClock();
setInterval(updateClock, 1000);

function editTask(index) {
  // Isi form dengan data task yang akan diedit
  const task = tasks[index];
  document.getElementById("todo-input").value = task.title;
  document.getElementById("date-input").value = task.date;
  document.getElementById("desc-input").value = task.desc;
  editIndex = index;
  setAddButtonToEdit();
}

function setAddButtonToEdit() {
  const btn = document.querySelector(".btn-add");
  if (btn) {
    btn.textContent = "Edit";
    btn.classList.remove("bg-green-500");
    btn.classList.add("bg-blue-500");
  }
}

function setAddButtonToAdd() {
  const btn = document.querySelector(".btn-add");
  if (btn) {
    btn.textContent = "+";
    btn.classList.remove("bg-blue-500");
    btn.classList.add("bg-green-500");
  }
}

function deleteTask(index) {
  // Remove task at given index
  tasks.splice(index, 1);
  renderTasks();
}
// This is a simple JavaScript file for a Todo List application
let tasks = [];
let filterType = "all"; // 'all', 'completed', 'not_completed'
let isFilterMenuOpen = false;
let filterDate = null;
let editIndex = null; // index task yang sedang diedit

function addTask() {
  const taskInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const descInput = document.getElementById("desc-input");

  if (taskInput.value === "" || dateInput.value === "") {
    alert("Please enter a task and a date.");
    return;
  }

  if (editIndex === null) {
    // Add new task
    tasks.push({
      title: taskInput.value,
      date: dateInput.value,
      desc: descInput.value,
      completed: false,
    });
  } else {
    // Edit existing task
    tasks[editIndex].title = taskInput.value;
    tasks[editIndex].date = dateInput.value;
    tasks[editIndex].desc = descInput.value;
    editIndex = null;
    setAddButtonToAdd();
  }
  renderTasks();
  // Clear input fields after adding/editing
  taskInput.value = "";
  dateInput.value = "";
  descInput.value = "";
}

// Close filter menu when clicking outside
document.addEventListener("click", function (event) {
  const filterBtn = document.querySelector(".btn-filter");
  const filterMenu = document.getElementById("filter-menu");
  if (!filterMenu || !filterBtn) return;
  if (
    isFilterMenuOpen &&
    !filterMenu.contains(event.target) &&
    !filterBtn.contains(event.target)
  ) {
    isFilterMenuOpen = false;
    filterMenu.classList.add("hidden");
  }
});

function toggleFilterMenu() {
  isFilterMenuOpen = !isFilterMenuOpen;
  const menu = document.getElementById("filter-menu");
  if (menu) menu.classList.toggle("hidden", !isFilterMenuOpen);
}

function setFilter(type) {
  filterType = type;
  isFilterMenuOpen = false;
  const menu = document.getElementById("filter-menu");
  if (menu) menu.classList.add("hidden");
  renderTasks();
}

function filterTasks(tasks) {
  // Filter tasks by completion status
  let filtered = tasks;
  if (filterType === "completed") {
    filtered = tasks.filter((task) => task.completed);
  } else if (filterType === "not_completed") {
    filtered = tasks.filter((task) => !task.completed);
  }
  // (Optional) filter by date if needed, keep for extensibility
  // if (filterDate) filtered = filtered.filter(task => task.date === filterDate);
  return filtered;
}

function completeTask(index) {
  // Toggle completed status
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function renderTasks() {
  // Function to render tasks on the page
  const taskList = document.getElementById("todo-list");
  taskList.innerHTML = ""; // Clear the current list

  const displayTasks = filterTasks(tasks);
  if (displayTasks.length === 0) {
    taskList.innerHTML = "<p>No tasks available</p>";
    return;
  }
  displayTasks.forEach((task, index) => {
    const statusIcon = task.completed
      ? '<span class="text-green-500 mr-2">&#10003;</span>'
      : '<span class="text-red-500 mr-2">&#10007;</span>';
    const toggleBtn = task.completed
      ? `<button type="button" class="px-[10px] py-[2px] bg-green-500 text-white rounded-md mr-2" title="Tandai belum selesai" onclick="completeTask(${index});">&#10003;</button>`
      : `<button type="button" class="px-[10px] py-[2px] bg-red-500 text-white rounded-md mr-2" title="Tandai selesai" onclick="completeTask(${index});">&#10007;</button>`;
    taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center bg-white p-4 mb-2">
            <div class="flex-1">
                <span>${statusIcon}${
      task.title
    } <span class="text-gray-500 text-sm ml-2">(${task.date})</span></span>
                <div class="text-xs text-gray-600 mt-1">${
                  task.desc ? task.desc : ""
                }</div>
            </div>
            <div class="flex gap-2">
                ${toggleBtn}
                <button type="button" class="px-[10px] py-[2px] bg-blue-500 text-white rounded-md mr-2" onclick="editTask(${index});">Edit</button>
                <button class="px-[10px] py-[2px] bg-red-500 text-white rounded-md" onclick="deleteTask(${index});">Delete</button>
            </div>
        </li>
    `;
  });
}

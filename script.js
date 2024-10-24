const submitButton = document.querySelector("#submit");
const taskInput = document.querySelector("#taskInput");
const quantityInput = document.querySelector("#quantityInput");
const taskList = document.querySelector("#tasklist");
const doneList = document.querySelector("#donelist");
const createTaskButton = document.querySelector("#createTaskButton");
const inputContainer = document.querySelector("#inputContainer");
const cancelButton = document.querySelector("#cancel");

let tasks = [];
let doneTasks = [];

createTaskButton.addEventListener("click", () => {
  inputContainer.style.display = "grid";
  createTaskButton.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  inputContainer.style.display = "none";
  createTaskButton.style.display = "block";
  taskInput.value = "";
  quantityInput.value = "";
});

submitButton.addEventListener("click", () => {
  const taskName = taskInput.value;
  let taskQuantity = quantityInput.value;

  if (taskName !== "") {
    taskQuantity = taskQuantity !== "" ? taskQuantity : null;

    const taskId = crypto.randomUUID();

    const task = {
      id: taskId,
      name: taskName,
      quantity: taskQuantity,
    };
    tasks.push(task);
    console.log("Tasks: ", tasks);

    const li = document.createElement("li");

    li.textContent = taskQuantity ? `${task.name} ${task.quantity} stk. ` : task.name;

    const doneButton = document.createElement("button");
    doneButton.textContent = "";
    doneButton.addEventListener("click", () => moveToDone(li, task));
    doneButton.classList.add("donebutton");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "";
    deleteButton.addEventListener("click", () => deleteTask(li, task));
    deleteButton.classList.add("deletebutton");

    li.appendChild(doneButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    quantityInput.value = "";

    inputContainer.style.display = "none";
    createTaskButton.style.display = "block";
  }
});

function moveToDone(li, task) {
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
    doneTasks.push(task);
  }
  console.log("Tasks: ", tasks);
  console.log("Done tasks: ", doneTasks);

  const buttons = li.querySelectorAll("button");
  buttons.forEach((button) => button.remove());

  const moveToTasksButton = document.createElement("button");
  moveToTasksButton.textContent = "";
  moveToTasksButton.addEventListener("click", () => moveToTasks(li, task));
  moveToTasksButton.classList.add("movebackbutton");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "";
  deleteButton.addEventListener("click", () => deleteTask(li, task));
  deleteButton.classList.add("deletebutton");

  li.appendChild(moveToTasksButton);
  li.appendChild(deleteButton);

  doneList.appendChild(li);
}

function moveToTasks(li, task) {
  const index = doneTasks.indexOf(task);
  if (index > -1) {
    doneTasks.splice(index, 1);
    tasks.push(task);
  }
  console.log("Tasks: ", tasks);
  console.log("Done tasks: ", doneTasks);

  const buttons = li.querySelectorAll("button");
  buttons.forEach((button) => button.remove());

  const doneButton = document.createElement("button");
  doneButton.textContent = "";
  doneButton.addEventListener("click", () => moveToDone(li, task));
  doneButton.classList.add("donebutton");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "";
  deleteButton.addEventListener("click", () => deleteTask(li, task));
  deleteButton.classList.add("deletebutton");

  li.appendChild(doneButton);
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}

function deleteTask(li, task) {
  li.remove();

  const taskIndex = tasks.indexOf(task);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  } else {
    const doneTaskIndex = doneTasks.indexOf(task);
    if (doneTaskIndex > -1) {
      doneTasks.splice(doneTaskIndex, 1);
    }
  }

  console.log("Tasks: ", tasks);
  console.log("Done tasks: ", doneTasks);
}

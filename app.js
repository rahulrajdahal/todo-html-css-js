// List of Tasks
let todos = [
  { title: "Example 1", completed: false },
  { title: "Example 2", completed: false },
  { title: "Example 3", completed: false },
];

const todoContainer = document.querySelector(".todo__container");
const remainingTodoTab = document.querySelectorAll(".tab")[0];
const completedTodoTab = document.querySelectorAll(".tab")[1];

const todoHeader = document.querySelector(".active__todo");

// RemainingTasks event listerner.
remainingTodoTab.addEventListener("click", () => {
  completedTodoTab.classList.remove("active_tab");
  remainingTodoTab.classList.add("active_tab");
  todoHeader.innerHTML = "Remaining Todos";
  clearTodoList();
  todos
    .filter(({ completed }) => !completed)
    .forEach((remainingTodo) => {
      createTodoItem(remainingTodo.title);
    });
});

// CompletedTasks event listener.
completedTodoTab.addEventListener("click", () => {
  remainingTodoTab.classList.remove("active_tab");
  completedTodoTab.classList.add("active_tab");
  todoHeader.innerHTML = "Completed Todos";
  clearTodoList();
  todos
    .filter(({ completed }) => completed === true)
    .forEach((completedTodo) => {
      createTodoItem(completedTodo.title, true);
    });
});

// Clear Task List
const clearTodoList = () => {
  todoContainer.innerHTML = "";
};

/**
 * Remove task from tasks list.
 * @param {*} removeTodo - String to remove from tasks list.
 */
const removeTodo = (removeTodo) => {
  todos = todos.filter((todo) => todo.title !== removeTodo);
};

/**
 *
 * @param {*} task  - String to add to tasks list.
 * @param {*} isCompleted - Status of the task.
 */
const createTodoItem = (task, isCompleted = false) => {
  const newListItem = document.createElement("li");
  newListItem.classList.add("todo");
  const newTodoSpan = document.createElement("span");
  newTodoSpan.classList.add("todo__item__span");
  const newTodo = document.createElement("label");
  const input = document.createElement("input");
  // const deleteIcon = document.createElement("i");
  // deleteIcon.classList.add("mni-delete-aB");

  // // Delete Task Click Event Listner.
  // deleteIcon.addEventListener("click", () => {
  //   removeTodo(task);
  //   newListItem.remove();
  // });

  if (isCompleted) {
    input.checked = true;
    newListItem.style.textDecoration = "line-through";
  } else {
    input.checked = false;
  }

  input.type = "checkbox";

  /**
   * Update checkbox status.
   * @param {*} e - Events in input element.
   */
  input.onchange = (e) => {
    const currentTodo = todos.find((todo) => todo.title === e.target.name);
    if (e.target.checked) {
      e.target.parentElement.style.textDecoration = "line-through";
      currentTodo.completed = true;
    } else {
      currentTodo.completed = false;
      e.target.parentElement.style.textDecoration = "none";
    }
    newListItem.remove();
  };

  input.name = task;
  newListItem.appendChild(newTodoSpan);
  newTodoSpan.appendChild(input);
  newTodoSpan.appendChild(newTodo);
  // newListItem.appendChild(deleteIcon);
  newTodo.innerHTML = task;
  todoContainer.appendChild(newListItem);
  if (!todos.length) {
    todos.push({ title: task, completed: false });
  }
};

// Create a list of tasks
todos.forEach((todo) => {
  createTodoItem(todo.title);
});

// Add task to the list.
const addTodo = (e) => {
  e.preventDefault();

  const todo = document.getElementById("todo").value;

  if (todo.length > 0 && remainingTodoTab.classList.contains("active_tab")) {
    todos.push({ title: todo, completed: false });
    createTodoItem(todo);
  }
  document.getElementById("todo").value = "";
};
document.querySelector("form").addEventListener("submit", addTodo);

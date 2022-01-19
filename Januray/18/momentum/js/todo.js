const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input"); // toDoForm.querySelector("input"); 이렇게 써도 됨
const toDoList = document.querySelector("#todo-list");
const toDoListModal = document.querySelector("#modal-todo-list");
const toDoListBtn = document.querySelector("#todo-list-btn");
const modal = document.querySelector("#modal");
const todoSpan = document.querySelector("#todo-span");

const TODOS_KEY = "todos";
const TODOFORM_HIDDEN = "hidden";
const MODAL_OVERLAY = "modal-overlay";

let toDos = [];

toDoListBtn.addEventListener("mouseover", (e) => {
  todoSpan.classList.remove(TODOFORM_HIDDEN);
});

toDoListBtn.addEventListener("mouseout", (e) => {
  todoSpan.classList.add(TODOFORM_HIDDEN);
});

toDoListBtn.addEventListener("click", (e) => {
  toDoListModal.classList.remove(TODOFORM_HIDDEN);
  modal.classList.remove(TODOFORM_HIDDEN);
});

modal.addEventListener("click", (e) => {
  const eventTarget = e.target;
  if (eventTarget.classList.contains(MODAL_OVERLAY)) {
    toDoListModal.classList.add(TODOFORM_HIDDEN);
    modal.classList.add(TODOFORM_HIDDEN);
  }
});

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deletdToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "✖";
  button.addEventListener("click", deletdToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
// 1.0 v
// const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("input");
// const toDoList = document.getElementById("todo-list");

// const TODOS_KEY = "todos";

// let toDos = [];

// const saveToDos = function () {
//   localStorage.setItem("todos", JSON.stringify(toDos));
//   // localStorage.setItem(TODOS_KEY, toDos);
// };

// const deleteToDo = function (e) {
//   const li = e.target.parentElement;
//   li.remove();
//   toDos = toDos.filter((toDo) => String(toDo.id) !== li.id);
//   saveToDos();
// };

// const paintToDo = function (newTodo) {
//   const li = document.createElement("li");
//   li.id = newTodo.id;
//   const span = document.createElement("span");
//   span.innerText = newTodo.text;
//   const button = document.createElement("button");
//   button.innerText = "❌";
//   button.addEventListener("click", deleteToDo);
//   li.appendChild(span);
//   li.appendChild(button);
//   toDoList.appendChild(li);
// };

// const handelToDoSubmit = function (e) {
//   e.preventDefault();
//   const newTodo = toDoInput.value;
//   toDoInput.value = "";
//   const newTodoObj = {
//     text: newTodo,
//     id: Date.now(),
//   };
//   toDos.push(newTodoObj);
//   paintToDo(newTodoObj);
//   saveToDos();
// };

// toDoForm.addEventListener("submit", handelToDoSubmit);

// const savedToDos = localStorage.getItem(TODOS_KEY);

// // console.log(savedToDos);

// if (savedToDos !== null) {
//   const parsedToDos = JSON.parse(savedToDos);
//   toDos = parsedToDos;
//   // console.log("parsedToDos : ", parsedToDos);
//   // parsedToDos.forEach((item) => paintToDo(item));
//   parsedToDos.forEach(paintToDo);
// }

// function sexyFilter(todo) {
//   return todo.id !== 1642491406700;
// }

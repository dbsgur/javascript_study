const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

const saveToDos = function () {
  localStorage.setItem("todos", JSON.stringify(toDos));
  // localStorage.setItem(TODOS_KEY, toDos);
};

const deleteToDo = function (e) {
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => String(toDo.id) !== li.id);
  saveToDos();
};

const paintToDo = function (newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
};

const handelToDoSubmit = function (e) {
  e.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
};

toDoForm.addEventListener("submit", handelToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

// console.log(savedToDos);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  // console.log("parsedToDos : ", parsedToDos);
  // parsedToDos.forEach((item) => paintToDo(item));
  parsedToDos.forEach(paintToDo);
}

function sexyFilter(todo) {
  return todo.id !== 1642491406700;
}

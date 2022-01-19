const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const logout = document.querySelector("#logout-button");
//const loginButton = document.querySelector("#login-form button");

// const loginForm = document.getElementById("login-form");
// const loginInput = loginForm.querySelector("input");
// const loginButton = loginForm.querySelector("button");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const onLoginSubmit = (e) => {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  //console.log(username);
  // greeting.innerText = "Hello " + username;
  localStorage.setItem(USERNAME_KEY, username);
  // greeting.innerText = `Hello ${username}`;
  // greeting.classList.remove(HIDDEN_CLASSNAME);
  painGreetings(username);
  showLogoutForm();
};

const painGreetings = function (username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello ${username}`;
};

const showLoginForm = function () {
  loginInput.value = "";
  localStorage.clear();
  logout.classList.add(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
};

logout.addEventListener("click", (e) => {
  logout.classList.remove(HIDDEN_CLASSNAME);
  showLoginForm();
});

const showLogoutForm = function () {
  logout.classList.remove(HIDDEN_CLASSNAME);
};

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  //show the greeting
  // greeting.innerText = `Hello ${username}`;
  // greeting.classList.remove(HIDDEN_CLASSNAME);
  painGreetings(savedUsername);
  showLogoutForm();
}

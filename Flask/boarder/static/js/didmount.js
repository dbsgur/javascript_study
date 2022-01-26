let loginBtn = document.querySelector("#loginbtn");
let logoutBtn = document.querySelector("#logoutbtn");
let signupForm = document.querySelector("#signupform");
let loginForm = document.querySelector("#loginform");

function status() {
  let userState = sessionStorage.getItem("userId");
  console.log(userState);
  if (userState === null) {
    // 로그인 화면 + 회원가입
    logoutBtn.classList.add("hidden");
    loginBtn.classList.remove("hidden");
  } else {
    // 로그 아웃
    logoutBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
  }
}

function onclickSignUpBtn() {
  signupForm.classList.toggle("hidden");
  loginForm.classList.add("hidden");
}

function onclickLogInBtn() {
  loginForm.classList.toggle("hidden");
  signupForm.classList.add("hidden");
}

status();
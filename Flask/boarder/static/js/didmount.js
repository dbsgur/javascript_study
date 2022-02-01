let loginBtn = document.querySelector("#loginbtn");
let logoutBtn = document.querySelector("#logoutbtn");
let signupForm = document.querySelector("#signupform");
let loginForm = document.querySelector("#loginform");

function status() {
  // jwt 토큰 만료했는지 확인하고
  let userState = "";
  $.ajax({
    type: "GET",
    url: "/protected",
    async: false,
    data: {},
    success: function (response) {
      // response
      // console.log(response);
      userState = response.logged_in_as;
    },
  });
  // let userState = sessionStorage.getItem("userId");
  console.log(userState);
  if (userState === "") {
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

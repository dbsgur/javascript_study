//회원가입
function onClickSignUp(e) {
  e.preventDefault();
  // html에서 user_id user_pwd 가져오기
  let user_id = $("#inputID").val();
  let user_pwd = $("#inputPassword").val();
  let confirm_pwd = $("#inputPasswordConfirm").val();
  // 비밀번호 확인
  if (user_pwd !== confirm_pwd) {
    alert("비밀번호가 일치하지않습니다.");
  } else {
    $.ajax({
      type: "POST",
      url: "/user/signup",
      //user_id , user_pwd
      data: { user_id: user_id, user_pwd: user_pwd },
      success: function (response) {
        console.log(response);
        if (response["result"] == "SUCCESS") {
          // 2. '좋아요 완료!' 얼럿을 띄웁니다.
          alert(response["message"]);
          // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
          window.location.reload();
        } else {
          alert(response["message"]);
        }
      },
    });
  }
}

function onClickLogIn(e) {
  e.preventDefault();
  let user_id = $("#loginId").val();
  let user_pwd = $("#loginPassword").val();
  console.log("front id", user_id, user_pwd);
  $.ajax({
    type: "POST",
    url: "/user/login",
    // user_id , user_pwd
    data: { user_id: user_id, user_pwd: user_pwd },
    success: function (response) {
      console.log("back id", response);
      if (response["result"] === "SUCCESS") {
        // sessionStorage.setItem("userId", user_id);
        // console.log("user_id : ", user_id);
        alert(response["message"]);
        window.location.reload();
      } else {
        // 401 에러일때 예외처리
        // alert("WRONG ID");
        alert(response["message"]);
      }
    },
  });
}

function onclcikLogOutBtn() {
  sessionStorage.clear();
  window.location.reload();
  $.ajax({
    type: "POST",
    url: "/user/logout",
    data: {},
    success: function (response) {
      alert(response["message"]);
    },
  });
}

function onclickHotNewsBtn() {
  window.location.href = "/news";
}

function onclickBoardBtn() {
  window.location.href = "/board";
}

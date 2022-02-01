const boardForm = document.querySelector("#board_form_submit");
const postTitle = document.querySelector("#post_title");
const postContent = document.querySelector("#post_content");

function submitPost(e) {
  e.preventDefault();
  let user_id = "";
  $.ajax({
    type: "GET",
    url: "/protected",
    async: false,
    data: {},
    success: function (response) {
      // response
      // console.log(response);
      user_id = response.logged_in_as;
    },
  });
  // console.log(user_id);
  // let user_id = sessionStorage.getItem("userId");
  let post_title = postTitle.value;
  let post_content = postContent.value;
  let post_date = new Date().toISOString().split("T")[0];
  let post_likes = 0;
  $.ajax({
    type: "POST",
    url: "/board/create",
    //user_id , user_pwd
    data: {
      user_id: user_id,
      post_title: post_title,
      post_content: post_content,
      post_date: post_date,
      post_likes: post_likes,
    },
    success: function (response) {
      if (response["result"] === "SUCCESS") {
        alert(response["message"]);
        // window.location.reload();
      } else {
        // 401 에러일때 예외처리
        // alert("WRONG ID");
        alert(response["message"]);
      }
    },
  });
}

boardForm.addEventListener("click", submitPost);

// console.log(new Date());
// console.log(new Date().toISOString().split("T")[0]);
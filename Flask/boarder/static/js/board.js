const boardForm = document.querySelector("#board_form_submit");
const postTitle = document.querySelector("#post_title");
const postContent = document.querySelector("#post_content");
const $detail = document.querySelector("#detail");

$(document).ready(function () {
  readPost();
});

function readPost() {
  $.ajax({
    type: "GET",
    url: "/board/read",
    // async: false,
    data: {},
    success: function (response) {
      for (let i = 0; i < response.posts.length; i++) {
        // console.log(response);
        let tempHtml = `<tr id="${response.posts[i]["_id"]}">
        <td>${i + 1}</td>
        <td>${response.posts[i]["post_title"]}</td>
        <td>${response.posts[i]["post_date"]}</td>
        <td>${response.posts[i]["user_id"]}</td>
        <td><button onclick="detailPost('${
          response.posts[i]["_id"]
        }')">보기</button></td>
        </tr>
      `;
        $("#table-box").append(tempHtml);
      }
    },
  });
}

const detailPost = function (objectId) {
  console.log(objectId);
  location.href = `/board/read/${objectId}`;
  // $.ajax({
  //   type: "GET",
  //   url: `/board/read/${objectId}`,
  //   data: {},
  //   success: function (response) {
  //     console.log(response);
  //     location.href = "/hello";
  //   },
  // });
};

// $detail.onclick = detailPost;
// $detail.on("click", detailPost);

const deletePost = function () {};

console.log("???");

function submitPost(e) {
  console.log("submitPost");
  e.preventDefault();
  alert("!!!");
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
  console.log(post_title);
  console.log(post_content);
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
        window.location.reload();
      } else {
        // 401 에러일때 예외처리
        // alert("WRONG ID");
        alert(response["message"]);
      }
    },
  });
  // window.location.reload();
}

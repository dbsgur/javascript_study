function readNews() {
  $("#cards-box").html("");
  $.ajax({
    type: "GET",
    url: "/news/read",
    data: {},
    success: function (response) {
      if (response["result"] === "SUCCESS") {
        // console.log(response["news_list"]);
        let news = response["news_list"];
        // console.log("news : ", news[0]["title"]);
        for (let i = 0; i < news.length; i++) {
          let title = news[i]["title"];
          let image = news[i]["image"];
          let desc = news[i]["desc"];
          let article = news[i]["article"];
          let url = news[i]["url"];

          makeNews(image, url, title, desc, article);
        }
      } else {
        console.log("NEWS READ FAIL");
      }
    },
  });
}

function makeNews(image, url, title, desc, article) {
  let tempHtml = `<div class="card">
  <img class="card-img-top" src="${image}" alt="Card image cap"/>
  <div class="card-body">
  <a href="${url}" target="_blank" class="card-title">${title}</a>
  <p class="card-text">${desc}</p>
  <p class="card-text comment">${article}</p>
  </div>
</div>`;
  $("#cards-box").append(tempHtml);
}

readNews();
// $(document).ready(function () {
//   $("#cards-box").html("");
//   readNews();
// });

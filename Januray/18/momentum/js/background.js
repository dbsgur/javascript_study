const images = [
  // "0.png",
  // "1.png",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.png",
];

const chooseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
const container = document.querySelector(".full-background");
// console.log("container :", container);

bgImage.src = `img/${chooseImage}`;

container.appendChild(bgImage);

// 반응형
function handleWindow(e) {
  const windowWidth = e.target.innerWidth;
  const windowHeight = e.target.innerHeight;
  const broswerRatio = windowWidth / windowHeight;
  const imageRatio = 1920 / 1080;
  if (imageRatio > broswerRatio) {
    container.style.height = "100%";
    container.style.width = `${windowHeight * imageRatio}px`;
    container.style.left = `${(windowWidth - windowHeight * imageRatio) / 2}px`;
    container.style.top = "0";
  } else {
    container.style.height = `${windowWidth / imageRatio}px`;
    container.style.width = "100%";
    container.style.left = "0";
    container.style.top = `${(windowHeight - windowWidth / imageRatio) / 2}px`;
  }
}

window.addEventListener("resize", handleWindow);
window.dispatchEvent(new Event("resize")); // 강제로 resize 이벤트 발생 시킴

// console.log(bgImage);

// document.body.appendChild(bgImage);
//append body 안 제일 뒤에 추가
//prepend body 안 제일 앞에 추가

const images = ["0.png", "1.png"];

const chooseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chooseImage}`;

bgImage.style = "position: 'absolute'";

// console.log(bgImage);

document.body.appendChild(bgImage);
//append body 안 제일 뒤에 추가
//prepend body 안 제일 앞에 추가

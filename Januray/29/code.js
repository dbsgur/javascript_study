// id로 하나의 요소를 선택한다.
const elem = document.getElementById("one");
// 클래스 어트리뷰트의 값을 변경한다.
elem.className = "blue";

// 그림: DOM tree의 객체 구성 참고
console.log(elem); // <li id="one" class="blue">Seoul</li>
console.log(elem.__proto__); // HTMLLIElement
console.log(elem.__proto__.__proto__); // HTMLElement
console.log(elem.__proto__.__proto__.__proto__); // Element
console.log(elem.__proto__.__proto__.__proto__.__proto__); // Node

//

// CSS 셀렉터를 이용해 요소를 선택한다
const elem = document.querySelector("li.red");
// 클래스 어트리뷰트의 값을 변경한다.
elem.className = "blue";

//

const elems = document.getElementsByClassName("red");

// 유사 배열 객체인 HTMLCollection을 배열로 변환한다.
// 배열로 변환된 HTMLCollection은 더 이상 live하지 않다.
console.log([...elems]); // [li#one.red, li#two.red, li#three.red]

[...elems].forEach((elem) => (elem.className = "blue"));

//

// HTMLCollection을 반환한다.
const elems = document.getElementsByTagName("li");

[...elems].forEach((elem) => (elem.className = "blue"));

// Nodelist를 반환한다.
const elems = document.querySelectorAll("li.red");

[...elems].forEach((elem) => (elem.className = "blue"));

//

const elem = document.querySelector("#two");

elem.parentNode.className = "blue";

//

const elem = document.querySelector("ul");

// first Child
elem.firstElementChild.className = "blue";
// last Child
elem.lastElementChild.className = "blue";

//

const elems = document.querySelectorAll("li");

// className
[...elems].forEach((elem) => {
  // class 어트리뷰트 값을 취득하여 확인
  if (elem.className === "red") {
    // class 어트리뷰트 값을 변경한다.
    elem.className = "blue";
  }
});

// classList
[...elems].forEach((elem) => {
  // class 어트리뷰트 값 확인
  if (elem.classList.contains("blue")) {
    // class 어트리뷰트 값 변경한다.
    elem.classList.replace("blue", "red");
  }
});

//

const ul = document.querySelector("ul");

// innerHTML 프로퍼티는 모든 자식 요소를 포함하는 모든 콘텐츠를 하나의 문자열로 취득할 수 있다. 이 문자열은 마크업을 포함한다.
console.log(ul.innerHTML);
// IE를 제외한 대부분의 브라우저들은 요소 사이의 공백 또는 줄바꿈 문자를 텍스트 노드로 취급한다
/*
        <li id="one" class="red">Seoul</li>
        <li id="two" class="red">London</li>
        <li id="three" class="red">Newyork</li>
        <li id="four">Tokyo</li>
*/

//

// 태그이름을 인자로 전달하여 요소를 생성
const newElem = document.createElement("li");
// const newElem = document.createElement('<li>test</li>');
// Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('<li>test</li>') is not a valid name.

// 텍스트 노드를 생성
const newText = document.createTextNode("Beijing");

// 텍스트 노드를 newElem 자식으로 DOM 트리에 추가
newElem.appendChild(newText);

const container = document.querySelector("ul");

// newElem을 container의 자식으로 DOM 트리에 추가. 마지막 요소로 추가된다.
container.appendChild(newElem);

const removeElem = document.getElementById("one");

// container의 자식인 removeElem 요소를 DOM 트리에 제거한다.
container.removeChild(removeElem);

//

const one = document.getElementById("one");

// 마크업이 포함된 요소 추가
one.insertAdjacentHTML("beforeend", '<em class="blue">, Korea</em>');

//

const four = document.getElementById("four");

// inline 스타일 선언을 생성
four.style.color = "blue";

// font-size와 같이 '-'으로 구분되는 프로퍼티는 카멜케이스로 변환하여 사용한다.
four.style.fontSize = "2em";

//

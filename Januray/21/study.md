Date 객체는 날짜와 시간을 위한 메소드를 제공하는 빌트인 객체이면서 _생성자 함수_ 이다.

Date 생성자 함수로 생성한 Date 객체는 내부적으로 숫자값을 갖는다.
이 값은 1970년 1월 1일 00:00(UTC)을 기점으로 현재 시간까지의 밀리초를 나타낸다.

UTC(협정 세계사: Coordinated Universal Time)는 GMT(그리니치 평균시 : Greenwich Mean Time)로 불리기도 한다. UTC와 GMT는 초의 소숫점 잔위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용된다.

기술적인 표기에서는 UTC가 사용된다.

KST(Korea Standard Time)는 UTC/GMT에 9시간을 더한 시간이다.
즉, KST는 UTC/GMT보다 9시간이 빠르다.

현재의 날짜와 시간은 자바스크립트 코드가 동작한 시스템의 시계에 의해 결정된다.
시스템 시계의 설정에 따라 서로 다른 값을 가질 수 있따.

### Date Constructor

**Date 객체는 생성자 함수이다.**
Date 생성자 함수는 날짜와 시간을 가지는 인스턴스를 생성한다.
생성된 인스턴스는 기본적으로 현재 날짜와 시간을 나타내는 값을 가진다.

Date 생성자 함수로 객체를 생성하는 방법은 4가지가 있다.

#### new Date()

인수를 전달하지 않으면 현재 날짜와 시간을 가지는 인스턴스를 반환한다.

```
const date = new Date();
console.log(date); // 2022-01-21T12:39:47.398Z
```

### new Date(milliseconds)

인수로 숫자 타입의 밀리초를 전달하면 1970년 1월 1일 00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 가지는 인스턴스를 반환한다.

```

// 86400000ms는 1day를 의미한다.
// 1s = 1,000ms
// 1m = 60s * 1,000ms = 60,000ms
// 1h = 60m * 60,000ms = 3,600,000ms
// 1d = 24h * 3,600,000ms = 86,400,000ms
date = new Date(86400000);
console.log(date); //1970-01-02T00:00:00.000Z
```

#### new Date(dateStirng)

인수로 날자와 시간을 나타내는 문자열을 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환한다.
이 때, 인수로 전달한 문자열은 Date.parse 메소드에 의해 해석 가능한 형식이어야 한다.

```
let date = new Date('January 21, 2022 21:44:55');
console.log(date); // 2022-01-21T12:44:55.000Z

date = new Date('2022/01/21/21:44:55');
console.log(date); // 2022-01-21T12:44:55.000Z
```

#### new Date(year, month[, day, hour, minutes, second, millisecond])

인수로 년, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환한다.

이 때, 년, 월은 반드시 지정하여야 한다. 지정하지 않은 옵션 정보는 0 또는 1으로 초기화 된다.

인수는 다음과 같다.

|     인수      |                 내용                 |
| :-----------: | :----------------------------------: |
|    `year`     |          `1900년 이후의 년`          |
|    `month`    |   `월을 나타내는 0~11까지의 정수`    |
|     `day`     |   `일을 나타내는 1~31까지의 정수`    |
|    `hour`     |   `시를 나타내는 0~23까지의 정수`    |
|   `minute`    |   `분을 나타내는 0~59까지의 정수`    |
|   `second`    |   `초를 나타내는 0~59까지의 정수`    |
| `millisecond` | `밀리초를 나타내는 0~999가지의 정수` |

년, 월을 지정하지 않은 경우 1970년 1월 1일 00:00(UTC)을 가지는 인스턴스를 반환한다.

```

// 월을 나타내는 0는 1월을 의미한다.
// 2022/1/21/00:00:00:00
let date = new Date(2022, 0);
console.log(date); // 2021-12-31T15:00:00.000Z

// 월을 나타내는 0는 1월을 의미한다.
// 2022/1/21/21:44:55:00
date = new Date(2022, 0, 21, 21, 44, 55, 0);
console.log(date); // 2022-01-21T12:44:55.000Z

// 가독성이 훨씬 좋다.
date = new Date("2022/1/21/21:44:55:00");
console.log(date); // 2022-01-21T12:44:55.000Z
```

#### Date 생성자 함수를 new 연산자 없이 호출

Date 생성자 함수를 new 연산자 없이 호출하면 인스턴스를 반환하지 않고 결과값을 문자열로 반환한다.

```
let date = Date();
console.log(typeof date, date); //string Fri Jan 21 2022 21:59:28 GMT+0900 (대한민국 표준시)
```

### Date 메소드

#### Date.now

1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

```
const now = Date.now();
console.log(now); // 1642770048696
```

#### Date.parse

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간(new Date(dateString)의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.

```
let d = Date.parse('Jan 2, 1970 00:00:00 UTC'); // UTC
console.log(d); // 86400000

d = Date.parse('Jan 2, 1970 09:00:00'); // KST
console.log(d); // 86400000

d = Date.parse('1970/01/02/09:00:00'); // KST
console.log(d); // 86400000
```

#### Date.UTC

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

Date.UTC 메소드는 new Date(year, month[, day, hour, minute, second, millisecond])와 같은 형식의 인수를 사용해야 한다.

Date.UTC 메소드의 인수는 local time(KST)가 아닌 UTC로 인식된다.

```
let d = Date.UTC(1970, 0, 2);
console.log(d); // 86400000

d = Date.UTC('1970/1/2');
console.log(d); // NaN
```

month는 월을 의미하는 0~11까지의 정수이다. 0부터 시작하므로 주의가 필요하다!

#### Date.prototype.getFullYear

년도를 나타내는 4자리 숫자를 반환한다.

```
const today = new Date();
const year = today.getFullYear();

console.log(today); // 2022-01-21T13:19:35.518Z
console.log(year);  // 2022
```

#### Date.prototype.setFullYear

년도를 나타내는 4자리 숫자를 설정한다. 년도 이외 월, 일도 설정할 수 있다.

```
const today = new Date();

// 년도 지정
today.setFullYear(2050);

let year = today.getFullYear();
console.log(today); // 2050-01-21T13:21:45.312Z
console.log(year);  // 2050

// 년도 지정
today.setFullYear(1900, 0, 1);

year = today.getFullYear();
console.log(today); // 1900-01-01T13:53:53.312Z
console.log(year);  // 1900
```

#### Date.prototype.getMonth

월을 나타내는 0~11의 정수를 반환한다.

```

const today = new Date();
const month = today.getMonth();

console.log(today); // 2022-01-21T13:24:49.252Z
console.log(month); // 0
```

#### Date.prototype.setMonth

월을 나타내는 0~11의 정수를 설정한다. 월 이외 일도 설정할 수 있다.

```

const today = new Date();

// 월을 지정
today.setMonth(0); // 1월

let month = today.getMonth();
console.log(today); // 2022-01-21T13:28:17.500Z
console.log(month); // 0

// 월/일을 지정
today.setMonth(11, 1); // 12월 1일

month = today.getMonth();
console.log(today); // 2022-12-01T13:28:17.500Z
console.log(month); // 11
```

#### Date.prototype.getDtae

날짜(1~31)를 나타내는 정수를 반환한다.

```
const today = new Date();
const date = today.getDate();

console.log(today); // 2022-01-21T13:29:25.136Z
console.log(date);  // 21
```

#### Date.prototype.getDay

요일(0~6)을 나타내는 정수를 반환한다.

반환 값은 아래와 같다.

|   요일   | 반환 값 |
| :------: | :-----: |
| `일요일` |   `0`   |
| `월요일` |   `1`   |
| `화요일` |   `2`   |
| `수요일` |   `3`   |
| `목요일` |   `4`   |
| `금요일` |   `5`   |
| `토요일` |   `6`   |

```
const today = new Date();
const day = today.getDay();

console.log(today); // 2022-01-21T13:31:34.580Z
console.log(day);   // 5
```

#### Date.prototype.getHours

시간(0~23)을 나타내는 정수를 반환한다.

```

const today = new Date();
const hours = today.getHours();

console.log(today); // 2022-01-21T13:34:17.591Z
console.log(hours); // 22
```

#### date.prototype.setHours

시간(0~23)을 나타내는 정수를 설정한다. 시간 이외 분, 초, 밀리초도 설정할 수 있따.

```

const today = new Date();

// 시간 지정
today.setHours(7);

let hours = today.getHours();
console.log(today); // 2022-01-20T22:35:14.333Z
console.log(hours); // 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00

hours = today.getHours();
console.log(today); // 2022-01-20T15:00:00.000Z
console.log(hours); // 0
```

#### Date.prototype.getMinutes

분(0~59)을 나타내는 정수를 반환한다.

```
const today = new Date();
const minutes = today.getMinutes();

console.log(today);   // 2022-01-21T13:37:03.522Z
console.log(minutes); // 37
```

#### Date.prototype.setMinutes

분(0~59)을 나타내는 정수를 설정한다. 분 이외 초, 밀리초도 설정할 수 있다.

```
const today = new Date();

// 분 지정
today.setMinutes(50);

let minutes = today.getMinutes();
console.log(today);   // 2022-01-21T13:50:27.364Z
console.log(minutes); // 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999

minutes = today.getMinutes();
console.log(today);   // 2022-01-21T13:05:10.999Z
console.log(minutes); // 5
```

#### Date.prototype.getSeconds

초(0~59)를 나타내는 정수를 반환한다.

```
console.log(new Date().getSeconds()); //29
```

#### Date.prototype.setSeconds

초(0~59)를 나타내는 정수를 설정한다. 초 이외에도 밀리초를 설정할 수 있다.

```
const today = new Date();

// 초 지정
today.setSeconds(30);

let seconds = today.getSeconds();
console.log(today); // 2022-01-21T13:42:30.320Z
console.log(seconds); // 30

// 초/밀리초 지정
today.setSeconds(10, 0); // HH:MM:10:000

seconds = today.getSeconds();
console.log(today); // 2022-01-21T13:42:10.000Z
console.log(seconds); // 10
```

#### Date.prototype.getMilliseconds

밀리초(0~999)를 나타내는 정수를 반환한다.

```
const today = new Date();
const ms = today.getMilliseconds();

console.log(today); // 2022-01-21T13:44:00.466Z
console.log(ms);    // 466
```

#### Date.prototype.setMilliseconds

밀리초(0~999)를 나타내는 정수를 설정한다.

```
const today = new Date();

// 밀리초 지정
today.setMilliseconds(123);

const ms = today.getMilliseconds();
console.log(today); // 2022-01-21T13:44:58.123Z
console.log(ms);    // 123
```

#### Date.prototype.getTime

1970sus 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과된 밀리초를 반환한다.

```
const today = new Date();
const time = today.getTime();

console.log(today); // 2022-01-21T13:48:02.666Z
console.log(time);  // 1642772882666
```

#### Date.prototype.setTime

1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초를 설정한다.

```

const today = new Date();

// 1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초 지정
today.setTime(86400000); // 86400000 === 1day

const time = today.getTime();
console.log(today); // 1970-01-02T00:00:00.000Z
console.log(time);  // 86400000
```

#### Date.prototype.getTimezoneOffset

UTC와 지정 로케일(Locale) 시간과의 차이를 분단위로 반환한다.

```
const today = new Date();
const x = today.getTimezoneOffset() / 60; // -9

console.log(today); // 2022-01-21T13:50:34.236Z
console.log(x);     // -9
```

KST(Korea Standard Time)는 UTC에 9시안을 더한 시간이다.

#### Date.prototype.toDateString

사람이 읽을 수 있는 형식의 문자열로 날짜를 반환한다.

#### Date.prototype.toTimeString

사람이 읽을 수 있는 형식의 문자열을 시간을 반환한다.

```
const d = new Date("2022/1/21/22:52");

console.log(d.toString()); // Fri Jan 21 2022 22:52:00 GMT+0900 (대한민국 표준시)
console.log(d.toDateString()); // Fri Jan 21 2022
console.log(d.toTimeString()); // 22:52:00 GMT+0900 (대한민국 표준시)
```

=================================================================================================================================

### 정규 표현식(Regular Expression)

정규표현식은 **문자열에서 특정 내용을 찾거나 대체 또는 발췌하는데 사용한다.**

예를 들어, 회원가입 화면에서 사용자로부터 입력받은 전화번호가 유효한지 체크할 필요가 있다.
이 때, 정규표현식을 사용하면 간단히 처리할 수 있다.

#### 정규 표현식 만들기

```
// 1.
var re = /ab+c/;

// 2.
var re = new RegExp("ab+c");
```

정규식 리터럴(1번 방법)은 스크립트가 불러와질 때 컴파일 됩니다.
**만약, 정규식이 상수라면, 이렇게 사용하는 것이 성능을 향상시킬 수 있습니다.**

2번 방법은 RegExp 객체의 생성자 함수를 호출하는 방법입니다.
생성자 함수를 사용하면 정규식이 실행 시점에 컴파일됩니다.
**정규식의 패턴이 변경될 수 있는 경우, 혹은 사용자 입력과 같이 다른 출처로부터 패턴을 가져와야 하는 경우에는 생성자 함수를 사용하는 것이 좋다.**

- 정규 표현식 매칭 패턴
  아래 매칭 패턴을 사용하면 문자/숫자/기호를 표현할 수 있다.
  |Character| Meaning|
  |---|:---:|
  |`a-zA-Z`|`영어 알파벳(-로 범위 지정)`|
  |`0-9`|`숫자(-로 범위 지정)`|
  |`ㄱ-ㅎ가-힣`|`한글 문자(-로 범위 지정`|
  |`.`|`모든 문자열(숫자, 한글, 영어, 특수 기호, 공백 모두 단, 줄바꿈 안됨`|
  |`\d`|`숫자`|
  |`\D`|`숫자가 아닌 모든 것`|
  |`\w`|`영어 알파벳, 숫자, 언더 스코어(_)`|
  |`\W`|`\w가 아닌 모든 것`|
  |`\s`|`space 공백`|
  |`\S`|`sapce 공백이 아닌 모든 것`|
  |`\특수기호`|`특수 기호`|

\w(소문자) \W(대문자)둘은 반대이다.

- 정규 표현식 검색 패턴
  아래 패턴을 사용하면 AND, OR, StartWith, EndWith 등의 다양한 조합을 만들 수 있다.
  |Character| Meaning|
  |---|:---:|
  |`|`|`OR`|
  |`[]`|`괄호 안의 문자들 중 하나`|
  |`[^문자]`|`괄호 안의 문자를 제외한 것`|
  |`^문자열`|`특정 문자열로 시작`|
  |`문자열$`|`특정 문자열로 끝남`|
  |`()`|`그룹 겁색 및 분류`|
  |`(?:패턴)`|`그룹 검색(분류x)`|
  |`\b`|`단어의 처음/끝`|
  |`\B`|`단어의 처음/끝이 아님`|

- 정규 표현식 갯수(수량) 패턴
  특정 패턴이 몇번 반복되는지도 필터링 가능
  |Character| Meaning|
  |---|:---:|
  |`?`|`최대 한번(없거나 한개)`|
  |`*`|`없거나 있거나(여러개 포함)`|
  |`+`|`최소 한 개(여러개 포함)`|
  |`{n}`|`n개`|
  |`{Min,}`|`최소 Min개 이상`|
  |`{Min, Max}`|`최소 Min개 이상, 최대 Max개 이하`|

- 정규 표현식 플래그
  플래그는 동시에 여러개 사용할 수 있다.
  |Flag| Meaning|
  |---|:---:|
  |`g`|`Global : 모든 문자 검색(안 쓰면 매칭되는 첫 문자만 검색)`|
  |`i`|`Ignore Case : 대/소문자 구분 안함`|
  |`m`|`Multi line : 여러 행의 문자열에 대해 검색`|

- 정규 표현식 주요 메소드
  메소드를 통해 패턴을 검사하고, 매칭되는 문자열을 추출 변환한다.
  |Method| Meaning|
  |---|:---:|
  |`("문자열").match(/정규표현식/플래그)`|`"문자열"에서 "정규표현식"에 매칭되는 항목들을 배열로 반환"`|
  |`("문자열").replace(/정규표현식/, "대체문자열")`|`"정규표현식"에 매칭되는 항목을 "대체 문자열"로 변환`|
  |`("문자열").split(정규표현식)`|`"문자열"을 "정규표현식"에 매칭되는 항목으로 쪼개어 배열로 반환`|
  |`(정규표현식).test("문자열")`|`"문자열"이 "정규표현식"과 매칭되면 true, 아니면 false를 반환`|
  |`(정규표현식).exec("문자열")`|`match메소드와 유사(단, 무조건 첫번째 매칭 결과만 반환한다.)`|

// const title = document.querySelector("#title");

// // const BASE_COLOR = "red";
// // const OTHER_COLOR = "gray";

// // function handlClick() {
// //     const currentColor = title.style.color;
// //     if(currentColor === BASE_COLOR){
// //         title.style.color = OTHER_COLOR;
// //     }else{
// //         title.style.color = BASE_COLOR;
// //     }
// // }
// const CLICKED_CLASS = "clicked";

// function handleClick() {
//     const currentClassname = title.className;
//     if(currentClassname !== CLICKED_CLASS){
//         title.className = CLICKED_CLASS;
//     }else{
//         title.className = "";
//     }
// }

// function handleClick() {
//     const hasClass = title.classList.contains(CLICKED_CLASS);
//     // if(hasClass){
//     //     title.classList.remove(CLICKED_CLASS);
//     // }else{
//     //     title.classList.add(CLICKED_CLASS);
//     // }
//     // 위에코드 간단하게 토글로!!
//     title.classList.toggle(CLICKED_CLASS);

// }
// console.log(title.className);
// function init(){
//     // title.style.color=BASE_COLOR;
//     title.addEventListener("click", handleClick); 
// }
// init();
// handlResize() 이렇게 하면 자동으로 호출!!
//()없으면 자동 호출 x 
// prompt("Ask somting") 사용자에게 물어볼수 있음. alert 같은거
// const age = prompt("How old?");

// if(age > 19){
//     console.log("you can drink");
// }else{
//     console.log("you can`t drink");
// }
const clockContainer  = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const renamebtn = document.querySelector(".js-rename");

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleReNameButton(){
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    askForName();
    input.value = "";
}

renamebtn.addEventListener("click", handleReNameButton);

function handleSubmit(event){
    event.preventDefault(); //디폴드 이벤트 동작 차단.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;

}

function init() {
     getTime();
     setInterval(getTime, 1000);
     loadName();
}
init();
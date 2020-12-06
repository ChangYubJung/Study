const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishtoDoList = document.querySelector(".js-toDoFinish");

const TODOS_LS = "toDos";
const FINISH_LS = "finishToDos";

let toDos = [];
let finishtoDos = []

function handleFinishDel(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishtoDoList.removeChild(li);
    const cleanFinishToDos = finishtoDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    finishtoDos = cleanFinishToDos;
    saveFinish();
  }

function handleBack(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const child = li.firstChild;
    finishtoDoList.removeChild(li);
    const cleanFinishToDos = finishtoDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    finishtoDos = cleanFinishToDos;
    saveFinish();
  
    paintToDo(child.innerText);
  }
  

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const child = li.firstChild;

    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    paintFinishToDo(child.innerText);
}

function saveFinish() {
    localStorage.setItem(FINISH_LS, JSON.stringify(finishtoDos));
  }

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //자바스크립트 obj를 string으로 바까줌.
}

function paintToDo(text) {
    console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "⨂";
    checkBtn.innerText = "⩗";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.addEventListener("click", checkToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFinishToDo(text){
    const span = document.createElement("span");
    const li = document.createElement("li");
    const backBtn = document.createElement("button");
    backBtn.addEventListener("click", handleBack);
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", handleFinishDel);
    const newId = finishtoDos.length + 1;
  
    backBtn.innerText = "↩";
    delBtn.innerText = "⨂";
    span.innerText = text;
  
    li.id = newId;
    li.appendChild(span);
    li.appendChild(backBtn);
    li.appendChild(delBtn);
  
    finishtoDoList.appendChild(li);
  
    const finishToDoObject = {
      text: text,
      id: newId
    };
    finishtoDos.push(finishToDoObject);
    saveFinish();

}

function handleSumit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const paredToDos = JSON.parse(loadedToDos); //string 을 object로 
        paredToDos.forEach(function(toDo){ //forEach 함수를 각각 한번씩 실행시켜줌. 
        //요소가 3개 있다면 3번 함수 실행. () 안에 정의 가능하고 따로 빼서도 정의 가능.
            paintToDo(toDo.text);
        })
    }

}

function loadFinishToDos() {
    const loaqFinish = localStorage.getItem(FINISH_LS);
    if (loaqFinish !== null) {
      const parsedFinishToDos = JSON.parse(loaqFinish);
      parsedFinishToDos.forEach(function (toDo) {
        paintFinishToDo(toDo.text);
      });
    }
  }

function init() {
    loadToDos();
    loadFinishToDos();
    toDoForm.addEventListener("submit", handleSumit);
}

init();

//filter, forEach 잘 기억하기 list에 있는 모든 item을 위한 함수를 실행시키는것.!!

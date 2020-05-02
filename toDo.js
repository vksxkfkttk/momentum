const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"
let toDos = [];

function deleteToDO(event){
    const delBtn = event.target;
    const delLi = delBtn.parentNode;
    toDoList.removeChild(delLi);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(delLi.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const newLiId = toDos.length + 1;
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.addEventListener("click", deleteToDO);
    span.innerText = text;
    delBtn.innerText = "❌";
    li.id = newLiId;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);

    const toDoObj = {
        id : newLiId,
        text : text
    };
    toDos.push(toDoObj);

    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
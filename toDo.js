const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"
let toDos = [];

function deleteToDO(event){
    // console.log(event.target.parentElement);
    // console.log(event.target.parentNode);
    const delBtn = event.target;
    const delLi = delBtn.parentNode;
    toDoList.removeChild(delLi);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(delLi.id);
    });
    toDos = cleanToDos;
    saveToDos();
    // console.log(cleanToDos);
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    // console.log(text);
    const li = document.createElement("li");
    const newLiId = toDos.length + 1;
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.addEventListener("click", deleteToDO);
    delBtn.innerText = "❌";
    span.innerText = text;
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
    // console.log(loadedToDos);
    
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos); 
        parsedToDos.forEach(function(toDo) {
            // console.log(toDo.text);
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
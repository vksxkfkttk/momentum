const body = document.querySelector("body");

const IMG_NUMBER = 14;

function paintImage(IMG_NUMBER){
    const image = new Image();
    image.src = `images/${IMG_NUMBER}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandomNumber(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandomNumber();
    paintImage(randomNumber);
}

init();
const API_KEY = "97beac21924bdf1c7a6e204f74076a16"
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json()
        }).then(function(json){
            // console.log(json);
            const temp = json.main.temp;
            const place = json.name;
            // console.log(temp);
            weather.innerText = `${temp} ℃ on ${place}`;
        })
    ;
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function handleGeoSuccess(position){
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    // console.log(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
    
}

init();
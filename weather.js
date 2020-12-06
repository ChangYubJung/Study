const COORDS = "coords";
const API_KEY = "c3647e3d7d3cc1d58e07321dcd638b93";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json()
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
        //데이터가 넘어왔을때 then이 함수 호출 
        //몇몇 데이터는 넘어오는데 시간이 걸리기 때문에.!!
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
    

}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
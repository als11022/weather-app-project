// current time/date functions
let now= new Date ();

function formatDate (date) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];
    let day = days[now.getDay()];
    let dayNumber = now.getDate();

let formattedDate = ` ${day}, ${month} ${dayNumber}`;
return formattedDate;
}

function formatTime(time) {
    let minute = now.getMinutes();
    if (minute <10) {
        minute = `0${minute}`;
    }
    let hour = now.getHours();
    if (hour < 10){
        hour = `0${hour}`;
    }
    let formattedTime = `${hour}:${minute}`;
    return formattedTime;
}
let currentDate = document.querySelector("#date");
let currentTime = document.querySelector("#time");
currentDate.innerHTML = formatDate(now);
currentTime.innerHTML = formatTime(now);

//current location/ stats functions

function retrieveCurrentData (response) {
    document.querySelector("#location").innerHTML = response.data.name;
    document.querySelector("#today-temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML  = response.data.main.humidity;
    document.querySelector("#wind").innerHTML  = Math.round (response.data.wind.speed);
    document.querySelector("#feels-like").innerHTML  = Math.round(response.data.main.feels_like);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
   // console.log(response);
}

function search(city) {
    let apiKey ="a50f410ea36ad12d8cb30de68e6fc33b";
    let units ="imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(retrieveCurrentData);
}

function handleSubmit (event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    if (city.trim()) {
        search(city);
    }
    else {
        document.querySelector("#location").innerHTML = "Unknown";
        document.querySelector("#today-temp").innerHTML = null;
        document.querySelector("#humidity").innerHTML  = null;
        document.querySelector("#wind").innerHTML  = null;
        document.querySelector("#feels-like").innerHTML  = null;
        document.querySelector("#description").innerHTML = null;
        alert("Please enter a location");
    }
}

function retrieveGpsLocation (response) {
    let apiKey ="a50f410ea36ad12d8cb30de68e6fc33b";
    let units ="imperial";
    let lat = response.coords.latitude;
    let lon = response.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(retrieveCurrentData);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(retrieveGpsLocation);
}

let form = document.querySelector("#search-bar");
let button = document.querySelector("#current-button");
form.addEventListener("submit", handleSubmit);
button.addEventListener("click", getCurrentPosition);

search("New York");
//

function convertToC (event) {
    event.preventDefault();
    let tempElement = document.querySelector("#today-temp");
   fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
let celsiusTemp = (((fahrenheitTemp -32)*5)/9) +32;
tempElement.innerHTML = Math.round(celsiusTemp);
}

function convertToF (event) {
    event.preventDefault();
   fahrenheitLink.classList.add("active");
   celsiusLink.classList.remove("active");
   let tempElement = document.querySelector("#today-temp");
   tempElement.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheitTemp = null;
let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", convertToC);
let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToF);





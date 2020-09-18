const weatherImg = document.querySelector('.weather-image');
const temp = document.querySelector('.temperature');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const weatherType = document.querySelector('.weather-type');
const feelsLike = document.querySelector('.feels-like');
const tempMax = document.querySelector('.temp-max');
const tempMin = document.querySelector('.temp-min');

const toCelsius = (temp) => {
    return (temp - 273.15).toFixed(0);
};

const getWeather = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9473b08a5ce2f2071235d0c9469aff71`).then(response => response.json()).then(data => {
        console.log(data);
        weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = toCelsius(data.main.temp);
        city.textContent = data.name + ',';
        country.textContent = data.sys.country;
        weatherType.textContent = data.weather[0].description;
        feelsLike.textContent += toCelsius(data.main.feels_like) + '°C';
        tempMax.textContent += toCelsius(data.main.temp_max) + '°C';
        tempMin.textContent += toCelsius(data.main.temp_min) + '°C';
    });
}

const locationError = () => {
    console.log(`Couldn't get weather data`);
};

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, locationError);
    } else {
        console.log('Geolocation is not supported by your browser');
    }
});
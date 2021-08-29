//get current city name
const fetchIplocation = async () => {
    const response = await fetch("https://api.ipdata.co/?api-key=336a9216ddb551c862a7ed2fb4b38da331fbc8b2ec4b3714b569c63d");
    const data = await response.json();
    if (data.city != null) {
        fetchData(data.city);
    }
}

// fetch weather data
const fetchData = (location) => {
    const myapi = "3ee747a361ea7d5d80280ec39e3b2134";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myapi}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const icon = data.weather[0].icon;
            const city = location;
            const temp = data.main.temp;
            const weatherMain = data.weather[0].description;
            updateData(icon, city, temp, weatherMain);
        });
}

// update weather info
const updateData = (icon, city, temp, weather) => {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = `
        <img src = "https://openweathermap.org/img/wn/${icon}@2x.png"
        alt = "icon">
        <h1>${city}</h1>
        <h3>${temp}&deg; C</h3>
        <h1 class="lead">${weather}</h1>
    `;
}

// ip weather
fetchIplocation();

//weather search
document.getElementById("btn-search").addEventListener("click", () => {
    const locationInput = document.getElementById("place-input");
    fetchData(locationInput.value);

    // clear input
    locationInput.value = "";
});
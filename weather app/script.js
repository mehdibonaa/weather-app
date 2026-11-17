const apiKey = "ac86427891aef7d05942d47d96a7c6dd";
const weatherIcon = document.querySelector(".weather-icon");


function changeIcon(newSrc) {
    weatherIcon.classList.add("changing");
    setTimeout(() => {
        weatherIcon.src = newSrc;
        weatherIcon.classList.remove("changing");
    }, 400);
}

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    
    const oldError = document.querySelector(".error-msg");
    if (oldError) oldError.remove();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
           
            const err = document.createElement("p");
            err.className = "error-msg";
            err.textContent = "❌ City not found!";
            document.querySelector(".card-body").after(err);
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '<span class="h1-temp">°C</span>';
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        
        const condition = data.weather[0].main;
        const icons = {
            "Clouds":  "./img/cloudy.png",      
            "Clear":   "./img/sun.png",
            "Rain":    "./img/heavy-rain.png",
            "Drizzle": "./img/drizzle.png",
            "Mist":    "./img/mist.png",
        };
        changeIcon(icons[condition] || "./img/weather.png");

    } catch (error) {
        console.error("Error:", error);
    }
}

document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("#rech").value.trim();
    if (city) checkWeather(city);
});

document.querySelector("#rech").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value.trim();
        if (city) checkWeather(city);
    }
});

checkWeather("Agadir");
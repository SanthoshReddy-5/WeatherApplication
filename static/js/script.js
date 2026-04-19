const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    const inputCity = document.getElementById("inputField").value;
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const currentDate = document.getElementById("currentDate");
    const currentTime = document.getElementById("currentTime");
    const displayVisibility = document.getElementById("displayVisibility");
    const displayFeelsLike = document.getElementById("displayFeelsLike");
    const displayHumidity = document.getElementById("displayHumidity");
    const displayPressure = document.getElementById("displayPressure");
    const displaySunriseTime = document.getElementById("displaySunriseTime");
    const displaySunsetTime = document.getElementById("displaySunsetTime");

    if (!inputCity) return;

    // Fetching data from our Flask proxy API
    fetch(`/api/weather/${inputCity}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);

            const current = data.current;
            const forecast = data.forecast;
            const aqi = data.aqi;

            // Displaying current weather
            cityName.textContent = data.location; // Using geocoded location name
            temperature.textContent = `${current.main.temp.toFixed(2)} °C`;
            description.textContent = current.weather[0].description;

            // Date and time display
            function updateDateTime() {
                const currentDateTime = new Date();
                const formattedDateTime = currentDateTime.toLocaleString().split(",");
                currentDate.textContent = formattedDateTime[0];
                currentTime.textContent = formattedDateTime[1];
            }
            setInterval(updateDateTime, 1000);
            updateDateTime();

            // Additional details
            displayHumidity.textContent = `${current.main.humidity} %`;
            displayPressure.textContent = `${current.main.pressure} hPa`;
            displayFeelsLike.textContent = `${current.main.feels_like.toFixed(2)} °C`;
            displayVisibility.textContent = `${(current.visibility / 1000).toFixed(2)} Km`;

            let sunriseTime = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let sunsetTime = new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            displaySunriseTime.textContent = sunriseTime;
            displaySunsetTime.textContent = sunsetTime;

            // Air Quality
            const displayCO = document.getElementById("displayCO");
            const displaySO2 = document.getElementById("displaySO2");
            const displayO3 = document.getElementById("displayO3");
            const displayNO2 = document.getElementById("displayNO2");

            displayCO.textContent = aqi.list[0].components.co;
            displaySO2.textContent = aqi.list[0].components.so2;
            displayO3.textContent = aqi.list[0].components.o3;
            displayNO2.textContent = aqi.list[0].components.no2;

            // 5-Day Forecast
            let dailyForecasts = {};
            forecast.list.forEach(item => {
                let date = item.dt_txt.split(" ")[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        temp: item.main.temp.toFixed(1),
                        day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
                    };
                }
            });

            let forecastHtml = "";
            Object.keys(dailyForecasts).slice(1, 6).forEach(date => {
                let f = dailyForecasts[date];
                forecastHtml += `<div class="fiveDays">
                                    <img src="/static/images/cloud.png" class="fiveDaysIcon">
                                    <p>${f.temp}&deg; C</p>
                                    <p>${f.day}</p>
                                    <p>${date}</p>
                                </div>`;
            });
            document.getElementById("forecastContainer").innerHTML = forecastHtml;

            // Hourly Today Forecast
            let todayDate = new Date().toISOString().split("T")[0];
            let todayForecasts = forecast.list.filter(item => item.dt_txt.startsWith(todayDate));
            let selectedHours = todayForecasts.slice(0, 6);

            let todayHtml = "";
            selectedHours.forEach(item => {
                let time = new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                todayHtml += `<div class="todayRow">
                                   <p class="timeDisp">${time}</p>
                                   <img src="/static/images/cloudy.png" class="todayIcon">
                                   <p class="tempDisp">${item.main.temp.toFixed(1)}&deg; C</p>
                              </div>`;
            });
            document.getElementById("todayTempContainer").innerHTML = todayHtml;

        })
        .catch(error => {
            console.error("Error Fetching Weather Data:", error);
            showErrorModal();
        });
});

const errorModal = document.getElementById("errorModal");
const closeModalBtn = document.getElementById("closeModal");

function showErrorModal() {
    errorModal.style.display = "flex";
}

function hideErrorModal() {
    errorModal.style.display = "none";
}

closeModalBtn.addEventListener("click", hideErrorModal);
window.addEventListener("click", (event) => {
    if (event.target === errorModal) {
        hideErrorModal();
    }
});
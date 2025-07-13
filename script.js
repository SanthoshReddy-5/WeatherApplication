//API KEY initialization
const API_KEY = "YOUR_API_KEY";
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


    //fetching the current weather api data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}`).then(response => response.json()).then(data => {

        //api resposnse
        console.log("Current Weather API Response:", data);

        //displaying current temperature
        cityName.textContent = data.name;
        temperature.textContent = `${(data.main.temp - 273.15).toFixed(2)} °C`;
        description.textContent = data.weather[0].description;

        //time and date displaying
        function updateDateTime() {
            const currentDateTime = new Date();
            const formattedDateTime = currentDateTime.toLocaleString().split(",");

            const formattedDate = formattedDateTime[0];
            const formattedTime = formattedDateTime[1];

            currentDate.textContent = formattedDate;
            currentTime.textContent = formattedTime;
        }

        //Update time every second
        setInterval(updateDateTime, 1000);

        //Initial call to display time immediately
        updateDateTime();


        //displaying pressure,humidity,feels_like and visibility
        displayHumidity.textContent = `${data.main.humidity} %`;
        displayPressure.textContent = `${data.main.pressure} hPa`;
        displayFeelsLike.textContent = `${(data.main.feels_like - 273.15).toFixed(2)} °C`;
        displayVisibility.textContent = `${(data.visibility / 1000)} Km`;

        let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleString();
       
        //displaying sunrise time and sunset time
        displaySunriseTime.textContent = sunriseTime.split(",")[1];
        displaySunsetTime.textContent = sunsetTime.split(",")[1];

        const displayCO = document.getElementById("displayCO");
        const displaySO2 = document.getElementById("displaySO2");
        const displayO3 = document.getElementById("displayO3");
        const displayNO2 = document.getElementById("displayNO2");

        //fetching air pollution api data
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`).then(response => response.json()).then(data => {

            //air pollution api respose
            console.log("Air Pollution API Response:", data)

            //displaying air quality
            displayCO.textContent = data.list[0].components.co;
            displaySO2.textContent = data.list[0].components.so2;
            displayO3.textContent = data.list[0].components.o3;
            displayNO2.textContent = data.list[0].components.no2;

        }).catch(error => { console.error("Error Fetching Air Pollution API Data:", error); });


        //fetching next five days api data
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`).then(response => response.json()).then(data => {

            //next five days api response
            console.log("Next Five Days API Response:", data);

            let dailyForecasts = {};

            // Extract unique daily data
            data.list.forEach(item => {
                let date = item.dt_txt.split(" ")[0]; // Extract date only
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        temp: item.main.temp.toFixed(1), // Round temperature
                        day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) // Get day name
                    };
                }
            });

            console.log(dailyForecasts);

            // Get first 5 unique days
            let forecastHtml = "";
            Object.keys(dailyForecasts).slice(1, 6).forEach(date => {
                let forecast = dailyForecasts[date];
                forecastHtml += `<div class="fiveDays">
                                        <div>
                                            <img src="./assets/cloud.png" alt="Cloud Image" class="fiveDaysIcon">
                                        </div>
                                        <p>${(forecast.temp - 273.15).toFixed(2)}&deg; C</p>
                                        <p>${forecast.day}</p>
                                        <p>${date}</p>
                                    </div>`;
            });

            document.getElementById("forecastContainer").innerHTML = forecastHtml;


            let todayDate = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
            console.log(todayDate);
            let todayForecasts = data.list.filter(item => item.dt_txt.startsWith(todayDate)); // Get today's data
            console.log(todayForecasts);

            // Select specific time intervals (e.g., every 3 hours from the API)
            let selectedHours = todayForecasts.slice(0, 6); // Get first 6 hourly forecasts

            let todayHtml = "";
            selectedHours.forEach(item => {
                let time = new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); // Format time
                todayHtml += `<div class="todayRow">
                                   <p class="timeDisp">${time}</p>
                                   <div>
                                       <img src="./assets/cloudy.png" alt="Today Conditions" class="todayIcon">
                                   </div>
                                   <p class="tempDisp">${(item.main.temp - 273.15).toFixed(2)} &deg; C</p>
                              </div>`;
            });

            document.getElementById("todayTempContainer").innerHTML = todayHtml;

        }).catch(error => { console.error("Error Fetching Next Five Days API Data:", error); });

    }).catch(error => { console.error("Error Fetching Current Weather API Data:", error); });
});

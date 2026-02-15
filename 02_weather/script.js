document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "335925407c852d2205d265a62d5deg6";

    getWeatherBtn.addEventListener("click",async ()=>{
      const city = cityInput.value.trim();
      if(!city) return;
      try {
        const weatherdata= await fetchWeatherData(city);
        displayWeatherData(weatherdata);
        
      } catch (error) {
        showError();
      }
    })

    async function fetchWeatherData(city){
      const url = `
      https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response=await fetch(url);
      console.log(response);
      if(!response){
        throw new Error("City Not Found");
      }
      const data=await response.json();
      return data;
      

    }
    function displayWeatherData(data){
      console.log(data);
      const {name,main,weather}=data;
      cityNameDisplay.textContent=name;
      temperatureDisplay.textContent=`Temperature : ${main.temp}`;
      descriptionDisplay.textContent=`Weather : ${weather[0].description}`
      weatherInfo.classList.remove("hidden");

      

    }
    function showError(){
      errorMessage.classList.remove("hidden");
    }
})







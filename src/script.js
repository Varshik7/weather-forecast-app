// Commit 4: Integrated OpenWeatherMap API
const apiKey = "4001eb904fe8618e2c32a814c977d189"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const errorBox = document.getElementById("errorBox");
const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecast");
const toggleUnit = document.getElementById("toggleUnit");
const recentContainer = document.getElementById("recentContainer");
const recentDropdown = document.getElementById("recentDropdown");

let isCelsius = true;
let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

const displayError = (msg) => {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
  setTimeout(() => errorBox.classList.add("hidden"), 3000);
};

const fetchWeather = async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    updateCurrentWeather(data);
    saveRecentCity(city);
    fetchForecast(data.coord.lat, data.coord.lon);
  } catch (err) {
    displayError(err.message);
  }
};

const fetchForecast = async (lat, lon) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    updateForecast(data.list);
  } catch (err) {
    displayError("Failed to load forecast data");
  }
};

const updateCurrentWeather = (data) => {
  const { name, main, weather, wind } = data;
  const temp = isCelsius ? main.temp : (main.temp * 9) / 5 + 32;
  const unit = isCelsius ? "°C" : "°F";

  if (main.temp > 40) alert("⚠️ Extreme Temperature Alert!");

  document.body.className = weather[0].main.toLowerCase().includes("rain")
    ? "rainy-bg"
    : weather[0].main.toLowerCase().includes("cloud")
    ? "cloudy-bg"
    : "sunny-bg";

  currentWeather.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${name}</h2>
    <p class="text-lg">${weather[0].description}</p>
    <p class="text-3xl font-semibold">${temp.toFixed(1)}${unit}</p>
    <p>💨 Wind: ${wind.speed} m/s | 💧 Humidity: ${main.humidity}%</p>
  `;
};

const updateForecast = (list) => {
  forecast.innerHTML = "";
  const dailyData = list.filter((_, i) => i % 8 === 0).slice(0, 5);
  dailyData.forEach((day) => {
    const date = new Date(day.dt * 1000).toLocaleDateString();
    forecast.innerHTML += `
      <div class="bg-white/70 p-4 rounded-xl text-center shadow-md">
        <h3 class="font-semibold">${date}</h3>
        <p>🌡️ ${day.main.temp.toFixed(1)}°C</p>
        <p>💨 ${day.wind.speed} m/s</p>
        <p>💧 ${day.main.humidity}%</p>
      </div>
    `;
  });
};

const saveRecentCity = (city) => {
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }
  renderRecentDropdown();
};

const renderRecentDropdown = () => {
  if (recentCities.length > 0) {
    recentContainer.classList.remove("hidden");
    recentDropdown.innerHTML = recentCities
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");
  }
};

toggleUnit.addEventListener("click", () => {
  isCelsius = !isCelsius;
  toggleUnit.textContent = isCelsius ? "°C" : "°F";
  const currentCity = cityInput.value || recentCities[recentCities.length - 1];
  if (currentCity) fetchWeather(currentCity);
});

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return displayError("Please enter a city name.");
  fetchWeather(city);
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude),
      () => displayError("Unable to access location.")
    );
  } else {
    displayError("Geolocation not supported.");
  }
});

recentDropdown.addEventListener("change", (e) => fetchWeather(e.target.value));

renderRecentDropdown();

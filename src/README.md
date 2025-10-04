# 🌦️ Weather Forecast Application

A responsive web application built with **JavaScript**, **HTML**, and **Tailwind CSS** to display real-time weather data and 5-day forecasts.  
The app fetches data from the **OpenWeatherMap API**, supports both city-based and location-based searches, and allows users to toggle between °C and °F.

---

## 🎯 **Project Objective**

The goal of this project is to design and develop a weather forecast application that:
- Retrieves live weather data using an external API.
- Displays weather information in a clear and user-friendly interface.
- Provides location-based forecasts and extended (multi-day) weather predictions.
- Includes features such as recent city history, dynamic backgrounds, and temperature unit toggle.

---

## 🧩 **Features**

✅ **Search by City** – Type a city name to view the current weather and forecast.  
✅ **Current Location Weather** – Get weather data for your current GPS location using the browser’s geolocation API.  
✅ **Recent City Dropdown** – Stores previously searched cities in localStorage for quick access.  
✅ **Temperature Unit Toggle** – Switch between Celsius (°C) and Fahrenheit (°F) for today’s temperature.  
✅ **Dynamic Backgrounds** – The background changes depending on the weather (sunny, cloudy, rainy).  
✅ **Extreme Temperature Alerts** – Displays a custom alert when the temperature exceeds 40°C.  
✅ **Responsive Design** – Works on desktop, iPad Mini, and iPhone SE screen sizes.  
✅ **Error Handling** – Displays clear on-screen error messages (no browser alerts).  

---

## ⚙️ **Technologies Used**

- **HTML5** – Structure and layout  
- **Tailwind CSS** – Responsive styling and UI components  
- **JavaScript (ES6)** – Core logic and API interaction  
- **OpenWeatherMap API** – Real-time weather data  

> **Note on Tailwind CSS Usage:**  
> This project uses Tailwind CSS via the official CDN link (`<script src="https://cdn.tailwindcss.com"></script>`).  
> According to the assignment requirements, Tailwind CSS must be used — this method provides the full Tailwind utility set for rapid development and responsive design.  
> Since the project is for academic purposes (not production deployment), using the CDN version is both valid and appropriate.


---

## 🧠 **How It Works**

1. The user can search for a city or use their current location.  
2. The app calls the OpenWeatherMap API to fetch:
   - Current weather data (`/data/2.5/weather`)
   - 5-day forecast (`/data/2.5/forecast`)
3. Weather details such as temperature, humidity, and wind speed are displayed on the page.  
4. Recent searches are stored locally and shown in a dropdown list.  
5. The app dynamically updates the background and weather icons according to conditions.

---

## 🚀 **Setup & Installation**

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git

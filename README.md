# 🌦️ Premium Weather Dashboard

A sophisticated, state-of-the-art weather application built with a Flask backend and a premium glassmorphism frontend. This application provides comprehensive real-time weather data, including air quality, 5-day forecasts, and hourly breakdowns, all within a fully responsive and visually stunning interface.

## 📸 Interface Preview
*(Dynamic, Responsive, and Glass-morphic)*
<img width="1899" height="920" alt="Weather App UI" src="https://github.com/user-attachments/assets/7fea49a6-ea8a-44df-b884-171d963e9e2b" />

## ✨ Features
- **Real-Time Data**: Instant weather updates for any city worldwide.
- **Advanced Metrics**: Track humidity, pressure, visibility, and "feels like" temperatures.
- **Air Quality Index (AQI)**: Detailed breakdown of CO, SO2, O3, and NO2 levels.
- **Extended Forecasts**: 5-day daily forecast and a detailed 6-hour today breakdown.
- **Solar Conditions**: Precise sunrise and sunset timings.
- **Premium UI**: Modern Glassmorphism design with backdrop blur and responsive grid layouts.
- **Secure Backend**: API keys are managed server-side via environment variables for maximum security.

## 🛠️ Technology Stack
- **Backend**: Python 3.x, Flask
- **Frontend**: HTML5, Modern CSS (Grid/Flexbox), JavaScript (ES6+)
- **API**: [OpenWeatherMap API](https://openweathermap.org/) (Geocoding, Current Weather, Forecast, Air Pollution)
- **Environment Management**: Python-dotenv

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- OpenWeatherMap API Key

### Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd WeatherApplication
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   OPEN_WEATHER_API_KEY=your_api_key_here
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```
   The app will be available at `http://127.0.0.1:5000`.

## 📱 Responsiveness
The application is designed using a **mobile-first** approach and a robust **CSS Grid system**:
- **Desktop**: Balanced dashboard with sidebar and main content grid.
- **Tablet**: Optimized single-column layout with adapted card sizes.
- **Mobile**: Simplified view with scrollable forecasts and touch-friendly controls.

## 🖱️ Usage
1. Enter a city name in the **Glassmorphism Search Bar**.
2. Click the search icon or press enter.
3. Explore the detailed weather metrics, air quality, and forecasts.



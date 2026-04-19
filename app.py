from flask import Flask, render_template, jsonify, request
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()  # loads .env file
API_KEY = os.getenv("OPEN_WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/weather/<city>')
def get_weather(city):
    try:
        # 1. Geocoding
        geo_url = f"{BASE_URL}/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_res = requests.get(geo_url)
        geo_res.raise_for_status()
        geo_data = geo_res.json()

        if not geo_data:
            return jsonify({"error": "City not found"}), 404

        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']
        location_name = f"{geo_data[0]['name']}, {geo_data[0].get('state', geo_data[0]['country'])}"

        # 2. Current Weather
        current_url = f"{BASE_URL}/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        current_res = requests.get(current_url)
        current_res.raise_for_status()
        current_data = current_res.json()

        # 3. Forecast
        forecast_url = f"{BASE_URL}/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
        forecast_res = requests.get(forecast_url)
        forecast_res.raise_for_status()
        forecast_data = forecast_res.json()

        # 4. Air Quality
        aqi_url = f"{BASE_URL}/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
        aqi_res = requests.get(aqi_url)
        aqi_res.raise_for_status()
        aqi_data = aqi_res.json()

        return jsonify({
            "location": location_name,
            "current": current_data,
            "forecast": forecast_data,
            "aqi": aqi_data
        })

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

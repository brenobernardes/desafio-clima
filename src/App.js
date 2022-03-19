import React, { useState } from "react";
import axios from "axios";

function App() {

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;

  const apiCall = async (e) => {
      e.preventDefault()
      const location = e.target.elements.location.value
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      const req = axios.get(url);
      const res = await req;
      setWeather({
          description: res.data.weather[0].description,
          temp: res.data.main.temp,
          maxTemp: res.data.main.temp_max,
          minTemp: res.data.main.temp_min,
          city: res.data.name,
          humidity: res.data.main.humidity,
      })

      setCity(res.data.name)
      sportForWeather();

  }

  const WeatherInfo = () => {
      return <div>
          <h2>
              Previsão do tempo para {city}
          </h2>

          <div>
              <p>
                  Clima: {weather.description}
              </p>
              <p>
                  Temperatura Atual: {(weather.temp - 273.15).toFixed(2)} C
              </p>
              <p>
                  Temperatura Máxima: {(weather.maxTemp - 273.15).toFixed(2)} C
              </p>
              <p>
                  Temperatura Mínima: {(weather.minTemp - 273.15).toFixed(2)} C
              </p>
              <p>
                  Umidade: {weather.humidity} %
              </p>

          </div>
      </div>
  }
  return (<>
      <h1>Weather Info</h1>
      <div>
          <div>
              <form onSubmit={apiCall}>
                  <input 
                  type="text" 
                  placeholder="city" 
                  name="location" />

                  <button>Search</button>
              </form>

              {weather && <WeatherInfo />}
          </div>
      </div>
  </>
  )
}

export default App;
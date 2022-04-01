import React, { useState } from "react";
// import styled from "styledComponents";
import axios from "axios";
import clearSky from "../src/images/clear-sky.jpg";

function App() {

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = "434ffbe7702659b46019c22e25ee8e90";

  const apiCall = async (e) => {
      e.preventDefault()
      const location = e.target.elements.location.value
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      const req = axios.get(url);
      const res = await req;
      const climate = res.data.weather[0].description;
      setWeather({
          description: res.data.weather[0].description,
          temp: res.data.main.temp,
          maxTemp: res.data.main.temp_max,
          minTemp: res.data.main.temp_min,
          city: res.data.name,
          humidity: res.data.main.humidity,
      })

      if (climate == 'clear sky' || 'few clouds') {
          console.log("teste")
      } else if (climate == 'scattered clouds' || 'broken clouds') {
          console.log("teste2")
      } else if (climate == 'shower rain' || 'rain') {
        console.log("teste3")
      } else if (climate == 'thunderstorm') {
        console.log("teste4")
      } else if (climate == 'snow') {
        console.log("teste5")
      } else if (climate == 'mist') {
        console.log("teste6")
      }

      setCity(res.data.name)

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
  return (
    <div>
      <h1>Weather Info</h1>
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
  )
}

export default App;
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weather, setWeather] = useState()
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
          })
      }, [])

    if (weather) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>temperature {weather.main.temp.toFixed(1)}° Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon' width ='100' />
                <p>wind {weather.wind.speed.toFixed(1)} m/s</p>
            </div>
        ) 
    } else {
        return (
            <>Error: Cant get weather data for {capital}</>
        )
    } 
}

export default Weather
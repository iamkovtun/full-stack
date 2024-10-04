
import servicesWeather from './services/weather'
import { useState, useEffect } from 'react'

const Weather =({capital, latlng}) => {
    const [dataWeather, setDataWeather] = useState(null)

    useEffect(() => {servicesWeather.getByLocation(latlng[0],latlng[1])
        .then(currWeather =>
        setDataWeather(currWeather))
        .then()},[]);
    
    if (!dataWeather) {
        return null
    }
    const weatherImg = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`
    return (
    <div>
        <h2> Weather in {capital}</h2>
        <div>temperature {dataWeather.main.temp} Celsium</div>
        <img src={weatherImg}/>
        <div>wind {dataWeather.wind.speed} m/s</div>

    </div>)
}

export default Weather


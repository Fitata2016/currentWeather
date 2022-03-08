
import axios from "axios"
import React,{useState, useEffect} from "react";

const Weather = () => {

    const success = pos=>{
  
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c59eec7cdc7bbb139ccdadfde1c82053`)
      .then(res => {
          setWeather(res.data);
          setActualDegree((res.data?.main?.temp-ceroKelvin).toFixed(2));
      });

    }
    const[weather,setWeather]= useState({});
    const[actualDegree, setActualDegree] = useState(0);
    const[isCelsius, setIsCelsius] = useState(true)
    const ceroKelvin= 273.15
   
    console.log(weather)
    
    useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success)
    },[]);
    
    // from Kelvin degrees to Celsius (°C = K − 273.15)
    // from Celsuis degrees to Fahrenheit ((°C * 1.8)+32)
    
   
    const convertDegrees = () =>{
        if(isCelsius){
            setActualDegree(((actualDegree*1.8)+32).toFixed(2));
            setIsCelsius(false)
           
        }else{
            setActualDegree(((actualDegree-32)/1.8000).toFixed(2));
            setIsCelsius(true)
        }
     }
   
    return (
        <div className="weather-card">
            <h1>Weather App</h1>
            <h2>{weather.name}, {weather.sys?.country}</h2>
            <div className="weather-section">
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt="" />
                <ul>
                    <li>"{weather.weather?.[0].description}"</li>
                    <li>Wind Speed:{weather.wind?.speed}</li>
                    <li>Clouds: {weather.clouds?.all}%</li>
                    <li>Pressure: {weather.main?.pressure}Mb</li>
                </ul>
            </div>
            <h3>{actualDegree}{isCelsius?"°C":"°F"}</h3>
            <button onClick={convertDegrees}>Degrees °F/°C</button>
        </div>
    );
};

export default Weather;
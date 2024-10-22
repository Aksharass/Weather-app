import React, { useEffect, useState } from 'react'
import './App.css';
import PropTypes from "prop-types";

import searchIcon from "./assets/search.png"
import windIcon from "./assets/snow.png"
import humIcon from "./assets/humidity.png"
import thunderIcon from "./assets/thunderstorm.png"
import weatherIcon from "./assets/drizzle.png"
import rainIcon from "./assets/clouds.png"
import clearskyIcon from "./assets/full-moon.png"
import clearskynIcon from "./assets/star.png"
import flewcloudIcon from "./assets/weather.png"
import flewcloudnIcon from "./assets/night.png"
import cloudIcon from "./assets/cloud.png"
import cloudyIcon from "./assets/cloudy.png"
import snowIcon from "./assets/snowy.png"
import mistIcon from "./assets/mist.png"


const WeatherDet =({icon, temp, city, country, lat, log, hum, wind}) =>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt='image' />
    </div>
    <div className='temp'> {temp} *C</div>
    <div className='location'> {city}</div>
    <div className='country'> {country}</div>
    <div className='cord'> 
      <div >
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div >
        <span className='log'>Longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
     <div className='element'>
      <img src={humIcon} alt='image' className='icon'/>
      <div className='data'>
      <div className='hum-pre'>{hum}%</div>
      <div className='text1'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windIcon} alt='image' className='icon'/>
      <div className='data'>
      <div className='wind-pre'>{wind}km/h</div>
      <div className='text1'>Wind Speed</div>
      </div>
     </div>
    </div>
    </>
  );
};

WeatherDet.propTypes={
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  hum: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  
}


function App() {
  let api_key="19d4b6ace95130b91e3eaa217694f074";
  const[text, setText] =  useState("chennai");

  const[icon, setIcon] =  useState(cloudIcon);
  const[temp, setTemp] =  useState(0);
  const[city, setCity] =  useState("");
  const[country, setCountry] =  useState("");
  const[lat, setLat] =  useState(0);
  const[log, setLog] =  useState(0);
  const[hum, setHum] =  useState(0);
  const[wind, setWind] =  useState(0);

  const[cnf, setCnf] =  useState(false);
  const[load, setLoad] =  useState(false);
  const[error, setError] =  useState(null);


  const wtm={
    "01d":clearskyIcon,
    "01n":clearskynIcon,
    "02d":flewcloudIcon,
    "02n":flewcloudnIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":cloudyIcon,
    "04n":cloudyIcon,
    "09d":weatherIcon,
    "09n":weatherIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderIcon,
    "11n":thunderIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":mistIcon,
    "50n":mistIcon,
  }

  const search = async() =>{
    setLoad(true);

    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
 

  try{
    let res = await fetch(url);
    let data = await res.json();
  
    
    if(data.cod ==="404"){
      console.error("City not found");
      setCnf(true);
      setLoad(false);
      return;
    }

    setHum(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    const wIc =data.weather[0]= data.weather[0].icon;
    setIcon(wtm[wIc ]|| cloudIcon);
    setCnf(false);

    
  } catch(error){
    console.error("Error:", error.message);
    setError("An error occures while fetching weather data.");
  }finally{
    setLoad(false);
  }

};
  const handleCity =(e)=>{
    setText(e.target.value);
  }

  const handleKeyDown =(e)=>{
    if(e.key ==="Enter"){
        search();
    }
  }
  
  useEffect(function(){
    search();
  }, []);

  return (
    <>
    <div className="container">
      <div className='input-container'>
        <input type='text' className='city-input' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
        <div className='search-Icon' onClick={() => search()}>
          <img src={searchIcon} alt="search" /><br></br>
          
        </div>
      </div>
     
      {load && <div className='load-msg'>Loading...</div>}
      {error && <div className='er-msg'>{error}</div>}      
      {cnf && <div className='c-n-f'>City not found</div>}


     {!load && !cnf && <WeatherDet icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} hum={hum} wind={wind}/>
}     

      <p className='cr'>
          Designed by<span> Akshara S S</span>
      </p>
    </div>
    </>
  );
}

export default App;

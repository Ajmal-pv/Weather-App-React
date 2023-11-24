// WeatherApp.js

import React, { useState } from 'react';
import './Weather.css';
import axios from 'axios';
import Search_icon from '../Assets/search.png'
import Cloud_icon from '../Assets/cloud.png'
import Humidity_icon from '../Assets/humidity.png'
import Wind_icon from '../Assets/wind.png'
import Clear_icon from '../Assets/clear.png'
import Drizzle_icon from '../Assets/drizzle.png'
import Rain_icon from '../Assets/rain.png'
import Snow_icon from  '../Assets/snow.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherApp = () => {
  const [city,setCity]=useState('')
  const [showcity,setShowCity]=useState('')
  const[temp,setTemp]=useState('')
  const[humidity,setHumidity]=useState('')
  const [wind,setWind]=useState('')
  const [showData,setShowData]=useState(false)
  const [wicon,setWicon]=useState(null)

 let api_Key ='34fa1fa7888baf8dabc1d2950fbfe402'
 const search = async () => {
  try {
    if (city.trim() === '') {
      return  toast.error('Enter a valid Location!', {
        position: 'top-right',
        autoClose: 3000, // The alert will close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_Key}`;
    let response = await axios.get(url);

    setHumidity(response.data.main.humidity);
    setTemp(Math.floor(response.data.main.temp));
    setWind(Math.floor(response.data.wind.speed));
    setShowCity(response.data.name);

    if (response.data.weather[0].icon === '01d' || response.data.weather[0].icon === '01n') {
      setWicon(Clear_icon);
    } else if (response.data.weather[0].icon === '02d' || response.data.weather[0].icon === '02n') {
      setWicon(Cloud_icon);
    } else if (response.data.weather[0].icon === '03d' || response.data.weather[0].icon === '03n') {
      setWicon(Drizzle_icon);
    } else if (response.data.weather[0].icon === '04d' || response.data.weather[0].icon === '04n') {
      setWicon(Drizzle_icon);
    } else if (response.data.weather[0].icon === '09d' || response.data.weather[0].icon === '09n') {
      setWicon(Rain_icon);
    } else if (response.data.weather[0].icon === '10d' || response.data.weather[0].icon === '10n') {
      setWicon(Rain_icon);
    } else if (response.data.weather[0].icon === '13d' || response.data.weather[0].icon === '13n') {
      setWicon(Snow_icon);
    } else {
      setWicon(Clear_icon);
    }

    setShowData(true);
  } catch (error) {
    toast.error('Enter correct Location!', {
      position: 'top-center',
      autoClose: 3000, // The alert will close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.error('Error during search:', error.message);
    
  }
};


  return (
    <div className="container">
        <div className='top-bar'>
            <input type='text' value={city} onChange={(event)=>{setCity(event.target.value)}} className='cityInput' placeholder='Search'/>

  <div className="search-icon" onClick={()=>{search()}}>
     <img src={Search_icon} alt="" />
  </div>


        </div>
        {showData ? (
  <div className="weather-container">
    <div className="weather-image">
      <img src={wicon} alt="" />
    </div>
    <div className="weather-temp">{temp}°C</div>
    <div className="weather-location">{showcity}</div>
    <div className="data-container">
      <div className="element">
        <img src={Humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percent">{humidity} %</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={Wind_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percent">{wind} kmph</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </div>
) : (
  <div className='nodata'>
    <h1 className='no-text'>Enter Location</h1>
  </div>
)}


<ToastContainer />  
      
    </div>
  );
};

export default WeatherApp;

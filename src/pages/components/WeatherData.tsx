import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWind } from 'react-icons/fa6';
import { GiWaterDrop } from 'react-icons/gi';
import { ClipLoader } from 'react-spinners';
import { DateTime } from 'luxon';

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
  };
  location: {
    name: string;
    tz_id: string;
  };
}

interface WeatherDataProps {
  location: string;
}

const WeatherData: React.FC<WeatherDataProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = 'cca91d5a317a4c02b91122110232709';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
  
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError(null); 
      })
      .catch((error) => {
        console.error('Erro na solicitação à API:', error);
        setError('Location not found'); 
      });
  }, [location]);

  if (error) {
    return (
      <div className="grid place-items-center h-96">
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return <div className='grid place-items-center h-screen'>
    <ClipLoader color={"#fcfcf2"} className="m-auto p-3 h-4" loading={true} />
  </div>
  }

  const {
    current: { temp_c, condition, wind_kph, humidity },
    location: { tz_id }
  } = weatherData;

  const currentDateTime = DateTime.local().setZone(tz_id)

  return (
    
    <div className="glass flex flex-col items-center p-16 md:w-max w-11/12 m-auto mt-16 rounded-2xl">
    
      <p className="md:text-2xl text-xl text-center mb-10">{`Today, ${currentDateTime.toFormat('MMMM dd')}`}</p>
      <img src={condition.icon} alt="Weather Icon" />
      <h1 className="text-7xl pl-8">{temp_c}°</h1>
      <h3 className="mt-4 text-xl">{condition.text}</h3>
      
      <div className="mt-8">
        <p className="flex w-52 pl-9 m-auto ">
          <FaWind className="mr-2 mt-1 text-gray-300 text-xl" />
          Wind | {wind_kph} km/h
        </p>
        <p className="flex mt-4 w-52 pl-10 m-auto">
          <GiWaterDrop className="mr-2 text-blue-500 text-xl" />
          Hum | {humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherData;

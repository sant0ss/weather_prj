import React, { useEffect, useState, useRef  } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { DateTime } from 'luxon';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BoxesTimeProps {
  location: string; 
}

const BoxesTime: React.FC<BoxesTimeProps> = ({ location }) => {

  const updateBackground = (horaAtual: number) => {
    const body = document.querySelector('body');
  
    if (body) {
      let classeDoBody = '';
  
      if (horaAtual >= 0 && horaAtual < 3) {
        classeDoBody = 'body-madruga_noite';
      } else if (horaAtual >= 3 && horaAtual < 6) {
        classeDoBody = 'body-madrugada_manha';
      } else if (horaAtual >= 6 && horaAtual < 9) {
        classeDoBody = 'body-dia';
      } else if (horaAtual >= 9 && horaAtual < 12) {
        classeDoBody = 'body-meio_dia';
      } else if (horaAtual >= 12 && horaAtual < 15) {
        classeDoBody = 'body-tarde';
      } else if (horaAtual >= 15 && horaAtual < 18) {
        classeDoBody = 'body-fim_tarde';
      } else if (horaAtual >= 18 && horaAtual < 21) {
        classeDoBody = 'body-noite';
      } else {
        classeDoBody = 'body-meia_noite';
      }
  
      body.classList.remove(
        'body-madruga_noite',
        'body-madrugada_manha',
        'body-dia',
        'body-meio_dia',
        'body-tarde',
        'body-fim_tarde',
        'body-noite',
        'body-meia_noite'
      );
  
      body.classList.add(classeDoBody);
    }
  };
  

  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
  const [timeZone, setTimeZone] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const settings = {
    infinite: false,
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: true,
    variableWidth: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  

  useEffect(() => {
    const apiKey = 'cca91d5a317a4c02b91122110232709';
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&hour=1-24&aqi=no&alerts=no`;
  
    axios
      .get(apiUrl)
      .then((response) => {
        const hourlyData = response.data.forecast.forecastday[0].hour;
        const locationTimeZone = response.data.location.tz_id;
        setTimeZone(locationTimeZone);

        interface HourlyDataItem {
          time: string;
        }
  
        const currentHour = DateTime.local().setZone(locationTimeZone).hour;
        const currentIndex = hourlyData.findIndex((item: HourlyDataItem) => {
          const itemHour = parseInt(item.time.substring(11, 13));
          return itemHour > currentHour;
        });
  
        const filteredHourlyData =
          currentIndex !== -1
            ? hourlyData.slice(currentIndex, currentIndex + 12)
            : [];
        setHourlyForecast(filteredHourlyData);
  
        updateBackground(currentHour);
  
        setError(null);
      })
      .catch((error) => {
        console.error(
          'Erro na solicitação à API de previsão do tempo por hora:',
          error
        );
        setError('Location not found'); 
      });
  }, [location]);
  

  const sliderRef = useRef<Slider | null>(null);

  interface HourlyForecastItem {
    time_epoch: number;
    time: string;
    condition: {
      icon: string;
    };
    temp_c: number;
  }

  return (
    <div className="mt-20 max-w-prose md:w-max w-full m-auto px-10">

      <h1 className="text-2xl text-center mb-10 drop-shadow-lg">
          Next Hours
      </h1>
      {error ? (
        <p className="text-center px-8 py-2">{error}</p>
        ) : (
        hourlyForecast.length === 0 ? (
      <p className="glass text-center px-8 py-2">There are no available hours.</p>
        ) : (
        <div className="glass">
          <Slider ref={sliderRef} {...settings}>
            {hourlyForecast.map((forecast) => (
              <div key={forecast.time_epoch} className="rounded-2xl my-4">
              <h2 className="mb-2 text-center font-semibold">
            {forecast.time.substring(11, 16)}
              </h2>
              <div className="flex">
                <img className='w-12 h-12' src={forecast.condition.icon} alt="Weather Icon" />
                <h1 className="text-xl mt-2">{forecast.temp_c}°C</h1>
              </div>
              </div>
              ))}
          </Slider>
        <div className="carousel-overlay"></div>
      </div>
        )
        )}
    </div>
  );
};

export default BoxesTime;

import React, { useState } from "react";
import Location from "../components/Location";
import WeatherData from "../components/WeatherData";
import BoxesTime from "../components/BoxesTime";

const Main = () => {
  const [currentLocation, setCurrentLocation] = useState("Brazil");

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
  };

  interface LocationProps {
    onLocationChange: (location: string) => void;
    currentLocation: string; 
  }

  return (
    <div>
      <Location
        onLocationChange={handleLocationChange}
        currentLocation={currentLocation}
        onTimeUpdate={() => {}}
      />
      <WeatherData location={currentLocation} />
      <BoxesTime location={currentLocation} /> 
    </div>
  );
}

export default Main;

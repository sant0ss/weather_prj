import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";

interface LocationProps {
  onLocationChange: (location: string) => void;
  currentLocation: string; 
  onTimeUpdate: () => void; 
}

const Location: React.FC<LocationProps> = ({ onLocationChange, currentLocation, onTimeUpdate }) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const toggleEditingLocation = () => {
    setIsEditingLocation(!isEditingLocation);
  };

  const handleLocationChange = () => {
    if (newLocation.trim() !== "") {
      const words = newLocation.split(' ');
      const formattedLocation = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');

      onLocationChange(formattedLocation);
    }
    toggleEditingLocation();
    setNewLocation("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLocationChange();
    }
  };

  return (
    <div className="w-max mt-16 flex m-auto drop-shadow-lg">
      {isEditingLocation ? (
        <div className="bg-white py-2 rounded-xl">
          <button onClick={handleLocationChange}>
            <IoIosArrowBack className="mt-2 text-gray-600 font-bold ml-4" />
          </button>
          <input
            type="text"
            className="border-none outline-none pl-2 text-gray-500 text-xl focus:ring-0 font-semibold"
            placeholder="Type a location"
            value={newLocation}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown} 
          />
        </div>
      ) : (
        <>
          <HiOutlineLocationMarker className="mt-1 text-2xl" />
          <h3
            className="text-2xl px-4 font-semibold cursor-pointer"
            onClick={toggleEditingLocation}
          >
            {currentLocation}
          </h3>
          <IoIosArrowDown
            className="mt-2 cursor-pointer text-2xl"
            onClick={toggleEditingLocation}
          />
        </>
      )}
    </div>
  );
};

export default Location;

import React, { useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

export default function Map_Coordinates() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  let geometry;
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
          },
        }
      );
      const { center } = response.data.features[0];
      setCoordinates({ lat: center[1], lng: center[0] });
      geometry = `${center[1]}, ${center[0]}`;
      console.log(geometry);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter location"
      />
      <button onClick={getCoordinates}>Get Coordinates</button>
      {coordinates.lat && coordinates.lng && (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
}

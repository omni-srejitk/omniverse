import React from "react";
import { useState } from "react";
import Map from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 12.9716,
    longitude: 77.5946,
    zoom: 11,
  });
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default Map;

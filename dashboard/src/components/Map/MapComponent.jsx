import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
//import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerCard from "./MarkerCard";
import { useState } from "react";

function MapComponent({ storesData }) {
  const [seletectedLocation, setSelectedLocation] = useState({});
  // const coordinates = storesData.map((result) => ({
  //   longitude: result.longitude,
  //   latitude: result.latitude,
  // }));
  // const center = getCenter(coordinates);
  return (
    <Map
      initialViewState={{
        longitude: 77.5946,
        latitude: 12.9716,
        zoom: 10,
      }}
      style={{
        width: 600,
        height: 600,
        marginLeft: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)",
      }}
      mapboxAccessToken="pk.eyJ1IjoiYXl1czIwMDAiLCJhIjoiY2wyZXhrb3R3MDQzOTNxcm5nbWJ4azh5eSJ9.4kZ6cwuNgfe973DXixSlyA"
      mapStyle="mapbox://styles/ayus2000/cl2fqyzby001r15ltj3seihot"
    >
      {storesData.map((result) => (
        <div key={result.longitude}>
          <Marker
            longitude={result.longitude}
            latitude={result.latitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => {
                setSelectedLocation(result);
              }}
              className="cursor-pointer rounded-md bg-white p-2 drop-shadow-md
    transition-all duration-150 ease-out hover:scale-125"
            >
              {result.storeName}
            </p>
            <div className="flex flex-row justify-center">
              <span class="material-icons">room</span>
            </div>
          </Marker>
          {seletectedLocation.longitude === result.longitude && (
            <Popup
              latitude={seletectedLocation.latitude}
              longitude={seletectedLocation.longitude}
              anchor="bottom"
              className="z-40"
              closeOnClick={false}
              onClose={() => setSelectedLocation({})}
            >
              {result.storeName}
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapComponent;

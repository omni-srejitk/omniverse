import * as React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { StoreModal } from "../Modals/StoreModal/StoreModal";
import { Modal } from "../Modals";

function MapComponent({
  storesData = [],
  showModal,
  setShowModal,
  setStoreDetail = {},
}) {
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <Map
      initialViewState={{
        longitude: 77.6242,
        latitude: 12.903,
        zoom: 10,
      }}
      style={{
        width: "40vw",
        height: "100vh",
      }}
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      mapStyle={import.meta.env.VITE_MAP_STYLE}
    >
      {storesData &&
        storesData?.map((store) => (
          <div key={store.customer}>
            <Marker
              longitude={store.longitude}
              latitude={store.latitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                role="img"
                onClick={() => {
                  setSelectedLocation(store);
                  setShowModal(true);
                  setStoreDetail(store);
                }}
                className="cursor-pointer rounded-lg bg-white p-2 font-medium
    transition-all duration-150 ease-out hover:scale-125"
              >
                {store.customer_name}
              </p>
              <div className="flex flex-row justify-center">
                <span className="material-icons text-red-500">room</span>
              </div>
            </Marker>
            {selectedLocation.longitude === store.longitude && (
              <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                onClick={(e) => e.stopPropagation()}
              >
                <StoreModal store={store} />
              </Modal>
            )}
          </div>
        ))}
    </Map>
  );
}

export default MapComponent;

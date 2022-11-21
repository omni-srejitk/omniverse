import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { StoreModal } from '../Modals/StoreModal/StoreModal';
import { Modal } from '../Modals';

function MapComponent({ storesData, showModal, setShowModal }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <Map
      initialViewState={{
        longitude: 77.5946,
        latitude: 12.9716,
        zoom: 10,
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
      }}
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      mapStyle={import.meta.env.VITE_MAP_STYLE}
    >
      {storesData.map((store) => (
        <div key={store.longitude}>
          <Marker
            longitude={store.longitude}
            latitude={store.latitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => {
                setSelectedLocation(store);
                setShowModal(true);
              }}
              className='cursor-pointer rounded-md bg-red-500 p-2
    transition-all duration-150 ease-out hover:scale-125'
            >
              {store.storeName}
            </p>
            <div className='flex flex-row justify-center'>
              <span className='material-icons'>room</span>
            </div>
          </Marker>
          {selectedLocation.longitude === store.longitude && (
            <Modal
              open={showModal}
              onClose={() => setShowModal(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <StoreModal />
            </Modal>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapComponent;

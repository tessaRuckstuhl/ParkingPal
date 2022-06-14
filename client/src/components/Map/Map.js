import React, { useState, useRef, useEffect } from 'react';
import somePlaces from './places.json';
import Marker from './Marker';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
const center = { lat: -34.397, lng: 150.644 };
const zoom = 4;
function MyMapComponent() {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });
  return <div className='w-full h-full' ref={ref} id="map" />;
}

const Map = () => {
  const [places, setPlaces] = useState(somePlaces.results);
  const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
  };
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  return (
    <>
      {places.length > 0 && (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
          <MyMapComponent center={center} zoom={zoom} />
        </Wrapper>
      )}
    </>
  );
};

export default Map;

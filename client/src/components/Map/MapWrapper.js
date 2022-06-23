import React, { useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './Map';
import Marker from './Marker';

const MapWrapper = (props) => {
  const { results, center, setCenter } = props;
  const [mapResults, setMapResults] = useState(results);
  const [zoom, setZoom] = useState(10); // initial zoom

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const onIdle = (m) => {
    console.log('onIdle');
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <div className="flex">
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
        <Map center={center} onIdle={onIdle} zoom={zoom} mapResults={mapResults}>
          {results.map((result, i) => (
            <Marker
              key={i}
              position={{ lat: result.lat, lng: result.lng }}
              address={result.location}
              label={'€' + result.basePrice}
              resultId={result._id}
              name={result.name}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
export default MapWrapper;

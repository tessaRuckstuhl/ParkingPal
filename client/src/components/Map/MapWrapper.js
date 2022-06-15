import React, { useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './Map';
import Marker from './Marker';

const MapWrapper = (props) => {
  const { results, center, setCenter } = props;
  const [mapResults, setMapResults] = useState(results);
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(8); // initial zoom


  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const onClick = (e) => {
    // avoid directly mutating state

    console.log(e)
  };

  const onIdle = (m) => {
    console.log('onIdle');
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <div className="flex">
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          mapResults={mapResults}
        >
          {results.map((result, i) => (
            <Marker key={i} position={{ lat: result.lat, lng: result.lng} } label={result.name} resultId={result._id} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
export default MapWrapper;

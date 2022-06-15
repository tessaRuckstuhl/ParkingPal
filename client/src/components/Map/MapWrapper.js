import React, {useState} from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './Map';
import Marker from './Marker';

const MapWrapper = (props) => {
  const { results } = props;
  const [mapResults, setMapResults] = useState(results)
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(5); // initial zoom
  const [center, setCenter] = useState({
    lat: results[0].geometry.location.lat,
    lng: results[0].geometry.location.lng,
  });

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log('onIdle');
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const form = (
    <div
      style={{
        padding: '1rem',
        flexBasis: '250px',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })}
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })}
      />
      <h3>{clicks.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div className="flex">
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          mapResults={mapResults}
          // style={{ flexGrow: '1' }}
        >
          {results.map((result, i) => (
            <Marker key={i} position={result.geometry.location} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
};
export default MapWrapper;

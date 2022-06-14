import React, {useState} from 'react';
import Map from '../components/Map/Map';
import somePlaces from '../components/Map/places.json'

const Results = () => {
  const [places, setPlaces] = useState(somePlaces.results);

  return (
    <div className="flex">
      <div className="w-1/2">ResultsList</div>
      {/* height has to be set for map, h => page height - (footer+header) */}
      <div className="h-[calc(100vh_-_270px)] w-[calc(100vw_-_50%)]">
        <Map />
      </div>
    </div>
  );
};

export default Results;

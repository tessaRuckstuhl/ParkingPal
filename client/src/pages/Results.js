import React, { useState, useEffect, useContext } from 'react';
import MapWrapper from '../components/Map/MapWrapper';
import dummyPlaces from '../components/Map/dummyResults.json';
import ResultsList from '../components/Results/ResultsList';
import ResultsFilter from '../components/Results/ResultsFilter';
import {FilterContext} from '../contexts/FilterContext'
const Results = () => {
  // center = Peterskirch in Munich
  const [center, setCenter] = useState({
    lat: 48.1348661,
    lng: 11.5565986
  });
  const {results} = useContext(FilterContext)
  useEffect(() => {
    if(results.length > 0 ){
      setCenter({ lat:  results[0].lat, lng: results[0].lng });
    }
  }, []);


  return (
    <div className="flex h-[calc(100vh_-_250px)]">
      {results.length > 0 && (
        <>
          <div className="w-1/2 flex-col overflow-y-auto h-full ">
            <ResultsFilter results={results} />
            <ResultsList results={results} setCenter={setCenter} />
          </div>
          <div className="w-1/2">
            <MapWrapper results={results} center={center} setCenter={setCenter} />
          </div>
        </>
      )}
    </div>
  );
};

export default Results;

import React, { useState, useEffect, useContext } from 'react';
import MapWrapper from '../components/Map/MapWrapper';
import dummyPlaces from '../components/Map/dummyResults.json';
import ResultsList from '../components/Results/ResultsList';
import ResultsFilter from '../components/Results/ResultsFilter';
import {FilterContext} from '../contexts/FilterContext'
const Results = () => {
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const {results, setResults} = useContext(FilterContext)
  useEffect(() => {
    console.log('results', results)
    if(results.length > 0 ){
      setCenter({ lat: results[0].lat, lng: results[0].lng });

    }
    // getAllParkingSpacesRequest();
  }, []);

  // const getAllParkingSpacesRequest = async () => {
  //   const parkingSpaces =  await PSService.listAllParkingSpaces()
  //   // const parkingSpaces = dummyPlaces;
  //   setResults(parkingSpaces.data);
  //   setCenter({ lat: parkingSpaces.data[0].lat, lng: parkingSpaces.data[0].lng });
  // };

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

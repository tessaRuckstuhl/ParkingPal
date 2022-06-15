import React, { useState, useEffect } from 'react';
import MapWrapper from '../components/Map/MapWrapper';
import somePlaces from '../components/Map/places.json';
import dummyPlaces from '../components/Map/dummyResults.json';
import ResultsList from '../components/Results/ResultsList';
import PSService from '../services/parkingSpace.service';
const Results = () => {
  const [parkingSpaceResults, setParkingSpaceResults] = useState([]);

  useEffect(() => {
    getAllParkingSpacesRequest();
  }, []);

  const getAllParkingSpacesRequest = async () => {
    // const parkingSpaces =  await PSService.listAllParkingSpaces()
    const parkingSpaces = dummyPlaces;
    setParkingSpaceResults(parkingSpaces.data);
  };

  const onClick = (e) => {
    // avoid directly mutating state
   console.log('clicked...')
  };


  return (
    <div className="flex h-[calc(100vh_-_270px)]">
      {parkingSpaceResults.length > 0 && (
        <>
          <div className="w-1/2 overflow-y-auto">
            <ResultsList results={parkingSpaceResults} />
          </div>
          <div className="w-1/2">
            <MapWrapper results={parkingSpaceResults} />
          </div>
        </>
      )}
    </div>
  );
};

export default Results;

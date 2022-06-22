import React, { useState, useEffect } from 'react';
import MapWrapper from '../components/Map/MapWrapper';
import somePlaces from '../components/Map/places.json';
import dummyPlaces from '../components/Map/dummyResults.json';
import ResultsList from '../components/Results/ResultsList';
import ResultsFilter from '../components/Results/ResultsFilter';
import PSService from '../services/parkingSpace.service';
const Results = () => {
  const [parkingSpaceResults, setParkingSpaceResults] = useState([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    getAllParkingSpacesRequest();
  }, []);

  const getAllParkingSpacesRequest = async () => {
    // const parkingSpaces =  await PSService.listAllParkingSpaces()
    const parkingSpaces = dummyPlaces;
    setParkingSpaceResults(parkingSpaces.data);
    setCenter({ lat: parkingSpaces.data[0].lat, lng: parkingSpaces.data[0].lng });
  };

  return (
    <div className="flex h-[calc(100vh_-_250px)]">
      {parkingSpaceResults.length > 0 && (
        <>
          <div className="w-1/2 flex-col overflow-y-auto h-full ">
            <ResultsFilter results={parkingSpaceResults} />
            <ResultsList results={parkingSpaceResults} setCenter={setCenter} />
          </div>
          <div className="w-1/2">
            <MapWrapper results={parkingSpaceResults} center={center} setCenter={setCenter} />
          </div>
        </>
      )}
    </div>
  );
};

export default Results;

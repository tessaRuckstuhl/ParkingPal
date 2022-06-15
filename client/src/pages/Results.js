import React, { useState } from 'react';
import MapWrapper from '../components/Map/MapWrapper';
import somePlaces from '../components/Map/places.json';
import ResultsList from '../components/Results/ResultsList';

const Results = () => {
  return (
    <div className="flex h-[calc(100vh_-_270px)]">
      {somePlaces && (
        <>
          <div className="w-1/2 overflow-y-auto">
            <ResultsList results={somePlaces.results} />
          </div>
          <div className="w-1/2">
            <MapWrapper results={somePlaces.results} />
          </div>
        </>
      )}
    </div>
  );
};

export default Results;

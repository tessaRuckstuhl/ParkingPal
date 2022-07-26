import React, { useState, useEffect, useContext } from 'react';
import {
  CircularProgress,
} from '@mui/material';
import MapWrapper from '../components/Map/MapWrapper';
import ResultsList from '../components/Results/ResultsList';
import ResultsFilter from '../components/Results/ResultsFilter';
import NoResults from '../components/Results/NoResults';
import { FilterContext } from '../contexts/FilterContext';
const Results = () => {
  // center = TUM Stammgelände
  const [center, setCenter] = useState({
    lat: 48.1488436,
    lng: 11.5658499,
  });
  const { results, loadingResults } = useContext(FilterContext);
  useEffect(() => {
    if (results.length > 0) {
      setCenter({ lat: results[0].lat, lng: results[0].lng });
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh_-_250px)]">
      <>
        <div className="w-1/2 flex-col overflow-y-auto h-full ">
          {!loadingResults ? (
            <>
              {results.length > 0 ? (
                <div>
                  <ResultsFilter results={results} />
                  <ResultsList results={results} setCenter={setCenter} />
                </div>
              ) : (
                <NoResults />
              )}
            </>
          ) : (
            <div className='flex justify-center items-center h-full'><CircularProgress  size={50} sx={{ display: 'flex' }}/> </div>
          )}
        </div>

        <div className="w-1/2">
          <MapWrapper results={results} center={center} setCenter={setCenter} />
        </div>
      </>
    </div>
  );
};

export default Results;

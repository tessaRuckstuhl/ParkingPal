import React, { useState, useEffect } from 'react';
import PSService from '../services/parkingSpace.service';

const FilterContext = React.createContext();

const FilterContextProvider = (props) => {
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]);

  const getAllParkingSpaces = async (query) => {
    const parkingSpaces = await PSService.listAllParkingSpaces(query);
    // TODO might remove this conversion...
    const fixed = parkingSpaces.data.map((d) => {
      return { ...d, lat: parseFloat(d.lat), lng: parseFloat(d.lng) };
    });
    console.log('fixed',fixed)
    setResults(fixed);
  };
  useEffect(() => {
    getAllParkingSpaces(null);
  }, []);

  return (
    <FilterContext.Provider value={{ filters, setFilters, results, setResults, getAllParkingSpaces }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };

import React, { useState, useEffect } from 'react';
import PSService from '../services/parkingSpace.service';

const FilterContext = React.createContext();
const FilterContextProvider = (props) => {
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]);

  const getAllParkingSpaces = async () => {
    const parkingSpaces = await PSService.listAllParkingSpaces();
    setResults(parkingSpaces.data);
  };
  useEffect(() => {
    getAllParkingSpaces()
  }, [])
  

  return (
    <FilterContext.Provider value={{ filters, setFilters, results, setResults }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };

import React, { useState, useEffect } from 'react';
import PSService from '../services/parkingSpace.service';

const FilterContext = React.createContext();

const FilterContextProvider = (props) => {
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]);

  const getAllParkingSpaces = async (query) => {
    try {
      const parkingSpaces = await PSService.listAllParkingSpaces(query);
      const fixed = parkingSpaces.data.map((d) => {
        return { ...d, lat: d.location.coordinates[0], lng: d.location.coordinates[1] };
      });
      setResults(fixed);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllParkingSpaces(null);
  }, []);

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, results, setResults, getAllParkingSpaces }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };

import React, { useState, useEffect } from 'react';
import PSService from '../services/parkingSpace.service';
import RService from '../services/review.service';
import { useErrorSnack } from './ErrorContext';

const FilterContext = React.createContext();

const FilterContextProvider = (props) => {
  const [filters, setFilters] = useState();
  const [results, setResults] = useState([]);
  const {showSnack} = useErrorSnack()
  const getAllParkingSpaces = async (query) => {
    try {
      const parkingSpaces = await PSService.filterParkingSpaces(query);

      const formattedParkingSpaces = parkingSpaces.data.map((d) => {
        return { ...d, lat: d.location.coordinates[0], lng: d.location.coordinates[1] };
      });
      for (let i = 0; i < formattedParkingSpaces.length; i++) {
        const review = await RService.getReviewStats(formattedParkingSpaces[i]._id);
        formattedParkingSpaces[i] = { ...formattedParkingSpaces[i], reviewStats: review.data };
      }
      setResults(formattedParkingSpaces);
    } catch (error) {
      showSnack('An error ocurred.', 'error')
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

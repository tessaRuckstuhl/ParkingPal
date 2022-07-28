import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PSService from '../services/parkingSpace.service';
import RService from '../services/review.service';
import { useErrorSnack } from './ErrorContext';

const FilterContext = React.createContext();

const FilterContextProvider = (props) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState();
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const {showSnack} = useErrorSnack()
  const getAllParkingSpaces = async (query) => {
    try {
      setLoadingResults(true)
      let parkingSpaces = await PSService.filterParkingSpaces(query);
      if(parkingSpaces.data.length == 0){
        showSnack('There are no parking places available that match your filters. Change and search again...', 'warning')
        // parkingSpaces = await PSService.filterParkingSpaces();
      }
      const formattedParkingSpaces = parkingSpaces.data.map((d) => {
        return { ...d, lat: d.location.coordinates[0], lng: d.location.coordinates[1] };
      });
      for (let i = 0; i < formattedParkingSpaces.length; i++) {
        const review = await RService.getReviewStats(formattedParkingSpaces[i]._id);
        formattedParkingSpaces[i] = { ...formattedParkingSpaces[i], reviewStats: review.data };
      }
      setResults(formattedParkingSpaces);
    } catch (error) {
      showSnack(error?.response?.data?.error || error.message, 'error')
      setLoadingResults(false)
    }
  };
  useEffect(() => {
    if(loadingResults){
      setLoadingResults(false)
    }

  }, [results]);

  useEffect(() => {
    getAllParkingSpaces(filters);
  }, [navigate]);

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, results, setResults, getAllParkingSpaces, loadingResults }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };

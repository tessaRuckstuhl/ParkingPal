import React, { useState, useContext } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  useFormControl,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Divider } from '@mui/material';
import moment from 'moment';
import MoreFilters from './MoreFilters';
import { FilterContext } from '../../contexts/FilterContext';

const Bar = () => {
  const [loading, setLoading] = useState(false);
  const { filters, setFilters, getAllParkingSpaces } = useContext(FilterContext);
  function MyFormHelperText(props) {
    const { focused } = useFormControl() || {};
    const helperText = React.useMemo(() => {
      if (focused) {
        return '';
      }

      return props.text;
    }, [focused]);

    return (
      <FormHelperText sx={{ fontSize: '10px', color: 'black', ml: '10px', mt: 0 }}>
        {helperText}
      </FormHelperText>
    );
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchWithFilters = async () => {
    setLoading(true);
    await getAllParkingSpaces(filters);
    setLoading(false);
  };
  return (
    <div className=" absolute sm:px-1 px-2 py-[0.1rem] left-0 right-0 ml-auto mr-auto  shadow-bar rounded-3xl flex items-center border border-lighterGray lg:w-[750px] sm:w-[500px]">
      {/* Search Location */}
      <FormControl className="w-[60%] ">
        <InputBase
          sx={{
            flex: 1,
            ml: '8px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Location"
          inputProps={{ 'aria-label': 'search parking places' }}
          aria-describedby="component-helper-text"
          onChange={handleFilterChange}
          value={filters?.formattedAddress || ''}
          name="formattedAddress"
        />
        <MyFormHelperText text="Where?" />
      </FormControl>
      {/* Input Radius */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl className="w-[70%]">
        <InputBase
          sx={{
            ml: '8px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Within 10"
          name="radius"
          type="number"
          onChange={handleFilterChange}
          value={filters?.radius || ''}
          endAdornment={
            <InputAdornment position="end">
              <span className="text-[.75rem]">km</span>
            </InputAdornment>
          }
          inputProps={{ 'aria-label': 'search parking places', min: 0 }}
        />
        <MyFormHelperText text="Flexible?" />
      </FormControl>
      {/* Check in */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl fullWidth>
        <InputBase
          type="datetime-local"
          name="from"
          onChange={handleFilterChange}
          value={filters?.from || ''}
          sx={{
            ml: '8px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Check in"
          inputProps={{ 'aria-label': 'Check in' }}
        />
        <MyFormHelperText text="From?" />
      </FormControl>
      {/* Check out */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl fullWidth>
        <InputBase
          type="datetime-local"
          onChange={handleFilterChange}
          name="to"
          value={filters?.to || ''}
          sx={{
            ml: '8px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Check out"
          inputProps={{ 'aria-label': 'Check out' }}
        />
        <MyFormHelperText text="To?" />
      </FormControl>
      {/* More filters */}
      <MoreFilters handleFilterChange={handleFilterChange} />
      {/* Submit Filter/Search */}
      <div className="ml-2 w-[30px] h-[30px]">
        {!loading ? (
          <IconButton
            type="submit"
            size="small"
            sx={{
              backgroundColor: '#6F11F2',
              '&:hover, &.Mui-focusVisible, &:active': {
                backgroundColor: '#6F11F2',
              },
            }}
            onClick={searchWithFilters}
          >
            <Search sx={{ color: 'white' }} fontSize="inherit" />
          </IconButton>
        ) : (
          <CircularProgress size={25} sx={{ display: 'flex' }} />
        )}
      </div>
    </div>
  );
};
export default Bar;

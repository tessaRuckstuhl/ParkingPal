import React, { useState , useContext} from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  useFormControl,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Divider } from '@mui/material';
import moment from 'moment';
import MoreFilters from './MoreFilters';
import {FilterContext} from '../../contexts/FilterContext'

const Bar = () => {
  const {filters, setFilters, getAllParkingSpaces} = useContext(FilterContext)
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
  const today = moment(new Date()).format('YYYY-MM-DDTkk:mm');

  const handleFilterChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value})
  }

  const searchWithFilters = async () => {
    getAllParkingSpaces(filters)
  }
  return (
    <div className="ml-5 px-4 py-[0.1rem]  shadow-bar rounded-3xl flex items-center border border-lighterGray w-[650px] ">
      {/* Search Location */}
      <FormControl className="w-[70%]">
        <InputBase
          sx={{
            flex: 1,
            ml: '10px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Location"
          inputProps={{ 'aria-label': 'search parking places' }}
          aria-describedby="component-helper-text"
          onChange={handleFilterChange}
          value={filters?.location || ''}
          name='location'
        />
        <MyFormHelperText text="Where?" />
      </FormControl>
      {/* Input Radius */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl className="w-[50%]">
        <InputBase
          sx={{
            ml: '10px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Radius"
          type="number"
          inputProps={{ 'aria-label': 'search parking places' }}
        />
        <MyFormHelperText text="Flexible?" />
      </FormControl>
      {/* Check in */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl fullWidth>
        <InputBase
          type="datetime-local"
          defaultValue={today}
          sx={{
            ml: '10px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Check in"
          inputProps={{ 'aria-label': 'Check in' }}
        />
        <MyFormHelperText text="When?" />
      </FormControl>
      {/* Check out */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl fullWidth>
        <InputBase
          type="datetime-local"
          defaultValue="?"
          sx={{
            ml: '10px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Check out"
          inputProps={{ 'aria-label': 'Check out' }}
        />
        <MyFormHelperText text="When?" />
      </FormControl>
      {/* More filters */}
      <MoreFilters/>
      {/* Submit Filter/Search */}
      <IconButton
        type="submit"
        size="small"
        sx={{
          backgroundColor: '#6F11F2',
          ml: '10px',
          '&:hover, &.Mui-focusVisible, &:active': {
            backgroundColor: '#6F11F2',
          },
        }}
        onClick={searchWithFilters}
      >
        <Search sx={{ color: 'white' }} fontSize="inherit" />
      </IconButton>
    </div>
  );
};
export default Bar;

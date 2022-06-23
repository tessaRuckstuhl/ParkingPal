import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slider,
  Badge,
} from '@mui/material';
import { Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FilterContext } from '../../contexts/FilterContext';
const MoreFilters = (props) => {
  const { filters, setFilters, getAllParkingSpaces } = useContext(FilterContext);

  // change filter in context
  const { handleFilterChange } = props;
  const [open, setOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const enhancedFilterKeys = ['dayPrice', 'longTermStayPrice', 'basePrice'];
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchWithEnhancedFilters = async () => {
    getAllParkingSpaces(filters);
    handleClose();
  };
  const clearAll = async () => {
    const tempFilters = filters;
    enhancedFilterKeys.map((key) => {
      delete tempFilters[key];
    });

    setFilters({ ...tempFilters });
  };

  useEffect(() => {
    let count = 0;
    enhancedFilterKeys.map((key) => {
      if (filters?.hasOwnProperty(key)) {
        count++;
      }
    });
    setFilterCount(count);
  }, [filters]);


  return (
    <>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Badge badgeContent={filterCount} color="secondary">
        <div
          onClick={handleClick}
          className="ml-2.5 text-xs font-bold whitespace-nowrap pr-1 py-1 text-[#949494] cursor-pointer"
        >
          Add more filters
        </div>
      </Badge>

      {/* Popup dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Filters
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContent>
            <DialogContentText>Hourly Price Range</DialogContentText>
            <div className="text-xs font-darkGray mb-5">Set a price by hour</div>
            <Slider
              onChange={handleFilterChange}
              name="basePrice"
              value={filters?.basePrice || [0, 100]}
              valueLabelDisplay="auto"
              getAriaLabel={(index) => (index === 0 ? 'Minimum hour price' : 'Maximum hour price')}
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                { value: 100, label: '100 €' },
              ]}
            />
          </DialogContent>
          <DialogContent dividers>
            <DialogContentText>Daily Price Range</DialogContentText>
            <div className="text-xs font-darkGray mb-5">Set a price per day</div>
            <Slider
              onChange={handleFilterChange}
              name="dayPrice"
              value={filters?.dayPrice || [0, 300]}
              valueLabelDisplay="auto"
              min={0}
              max={300}
              getAriaLabel={(index) => (index === 0 ? 'Minimum day price' : 'Maximum day price')}
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                { value: 300, label: '300 €' },
              ]}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Longterm Stay Price Range</DialogContentText>
            <div className="text-xs font-darkGray mb-5">
              Set a price for a longterm stay (&gt; 5 hours){' '}
            </div>
            <Slider
              onChange={handleFilterChange}
              name="longTermStayPrice"
              value={filters?.longTermStayPrice || [0, 500]}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              getAriaLabel={(index) =>
                index === 0 ? 'Minimum longterm stay price' : 'Maximum longterm stay price'
              }
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                { value: 500, label: '500 €' },
              ]}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Garage Type</DialogContentText>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAll}>Clear all</Button>
          <Button variant="contained" onClick={searchWithEnhancedFilters}>
            Show parking places
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MoreFilters;

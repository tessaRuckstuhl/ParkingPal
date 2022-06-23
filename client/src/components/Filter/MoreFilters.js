import React, { useState, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slider,
} from '@mui/material';
import { Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FilterContext } from '../../contexts/FilterContext';
const MoreFilters = (props) => {
  const { filters, getAllParkingSpaces } = useContext(FilterContext);

  // change filter in context
  const { handleFilterChange, searchWithFilters } = props;
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div
        onClick={handleClick}
        className="ml-2.5 text-xs font-bold whitespace-nowrap text-[#949494] cursor-pointer"
      >
        Add more filters
      </div>
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
              // color: (theme) => theme.palette.grey[500],
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
              defaultValue={ [5, 15]}
              value={filters?.basePrice}
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
              defaultValue={filters?.dayPrice || [30, 60]}
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
            <DialogContentText>Garage Type</DialogContentText>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {/* <Button>Clear all</Button> */}
          <Button variant="contained" onClick={searchWithEnhancedFilters}>
            Show parking places
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MoreFilters;

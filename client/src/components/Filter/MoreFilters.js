import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Badge,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FilterContext } from '../../contexts/FilterContext';
import _ from 'lodash';
import PSService from '../../services/parkingSpace.service';
const MoreFilters = (props) => {
  const { filters, setFilters, getAllParkingSpaces } = useContext(FilterContext);

  // change filter in context
  const { handleFilterChange } = props;
  const [open, setOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [priceConstraints, setPriceConstraints] = useState({
    maxDayPrice: 200,
    maxBasePrice: 100,
    maxLongTermStayPrice: 50,
  });
  // workaround for counting active filters...
  const enhancedFilterKeys = [
    'dayPrice',
    'longTermStayPrice',
    'basePrice',
    'size',
    'properties.parking.streetside',
    'properties.parking.illuminated',
    'properties.parking.e_charging',
    'properties.parking.garage',
    'properties.cancellation_and_access.free_24h_before',
    'properties.cancellation_and_access.no_meetup',
    'properties.cancellation_and_access.pin',
    'properties.cancellation_and_access.security_gate',
  ];

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

  const handleCheckboxChange = (e) => {
    // set nested key by path string, delete if set to false for correct filter count
    if (e.target.checked) {
      setFilters({ ...filters, [e.target.name]: e.target.checked });
    } else {
      const copy = { ...filters };
      delete copy[e.target.name];
      setFilters({ ...copy });
    }
  };

  const setInitialFilterContraints = async () => {
    const res = await PSService.filterConstraints();
    const constraints = res.data;
    setPriceConstraints({ ...constraints });
  };

  useEffect(() => {
    setInitialFilterContraints();
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
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
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
        <DialogContent>
          <div className=" text-2xl font-extrabold pl-6">Price Ranges</div>
          <DialogContent>
            <div className="font-bold">Hour Stay Price Range</div>
            <div className="text-xs font-darkGray mb-5">Set a price by hour</div>
            <Slider
              onChange={handleFilterChange}
              name="basePrice"
              value={filters?.basePrice || [0, priceConstraints.maxBasePrice]}
              valueLabelDisplay="auto"
              min={0}
              max={priceConstraints.maxBasePrice}
              getAriaLabel={(index) => (index === 0 ? 'Minimum hour price' : 'Maximum hour price')}
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                {
                  value: priceConstraints.maxBasePrice,
                  label: `${priceConstraints.maxBasePrice} €`,
                },
              ]}
            />
          </DialogContent>
          <DialogContent>
            <div className="font-bold">Day Stay Price Range</div>
            <div className="text-xs font-darkGray mb-5">Set a price per day</div>
            <Slider
              onChange={handleFilterChange}
              name="dayPrice"
              value={filters?.dayPrice || [0, priceConstraints.maxDayPrice]}
              valueLabelDisplay="auto"
              min={0}
              max={priceConstraints.maxDayPrice}
              getAriaLabel={(index) => (index === 0 ? 'Minimum day price' : 'Maximum day price')}
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                { value: priceConstraints.maxDayPrice, label: `${priceConstraints.maxDayPrice} €` },
              ]}
            />
          </DialogContent>
          <DialogContent>
            <div className="font-bold">Longterm Stay Price Range</div>
            <div className="text-xs font-darkGray mb-5">
              Set a price for a longterm stay (&gt; 5 hours){' '}
            </div>
            <Slider
              onChange={handleFilterChange}
              name="longTermStayPrice"
              value={filters?.longTermStayPrice || [0, priceConstraints.maxLongTermStayPrice]}
              valueLabelDisplay="auto"
              min={0}
              max={priceConstraints.maxLongTermStayPrice}
              getAriaLabel={(index) =>
                index === 0 ? 'Minimum longterm stay price' : 'Maximum longterm stay price'
              }
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: '0 €' },
                {
                  value: priceConstraints.maxLongTermStayPrice,
                  label: `${priceConstraints.maxLongTermStayPrice} €`,
                },
              ]}
            />
          </DialogContent>
          <Divider sx={{ mb: 3 }} />
          {/* Parking Space Features */}
          <div className="text-2xl font-extrabold pl-6">Parking Space Features</div>
          <DialogContent>
            <div className="font-bold">Parking space size</div>
            <div className="text-xs font-darkGray mb-5">
              Park a smart, a family car or a truck - we offer a parking place for every car
            </div>
            <Slider
              onChange={handleFilterChange}
              name="size"
              value={filters?.size || [0, 3]}
              valueLabelDisplay="auto"
              min={0}
              max={3}
              getAriaLabel={(index) => (index === 0 ? 'Size S' : 'Size XL')}
              getAriaValueText={(value) => `${value} €`}
              marks={[
                { value: 0, label: 'S' },
                { value: 1, label: 'M' },
                { value: 2, label: 'L' },
                { value: 3, label: 'XL' },

              ]}
            />
          </DialogContent>
          {/* CHECKBOXES */}
          <DialogContent>
            <div className="font-bold">Parking space Features</div>
            <div className="text-xs font-darkGray mb-5">
              This info was provided by the parking space owner and reviewed by ParkingPal.
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.parking.streetside'] || false}
                    name="properties.parking.streetside"
                  />
                }
                label="Streetside parking"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.parking.illuminated'] || false}
                    name="properties.parking.illuminated"
                  />
                }
                label="Illuminated parking place"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.parking.e_charging'] || false}
                    name="properties.parking.e_charging"
                  />
                }
                label="E-Charging possible"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.parking.garage'] || false}
                    name="properties.parking.garage"
                  />
                }
                label="E-Charging possible"
                onChange={handleCheckboxChange}
              />
            </FormGroup>
          </DialogContent>
          <DialogContent>
            <div className="font-bold">Cancellation &amp; Access</div>
            <div className="text-xs font-darkGray mb-5">
              This info was provided by the parking space owner and reviewed by ParkingPal.
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      filters?.['properties.cancellation_and_access.free_24h_before'] || false
                    }
                    name="properties.cancellation_and_access.free_24h_before"
                  />
                }
                label="Free 24 hours before"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.cancellation_and_access.no_meetup'] || false}
                    name="properties.cancellation_and_access.no_meetup"
                  />
                }
                label="No meetup required"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.cancellation_and_access.pin'] || false}
                    name="properties.cancellation_and_access.pin"
                    onChange={handleCheckboxChange}
                  />
                }
                label="Access via Pin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters?.['properties.cancellation_and_access.security_gate'] || false}
                    name="properties.cancellation_and_access.security_gate"
                    onChange={handleCheckboxChange}
                  />
                }
                label="Security Gate"
              />
            </FormGroup>
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

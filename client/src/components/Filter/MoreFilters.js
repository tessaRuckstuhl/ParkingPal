import React, { useState } from 'react';
import {
  Popover,
} from '@mui/material';
import { Divider } from '@mui/material';
const MoreFilters = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div
        aria-describedby={id}
        onClick={handleClick}
        className="ml-2.5 text-xs font-bold whitespace-nowrap text-[#949494]  "
      >
        Add more filters
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        This is a popover for more filters...
      </Popover>
    </>
  );
};
export default MoreFilters;

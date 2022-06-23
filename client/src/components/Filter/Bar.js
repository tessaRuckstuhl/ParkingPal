import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  Popover,
  useFormControl,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Divider } from '@mui/material';
import moment from 'moment';
const Bar = () => {
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
    <div className="ml-5 px-4 py-[0.1rem]  shadow-bar rounded-3xl flex items-center border border-lighterGray w-[650px] ">
      {/* Search Location */}
      <FormControl className="w-[60%]">
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
        />
        <MyFormHelperText text="Where?" />
      </FormControl>

      {/* Input Radius */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl className="w-[60%]">
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
      {/* Submit Filter/Search */}
      <IconButton type="submit">
        <Search color="primary" />
      </IconButton>
    </div>
  );
};
export default Bar;

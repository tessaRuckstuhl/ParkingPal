import React from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  useFormControl,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Divider } from '@mui/material';

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
  return (
    <div className="ml-5 px-4 py-[0.1rem]  shadow-bar rounded-3xl flex items-center w-[500px] border border-lighterGray ">
      {/* Search Location */}
      <FormControl>
        <InputBase
          sx={{
            ml: '10px',
            flex: 1,
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
      <FormControl>
        <InputBase
          sx={{
            ml: '10px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Radius"
          inputProps={{ 'aria-label': 'search parking places' }}
        />
        <MyFormHelperText text="Flexible?" />
      </FormControl>
      {/* Input Dates */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl>
        <InputBase
          sx={{
            ml: '10px',
            flex: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            input: { padding: 0 },
          }}
          placeholder="Check in/out"
          inputProps={{ 'aria-label': 'Check in/out' }}
        />
        <MyFormHelperText text="When?" />
      </FormControl>
      {/* Submit Filter/Search */}
      <IconButton type="submit">
        <Search color="primary" />
      </IconButton>
    </div>
  );
};
export default Bar;

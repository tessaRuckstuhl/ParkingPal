import { Divider } from '@mui/material';
import React from 'react';
import Listing from './Listing';
const ResultsList = (props) => {
  const { results } = props;
  console.log(results);
  return (
    <div className="">
      {results.map((result, idx) => (
        <div key={idx}>
          <Listing listing={result} />
          <Divider variant="middle" />
        </div>
      ))}
    </div>
  );
};

export default ResultsList;

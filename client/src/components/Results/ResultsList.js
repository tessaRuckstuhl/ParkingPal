import { Divider } from '@mui/material';
import React from 'react';
import Listing from './Listing';
const ResultsList = (props) => {
  const { results, setCenter } = props;
  return (
    <>
      {results.map((result, idx) => (
        <div key={idx}>
          <Divider variant="middle" />
          <Listing  listing={result} setCenter={setCenter} />
        </div>
      ))}
    </>
  );
};

export default ResultsList;

import React from 'react';
import Listing from './Listing';
const ResultsList = (props) => {
  const { results } = props;
  console.log(results);
  return (
    <div className="">
      {results.map((result) => (
        <Listing listing={result} />
      ))}
    </div>
  );
};

export default ResultsList;

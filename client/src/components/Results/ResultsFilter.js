import React from 'react';
const ResultsFilter = (props) => {
  const { results } = props;
  console.log(results);
  return <div className="text-lightGray p-5">{results.length} Parking places</div>;
};

export default ResultsFilter;

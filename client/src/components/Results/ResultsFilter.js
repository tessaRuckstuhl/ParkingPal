import React from 'react';
const ResultsFilter = (props) => {
  const { results } = props;
  return <div className="text-lightGray p-5">{results.length} Parking places</div>;
};

export default ResultsFilter;

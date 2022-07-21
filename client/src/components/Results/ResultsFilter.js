import React from 'react';
const ResultsFilter = (props) => {
  const { results } = props;
  return <div className="text-lightGray lg:p-5 md:p-2 md:text-[9px] lg:text-base">{results.length} Parking places</div>;
};

export default ResultsFilter;

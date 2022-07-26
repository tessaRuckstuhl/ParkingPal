import React from 'react';
const NoResults = () => {
  return (
    <div className="h-full text-center flex flex-col items-center self-center place-content-center">
      <div className="text-3xl font-bold mb-2">Hmmmmm....</div>
      Sorry, that filter combination has no results.
      <br />
      Please try different criteria.
      <div className='p-10'>
        <img src="/img/search.png" alt="no results" width="150" />
      </div>
    </div>
  );
};

export default NoResults;

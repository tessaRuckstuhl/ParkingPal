import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Default = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='p-5'>
      {children}
      </div>
      <Footer />
    </>
  );
};

export default Default;

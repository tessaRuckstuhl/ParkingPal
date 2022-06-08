import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Default = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Default;

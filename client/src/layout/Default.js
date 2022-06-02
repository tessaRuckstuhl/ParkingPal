import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Default = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="px-20 py-3">{children}</div>
      <Footer />
    </div>
  );
};

export default Default;

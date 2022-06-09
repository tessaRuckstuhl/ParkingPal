import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Default = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* making sure the page stretches between navbar and footer */}
      <div className='p-5 h-[calc(100%_-_270px)]'>
      {children}
      </div>
      <Footer />
    </>
  );
};

export default Default;

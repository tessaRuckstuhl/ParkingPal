import React, { useState, useEffect } from 'react';

const ImageContext = React.createContext();

const ImageContextProvider = (props) => {
  const [imageIDs, setImageIDs] = useState([]);

  const addImageID = (imageID) => {
    setImageIDs(prevState => [...prevState, imageID])
  }

  return (
    <ImageContext.Provider
      value={{ imageIDs, addImageID, setImageIDs }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export { ImageContextProvider, ImageContext };

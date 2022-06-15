import React, { useState, useEffect } from 'react';
const Marker = (options) => {
  const [marker, setMarker] = useState();

  const onClick = (e) => {
    console.log('marker', marker);
    const listing = document.getElementById(marker.resultId);
    // highlight shortly...
    listing.style.background = '#f1f1f1';
    setTimeout(function () {
      listing.style.background = 'white';
    }, 2000);
    // scroll into view
    listing.scrollIntoView({ behavior: 'smooth', block:'start' });
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions({ ...options });
      marker.addListener('click', onClick);
    }
  }, [marker, options]);
  return null;
};

export default Marker;

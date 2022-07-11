import React, { useState, useEffect } from 'react';

const Marker = (options) => {
  const [marker, setMarker] = useState();
  const regIcon = {
    url: options.selected ? '/svg/custom-marker.svg' :'/svg/custom-marker.svg',
    scaledSize: new google.maps.Size(48, 48),

  };

  const largeIcon = {
    url: '/svg/custom-marker.svg',
    scaledSize: new google.maps.Size(64, 64),
  };
  
  const infowindow = new google.maps.InfoWindow({
    content: '<div id="content">' + options.name + '</div>',
  });

  const onMouseOver = () => {
    if (!options.selected){
      infowindow.open(options.map, marker);
      marker.setIcon(largeIcon);

      const listing = document.getElementById(marker.resultId);
      // highlight shortly...
      listing.style.background = '#f3f3f0';
      // scroll into view
      listing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onMouseOut = () => { 
    if (!options.selected){
    infowindow.close(options.map, marker);
    marker.setIcon(regIcon);
    const listing = document.getElementById(marker.resultId);
    // undo highlight...
    listing.style.background = 'white';
    }
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
      // svg as icon/marker
      marker.setOptions({ ...options, icon: regIcon });
      marker.addListener('mouseover', onMouseOver);
      marker.addListener('mouseout', onMouseOut);
    }
  }, [marker, options]);

  return null;
};

export default Marker;

import React, { useState, useEffect } from 'react';

const Marker = (options) => {
  const [marker, setMarker] = useState();
  const regIcon = {
    url: '/temp/custom-marker.svg',
    scaledSize: new google.maps.Size(48, 48),
  };

  const largeIcon = {
    url: '/temp/custom-marker.svg',
    scaledSize: new google.maps.Size(64, 64),
  };
  //  '<div id="content">' + options.name +'</div>'
  const infowindow = new google.maps.InfoWindow({
    content: '<div id="content">' +'Lorem ipsum, hallo wie gehts mein Name ist Tessa Ruckstuhl und das ist mein Place...' +  options.name + '</div>',
  });

  const onMouseOver = () => {
    infowindow.open(options.map, marker);
    marker.setIcon(largeIcon);

    const listing = document.getElementById(marker.resultId);
    // highlight shortly...
    listing.style.background = '#f3f3f0';
    // scroll into view
    listing.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onMouseOut = () => {
    infowindow.close(options.map, marker);
    marker.setIcon(regIcon);
    const listing = document.getElementById(marker.resultId);
    // undo highlight...
    listing.style.background = 'white';
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

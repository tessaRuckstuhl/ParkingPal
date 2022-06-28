import * as React from 'react';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const Map = ({ onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onIdle]);

  return (
    <>
      <div ref={ref} className="flex-1 h-[calc(100vh_-_250px)]" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};
export default Map;

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

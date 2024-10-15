import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 220px)',
};

// Colombo center coordinates
const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const fetchAddresses = async () => {
  return [
    { id: 1, address: "123/A Abd, Colombo", type: "Plastic" },
    { id: 2, address: "SlIIT Main Auditorium", type: "Organic" },
    { id: 3, address: "701/A Station Road, Wattala", type: "Metal" },
   
  ];
};

export const MapComponent = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY.trim();
  const [directions, setDirections] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      const addresses = await fetchAddresses();
      setLocations(addresses);
    };

    loadLocations();
  }, []);

  const onLoad = (map) => {
    setIsLoaded(true);
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location, index) => {
      geocodeAddress(location, map, bounds, index);
    });
  };

  const geocodeAddress = (location, map, bounds, index) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location.address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const position = results[0].geometry.location;
        new window.google.maps.Marker({
          map,
          position,
          label: location.type[0], // Label based on waste type (e.g., P for Plastic)
        });
        bounds.extend(position);
        map.fitBounds(bounds);

        // Set the first location as origin, last location as destination, and others as waypoints
        if (index === 0) {
          setOrigin(position);
        } else if (index === locations.length - 1) {
          setDestination(position);
        } else {
          setWaypoints((prev) => [...prev, { location: position, stopover: true }]);
        }
      } else {
        console.error(`Geocoding failed for address: ${location.address}, Status: ${status}`);
      }
    });
};

const findRoute = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Directions request failed due to ' + status);
            // You can log the result to see if there are any error messages
            console.log(result);
          }
        }
      );
    }
};

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={11}
          onLoad={onLoad}
        >
          {isLoaded && (
            <>
              {directions && <DirectionsRenderer directions={directions} />}
            </>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="flex space-x-4 mt-4">
        <div className="bg-green-100 rounded px-4 py-2 flex-1 text-center">
          <p className="text-sm text-gray-600">Distance</p>
          <p className="font-semibold">
            {directions?.routes[0]?.legs[0]?.distance?.text || "N/A"}
          </p>
        </div>
        <div className="bg-green-100 rounded px-4 py-2 flex-1 text-center">
          <p className="text-sm text-gray-600">Estimated Time</p>
          <p className="font-semibold">
            {directions?.routes[0]?.legs[0]?.duration?.text || "N/A"}
          </p>
        </div>
        <button
          className="bg-green-500 text-white rounded px-6 py-2 flex-1"
          onClick={findRoute}
        >
          Find Route
        </button>
      </div>
    </div>
  );
};

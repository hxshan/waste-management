import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '400px',
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY.trim()
const MapPicker = ({ onAddressSelect  }) => {
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

    const center = {
        lat: latitude || 34.0522, // Default latitude
        lng: longitude || -118.2437, // Default longitude
    };

    useEffect(() => {
        if (window.google) {
            const geocoder = new window.google.maps.Geocoder();
            // If marker position changes, set the map center
            if (markerPosition) {
                map.panTo(markerPosition);
            }
        }
    }, [markerPosition, map]);

    const handleAddressSubmit = async (event) => {
        if (event.key === 'Enter' && address) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    const result = results[0];
                    const location = result.geometry.location;
                    setLatitude(location.lat());
                    setLongitude(location.lng());
                    setMarkerPosition(location);
                    setAddress(result.formatted_address); // Save the formatted address
                    onAddressSelect(result.formatted_address, location.lat(), location.lng()); // Callback to pass address and coords
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    };

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <div>
                <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={handleAddressSubmit}
                    className="p-2 border border-gray-300 rounded"
                />
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={(map) => setMap(map)}
                >
                    {markerPosition && (
                        <Marker position={markerPosition} />
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};
export default MapPicker;
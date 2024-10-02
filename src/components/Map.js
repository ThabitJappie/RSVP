import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const Map = ({ lat, lng }) => {
    const [mapCenter, setMapCenter] = useState({
        lat: lat || 37.7749, // Default to San Francisco if lat is not provided
        lng: lng || -122.4194, // Default to San Francisco if lng is not provided
    });

    return (
        <LoadScript googleMapsApiKey="AIzaSyBSV-f2NIQPj9e8H1GJiKXsnEDUGxP1BXc">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
            >
                <Marker position={mapCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;

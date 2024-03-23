import React, { useState, useEffect } from "react";
import Form from "./Form";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
// import "../App.css";

function Delivery() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  // const [radius, setRadius] = useState(100); // in meters

  const mapContainerStyle = {
    width: "100%",
    height: "100%"
  };

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(`Geolocation failed with error ${error}`);
      }
    );
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setMarkerPosition(currentLocation);
      setAddress("");
    }
  }, [currentLocation]);

  useEffect(() => {
    if (markerPosition) {
      // Create a geocoder object
      const geocoder = new window.google.maps.Geocoder();

      // Use the geocoder object to reverse geocode the coordinates
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === "OK") {
          setAddress(results[0].formatted_address);
        } else {
          console.error(`Geocode failed with status ${status}`);
        }
      });
    }
  }, [markerPosition]);

  const handleMapClick = (event) => {
    setMarkerPosition(event.latLng);
    setSelectedLocation(null);
  };

  const handleMarkerClick = () => {
    setSelectedLocation(markerPosition);
  };

  const center = currentLocation;

  return (
    <div className="container">
      <div className="top">
        <div className="heading">
          <span>Your Deliver Address</span>
        </div>
        <div className="line"></div>
      </div>
      <div className="section-location">
        <div className="map">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onClick={handleMapClick}
          >
            {markerPosition && (
              <>
                <Marker position={markerPosition} onClick={handleMarkerClick}>
                  {selectedLocation && (
                    <InfoWindow
                      position={selectedLocation}
                      onCloseClick={() => setSelectedLocation(null)}
                    ></InfoWindow>
                  )}
                </Marker>
              </>
            )}
          </GoogleMap>
        </div>
        <div className="heading">
          <span>Delivery Location</span>
        </div>
        <div className="location">{address}</div>
      </div>
      <Form />
    </div>
  );
}

export default Delivery;

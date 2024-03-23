import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
const AddressMap = ({ setAddress, address }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

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
      // setAddress("");
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
    <>
      <div className="deleviryLocationDetailsdiv">
        <div className="deleviryLocationDetailsMapBox">
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

        <div className="deleviryLocationDetails">
          <div className="deleviryLocationDetailsBoxTitle">
            Delivery Address
          </div>
          <p className="deliveryAddress">{address}</p>
        </div>
      </div>
    </>
  );
};
export default AddressMap;

"use client";

import { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -33.8688,
  lng: 151.2093,
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  scaleControl: false,
  zoomControl: true,
  mapTypeId: "roadmap",
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function Map() {
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={mapOptions}
    >
      <Marker position={center} onClick={() => setSelected(center)} />

      {selected && (
        <InfoWindow position={selected} onCloseClick={() => setSelected(null)}>
          <div>
            <h3>101 Hillcrest Avenue</h3>
            <p>Some extra details here</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

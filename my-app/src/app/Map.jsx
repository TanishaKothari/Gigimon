"use client"; 

import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -33.8688, 
  lng: 151.2093,
};

export default function Map() {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
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
    </LoadScript>
  );
}

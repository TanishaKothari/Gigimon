"use client";

import { useState, useEffect } from "react";
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
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchNeedsAndGeocode() {
      const res = await fetch("http://localhost:5000/get-needs");
      const needs = await res.json();

      // Geocode all locations
      const geocoded = await Promise.all(
        needs
          .filter(need => need.location && need.location.trim() !== "")
          .map(async (need) => {
            const geoRes = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&address=${encodeURIComponent(need.location)}`
            );
            const geoData = await geoRes.json();
            if (geoData.status === "OK" && geoData.results.length > 0) {
              const { lat, lng } = geoData.results[0].geometry.location;
              return {
                ...need,
                lat,
                lng,
              };
            }
            return null;
          })
      );
      setMarkers(geocoded.filter(Boolean));
    }
    fetchNeedsAndGeocode();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={mapOptions}
    >
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => setSelected(marker)}
        />
      ))}

      {selected && (
        <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div>
            <h3>{selected.name} needs a {selected.job}</h3>
            <h3>{selected.location}</h3>
            <p>{selected.email}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

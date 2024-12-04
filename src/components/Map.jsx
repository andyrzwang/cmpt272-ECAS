import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./main.css";
import { showReports } from "./storage/storage";

const blueMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconAnchor: [12, 41],
  popupAnchor: [0, -34],
});

const redMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconAnchor: [12, 41],
  popupAnchor: [0, -34],
});

const yellowMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  iconAnchor: [12, 41],
  popupAnchor: [0, -34],
});

function Map({ setSidebar }) {
  let marker = null;
  const [updateMap, setUpdateMap] = useState(false);

  useEffect(() => {
    const removeBoxShadow = () => {
      const sidebars = document.querySelectorAll(".sidebar");
      sidebars.forEach((sidebar) => {
        sidebar.style.boxShadow = "none";
      });
    };

    var map = L.map("map").setView(
      [49.279270550904485, -122.92023314700886],
      11
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);


    // Add a marker on right click
    map.on("contextmenu", (event) => {
      const { lat, lng } = event.latlng;
      if (marker) {
        marker.setLatLng([lat, lng]); // Update the existing marker's position
      } else {
        // If no marker exists, create a new one
        marker = L.marker([lat, lng], { icon: yellowMarker }).addTo(map);
      }
      setSidebar({ type: "form", data: { lat, lng, setUpdateMap } });
      removeBoxShadow();
    });

    //localStorage.clear();
    showReports(map, blueMarker);
        

    return () => {
      map.remove();
    };
  }, [updateMap]);

  return <div id="map" className="map" style={{ height: "100vh" }}></div>;
}

export default Map;

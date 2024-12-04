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
  const [currentPopup, setCurrentPopup] = useState(null);

  const getSavedMapState = () => {
    const savedState = localStorage.getItem("mapState");
    if (savedState) {
      return JSON.parse(savedState); // Return parsed saved map state
    }
    return { center: [49.279270550904485, -122.92023314700886], zoom: 10 }; // Default position if not saved
  };

  const getReportsFromLocalStorage = () => {
    const reports = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const data = JSON.parse(value);

      // Ensure the data has the necessary fields
      if (data.lat && data.lng && data["emergency-type"] && data["location"]) {
        reports.push({
          ...data,
        });
      }
    }
    return reports;
  };

  useEffect(() => {
    const removeBoxShadow = () => {
      const sidebars = document.querySelectorAll(".sidebar");
      sidebars.forEach((sidebar) => {
        sidebar.style.boxShadow = "none";
      });
    };

    const { center, zoom } = getSavedMapState();

    // Initialize the map with saved center and zoom level
    var map = L.map("map").setView(center, zoom);

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

    // Event listener to save the map state when it is moved or zoomed
    map.on("moveend", () => {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();
      // Save the current map state to localStorage
      localStorage.setItem(
        "mapState",
        JSON.stringify({ center: currentCenter, zoom: currentZoom })
      );
    });

    const handleMarkerClick = (report) => {
      // If a popup is already open, remove it
      if (currentPopup) {
        currentPopup.remove();
      }

      // Create the content for the popup
      const popupContent = `
        <div>
          <h3>Incident Details</h3>
          <p><strong>Time:</strong> ${report.time}</p>
          <p><strong>Location:</strong> ${report.location}</p>
          <p><strong>Incident Type:</strong> ${report.type}</p>
          <p><strong>Description:</strong> ${report.description}</p>
        </div>
      `;

      // Create a new Leaflet popup
      const popup = L.popup({offset: L.point(0, -30)})
        .setLatLng([report.lat, report.lng]) // Position the popup at the marker's location
        .setContent(popupContent) // Set the content for the popup
        .openOn(map); // Open the popup on the map

      // Update the currentPopup state to keep track of the opened popup
      setCurrentPopup(popup);
    };

    // Fetch reports from localStorage and add markers
    const reports = getReportsFromLocalStorage();
    reports.forEach((report) => {
      const markerIcon = report.highlighted ? redMarker : blueMarker;

      const marker = L.marker([report.lat, report.lng], {
        icon: markerIcon,
      }).addTo(map);

      // When the marker is clicked, show the report details in a popup
      marker.on("click", () => handleMarkerClick(report));
    });

    //localStorage.clear();

    return () => {
      map.remove();
    };
  }, [updateMap]);

  return <div id="map" className="map" style={{ height: "100vh" }}></div>;
}

export default Map;

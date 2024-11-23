import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './main.css';

function Map (){
    useEffect(() => {
        var map = L.map('map').setView([49.279270550904485, -122.92023314700886], 11);
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const yellowMarker = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
          iconAnchor: [12, 41],
          popupAnchor: [0, -34],
        });
        
        // Add a marker on right click
        map.on("contextmenu", (event) => {
        const { lat, lng } = event.latlng;
        const marker = L.marker([lat, lng], {icon: yellowMarker}).addTo(map);
        // Temporary popup
        marker.bindPopup(`<b>You clicked here:</b><br>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`).openPopup();
    });

        return () => {
            map.remove();
        };

      }, []);

      return(
        <div id="map" className='map' style={{height: "75vh"}}></div>
      );
}

export default Map;
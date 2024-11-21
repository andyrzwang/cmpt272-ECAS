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

        return () => {
            map.remove();
        };

      }, []);

      return(
        <div id="map" className='map' style={{height: "75vh"}}></div>
      );
}

export default Map;
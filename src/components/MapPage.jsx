import Map from "./Map";
import Instructions from "./Instructions";
import React from "react";
import Navbar from "./Navbar";
import './main.css';

function MapPage(){
    return (
        <div>
            <Navbar />
            <div className="map-main">
                <h1 className="map-header">Map View</h1>
            </div>
            <div className="map-container">
                <Map />
                <Instructions />
            </div>
        </div>
    );
}

export default MapPage;
import Map from "./Map";
import Instructions from "./Instructions";
import Form from "./Form/Form";
import React, { useState } from "react";
import Navbar from "./Navbar";
import "./main.css";

function MapPage() {
  const [sidebar, setSidebar] = useState({type: "instructions", data: null});

  return (
    <div>
      <Navbar />
      <div className="map-main">
        <h1 className="map-header">Map View</h1>
      </div>
      <div className="map-container">
        <Map setSidebar={setSidebar}/>
        <div className="sidebar">
          {sidebar.type === 'instructions' && <Instructions />}
          {sidebar.type === "form" && <Form lat={sidebar.data.lat} lng={sidebar.data.lng}/>}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
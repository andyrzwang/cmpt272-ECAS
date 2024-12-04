import Map from "./Map";
import Instructions from "./Instructions";
import Form from "./form/Form";
import List from "./emergency-list/EmergencyList";
import React, { useState } from "react";
import Navbar from "./Navbar";
import "./main.css";

function MapPage() {
  const [sidebar, setSidebar] = useState({type: "instructions", data: null});

  return (
    <div>
      <Navbar />
      <div className="map-main">
        <h1 className="map-header">Map & Report Submission</h1>
      </div>
      <div className="map-container">
        <Map setSidebar={setSidebar}/>
        <div className="sidebar">
          {sidebar.type === 'instructions' && <Instructions />}
          {sidebar.type === "form" && <Form lat={sidebar.data.lat} lng={sidebar.data.lng} setUpdateMap={sidebar.data.setUpdateMap} setSidebar={setSidebar}/>}
          {sidebar.type === "list" && <List setSidebar={setSidebar} data={sidebar.data}/>}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
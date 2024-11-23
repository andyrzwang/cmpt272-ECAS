import React from "react";
import "./main.css";

function Instructions() {
  return (
    <p className="map-p">
      <h3>How to Use</h3>
      <ul className="map-instructions">
        <li>
          Click on a map marker to see details about the selected emergency.
          These details will appear in a pop-up.
        </li>
        <li>
          Zoom in or out on the map to view more or fewer emergency markers.
        </li>
        <li>
          Click on a list item below to view the emergency details. The
          corresponding marker on the map will also be highlighted for easy
          identification.
        </li>
        <li>
          To submit a report, right-click on the map and fill out the form
          accordingly. Once properly filled out, the report will be added to the
          map.
        </li>
      </ul>
    </p>
  );
}

export default Instructions;

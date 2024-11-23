import React from "react";
import "./emergencyList.css";

function EmergencyList({ setSidebar, data }) {
  return (
    <div className="emergency-list">
      <h2>Emergency List</h2>
        <strong>Placeholder</strong>
        <ul>
          <li>
            <strong>Reporter's Name:</strong> {data.name}
          </li>
          <li>
            <strong>Reporter's Phone Number:</strong> {data.phone}
          </li>
          <li>
            <strong>Emergency Type:</strong> {data["emergency-type"]}
          </li>
          <li>
            <strong>Location:</strong> {data.location}
          </li>
          <li>
            <strong>Image URL:</strong> {data.image}
          </li>
          <li>
            <strong>Comment: </strong> {data.comment}
          </li>
            <li>
                <strong>Latitude:</strong> {data.lat}
            </li>
            <li>
                <strong>Longitude:</strong> {data.lng}
            </li>
          <li>
            <strong>Submission Time:</strong> {data.submissionTime}
          </li>
          <li>
            <strong>Status:</strong> {data.status}
          </li>
        </ul>
    </div>
  );
}

export default EmergencyList;
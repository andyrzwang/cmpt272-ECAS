import React from "react";
import "./emergencyList.css";
import { getAllReports } from "../storage/storage";
import { useState } from "react";

function EmergencyList() {

  const reports = getAllReports();
  const reportsPerPage = 5;
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const endIndex = Math.min(currentStartIndex + reportsPerPage, reports.length);
  const currentPageReports = reports.slice(currentStartIndex, endIndex);
  
  const handleNext = () => {
    if (currentStartIndex + reportsPerPage < reports.length) {
      setCurrentStartIndex(currentStartIndex + reportsPerPage);
    }
  };
  
  const handlePrevious = () => {
    if (currentStartIndex - reportsPerPage >= 0) {
      setCurrentStartIndex(currentStartIndex - reportsPerPage);
    }
  };

  return (
    <div className="emergency-list">
      <h2 className="emergency-list-header">Emergency List</h2>
      <h4><em>Click submission for more details</em></h4>
        <ul className="list">
          
        {currentPageReports.map((report) => (
          <li key={report.id}>
            <p><strong>Type: </strong><br></br>{report["emergency-type"]}</p>
            <p><strong>Location: </strong><br></br>{report.location}</p>
            <p><strong>Submitted at: </strong><br></br>{report.submissionTime}</p>
            <p><strong>Status: </strong><br></br>{report.status}</p>
          </li>
        ))}
        </ul>

        <button onClick={handlePrevious} disabled={currentStartIndex === 0}>Previous</button>
        <button onClick={handleNext}>Next</button>

    </div>
  );
}

export default EmergencyList;
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

  const [expandedReportId, setExpandedReportId] = useState(null);

  const displayDetails = (reportId) => {
    if (expandedReportId === reportId) {
      setExpandedReportId(null);
    } else {
      setExpandedReportId(reportId);
    }
  }

  return (

    <div className="emergency-list">
      <h2 className="emergency-list-header">Emergency List</h2>
      <h4><em>Click submission for more details</em></h4>
      
        <ul className="list">
          {currentPageReports.map((report) => (
          <li key={report.id} onClick={() => displayDetails(report.id)}>
            <div className="main-details">
              <p><strong>Type: </strong><br />{report["emergency-type"]}</p>
              <p><strong>Location: </strong><br />{report.location}</p>
              <p><strong>Submitted at: </strong><br />{report.submissionTime}</p>
              <p><strong>Status: </strong><br />{report.status}</p>
            </div>
          
            {expandedReportId === report.id && (
            <div className="additional-details">
              <p><strong>Submitted By: </strong><br />{report.name}</p>
              <p><strong>Submitter's Phone: </strong><br />{report.phone}</p>
              <p><strong>Image: </strong><br />{report.image}</p>
              <p><strong>Comments: </strong><br />{report.comment}</p>
            </div>
          )}
          </li>
        ))}
        </ul>

        <button onClick={handlePrevious} disabled={currentStartIndex === 0}>Previous</button>
        <button onClick={handleNext}>Next</button>

    </div>
  );
}

export default EmergencyList;
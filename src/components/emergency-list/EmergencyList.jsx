import React from "react";
import "./emergencyList.css";
import { getAllReports } from "../storage/storage";
import { useState, useEffect } from "react";
import { getIsUserLoggedIn } from "../session";

function EmergencyList() {

  const [reports, setReports] = useState([]);
  const [isSorted, setIsSorted] = useState(false); 

  useEffect(() => {
    const storedReports = getAllReports();
    setReports(storedReports);
  }, []);

  const toggleSort = () => {
    const sortedReports = [...reports].sort((a, b) => {
      if (isSorted) {
        if (a.status === 'Closed' && b.status === 'Open') {
          return -1;
        } else if (a.status === 'Open' && b.status === 'Closed') {
          return 1;
        }
      } else {
        // Ascending order (open first)
        if (a.status === 'Open' && b.status === 'Closed') {
          return -1;
        } else if (a.status === 'Closed' && b.status === 'Open') {
          return 1;
        }
      }
      return 0;
    });

    setReports(sortedReports);
    setIsSorted(!isSorted);
  };

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

  const deleteReport = (reportId) => {
    const userStatus = getIsUserLoggedIn();
    if (!userStatus) {
      alert("You must be logged in to delete a submission");
      return;
    } else{
      const updatedReports = reports.filter((report) => report.id !== reportId);
      localStorage.removeItem(reportId);
      setReports(updatedReports);
    }
  };

  return (

    <div className="emergency-list">
      <h2 className="emergency-list-header">Emergency List <br />
        <em className="sub-heading">Click on a submission for more details</em> <br />
      </h2>

      <div className="buttons">
        <button onClick={toggleSort}>
          {isSorted ? 'Sort: Open First' : 'Sort: Closed First'}
        </button>
      </div>


      <ul className="list">
          {currentPageReports.map((report) => (  
          <li key={report.id} onClick={() => displayDetails(report.id)}>
            <div className="main-details">
              <p><strong>Type: </strong><br />{report["emergency-type"]}</p>
              <p><strong>Location: </strong><br />{report.location}</p>
              <p><strong>Submitted at: </strong><br />{report.submissionTime}</p>
              <p><strong>Status: </strong><br />{report.status}</p>
              <button onClick={() => deleteReport(report.id)} className="delete-button">Delete Submission</button>
            </div>
          
            {expandedReportId === report.id && (
            <div className="additional-details">
              <p><strong>Submitted By: </strong><br />{report.name}</p>
              <p><strong>Submitter's Phone: </strong><br />{report.phone}</p>
              <p><strong>Image: </strong><br />{report.image}</p>
              <p><strong>Comments: </strong><br />{report.comment}</p>
              <button onClick={() => deleteReport(report.id)} className="delete-button">Edit Submission</button>
            </div>
          )}
          </li>
        ))}
        </ul>

        <div className="buttons">
          <button onClick={handlePrevious} disabled={currentStartIndex === 0}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>

    </div>
  );
}

export default EmergencyList;
import React from "react";
import "./emergencyList.css";
import { getAllReports } from "../storage/storage";
import { useState, useEffect } from "react";
import { getIsUserLoggedIn } from "../session";

function EmergencyList() {

  // Initialize states for reports and IsSorted
  const [reports, setReports] = useState([]);
  const [isSorted, setIsSorted] = useState(false); 

  useEffect(() => {
    const storedReports = getAllReports();
    setReports(storedReports);
  }, []);

  const toggleSort = () => {
    const sortedReports = [...reports].sort((a, b) => {
      // If already sorted, sort by descending order (closed first)
      if (isSorted) {
        if (a.status === 'Closed' && b.status === 'Open') {
          return -1;
        } else if (a.status === 'Open' && b.status === 'Closed') {
          return 1;
        }
      } else {
        // Else, ascending order (open first)
        if (a.status === 'Open' && b.status === 'Closed') {
          return -1;
        } else if (a.status === 'Closed' && b.status === 'Open') {
          return 1;
        }
      }
      return 0;
    });

    // Update the state of reports and isSorted
    setReports(sortedReports);
    setIsSorted(!isSorted);
  };

  const reportsPerPage = 5;
  // Initialize state for currentStartIndex
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  // Calculate endIndex to mark the end of the reports to display on the current page
  const endIndex = Math.min(currentStartIndex + reportsPerPage, reports.length);
  // Slice the reports array to get the reports to display on the current page
  const currentPageReports = reports.slice(currentStartIndex, endIndex);
  
  const handleNext = () => {
    // Check if there are more reports to display on the next page
    // If there are, update the currentStartIndex forward 5 pages
    if (currentStartIndex + reportsPerPage < reports.length) {
      setCurrentStartIndex(currentStartIndex + reportsPerPage);
    }
  };
  
  const handlePrevious = () => {
    // Check if there are any reports to display on the previous page
    // If there are, update the currentStartIndex back 5 reports
    if (currentStartIndex - reportsPerPage >= 0) {
      setCurrentStartIndex(currentStartIndex - reportsPerPage);
    }
  };

  // Initialize state for expandedReportId
  const [expandedReportId, setExpandedReportId] = useState(null);

  // Display details of corresponding report (based on ID) when clicked
  const displayDetails = (reportId) => {
    // If the report is already expanded, collapse it
    if (expandedReportId === reportId) {
      setExpandedReportId(null);
    // Else, expand the report
    } else {
      setExpandedReportId(reportId);
    }
  }

  const deleteReport = (reportId) => {
    // Retrieve the user's login status
    const userStatus = getIsUserLoggedIn();
    // If the user is not logged in, prompot the user to log in and return
    if (!userStatus) {
      alert("You must be logged in to delete a submission");
      return;
    // If the user is logged in, delete the report
    } else{
      // Filter out the report to be deleted
      const updatedReports = reports.filter((report) => report.id !== reportId);
      // Remove the report from storage
      localStorage.removeItem(reportId);
      // Update the state of reports
      setReports(updatedReports);
    }
  };

  const editReport = (reportId) =>{
    //user login status
    const userStatus = getIsUserLoggedIn();

    if (!userStatus){
      alert("You must be logged in to edit a submission");
      return;
    }
    //updating reports if user is logged in
    const updatedReports = reports.map((report) => {
      if (report.id == reportId){
        return {...report, ...updatedData};
      }
      return report;
    });

  //localStorage.setItem(reportId,JSON.stringify(updatedData));
  setReports(updatedReports);
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
              <button onClick={() => editReport(report)} className="edit-button">Edit Submission</button>
            </div>
          
            {expandedReportId === report.id && (
            <div className="additional-details">
              <p><strong>Submitted By: </strong><br />{report.name}</p>
              <p><strong>Submitter's Phone: </strong><br />{report.phone}</p>
              <p><strong>Image: </strong><br />{report.image}</p>
              <p><strong>Comments: </strong><br />{report.comment}</p>
              <button onClick={() => deleteReport(report.id)} className="delete-button">Edit Submission</button>
              <button onClick={() => editReport(report.id)} className="edit-button">Edit Submission</button>

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
import React from "react";
import "./emergencyList.css";
import { getAllReports, storeReport } from "../storage/storage";
import { useState, useEffect } from "react";
import { EditForm } from "./mmspForm";
import { getIsUserLoggedIn } from "../session";

function EmergencyList({ setSidebar, setUpdateMap }) {
  // Initialize states for reports and IsSorted
  const [reports, setReports] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const [editingReportData, setEditingReportData] = useState(null); // Store the report's data
  const [openEditForm, setOpenEditForm] = useState(false); // Open or close edit form modal

  useEffect(() => {
    const storedReports = getAllReports();
    setReports(storedReports);
  }, []);

  const toggleSort = () => {
    const sortedReports = [...reports].sort((a, b) => {
      // If already sorted, sort by descending order (closed first)
      if (isSorted) {
        if (a.status === "Closed" && b.status === "Open") {
          return -1;
        } else if (a.status === "Open" && b.status === "Closed") {
          return 1;
        }
      } else {
        // Else, ascending order (open first)
        if (a.status === "Open" && b.status === "Closed") {
          return -1;
        } else if (a.status === "Closed" && b.status === "Open") {
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
  };

  useEffect(() => {
    if (expandedReportId) {
      // Find the report with the expandedReportId
      const expandedReportIndex = reports.findIndex(
        (report) => report.id === expandedReportId
      );

      if (expandedReportIndex !== -1) {
        // Create a copy of the reports array to modify it
        const updatedReports = reports.map((report, index) => {
          if (index === expandedReportIndex) {
            return { ...report, highlighted: true }; // Set the expanded report to highlighted
          }
          return { ...report, highlighted: false };
        });

        if (openEditForm) {
          return;
        }

        updatedReports.forEach((report) => onEditFormSave(report));

        // Update the reports state with the new array

        setUpdateMap((prev) => !prev);
      }
    } else {
      // If no report is expanded, reset highlight to false for all reports
      const updatedReports = reports.map((report) => ({
        ...report,
        highlighted: false, // Reset highlight to false for all reports
      }));

      if (openEditForm) {
        return;
      }

      // Update the reports state
      updatedReports.forEach((report) => onEditFormSave(report));
      setUpdateMap((prev) => !prev);
    }
  }, [expandedReportId]);

  const deleteReport = (reportId) => {
    // Retrieve the user's login status
    const userStatus = getIsUserLoggedIn();
    // If the user is not logged in, prompot the user to log in and return
    if (!userStatus) {
      alert("You must be logged in to delete a submission");
      return;
      // If the user is logged in, delete the report
    } else {
      // Filter out the report to be deleted
      const updatedReports = reports.filter((report) => report.id !== reportId);
      // Remove the report from storage
      localStorage.removeItem(reportId);
      // Update the state of reports
      setReports(updatedReports);
      refetchReports();
      setUpdateMap((prev) => !prev);
    }
  };

  const handleEditClick = (report) => {
    const userStatus = getIsUserLoggedIn();
    if (!userStatus) {
      alert("You must be logged in to edit a submission");
      return;
    } else {
      setOpenEditForm(true);
      setEditingReportData(report);
    }
  };

  const onEditFormSave = (updatedReport) => {
    const updated = reports.map((report) => {
      if (report.id === updatedReport.id) {
        return { ...updatedReport };
      }
    });

    setReports((prevReports) => {
      return prevReports.map((report) => {
        if (report.id === updatedReport.id) {
          // find in local storage, if it is there, update it as well
          localStorage.setItem(report.id, JSON.stringify(updatedReport)); // Update in localStorage
          return updated;
        } else {
          return report;
        }
      });
    });

    setOpenEditForm(false);
    setEditingReportData(null);
    refetchReports();
  };

  const refetchReports = () => {
    const allReports = getAllReports();
    setReports(allReports);
  };

  const toggleStatus = (reportId) => {
    // If the user is not logged in, prompt the user to log in and return
    if (!getIsUserLoggedIn()) {
      alert("You must be logged in to change the status of a submission");
      return;
    }

    setReports((prevReports) => {
      return prevReports.map((report) => {
        // If the report id is equal to our target report then...
        if (report.id === reportId) {
          // Update the status of the report depending on if it's open or closed
          const updatedReport = {
            ...report,
            status: report.status === "Open" ? "Closed" : "Open",
          };

          // Update the report in storage
          localStorage.setItem(report.id, JSON.stringify(updatedReport));

          return updatedReport;
        }
        return report;
      });
    });

    setUpdateMap((prev) => !prev);
  };

  return (
    <div className="emergency-list">
      <h2 className="emergency-list-header">
        Emergency List <br />
        <em className="sub-heading">
          Click on a submission for more details
        </em>{" "}
        <br />
      </h2>

      <div className="buttons">
        <button onClick={toggleSort}>
          {isSorted ? "Sort: Open First" : "Sort: Closed First"}
        </button>
      </div>

      <ul className="list">
        {currentPageReports.map((report) => (
          <li key={report.id} onClick={() => displayDetails(report.id)}>
            <div className="main-details">
              <p>
                <strong>Type: </strong>
                <br />
                {report["emergency-type"]}
              </p>
              <p>
                <strong>Location: </strong>
                <br />
                {report.location}
              </p>
              <p>
                <strong>Submitted at: </strong>
                <br />
                {report.submissionTime}
              </p>
              <p>
                <strong>Status: </strong>
                <br />
                {report.status}
              </p>
              <button
                onClick={() => deleteReport(report.id)}
                className="delete-button"
              >
                Delete Submission
              </button>
            </div>

            {expandedReportId === report.id && (
              <div className="additional-details">
                <p>
                  <strong>Submitted By: </strong>
                  <br />
                  {report.name}
                </p>
                <p>
                  <strong>Submitter's Phone: </strong>
                  <br />
                  {report.phone}
                </p>
                <p>
                  <strong>Image: </strong>
                  <br />
                  {report.image && (
                    <img src={report.image} alt="Submitted Image" width="200" />
                  )}
                </p>
                <p>
                  <strong>Comments: </strong>
                  <br />
                  {report.comment}
                </p>
                <button
                  onClick={() => handleEditClick(report)}
                  className="delete-button"
                >
                  Edit Submission
                </button>
                <button
                  onClick={() => {
                    toggleStatus(report.id);
                  }}
                  className="delete-button"
                >
                  Change Status
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Edit Form */}
      {openEditForm && (
        <EditForm
          report={editingReportData}
          onSaveChanges={onEditFormSave}
          onclickclose={setOpenEditForm}
        />
      )}

      <div className="buttons">
        <button onClick={handlePrevious} disabled={currentStartIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default EmergencyList;

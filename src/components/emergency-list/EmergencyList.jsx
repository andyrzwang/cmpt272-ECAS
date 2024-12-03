import React from "react";
import "./emergencyList.css";
import { getAllReports, storeReport } from "../storage/storage";
import { useState, useEffect } from "react";
import { EditForm } from "./mmspForm";

function EmergencyList() {

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

  const handleEditClick = (report) => {
    setOpenEditForm(true)
    setEditingReportData(report)
  }

  const onEditFormSave = (updatedReport) => {
    const updated = reports.map(report => {
      if (report.id === updatedReport.id) {
        return {...updatedReport}
      }
    })

    setReports((prevReports) => {
      return prevReports.map(report => {
        if (report.id === updatedReport.id) {
          // find in local storage, if it is there, update it as well
          localStorage.setItem(report.id, JSON.stringify(updatedReport)); // Update in localStorage
          return updated
        }
        else {
          return report
        }
      })
    })

    setOpenEditForm(false)
    setEditingReportData(null)
    refetchReports()
  }

  const refetchReports = () => {
    const allReports = getAllReports()
    setReports(allReports)
  }

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
              <button onClick={() => handleEditClick(report)} className="edit-button">Edit Submission</button>
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
        {/* Edit Form */}
        {
          openEditForm && <EditForm report={editingReportData} onSaveChanges={onEditFormSave} onclickclose={setOpenEditForm}/>
        }

        <div className="buttons">
          <button onClick={handlePrevious} disabled={currentStartIndex === 0}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>

    </div>
    
  );
}

export default EmergencyList;
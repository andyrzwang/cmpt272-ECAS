import React from "react";

function DetailsPopup(report, onClose){
    return(
        <div className="details-popup">
            <h2>Details</h2>
            <p><strong>Type: </strong><br></br>{report["emergency-type"]}</p>
            <p><strong>Location: </strong><br></br>{report.location}</p>
            <p><strong>Submitted at: </strong><br></br>{report.submissionTime}</p>
            <p><strong>Status: </strong><br></br>{report.status}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default DetailsPopup;
import React from "react";
import Navbar from "./Navbar";
import "./home.css";

function HomePage(){
    return (
        <div>
            <Navbar />
            <main>
                <div className="background-container">
                    <h1 className="main-header">Metro Vancouver 9-1-1 <br/> Emergency Report System</h1>
                    <a className="custom-button" href="/">Click Here to Start</a>
                    <h2>Welcome to the Metro Vancouver Emergency Report System</h2>
                </div>
                <div className="main-information">
                    <p className="main-summary">
                        <h3>How It Works</h3>
                        This application allows users to submit emergency reports, including
                        the nature of the emergency and the location. Once a report is submitted,
                        the system automatically logs details like time and date, and sets the
                        report status to 'OPEN'. E-Comm operators then review the reports, respond
                        accordingly, and update the status to 'RESOLVED' when the emergency has
                        been addressed.
                    </p>
                    <p className="main-summary">
                        <h3>Key Features</h3>
                        The system provides an interactive map that displays all reported
                        emergencies with clickable markers. As users zoom in or out on the map,
                        the list of incidents update to show only the emergencies within the
                        specified area. Users can also view detailed information of each report,
                        including each report's status.
                    </p>
                    <p className="main-summary">
                        <h3>For Responders & The Public</h3>
                        Not only does the system allow the public to view and monitor emergencies
                        in real time, but it also allows responders to quickly identify incidents
                        and take action accordingly.
                    </p>
                </div>
            </main>
        </div>

    );
}

export default HomePage;
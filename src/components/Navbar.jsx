import React from "react";
import logo from "../assets/ecomm-logo.jpg";
import logo2 from "../assets/metro-vancouver.png";
import { Link } from 'react-router-dom';
import "./nav.css";

function Navbar(){
    return (
        <div className="nav-container">
            <nav className="navbar">
                <ul className="nav-list">
                    <li> <img className="nav-image1" src={logo} alt="Ecomm Logo"/></li>
                    <li> <img className="nav-image2" src={logo2} alt="Metro Vancouver Logo"/></li>
                    <li className="links" id="first-link"><Link to="/">Home</Link></li>
                    <li className="links"><Link to="/map">View Map & Submit Report</Link></li>
                    <li className="links"><Link to="/">About</Link></li>
                    <li className="links"><Link to="/">Contact Us</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
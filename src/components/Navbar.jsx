import React from "react";
import logo from "../assets/ecomm-logo.jpg";
import logo2 from "../assets/metro-vancouver.png";
import { Link } from 'react-router-dom';
import "./nav.css";
// import { useState } from "react";

import { checkSession , getIsUserLoggedIn} from "./session";


function Navbar(){
    const checkSessionButton = () => {
        //check if user already signed in
        if (getIsUserLoggedIn()) {
            //set isUserLoggedIn to false
            // setIsUserLoggedIn(false);
            //pop up alert to show that the user is logged out
            alert("You are logged out!");
            //change the button text to signIn
            document.getElementsByClassName("session-button")[0].innerText = "Sign In";
            return;
        }


        var username = document.getElementById("input_username").value;
        var password = document.getElementById("input_password").value;
        checkSession(username, password);
        if (getIsUserLoggedIn()) {
            //clear the input boxes
            document.getElementById("input_username").value = "";
            document.getElementById("input_password").value = "";
            //change the button text to signOut
            document.getElementsByClassName("session-button")[0].innerText = "Sign Out";
        }

    };
    return (
        <div className="nav-container">
            <nav className="navbar">
                <ul className="nav-list">
                    <li> <img className="nav-image1" src={logo} alt="Ecomm Logo"/></li>
                    <li> <img className="nav-image2" src={logo2} alt="Metro Vancouver Logo"/></li>
                    <li className="links" id="first-link"><Link to="/">Home</Link></li>
                    <li className="links"><Link to="/map">View Map & Submit Report</Link></li>
                    <li className="links"><Link to="/placeholder">About</Link></li>
                    <li className="links"><Link to="/placeholder">Contact Us</Link></li>
                </ul>
                <table className="sign-in">
                    <tr>
                        <td className="inputBox">
                        <label>
                            Username:{" "}
                            <input
                                type="text"
                                id="input_username"
                                // onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        </td>
                        <td className="inputBox">
                            <label>
                            Password:{" "}
                            <input
                                type="password"
                                id="input_password"
                            />
                            </label>
                        </td>
                        <td className="inputBox">
                            <button onClick={checkSessionButton} className="session-button">
                                {getIsUserLoggedIn() ? "Sign Out" : "Sign In"}
                            </button>
                        </td>     
                    </tr>
                </table>

            </nav>
        </div>
    );
}

export default Navbar;
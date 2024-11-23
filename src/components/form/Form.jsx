import React, {useState} from "react";
import "./form.css";

function Form({ lat, lng }) {

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        // Add submission time to data
        const submissionTime = new Date().toLocaleString('en-CA');
        data.submissionTime = submissionTime;
        // Add status to data
        const status = "Open";
        data.status = status;
        console.log(data);
    }

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h1 className="form-header">Report an Emergency</h1>
      <form className="form">
        <h2>Reporter's Information</h2>
        <div className="reporter-info">
          <label htmlFor="name">
            Name <span className="required-field">*</span>
          </label>
          <input type="text" id="name" name="name" required></input>
          <label htmlFor="phone">
            Phone Number <span className="required-field">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="^\(\d{3}\)\s\d{3}-\d{4}$"
            required
            title="Phone number must be in the format (123) 456-7890"
          ></input>
        </div>
        <h2>Emergency Information</h2>
        <div className="emergency-info">
          <label htmlFor="emergency-type">
            Emergency Type <span className="required-field">*</span>
          </label>
          <input id="emergency-type" name="emergency-type" required></input>
          <label htmlFor="location">
            Location <span className="required-field">*</span>
          </label>
          <input type="text" id="location" name="location" required></input>
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            placeholder="Image URL"
          ></input>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Comment..."
          ></textarea>
          <p>
            <em>
              Latitude and Longtitude are required to display the pin on the
              map.<br></br>
              Right-click on the map to input or change the coordinates.
            </em>
          </p>
          <label htmlFor="lat">Latitude</label>
          <input type="text" id="lat" name="lat" value={lat.toFixed(5)} readOnly></input>
          <label htmlFor="lng">Longitude</label>
          <input type="text" id="lng" name="lng" value={lng.toFixed(5)} readOnly></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;

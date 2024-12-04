import { useState } from "react";
import "./mmspForm.css";

export const EditForm = ({ report, onSaveChanges, onclickclose }) => {
  const [updatedData, setUpdatedData] = useState(report);
  const [imagePreview, setImagePreview] = useState(report.image);

  const handleSaveChangesClick = (newData) => {
    onSaveChanges(newData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
        setUpdatedData((prev) => ({
          ...prev,
          image: reader.result, // Store the base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  return (
    <div>
      <div className="edit-form-backdrop"></div>
      <form
        className="edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveChangesClick(updatedData);
        }}
      >
        <div>
          <label>Type</label>
          <input
            type="text"
            value={updatedData["emergency-type"]}
            onChange={(e) => {
              e.preventDefault();
              setUpdatedData((prev) => {
                return { ...prev, "emergency-type": e.target.value };
              });
            }}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={updatedData["location"]}
            onChange={(e) => {
              e.preventDefault();
              setUpdatedData((prev) => {
                return { ...prev, location: e.target.value };
              });
            }}
          />
        </div>
        <div>
          <label>Submitted by</label>
          <input
            type="text"
            value={updatedData["name"]}
            onChange={(e) => {
              e.preventDefault();
              setUpdatedData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Uploaded Preview" width="200" />
            </div>
          )}
        </div>
        <div>
          <label>Comments</label>
          <input
            type="text"
            value={updatedData["comment"]}
            onChange={(e) => {
              e.preventDefault();
              setUpdatedData((prev) => {
                return { ...prev, comment: e.target.value };
              });
            }}
          />
        </div>
        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onclickclose(false);
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
};

import { useState } from "react"

export const EditForm = ({report, onSaveChanges, onclickclose}) => {
    //const [updatedData, setUpdatedData] = useState(report)
    const [updatedData, setUpdatedData] = useState({...report, status: report.status || 'Open'})

    const handleSaveChangesClick = (newData) => {
        onSaveChanges(newData)
    } 
    

    return (
        <div>
            <div className="edit-form-backdrop"></div>
            <form className="edit-form" 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveChangesClick(updatedData)
                }}
            >
                <div>
                    <label>Type</label>
                    <input type="text" value={updatedData["emergency-type"]} onChange={(e) => {
                        e.preventDefault();
                        setUpdatedData((prev) => {
                            return {...prev, "emergency-type": e.target.value}
                        })
                    }}/>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text"  value={updatedData["location"]} onChange={(e)=>{
                        e.preventDefault();
                        setUpdatedData((prev)=>{
                            return {...prev, "location":e.target.value}
                        })
                    }}
                    />
                </div>
                <div>
                    <label>Submitted by</label>
                    <input type="text"  value={updatedData["name"]} onChange={(e)=>{
                        e.preventDefault();
                        setUpdatedData((prev)=>{
                            return {...prev, "name":e.target.value}
                        })
                    }}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text"  value={updatedData["image"]} onChange={(e)=>{
                        e.preventDefault();
                        setUpdatedData((prev)=>{
                            return {...prev, "image":e.target.value}
                        })
                    }}
                    /> 
                </div>
                <div>
                    <label>Comments</label>
                    <input type="text"  value={updatedData["comment"]} onChange={(e)=>{
                        e.preventDefault();
                        setUpdatedData((prev)=>{
                            return {...prev, "comment":e.target.value}
                        })
                    }}
                    />
                </div>
                {/* Add this block just before the "Save Changes" button */}
                <div>
                <label>Status</label>
                <select value={updatedData.status} onChange={(e) => {
                    e.preventDefault();
                    const newStatus = e.target.value;
                    setUpdatedData((prev) => ({
                        ...prev, 
                        status: newStatus
                    }));
                    // Call refetchReports to reload the reports and update the UI immediately
                    refetchReports(); // This will ensure the latest data is shown
                }}
                >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>

                </div>
                <button type="submit">
                    Save Changes
                </button>
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    onclickclose(false)}
                }>
                    Close
                </button>
            </form>
        </div>
    )
}
import { useState, useCallback } from "react"
import { useCreateBidsContext } from "../../context/createBidsContext";

const Scheduling = () => {
    const {formData, setFormData, handleChange} = useCreateBidsContext();

    const changeSchedulingCheckBox = useCallback(e => {
        setFormData(prev => ({...prev, emailNotifications: e.target.checked}))
    },[])

    return (
        <>
        <div className="scheduling-inputs">
        <div className="input-container scheduling">
           <h1>
             Select Posting Time
           </h1>
            <input type="date" 
            name='date'
            value={formData.date}
            onChange={handleChange}
             />
            <input type="time" 
            name='time'
            value={formData.time}
            onChange={handleChange}
             />
        </div>
        <div className="input-container scheduling">
           <h1>
             Choose Bid Duration
           </h1>
            <input type="number" 
            name='duration'
            value={formData.duration}
            onChange={handleChange}
             />
        </div>
        </div>
        <div className="email-container">
            <div className="email-input-box">
            <input type="checkbox"
                value={formData.emailNotificaitons}
                onChange={changeSchedulingCheckBox}
                />
                Do you want email notifications about this bid? 
            </div>
        </div>
        </>
    )
}

export default Scheduling;
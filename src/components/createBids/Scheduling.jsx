import {  useCallback, useEffect } from "react"
import { useCreateBidsContext } from "../../context/createBidsContext";
import { Temporal } from '@js-temporal/polyfill';
import minTimeValue from "../../utils/minTimeValue";

const Scheduling = () => {
    const {formData, setFormData, handleChange} = useCreateBidsContext();
    const todayPlain = Temporal.Now.plainDateISO();     
    const today = todayPlain.toString(); 
    
    useEffect(() => {
        if (formData.date === today && formData.time) {
            const now = Temporal.Now.zonedDateTimeISO();
            const currentTime = `${now.hour.toString().padStart(2, '0')}:${now.minute.toString().padStart(2, '0')}`;
        if (formData.time < currentTime) {
            setFormData(prev => ({...prev, time: ''}));
            alert('Previous time cannot be accepted');
        }
    }
    },[formData])
    

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
            min={today}
            value={formData.date}
            onChange={handleChange}
             />
            <input type="time" 
            name='time'
            value={formData.time}
            onChange={handleChange}
            min={() => minTimeValue(formData,today)}
            disabled={formData.date.trim() === ''}
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
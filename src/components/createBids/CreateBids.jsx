import { useCallback, useEffect } from "react";
import "../../styles/createBids.css";
import BidDetails from "./BidDetails";
import { useCreateBidsContext } from "../../context/createBidsContext";
import { useAuth } from "../../context/authContext";
import Scheduling from "./Scheduling";
import Publish from "./Publish";
import { useNavigate } from "react-router-dom";

const steps = ['Bid Details', 'Scheduling & Settings', 'Review & Publish'];

const CreateBids = () => {
    const {user} = useAuth();
    const {activeStep, handleNext, handlePrevious, formData} = useCreateBidsContext();
    const navigate = useNavigate();

    useEffect(() => {(!user && navigate('/login'))},[])

    
    const handleComponent = () => {
        if (activeStep === 1) {
            return <Scheduling />
        } else if (activeStep === 2) {
            return <Publish />
        } else {
            return <BidDetails/>
        }
    }

    const isFormComplete = useCallback(
        () =>
          Object.values(formData).every(
            (value) => value !== '' && value != null
          ),
        [formData]
      );
      
    const handleNextClick = useCallback(() => {
        console.log(formData);
        if (activeStep === steps.length - 2 && !isFormComplete()) {
          alert('Please fill out all fields before proceeding.');
          return;
        }
        handleNext();
      }, [activeStep, isFormComplete, handleNext]);

    return (
        <div className="create-bids-container">
            <div className="stepper-container">
                {steps.map((label, index) => (
                    <div key={index} className="stepper-wrapper">
                        <div className="stepper">
                            <div className={`step-circle ${index <= activeStep ? 'active' : ''}`}>
                                {index + 1}
                            </div>
                            <p className="step-label">{label}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`step-connector ${index < activeStep ? 'completed' : ''}`}></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="step-container">
                {handleComponent()}
            </div>
            <div className="buttons-container">
                <button 
                    className="btn btn-secondary" 
                    disabled={activeStep === 0}
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button 
                className="btn btn-primary" 
                onClick={handleNextClick}
                disabled={activeStep === steps.length - 1}
               >
                Next
                </button>
            </div>
        </div>
    )
}

export default CreateBids;
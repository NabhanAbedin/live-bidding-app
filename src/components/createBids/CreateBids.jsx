import { useState } from "react";
import "../../styles/createBids.css";
import BidDetails from "./BidDetails";
import { useCreateBidsContext } from "../../context/createBidsContext";
import Scheduling from "./Scheduling";

const steps = ['Bid Details', 'Scheduling & Settings', 'Review & Publish'];

const CreateBids = () => {
    const {activeStep, handleNext, handlePrevious} = useCreateBidsContext();
    
    const handleComponent = () => {
        if (activeStep === 1) {
            return <Scheduling />
        } else if (activeStep === 2) {
            return;
        } else {
            return <BidDetails/>
        }

    }

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
                {activeStep !== steps.length - 1 ? (
                    <button 
                        className="btn btn-primary" 
                        onClick={handleNext}
                    >
                        Next
                    </button>
                ) : (
                    <button className="btn btn-primary">
                        Post
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreateBids;
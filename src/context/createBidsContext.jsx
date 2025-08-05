import {useContext, useState, useCallback, createContext} from 'react';

const CreateBidsContext = createContext();

export const CreateBidsProvider = ({children}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        bidItem: '',
        startingBid: '',
        category: 'ELECTRONICS',
        date: '',
        time: '',
        duration: '',
        emailNotifications: false,
      });

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev,
            [name]: value
        }))
    },[])

    const handleNext = useCallback(() => {
        setActiveStep(prev => prev + 1);
    },[])

    const handlePrevious = useCallback(() => {
        setActiveStep(prev => prev - 1);
    },[])

    return (
        <CreateBidsContext.Provider
        value={{
            activeStep,
            formData,
            handleChange,
            setFormData,
            handleNext,
            handlePrevious
        }}>
            {children}
        </CreateBidsContext.Provider>
    )
}

export const useCreateBidsContext = () => useContext(CreateBidsContext);

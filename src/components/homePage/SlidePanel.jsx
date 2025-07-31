import { useState, useEffect } from "react";
import BidCard from "../bidCards/BidCard";


const SlidePanel = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % data.length)
        }, 5000)

        return () => clearInterval(interval);
    },[data.length]);
    
    const currentData = data[currentIndex];
    return (
        <>  
        <BidCard key={currentData.id} {...currentData} />
        </>
    )
}

export default SlidePanel;
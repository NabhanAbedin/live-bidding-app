import { useMemo } from "react";
import bidDateValidation from "../../utils/bidDateValidation.js";

const BidPageJoin = ({bid}) => {
    const validToJoin = useMemo(() => {
        if (!bid) return false;
        return bidDateValidation(bid.startTime, Number(bid.bid_duration));
    },[bid]);

    const handleClick = () => {
        if (validToJoin) {
            //navigate to livebids with bid id
            //it will connect to the socket with the room of the id using params
            return;
        } 
        alert('bid hasnt started yet');
    }

    return (
        <button className={`bid-button ${!validToJoin ? 'disabled' : ''}`} onClick={handleClick}>
        Join
      </button>
    )
}

export default BidPageJoin;
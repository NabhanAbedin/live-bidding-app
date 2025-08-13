import { useMemo } from "react";
import bidDateValidation from "../../utils/bidDateValidation.js";
import { useNavigate } from "react-router-dom";

const BidPageJoin = ({bid, bidId}) => {
    const navigate = useNavigate();

    const validToJoin = useMemo(() => {
        if (!bid) return false;
        return bidDateValidation(bid.startTime, Number(bid.bid_duration));
    },[bid]);

    const handleClick = () => {
        if (validToJoin) {
            //navigate to livebids with bid id
            //it will connect to the socket with the room of the id using params
            navigate(`/liveBid/${bidId}`)
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
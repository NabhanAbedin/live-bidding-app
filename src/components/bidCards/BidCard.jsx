import { useNavigate} from "react-router-dom";
import placeholder from '../../assets/placeholder.png';
import '../../styles/bidcard.css';
import formatDate from '../../utils/formatDate.js';
import formatDuration from "../../utils/formatDuration.js";

const BidCard = ({id, bidItem, startingBid, startTime, category, posted, bid_duration}) => {
    const navigate = useNavigate();

    const handleBidClick = () => {
        navigate(`/bids/${id}`);
    }

    return (
            <div className="bidcard-container" onClick={handleBidClick}>
            <div className="image-container">
                <img src={placeholder} alt="" />
            </div>
            <div className="text-container">
                <h3>{bidItem}</h3>
                <h4>starting at {startingBid}</h4>
                <p>{formatDate(startTime)}</p>
                <p>{formatDuration(bid_duration)}</p>
                <p className="category">{category}</p>
            </div>  
        </div>
        
    )
}

export default BidCard;
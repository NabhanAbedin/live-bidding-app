import formatDate from "../../utils/formatDate";
import placeholder from '../../assets/placeHolder.png';
import '../../styles/bidcard.css';


const CollectionBidCard = ({bidId, bidItem, bidSold, startTime, category}) => {
    return (
        <>
        <div className="bidcard-container collections-card" key={bidId}>
            <div className="image-container">
                <img src={placeholder} alt="" />
            </div>
            <div className="text-container">
                <h3>{bidItem}</h3>
                <h4>starting at {bidSold}</h4>
                <p>{formatDate(startTime)}</p>
                <p className="category">{category}</p>
            </div>  
        </div>
        </>
        
    )
}

export default CollectionBidCard;
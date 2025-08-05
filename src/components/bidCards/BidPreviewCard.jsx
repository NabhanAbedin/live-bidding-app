import '../../styles/bidcard.css';
import placeholder from '../../assets/placeHolder.png';
import formatDuration from '../../utils/formatDuration';
import formatDate from '../../utils/formatDate';


const BidPreviewCard = ({bidItem, startingBid, date, category, duration}) => {
    return (
        <>
        <h1>Preview of your bid</h1>
        <div className="bidcard-container">
            <div className="image-container">
                <img src={placeholder} alt="" />
            </div>
            <div className="text-container">
                <h3>{bidItem}</h3>
                <h4>starting at {startingBid}</h4>
                <p>{formatDate(date)}</p>
                <p>{formatDuration(duration)}</p>
                <p className="category">{category}</p>
            </div>  
        </div>
        </>
        
    )
}

export default BidPreviewCard;
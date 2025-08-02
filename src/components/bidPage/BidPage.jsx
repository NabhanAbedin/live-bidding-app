import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import placeholder from '../../assets/placeholder.png';
import formatDate from '../../utils/formatDate.js';
import formatDuration from "../../utils/formatDuration.js";
import { fetchBidById } from "../../api/bidsApi.js";


const BidPage = () => {
    const {bidId} = useParams();
    const {data: bid, isFetching, error} = useQuery({
        queryKey: ['bids', bidId],
        queryFn: () => fetchBidById(bidId)
    })


    return (
        <>
        {bid  && (
            <div className="bid-container">
            <div className="bid-image-container">
                <img src={placeholder} alt="" />
            </div>
            <div className="bid-text">
                <h1>{bid.bidItem}</h1>
                <h2>starting at {bid.startingBid}</h2>
                <p>{formatDate(bid.posted)}</p>
                <p>{formatDuration(bid.bid_duration)}</p>
                <p className="category">{bid.category}</p>
            </div>
        </div>
        )}
        </>
    )
}

export default BidPage;
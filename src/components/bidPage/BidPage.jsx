import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import placeholder from '../../assets/placeholder.png';
import formatDate from '../../utils/formatDate.js';
import formatDuration from "../../utils/formatDuration.js";
import { fetchBidById } from "../../api/bidsApi.js";
import formatTime from "../../utils/formatTime.js";
import { useMemo } from "react";
import BidPageJoin from "./BidPageJoin.jsx";
import BidPageFavorites from "./BidPageFavorites.jsx";
import '../../styles/bidPage.css';

const BidPage = () => {
    const {bidId} = useParams();
    const {data: bid, isFetching, error} = useQuery({
        queryKey: ['bids', bidId],
        queryFn: () => fetchBidById(bidId)
    })
    
    const formattedTime = useMemo(() => { 
       if (!bid) return { date: '', time: '' };
       return formatTime(bid.startTime);
    },[bid]);


    return (
        <>
        {bid  && (
            <div className="bidpage-container">
                <div className="bid-container">
                    <div className="bid-image-container">
                        <img src={placeholder} alt="" />
                    </div>
                    <div className="bid-text">
                        <h1>{bid.bidItem}</h1>
                        <h2>Posted by {bid.bid_host.username}</h2>
                        <h2>starting at {bid.startingBid}</h2>
                        <p>Day bid will start: {formatDate(formattedTime.date)}</p>
                        <p>time: {formattedTime.time}</p>
                        <p>{formatDuration(bid.bid_duration)}</p>
                        <p className="category">{bid.category}</p>
                    </div>
                </div>
                <div className="bid-buttons">
                    <BidPageFavorites bid={bid} bidId={bidId} />
                    <BidPageJoin bid={bid}/>
                </div>
            </div>
        
        )}
        </>
    )
}

export default BidPage;
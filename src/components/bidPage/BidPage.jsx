import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import placeholder from '../../assets/placeholder.png';
import formatDate from '../../utils/formatDate.js';
import formatDuration from "../../utils/formatDuration.js";
import { fetchBidById } from "../../api/bidsApi.js";
import formatTime from "../../utils/formatTime.js";
import { useMemo } from "react";
import { useAuth } from "../../context/authContext.jsx";
import BidPageJoin from "./BidPageJoin.jsx";
import BidPageFavorites from "./BidPageFavorites.jsx";
import DeleteBid from "./DeleteBid.jsx";
import DeleteFavorites from "./DeleteFavorites.jsx";
import '../../styles/bidPage.css';

const BidPage = () => {
    const {bidId} = useParams();
    const {user} = useAuth();
    const {data: bid, isFetching, error} = useQuery({
        queryKey: ['bids', bidId],
        queryFn: () => fetchBidById(bidId)
    })

    const formattedTime = useMemo(() => { 
       if (!bid) return { date: '', time: '' };
       return formatTime(bid.bid.startTime);
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
                        <h1>{bid.bid.bidItem}</h1>
                        <h2>Posted by {bid.bid.bid_host.username}</h2>
                        <h2>starting at {bid.bid.startingBid}</h2>
                        <p>Day bid will start: {formatDate(formattedTime.date)}</p>
                        <p>time: {formattedTime.time}</p>
                        <p>{formatDuration(bid.bid.bid_duration)}</p>
                        <p className="category">{bid.bid.category}</p>
                    </div>
                </div>
                <div className="bid-buttons">
                {(!user || user?.id !== bid.bid.userId) && (
                <>
                    {!bid.favorited && <BidPageFavorites bidId={bidId} />}
                    {bid.favorited && <DeleteFavorites bidId={bidId} />}
                    <BidPageJoin bid={bid.bid} />
                </>
                )}
                {user && user.id === bid.bid.userId && (
                    <>
                     <DeleteBid bidId={bidId} />
                    </>
                )}

                </div>
            </div>
        
        )}
        </>
    )
}

export default BidPage;
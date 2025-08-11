import { useQuery } from "@tanstack/react-query";
import BidCard from "../bidCards/BidCard";
import { getFavorites } from "../../api/favoritesApi";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/postedBids.css';

const Favorites = () => {
    const {user, authLoading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {     
        if (authLoading) return;
        if (!user) navigate('/login');
        
    },[user]);

    const {data: favoriteBids, isLoading, Error } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        enabled: !authLoading && Boolean(user)
    })

    return (
        <>
         <h1>Your future bids are waiting</h1>
        <div className="postedbids-grid">
        {favoriteBids && (
            <>
            {favoriteBids.map(bid => (
                <BidCard key={bid.id}  id={bid.bidId} bidItem={bid.bidItem} startingBid={bid.startingBid} startTime={bid.posted} bid_duration={bid.bid_duration}  />
           ))}
            </>
        )}
        </div>

        </>
    )
}

export default Favorites;
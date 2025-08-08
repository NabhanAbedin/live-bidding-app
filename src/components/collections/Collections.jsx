import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCollections } from "../../api/collectionsApi";
import '../../styles/collections.css';
import { useEffect } from "react";
import CollectionBidCard from "../bidCards/CollectionBidCard";
import BarChart from "./CategoryChart";

const Collections = () => {
    const {user, authLoading} = useAuth();
    const {userId: paramUserId} = useParams();
    const navigate = useNavigate();

    const userId = paramUserId ?? user?.id;

    useEffect(() => {
        if (authLoading) return;
        if (!userId) navigate('/login');
    },[user])

    const {data, isFetching, Error} = useQuery({
        queryKey: ['collections', userId],
        queryFn: () => fetchCollections(userId),
        enabled: !authLoading && Boolean(userId),
    });

    return (
        <div className="collections-container">
           {data && (
            <>
              <div className="collections-grid">
                {data.collection.map(c => (
                   <CollectionBidCard key={c.id} {...c} />
                ))}
              </div>
            <div className="stats-container">
                <div className="graph-container">
                    <BarChart categoryData={data.categorizedSpent} />
                </div>
                <div className="spent-container">
                    <h3>Total Spent on bids</h3>
                    <p>{data.totalSpent} currency</p>
                </div>
            </div>
            </>
           )}
        </div>
    )
}

export default Collections;
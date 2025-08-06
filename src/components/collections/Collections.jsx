import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCollections } from "../../api/collectionsApi";
import '../../styles/collections.css';
import { useEffect } from "react";

const Collections = () => {
    const {user, authLoading} = useAuth();
    const {userId: paramUserId} = useParams();
    const navigate = useNavigate();

    console.log(user);
    const userId = paramUserId ?? user?.id;
    
    useEffect(() => {
        if (authLoading) return;
        if (!user) navigate('/login');
    },[user])
    
    const {data, isFetching, Error} = useQuery({
        queryKey: ['collections', userId],
        queryFn: () => fetchCollections(userId),
        enabled: !authLoading && Boolean(userId),
    });

    return (
        <div className="collections-container">
           <div className="collections-grid">
                {data && data.collection.map(c => (
                    <div key={c.id}>
                        {/* Your component content here */}
                    </div>
                ))}
           </div>
        </div>
    )
}

export default Collections;
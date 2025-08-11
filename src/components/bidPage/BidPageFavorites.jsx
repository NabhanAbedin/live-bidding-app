import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "../../api/favoritesApi";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


const BidPageFavorites = ({bidId}) => {
    const qc = useQueryClient();
    const {user} = useAuth();
    const navigate = useNavigate();

    const {mutate, isLoading, error } = useMutation({
        mutationFn: () => addToFavorites(bidId),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['bids', bidId]})
            qc.invalidateQueries({queryKey: ['favorites']})
        }
    })

    const handleClick = () => {
        if (!user) {
            navigate('/login');
            return;
        } 
        mutate();
    }

    if (error) {
        alert('could not add to favorites');
    }

    return (
        <button className="bid-button" onClick={handleClick}>Add to Favorites</button>
    )
}

export default BidPageFavorites;
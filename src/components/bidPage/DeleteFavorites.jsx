import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeFavorite } from "../../api/favoritesApi"

const DeleteFavorites = ({bidId}) => {
    const qc = useQueryClient();

    const {mutate, isLoading, Error } = useMutation({
        mutationKey: ['removeFavorite'],
        mutationFn: () => removeFavorite(bidId),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['bids', bidId]})
            qc.invalidateQueries({queryKey: ['favorites']})
        }
    })

    return (
        <button className="bid-button" onClick={() => mutate()}>Remove favorites</button>
    )
}

export default DeleteFavorites;
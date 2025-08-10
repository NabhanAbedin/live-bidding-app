import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBid } from "../../api/bidsApi"
import { useNavigate } from "react-router-dom";


const DeleteBid = ({bidId}) => {
    const qc = useQueryClient();
    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn: () => deleteBid(bidId),
        onSuccess: () => {
            alert('deleted bid');
            qc.removeQueries(['bid',bidId]);
            navigate('/bids');
        }
    })

    return (
        <>
            <button className="bid-button" onClick={() => mutate()}>Delete</button>
        </>
    )

}

export default DeleteBid;
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery} from "@tanstack/react-query";
import { fetchBidById } from "../../api/bidsApi";


const BidEditor = () => {
    const {bidId} = useParams();
    const qc = useQueryClient();

    const cached = qc.getQueryData(['bid',bidId]);

    const {data: bid} = useQuery({
        queryKey: ['bids', bidId],
        queryFn: () => fetchBidById(bidId),
        initialData: cached,
        enabled: !cached
    })

    
}
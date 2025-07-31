import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBids } from "../../api/bidsApi";
import BidCard from "../bidCards/BidCard";
import '../../styles/postedBids.css';


const PostedBids = () => {
    const [searchParams] = useSearchParams();
    const searched = searchParams.get('search') || '';

    const {
      data: bids,
      error,
      isFetching,
    } = useQuery({
      queryKey: ['bids', searched],
      queryFn: () => fetchBids(searched),
      staleTime: 0,
    });

    if (isFetching) return //<BidsLoading />
    if (error) return //<BidsError />

    return (
        <div className="postedbids-grid">
          {bids.map(bid => (
        <BidCard key={bid.id} {...bid} />
        ))}
        </div>
      );
    
}

export default PostedBids;
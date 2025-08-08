import { useQuery } from "@tanstack/react-query";
import { getBidsForHomePage } from "../../api/bidsApi";
import '../../styles/slidePanel.css';
import SlidePanel from "./slidePanel";

const SlidePanelSection = () => {
    const {data: bids, error, isFetching} = useQuery({
        queryKey: ['bids','homepage'],
        queryFn: getBidsForHomePage,

    })

    if (isFetching) return <div>Loading slideshow…</div>;
    if (error)      return <div>Slideshow failed to load</div>;
    if (isFetching) return //<Loading label={'slideshow'}/>
    if (error) return //<Error label={'slideshow'} />

    return (
       <>
       {(bids && bids.length > 0) && (
        <SlidePanel data={bids} />
       )}
       <div className="panel-caption">
        <h3>Latest bids, join and compete!</h3>
       </div>
       </>
    )
}

export default SlidePanelSection;
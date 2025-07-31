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
        <div className="grid-container">
        <div className="box box1">
            <h2>Post</h2>
             <h2>Bid</h2>
             <h2>Earn.</h2>
        </div>
        <div className="box box2"></div>
        <div className="box box3"></div>
        <div className="box box4">{<SlidePanel data={bids}/>}</div>
    </div>
    )
}

export default SlidePanelSection;
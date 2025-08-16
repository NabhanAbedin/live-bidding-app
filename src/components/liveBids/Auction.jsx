import { useState, useEffect, useMemo } from 'react';
import placeholder from '../../assets/placeHolder.png';
import PlaceBid from './PlaceBid';
import formatTime from '../../utils/formatTime';


const Auction = ({socket, bidId, user, bidInfo}) => {
    const [highestBid, setHighestBid] = useState(() => {
        if (!bidInfo.bid.highestBid) return bidInfo.bid.startingBid;
        else return bidInfo.bid.highestBid;
    });
    const [active, setActive] = useState(false);

    console.log(bidInfo.bid.startTime);
    const time = useMemo(() => formatTime(bidInfo.bid.startTime));

    useEffect(() => {
        const updateBid = (updatedBid) => setHighestBid(updatedBid.highestBid);
        const onError = (error) => console.error(error.message);

        socket.on('bidUpdated', updateBid);
        socket.on('bidError', onError);

        return () => {
            socket.off('updatedBid', updateBid);
            socket.off('bidError',onError);
        };
    },[socket]);

    
    return (
        <div className="auction-container">
                <div className='bid-info'>
                    <div className='bid-info-image'>
                        <img src={placeholder} alt="" />
                    </div>
                    <div className='bid-text'>
                            <h1>{bidInfo.bid.bidItem}</h1>
                            <p>{bidInfo.bid.category}</p>       
                    </div>
                    <div className='current-bid'>
                        current bid: {highestBid}
                    </div>
                    <div className='placebid-container'>
                        <button onClick={() => setActive(!active)}>Place bid</button>
                    </div>
                    {active && (
                        <PlaceBid socket={socket} bidId={bidId}  setActive={setActive} />
                    ) }
                </div>

        </div>
    )
}

export default Auction;
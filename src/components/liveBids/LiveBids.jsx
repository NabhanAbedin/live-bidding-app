import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Chats from "./Chats";
import Auction from "./Auction";
import { useAuth } from "../../context/authContext";
import '../../styles/liveBid.css';


const LiveBids = () => {
    const {bidId} = useParams();
    const navigate = useNavigate();
    const {user, authLoading} = useAuth();
   
    useEffect(() => {     
        if (authLoading) return;
        if (!user) navigate('/login');
    },[user]);


    const socket = useMemo(() => {
        return io('http://localhost:5002', {
            transports: ['websocket'],
            withCredentials: true
        })
    },[])

    useEffect(() => {
        const onConnect = () => socket.emit('joinBidRoom', Number(bidId));
        socket.on('connect',onConnect);
        return () => {
            socket.off('connect',onConnect);
        }
    },[]);

    return (
        <div className="live-bid-container">
             {!authLoading && (
                <>
                  <Auction socket={socket} bidId={bidId} user={user} />
                  <Chats socket={socket} bidId={bidId} user={user} />
                </>
             )}
        </div>
    )
}

export default LiveBids;
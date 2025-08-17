import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Chats from "./Chats";
import Auction from "./Auction";
import { useAuth } from "../../context/authContext";
import '../../styles/liveBid.css';
import BidLoading from "./BidLoading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChats } from "../../api/chatsApi";
import { fetchBidById } from "../../api/bidsApi";
import { Temporal } from '@js-temporal/polyfill';
import { duration } from "@mui/material";


const LiveBids = () => {
    const {bidId} = useParams();
    const navigate = useNavigate();
    const {user, authLoading} = useAuth();
    const qc = useQueryClient();

    useEffect(() => {     
        if (authLoading) return;
        if (!user) navigate('/login');
    },[user]);

    const {data: previousChats, isLoading: chatsLoading, Error: chatsError} = useQuery({
        queryKey: ['previousChats', bidId],
        queryFn: () => getChats(bidId),
        staleTime: 0,
        enabled: !authLoading && Boolean(user) && Boolean(bidId)
    })

    const {data: bidInfo, isLoading: bidInfoLoading, Error: bidError} = useQuery({
        queryKey: ['liveBidInfo', bidId],
        queryFn: () => fetchBidById(bidId),
        staleTime: 0,
        enabled: !authLoading && Boolean(user) && Boolean(bidId)
    })

    const socket = useMemo(() => {
        return io('http://localhost:5002', {
            transports: ['websocket'],
            withCredentials: true
        })
    },[])

    useEffect(() => {
        const onConnect = () => socket.emit('joinBidRoom', Number(bidId));
        socket.on('connect',onConnect);
        qc.invalidateQueries({predicate: (q) => ['financialStats', 'myWallet', 'collections'].includes(q.queryKey[0])});
        return () => {
            socket.off('connect',onConnect);
        }
    },[socket, bidId]);

    useEffect(() => {
        if (!socket || !bidInfo) return;
        
        let timeoutId;

        const handleServerTime = (serverTimeString) => {
            const serverTimeMs = Temporal.Instant.from(serverTimeString).epochMilliseconds;
            const endTimeMs = Temporal.Instant.from(bidInfo.bid.endTime).epochMilliseconds;
            const durationLeftMs = endTimeMs - serverTimeMs;
            
            if (durationLeftMs <= 0) {
                navigate('/');
                return;
            }
            
            const timeoutDuration = Math.max(0, durationLeftMs - 1000);
            
            timeoutId = setTimeout(() => {
                    navigate('/');

            }, timeoutDuration);
        };
        
        socket.on('serverTime', handleServerTime);
        
        return () => {
            socket.off('serverTime', handleServerTime);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [socket, bidInfo]);


    return (
        <div className="live-bid-container">
            {(authLoading || chatsLoading || bidInfoLoading) && (
                 <BidLoading />
                )}
             {(previousChats && user && bidInfo) && (
                <>
                  <Auction socket={socket} bidId={bidId} user={user} bidInfo={bidInfo} />
                  <Chats socket={socket} bidId={bidId} user={user} previousChats={previousChats}/>
                </>
             )}
        </div>
    )
}

export default LiveBids;
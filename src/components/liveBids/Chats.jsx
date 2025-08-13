import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChats } from "../../api/chatsApi";


const Chats = ({socket,bidId,user}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const {data: previousChats, isLoading, Error} = useQuery({
        queryKey: ['previousChats', bidId],
        queryFn: () => getChats(bidId),
        staleTime: 0
    })

    useEffect(() => {
        if (previousChats && previousChats.length > 0) {
            setMessages(previousChats)
        }
    },[previousChats]);

    useEffect(() => {
        const onMsg = (msg) => setMessages(prev => [...prev, msg])
        const onError = (error) => console.error(error.message);

        socket.on('chatSent', onMsg);
        socket.on('chatError', onError);

        return () => {
            socket.off("chatSent", onMsg);
            socket.off("chatError", onError);
          };
    },[socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        socket.emit('sendChat', {bidId: bidId, chatMessage: input})

        setInput('');
    }

    return (
        <div className="chats-panel">
            <div className="messages">
                {messages && (
                    messages.map((msg, index) => (
                        <div className={`message ${msg.userId === user.id ? 'right' : 'left'}`} key={index}>
                            {msg.chatText}
                        </div>
                    ))
                )}
            </div>
            <form className="userinput" onSubmit={e => sendMessage(e)}>
                <input type="text" placeholder="send message" 
                value={input} onChange={e => setInput(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )

}

export default Chats;
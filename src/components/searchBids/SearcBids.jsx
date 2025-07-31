import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBids = () => {
    const [inputText, setInputText] = useState('');
    const navigate = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();
        if (inputText) {
            return navigate(`/bids?search=${encodeURIComponent(inputText)}`)
        }
        navigate('/bids');

        
    }

    return (
        <form className="search-container" onSubmit={handleSubmit}>
            <input type="search" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="search for bids..."/>

        </form>
    )
}

export default SearchBids;
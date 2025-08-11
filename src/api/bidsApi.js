const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchBids = async (search) => {
    console.log(search);
    if (search.trim() == '' || !search) {
    const res = await fetch(`${API_BASE}/api/bids`);
    return res.json();
    }
    const res = await fetch(`${API_BASE}/api/bids?search=${encodeURIComponent(search)}`);
    if (!res.ok) {
        throw new Error(json.message);
    }
    return res.json();
}

export const getBidsForHomePage = async () => {
    const res = await fetch(`${API_BASE}/api/bids?limit=5`);
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const fetchBidById = async (bidId) => {
    const res = await fetch(`${API_BASE}/api/bids/${bidId}`, {
        credentials: 'include'
    });
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}


export const postBid = async ({bidItem, startingBid, date, time, category, duration}) => { 
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch(`${API_BASE}/api/bids`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            bidItem,
            startingBid,
            startingDate: date,
            startingTime: time,
            category,duration,
            clientTimeZone
        })
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json.bidId;
}

export const deleteBid =  async (bidId) => {
    console.log(bidId);
    const res = await fetch(`${API_BASE}/api/bids/${bidId}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message);
    }

    return res;
}


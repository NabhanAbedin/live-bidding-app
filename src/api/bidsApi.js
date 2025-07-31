const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchBids = async (search) => {
    if (search.trim() == '' || !search) {
    const res = await fetch(`${API_BASE}/api/bids`);
    return res.json();
    }
    console.log(search);
    const res = await fetch(`${API_BASE}/api/bids?search=${encodeURIComponent(search)}`);
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

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getChats = async (bidId) => {
    const res = await fetch(`${API_BASE}/api/bids/${bidId}/chats`, {
        credentials: 'include'
    })

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}
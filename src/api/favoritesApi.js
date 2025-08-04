const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const addToFavorites = async (bidId) => {
    const res = await fetch(`${API_BASE}/api/users/favorites/${bidId}`, {
        method: 'POST',
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error(json.message);
    }

    return res;
}
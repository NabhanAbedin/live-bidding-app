const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const addToFavorites = async (bidId) => {
    const res = await fetch(`${API_BASE}/api/users/favorites/${bidId}`, {
        method: 'POST',
        credentials: "include"
    })
    const json = await res.json();
    console.log(res, json);
    if (!res.ok) {
        throw new Error(json.message);
    }

    return res;
}

export const getFavorites = async () => {
    const res = await fetch(`${API_BASE}/api/users/favorites`,{
        credentials: 'include'
    })

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const removeFavorite = async (bidId) => {

    const res = await fetch(`${API_BASE}/api/users/favorites/${bidId}`,{
        method: 'DELETE',
        credentials: 'include',
    })

    const json = await res.json();
    console.log(res, json);
    if (!res.ok) {
        throw new Error(json.message);
    }

    return res;
}

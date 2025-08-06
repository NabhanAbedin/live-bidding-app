const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchCollections = async (userId) => {
    const res = await fetch(`${API_BASE}/api/users/${userId}/collections`);
    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}


const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getUser = async () => {
    const res = await fetch(`${API_BASE}/api/auth`)
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

export const logOut = async () => {
    return fetch(`${API_BASE}/api/auth/logout`);
}
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getUser = async () => {
    const res = await fetch(`${API_BASE}/api/auth`, {
        credentials: 'include'
    });
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error);
    }

    return json;
}

export const logOut = async () => {
    return fetch(`${API_BASE}/api/auth/logout`);
}

export const userLogin = async ({username, password}) => {
    console.log('called to log in', username, password);
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
         username: username,
         password: password
        })
    })
    if (!res.ok) {
        throw new Error(json.message);
    }
    
    return res;

}
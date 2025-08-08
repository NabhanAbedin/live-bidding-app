const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const updateFinancials = async (currency) => {
    const res = await fetch(`${API_BASE}/api/users/financials`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            currency: currency
        })
    })
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}

export const getFinancials = async () => {
    const res = await fetch(`${API_BASE}/api/users/financials`, {
        credentials: 'include',
    })
    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }

    return json;
}
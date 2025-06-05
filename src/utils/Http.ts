// export const HTTP = 'http://127.0.0.1:4000/api';
// export const HTTPFILE = 'http://127.0.0.1:4000';
export const HTTPFILE = 'https://server-sh4v.onrender.com';
export const HTTP = 'https://server-sh4v.onrender.com/api';
const token = localStorage.getItem("token");
export const Http = {
    get: async (url: string, params?: Record<string, any>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        const response = await fetch(`${HTTP}${url}${queryString}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    post: async (url: string, body: any) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    postdoc: async (url: string, body: any) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            // body: JSON.stringify(body),
            body: body,
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    put: async (url: string, body?: Record<string, any>) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    patch: async (url: string, body: any) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    putdoc: async (url: string, body: any) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: body,
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },

    delete: async (url: string) => {
        const response = await fetch(`${HTTP}${url}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'An unexpected error occurred');
        if (data.error) throw new Error(data.error);
        return data;
    },
};
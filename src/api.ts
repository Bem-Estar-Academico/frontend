import axios from 'redaxios';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
})  
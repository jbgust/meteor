import Axios from "axios";

const TOKEN_STORAGE_KEY = 'token';

export function isAuthenticated() {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function saveToken(token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`
}

export function loadToken() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token).accessToken}`
    }
}

export function clearToken() {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
}

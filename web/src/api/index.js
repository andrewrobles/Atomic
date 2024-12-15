import axios from 'axios';

const PROD_HOST = 'https://habits-api.netlify.app';
const LOCAL_HOST = 'http://localhost:8888';
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST;

const api = axios.create({
    baseURL: BASE_URL,
});

const getPasswordQuery = () => {
    const password = localStorage.getItem('userPassword');
    return password ? `?password=${encodeURIComponent(password)}` : '';
};

const getHabits = () => {
    const passwordQuery = getPasswordQuery();
    return api.get(`/habits${passwordQuery}`);
};

const deleteHabit = (id) => {
    const passwordQuery = getPasswordQuery();
    return api.delete(`/habits/${id}${passwordQuery}`);
};

export default { getHabits, deleteHabit };

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
    const idToken = localStorage.getItem('idToken')
    console.log(`id token from get habits: ${idToken}`)
    return api.get(`/habits`, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
}

const deleteHabit = (id) => {
    const passwordQuery = getPasswordQuery();
    return api.delete(`/habits/${id}${passwordQuery}`);
};

const addHabit = (name) => {
    const passwordQuery = getPasswordQuery();
    return api.post(`/habits${passwordQuery}`, { name });
};

const updateHabitCompletion = (id, date, done) => {
    const passwordQuery = getPasswordQuery();
    return api.patch(`/habits/${id}/${date}${passwordQuery}`, { done });
};

export default { getHabits, deleteHabit, addHabit, updateHabitCompletion };

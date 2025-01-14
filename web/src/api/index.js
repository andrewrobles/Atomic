import axios from 'axios';

const PROD_HOST = 'https://habits-api.netlify.app';
const LOCAL_HOST = 'http://localhost:8888';
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST;

const api = axios.create({
    baseURL: BASE_URL,
});

const getHabits = () => {
    const idToken = localStorage.getItem('idToken')
    return api.get(`/habits`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
            Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    })
}

const deleteHabit = (id) => {
    console.log(`habit id: ${id}`)
    const idToken = localStorage.getItem('idToken')
    return api.delete(`/habits/${id}`, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    });
};

const addHabit = (name) => {
    const idToken = localStorage.getItem('idToken')
    return api.post(
        `/habits`,
        { name },
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }
    )
}

const updateHabitCompletion = (id, date, done) => {
    const idToken = localStorage.getItem('idToken')
    return api.patch(
        `/habits/${id}/${date}`,
        { done },
        {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }
    )
}

export default { getHabits, deleteHabit, addHabit, updateHabitCompletion };

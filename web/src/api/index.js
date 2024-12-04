import axios from 'axios'

const PROD_HOST = 'https://habits-api.netlify.app';
const LOCAL_HOST = 'http://localhost:8888';
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST;

const api = axios.create({
    baseURL: BASE_URL
})

const getHabits = () => api.get('/habits')

export default getHabits;
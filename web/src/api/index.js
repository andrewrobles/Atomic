const PROD_HOST = 'https://habits-api.netlify.app';
const LOCAL_HOST = 'http://localhost:8888';
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST;

const getHabits = async (setHabits, setError) => {
    try {
        const response = await fetch(BASE_URL + '/habits');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHabits(data); // Update the habits state
    } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Update the error state
    }
};

export default getHabits;
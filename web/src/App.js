import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const PROD_HOST = 'https://habits-api.netlify.app'
const LOCAL_HOST = 'http://localhost:8888'
const PATH = '/.netlify/functions/app'
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST

function App() {
  useEffect(() => {
    // Call to an API endpoint
    fetch(BASE_URL + PATH + '/ping')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log('API Response:', data); // Log the response data
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost' : 'http://147.182.195.20'
const URL = 'https://habits-api.netlify.app/.netlify/functions/app/ping'
function App() {
  useEffect(() => {
    // Call to an API endpoint
    fetch(URL)
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

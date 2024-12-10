// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Auth from './pages/Auth';

const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

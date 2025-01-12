import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Auth from './components/Auth';

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
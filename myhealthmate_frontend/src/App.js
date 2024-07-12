// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'
import Home from './components/Home';
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage/>} />
          <Route path="/Userpage" element={<UserPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

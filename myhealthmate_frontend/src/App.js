// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import UserLogin from './components/UserLogin';
import axios from 'axios';
import RegistrationForm from './components/RegistrationForm';
import UserData from './components/UserData';
import DoctorTable from './components/DoctorTable';
import Auth from './components/Auth';
import UserManagement from './components/UserManagement';
import DoctorManagement from './components/DoctorManagement';
import AddDoctor from './components/AddDoctor';

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage/>} />
          <Route path="/Userpage" element={<UserPage/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/doctorlist" element={<DoctorTable/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/userdata" element={<UserData/>} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/doctor-management" element={<DoctorManagement/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

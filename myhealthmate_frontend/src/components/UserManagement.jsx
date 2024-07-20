import React from 'react';
// import UserTable from './UserTable'; 
import Card from '../common/Card';

export default function UserManagement() {
  const logout=()=>{
    // console.log('Logout');
    localStorage.clear();
    window.location.replace('/');
  }
  return (
    <>
      <div>
        <nav className="bg-primary d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1" style={{ fontSize: '24px' }}>User Management</span>
          </div>
          <ul className="navbar-nav ms-auto">
              <li>
                <button className="btn btn-secondary nav-link active" style={{ width: "66px",height: "40px",background:'red'}} type="button" onClick={logout}>Logout</button>
              </li>
            </ul>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="Add Users"  buttons={[]} color="#0096FF" to="/add-user" />
          <Card name="Edit Users"  buttons={[]} color="#0096FF"/>
          <Card name="User List"  buttons={[]} color="#0096FF" to="/userlist"/>

        </div>
      </div>
    </>
  );
}

// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/get-user')
      .then(response => {
        if (response.data.status === 200) {
          setUsers(response.data.data);
        } else {
          console.error("Error fetching data");
        }
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User List</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-light table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

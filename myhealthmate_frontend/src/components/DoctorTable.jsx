// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/get-doctor')
      .then(response => {
        if (response.data.status === 200) {
          setDoctors(response.data.data);
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
      <h2 className="text-center mb-4">Doctor List</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-primary table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>specialty</th>
                <th>contact_info</th>
                <th>reviews</th>
                <th>location</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.first_name}</td>
                  <td>{doctor.last_name}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.contact_info}</td>
                  <td>{doctor.reviews}</td>
                  <td>{doctor.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

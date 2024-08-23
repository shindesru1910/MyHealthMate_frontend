import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import HealthForm from './HealthForm';

const HealthOverview = () => {
  const [healthData, setHealthData] = useState([]);
  const [timeframe, setTimeframe] = useState('monthly');

  // Extract the user ID from local storage
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.user_id;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const response = await axios.get(`/fetch-health-data/`, {
          params: {
            user_id: userId,
            timeframe: timeframe
          }
        });
        setHealthData(response.data);
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };
    
    fetchData();
  }, [timeframe]);

  const handleFormSubmit = () => {
    setTimeframe(timeframe); // re-fetch data after form submission
  };

  return (
    <div style={{ width: '100%', padding: 20 }}>

      <HealthForm onSubmit={handleFormSubmit} />
      <h2 style={{marginTop:"10px"}}>Health Monitoring Dashboard</h2>

      <div>
        <label style={{marginRight:"10px"}}>View Data:</label>
        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3><i class="bi bi-heart-pulse" style={{color:"red"}}></i>Heart Rate</h3>
        <ResponsiveContainer>
          <LineChart data={healthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3><i class="bi bi-droplet" style={{color:"Red"}}></i>Blood Pressure</h3>
        <ResponsiveContainer>
          <LineChart data={healthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#82ca9d" />
            <Line type="monotone" dataKey="diastolic" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3><i class="bi bi-person-walking"></i>Step Count</h3>
        <ResponsiveContainer>
          <BarChart data={healthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="step_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthOverview;

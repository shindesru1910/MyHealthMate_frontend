import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './SystemStatistics.css';

export default function SystemStatistics() {
  const [reportData, setReportData] = useState({
    users: { total: 0, active_users: 0, list: [] },
    doctors: { total: 0, active_doctors: 0, list: [] },
    appointments: { total: 0, upcoming: 0, list: [] },
    feedbacks: { total: 0, list: [] }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/generate-system-report');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePieClick = (data) => {
    switch (data.name) {
      case 'Total Users':
      case 'Active Users':
        navigate('/users');
        break;
      case 'Total Doctors':
      case 'Active Doctors':
        navigate('/doctor');
        break;
      case 'Total Appointments':
      case 'Upcoming Appointments':
        navigate('/get-appointments');
        break;
      case 'Total Feedbacks':
        navigate('/get-feedback');
        break;
      default:
        // No action
    }
  };

  if (!reportData) return <div>Loading...</div>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mt-4">
      <h2>System Statistics</h2>

      <div className="filters">
        <button onClick={() => handlePieClick({ name: 'Total Users' })}>Show Users</button>
        <button onClick={() => handlePieClick({ name: 'Total Doctors' })}>Show Doctors</button>
        <button onClick={() => handlePieClick({ name: 'Total Appointments' })}>Show Appointments</button>
        <button onClick={() => handlePieClick({ name: 'Total Feedbacks' })}>Show Feedbacks</button>
        <button onClick={() => navigate('/')}>Home</button>
      </div>

      <div className="charts mt-4">
        {/* Pie Chart with Animation */}
        <PieChart width={400} height={400} className="pie-chart">
          <Pie
            data={[
              { name: 'Total Users', value: reportData.users.total },
              { name: 'Active Users', value: reportData.users.active_users },
              { name: 'Total Doctors', value: reportData.doctors.total },
              { name: 'Active Doctors', value: reportData.doctors.active_doctors },
              { name: 'Total Feedback', value: reportData.feedbacks.total },
            ]}
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label
            onClick={handlePieClick}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-in-out"
          >
            {COLORS.map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart with Animation */}
        <BarChart width={600} height={300} className="bar-chart" data={[
          { name: 'Total Appointments', value: reportData.appointments.total },
          { name: 'Upcoming Appointments', value: reportData.appointments.upcoming },
          { name: 'Total Feedback', value: reportData.feedbacks.total },
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" animationBegin={0} animationDuration={1500} animationEasing="ease-in-out" />
        </BarChart>
      </div>
    </div>
  );
}

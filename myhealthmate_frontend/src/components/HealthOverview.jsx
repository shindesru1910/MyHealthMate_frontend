// src/components/HealthOverview.js
import React from 'react';
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

// Sample data
const heartRateData = [
  { name: 'Jan', heartRate: 65 },
  { name: 'Feb', heartRate: 70 },
  { name: 'Mar', heartRate: 68 },
  { name: 'Apr', heartRate: 72 },
  { name: 'May', heartRate: 75 },
  { name: 'Jun', heartRate: 78 },
  { name: 'Jul', heartRate: 80 },
];

const bloodPressureData = [
  { name: 'Jan', systolic: 120, diastolic: 80 },
  { name: 'Feb', systolic: 122, diastolic: 82 },
  { name: 'Mar', systolic: 118, diastolic: 78 },
  { name: 'Apr', systolic: 125, diastolic: 85 },
  { name: 'May', systolic: 130, diastolic: 88 },
  { name: 'Jun', systolic: 135, diastolic: 90 },
  { name: 'Jul', systolic: 140, diastolic: 95 },
];

const stepCountData = [
  { name: 'Jan', steps: 8000 },
  { name: 'Feb', steps: 8500 },
  { name: 'Mar', steps: 9000 },
  { name: 'Apr', steps: 9500 },
  { name: 'May', steps: 10000 },
  { name: 'Jun', steps: 11000 },
  { name: 'Jul', steps: 12000 },
];

const HealthOverview = () => {
  return (
    <div style={{ width: '100%', padding: 20 }}>
      <h2>Health Monitoring Dashboard</h2>
      
      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3>Heart Rate</h3>
        <ResponsiveContainer>
          <LineChart
            data={heartRateData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3>Blood Pressure</h3>
        <ResponsiveContainer>
          <LineChart
            data={bloodPressureData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#82ca9d" />
            <Line type="monotone" dataKey="diastolic" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
        <h3>Step Count</h3>
        <ResponsiveContainer>
          <BarChart
            data={stepCountData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="steps" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthOverview;

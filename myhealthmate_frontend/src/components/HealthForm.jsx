import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HealthForm = ({ onSubmit }) => {
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [stepCount, setStepCount] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract the user ID from local storage
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.user_id;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found');
      setLoading(false);
      return;
    }

    const data = {
      user_id: userId,
      heart_rate: heartRate,
      systolic: systolic,
      diastolic: diastolic,
      step_count: stepCount,
    };

    try {
      await axios.post('/save-health-data/', data);
      Swal.fire({
        title: 'Success!',
        text: 'Health data saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Clear the form fields
        setHeartRate('');
        setSystolic('');
        setDiastolic('');
        setStepCount('');
        // Refresh the page
        window.location.reload();
      });
      onSubmit();
    } catch (error) {
      console.error('Error saving health data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue saving your health data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Health Data Form</h2>
      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Heart Rate:
        </label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Systolic Blood Pressure:
        </label>
        <input
          type="number"
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Diastolic Blood Pressure:
        </label>
        <input
          type="number"
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Step Count:
        </label>
        <input
          type="number"
          value={stepCount}
          onChange={(e) => setStepCount(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
          position: 'relative'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #3498db',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                animation: 'spin 1s linear infinite'
              }}
            ></div>
          </span>
        ) : (
          'Submit'
        )}
      </button>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </form>
  );
};

export default HealthForm;

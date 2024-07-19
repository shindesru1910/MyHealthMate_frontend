import React, { useState } from 'react';

const AppointmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData(event.target);

      // You can implement the fetch logic here 
      //api baaki
      const response = await fetch('/api/appointment-submit', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.ok) {
        const data = await response.text();
        if (data.trim() === 'OK') {
          setSuccessMessage('Appointment submitted successfully.');
          event.target.reset();
        } else {
          throw new Error(data ? data : 'Form submission failed.');
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="row gy-4">
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" className="form-control" required />
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" className="form-control" required />
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <input type="tel" name="phone" placeholder="Your Phone Number" className="form-control" />
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <input type="date" name="date" className="form-control" required />
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <select name="speciality" className="form-control" required>
              <option value="">Select Speciality</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="pediatrician">Pediatrician</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="form-group">
            <select name="doctor" className="form-control" required>
              <option value="">Select Doctor</option>
              <option value="dr-smith">Dr. Smith</option>
              <option value="dr-jones">Dr. Jones</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <textarea name="message" placeholder="Message" rows="5" className="form-control"></textarea>
          </div>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>

      {loading && <p className="text-center mt-3">Loading...</p>}
      {error && <p className="error-message text-center">{error}</p>}
      {successMessage && <p className="sent-message text-center">{successMessage}</p>}
    </form>
    </div>
  );
};

export default AppointmentForm;

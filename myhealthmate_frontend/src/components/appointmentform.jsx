// // 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AppointmentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [specialties, setSpecialties] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedspecialty, setSelectedspecialty] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const specialtiesResponse = await axios.get('http://127.0.0.1:8000/get-specialties');
//         setSpecialties(specialtiesResponse.data.specialties);

//         const doctorsResponse = await axios.get('http://127.0.0.1:8000/get-doctor');
//         setDoctors(doctorsResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data.');
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedspecialty) {
//       const filtered = doctors.filter(doc => doc.specialty === selectedspecialty);
//       setFilteredDoctors(filtered);
//       setSelectedDoctor('');
//     } else {
//       setFilteredDoctors([]);
//     }
//   }, [selectedspecialty, doctors]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setLoading(true);
//     setError('');
//     setSuccessMessage('');

//     const formData = new FormData(event.target);
//     console.log([...formData.entries()]);

//     formData.append('specialty', selectedspecialty);  
//     formData.append('doctor_id', selectedDoctor);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/submit-appointment', formData);
//       if (response.data.status === 200) {  // Corrected status check
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Appointment submitted successfully.',
//           confirmButtonText: 'OK'
//       }).then(() => {
//           event.target.reset();
//           setSelectedspecialty('');
//           setSelectedDoctor('');
//       });
//       } else {
//         throw new Error(response.data.error || 'Form submission failed.');
//       }
//     } catch (error) {
//       Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: error.message || 'An unexpected error occurred.',
//           confirmButtonText: 'OK'
//       });
//       console.error('Error submitting form:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <div className="row gy-4">
//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <input type="text" name="name" placeholder="Your Name" className="form-control" required />
//             </div>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <input type="email" name="email" placeholder="Your Email" className="form-control" required />
//             </div>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <input type="tel" name="phone" placeholder="Your Phone Number" className="form-control" required />
//             </div>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <input type="date" name="date" className="form-control" required />
//             </div>
//           </div>

//           <select name="speciality" className="form-control" required onChange={(e) => setSelectedspecialty(e.target.value)} value={selectedspecialty}>
//             <option value="">Select Speciality</option>
//             {specialties.map((specialty) => (
//               <option key={specialty} value={specialty}>{specialty}</option>
//             ))}
//           </select>

//           <select name="doctor_id" className="form-control" required value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
//             <option value="">Select Doctor</option>
//             {filteredDoctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>{`${doctor.first_name} ${doctor.last_name}`}</option>
//             ))}
//           </select>

//           <div className="col-12">
//             <div className="form-group">
//               <textarea name="message" placeholder="Message" rows="5" className="form-control"></textarea>
//             </div>
//           </div>

//           <div className="col-12 text-center">
//             <button type="submit" className="btn btn-primary">Submit</button>
//           </div>
//         </div>

//         {loading && <p className="text-center mt-3">Loading...</p>}
//       </form>
//     </div>
//   );
// };

// export default AppointmentForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppointmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedspecialty, setSelectedspecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialtiesResponse = await axios.get('http://127.0.0.1:8000/get-specialties');
        setSpecialties(specialtiesResponse.data.specialties);

        const doctorsResponse = await axios.get('http://127.0.0.1:8000/get-doctor');
        setDoctors(doctorsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedspecialty) {
      const filtered = doctors.filter(doc => doc.specialty === selectedspecialty);
      setFilteredDoctors(filtered);
      setSelectedDoctor('');
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedspecialty, doctors]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData(event.target);
    formData.append('specialty', selectedspecialty);  
    formData.append('doctor_id', selectedDoctor);

    try {
      const response = await axios.post('http://127.0.0.1:8000/submit-appointment', formData);
      console.log('Response:', response.data);  // Log response data
      if (response.data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Appointment submitted successfully.',
          confirmButtonText: 'OK'
        }).then(() => {
          event.target.reset();
          setSelectedspecialty('');
          setSelectedDoctor('');
        });
      } else {
        throw new Error(response.data.error || 'Form submission failed.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An unexpected error occurred.',
        confirmButtonText: 'OK'
      });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
              <input type="tel" name="phone" placeholder="Your Phone Number" className="form-control" required />
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input type="date" name="date" className="form-control" required />
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select name="specialty" className="form-control" required onChange={(e) => setSelectedspecialty(e.target.value)} value={selectedspecialty}>
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select name="doctor_id" className="form-control" required value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{`${doctor.first_name} ${doctor.last_name}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <textarea name="message" placeholder="Message" rows="5" className="form-control"></textarea>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>

      {error && <p className="text-center text-danger mt-3">{error}</p>}
      {successMessage && <p className="text-center text-success mt-3">{successMessage}</p>}
    </div>
  );
};

export default AppointmentForm;

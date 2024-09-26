// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AppointmentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [specialties, setSpecialties] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [availableTimeSlots, setAvailableTimeSlots] = useState({});
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch specialties
//         const specialtiesResponse = await axios.get('http://127.0.0.1:8000/get-specialties');
//         setSpecialties(specialtiesResponse.data.specialties || []);

//         // Fetch doctors
//         const doctorsResponse = await axios.get('http://127.0.0.1:8000/get-doctor');
//         setDoctors(doctorsResponse.data.data || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data.');
//         setSpecialties([]);
//         setDoctors([]);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedSpecialty) {
//       const filtered = doctors.filter(doc => doc.specialty === selectedSpecialty);
//       setFilteredDoctors(filtered);
//       setSelectedDoctor('');
//     } else {
//       setFilteredDoctors([]);
//       setSelectedDoctor('');
//     }
//   }, [selectedSpecialty, doctors]);

//   useEffect(() => {
//     if (selectedDoctor && appointmentDate) {
//       const fetchTimeSlots = async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/get-available-time-slots', {
//             params: {
//               doctor_id: selectedDoctor,
//               appointment_date: appointmentDate,
//             },
//           });
//           console.log('Available slots response:', response.data);
//           setAvailableTimeSlots(response.data.available_slots || {});
//         } catch (error) {
//           console.error('Error fetching time slots:', error);
//           setAvailableTimeSlots({});
//         }
//       };

//       fetchTimeSlots();
//     } else {
//       setAvailableTimeSlots({});
//     }
//   }, [selectedDoctor, appointmentDate]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setLoading(true);
//     setError('');
//     setSuccessMessage('');

//     try {
//       const formData = new FormData(event.target);
//       console.log('FormData:', Object.fromEntries(formData));
//       const response = await fetch('http://127.0.0.1:8000/submit-appointment', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.status === 'OK') {
//           setSuccessMessage('Appointment submitted successfully.');
//           event.target.reset();
//           setAvailableTimeSlots({});
//         } else {
//           throw new Error(data.error || 'Form submission failed.');
//         }
//       } else {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//     } catch (error) {
//       setError(`Error: ${error.message}`);
//       console.error('Fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <form className="appointment-form" onSubmit={handleSubmit}>
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
//               <input type="tel" name="phone" placeholder="Your Phone Number" className="form-control" />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <input
//                 type="date"
//                 name="date"
//                 className="form-control"
//                 required
//                 value={appointmentDate}
//                 onChange={(e) => setAppointmentDate(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <select
//                 name="speciality"
//                 className="form-control"
//                 required
//                 onChange={(e) => setSelectedSpecialty(e.target.value)}
//                 value={selectedSpecialty}
//               >
//                 <option value="">Select Speciality</option>
//                 {specialties.length > 0 && specialties.map((specialty) => (
//                   <option key={specialty} value={specialty}>{specialty}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <select
//                 name="doctor"
//                 className="form-control"
//                 required
//                 value={selectedDoctor}
//                 onChange={(e) => setSelectedDoctor(e.target.value)}
//               >
//                 <option value="">Select Doctor</option>
//                 {filteredDoctors.length > 0 && filteredDoctors.map((doctor) => (
//                   <option key={doctor.id} value={doctor.id}>{`${doctor.first_name} ${doctor.last_name}`}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="col-lg-4 col-md-6">
//             <div className="form-group">
//               <select
//                 name="time_slot"
//                 className="form-control"
//                 required
//                 value={selectedTimeSlot}
//                 onChange={(e) => setSelectedTimeSlot(e.target.value)}
//               >
//                 <option value="">Select Time Slot</option>
//                 {Object.keys(availableTimeSlots).map((time) => (
//                   <option
//                   key={time}
//                   value={time}
//                   disabled={availableTimeSlots[time] === 'Booked'}
//                   style={{
//                     color: availableTimeSlots[time] === 'Booked' ? 'gray' : 'green',
//                   }}
//                 >
//                   {time} {availableTimeSlots[time] === 'Booked' ? 'Booked' : ''}
//                 </option>
//                 ))}
//               </select>
//             </div>
//           </div>
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
//         {error && <p className="error-message text-center">{error}</p>}
//         {successMessage && <p className="sent-message text-center">{successMessage}</p>}
//       </form>
//     </div>
//   );
// };

// export default AppointmentForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

// Function to convert time in "hh:mm AM/PM" format to a Date object
const convertTimeToDate = (time) => {
  const [timeString, modifier] = time.split(' ');
  let [hours, minutes] = timeString.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) {
    hours += 12; // Convert PM hour to 24-hour format
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0; // Midnight case
  }

  const appointmentDateObj = new Date(appointmentDate);
  appointmentDateObj.setHours(hours);
  appointmentDateObj.setMinutes(minutes);
  return appointmentDateObj;
};

// Function to check if a time slot is in the past
const isPastTimeSlot = (time) => {
  const currentTime = new Date();
  const timeSlotDate = convertTimeToDate(time);

  // If the appointment is for today, check against the current time
  if (appointmentDate === currentTime.toISOString().split('T')[0]) {
    return timeSlotDate <= currentTime; // Compare time slots with current time
  }
  return false; // For future dates, all slots are available
};


  // Fetch specialties and doctors when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialtiesResponse = await axios.get('http://127.0.0.1:8000/get-specialties');
        console.log('Fetched specialties:', specialtiesResponse.data.specialties);
        setSpecialties(specialtiesResponse.data.specialties || []);

        const doctorsResponse = await axios.get('http://127.0.0.1:8000/get-doctor');
        console.log('Fetched doctors:', doctorsResponse.data.data);
        setDoctors(doctorsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  // Filter doctors based on the selected specialty
  useEffect(() => {
    const filtered = selectedSpecialty 
      ? doctors.filter(doc => doc.specialty === selectedSpecialty) 
      : [];
    console.log('Filtered doctors:', filtered);
    setFilteredDoctors(filtered);
    setSelectedDoctor(''); // Reset doctor selection
  }, [selectedSpecialty, doctors]);

  // Fetch available time slots when a doctor and date are selected
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedDoctor && appointmentDate) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/get-available-time-slots', {
            params: {
              doctor_id: selectedDoctor,
              appointment_date: appointmentDate,
            },
          });
          console.log('Available time slots:', response.data.available_slots);
          setAvailableTimeSlots(response.data.available_slots || {});
        } catch (error) {
          console.error('Error fetching time slots:', error);
          setAvailableTimeSlots({});
        }
      } else {
        setAvailableTimeSlots({}); // Reset available slots if no doctor or date is selected
      }
    };

    fetchTimeSlots();
  }, [selectedDoctor, appointmentDate]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData(event.target);
      console.log('Submitting form data:', Object.fromEntries(formData.entries()));
      const response = await fetch('http://127.0.0.1:8000/submit-appointment', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form submission response:', data);
        if (data.status === 'OK') {
          setSuccessMessage('Appointment submitted successfully.');
          event.target.reset();
          setAvailableTimeSlots({});
        } else {
          throw new Error(data.error || 'Form submission failed.');
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Fetch error:', error);
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
              <input
                type="date"
                name="date"
                className="form-control"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select
                name="speciality"
                className="form-control"
                required
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                value={selectedSpecialty}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select
                name="doctor"
                className="form-control"
                required
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {`${doctor.first_name} ${doctor.last_name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select
                name="time_slot"
                className="form-control"
                required
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="">Select Time Slot</option>
                {Object.keys(availableTimeSlots).map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={isPastTimeSlot(time) || availableTimeSlots[time] === 'Booked'}
                    style={{
                      color: isPastTimeSlot(time) ? 'red' : availableTimeSlots[time] === 'Booked' ? 'gray' : 'green',
                    }}
                  >
                    {time} {availableTimeSlots[time] === 'Booked' ? 'Booked' : ''}
                  </option>
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>

        {loading && <p className="text-center mt-3">Loading...</p>}
        {error && <p className="error-message text-center">{error}</p>}
        {successMessage && <p className="success-message text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ReminderForm = () => {
//   const [title, setTitle] = useState('');
//   const [name, setName] = useState('');
//   const [time, setTime] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://127.0.0.1:8000/set-reminder', { title, name, time });
//       alert('Reminder set successfully!');
//     } catch (error) {
//       console.error('Error setting reminder:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Reminder Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       </label>
//       <label>
//         Reminder Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//       </label>
//       <label>
//         Time:
//         <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//       </label>
//       <button type="submit">Set Reminder</button>
//     </form>
//   );
// };

// export default ReminderForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ReminderForm = () => {
//     const [title, setTitle] = useState('');
//     const [name, setName] = useState('');
//     const [time, setTime] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post('http://127.0.0.1:8000/set-reminder', {
//                 title,
//                 name,
//                 time
//             });
//             alert('Reminder set successfully!');
//             // Clear form fields after successful submission
//             setTitle('');
//             setName('');
//             setTime('');
//         } catch (error) {
//             // console.error('Error setting reminder:', error);
//             alert('Failed to set reminder. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Set Email Reminder</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="title">Title:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="time">Time:</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Set Reminder</button>
//             </form>
//         </div>
//     );
// };

// export default ReminderForm;

// src/components/ExerciseReminderForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ExerciseReminderForm = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/set-reminder/', { title, name, time }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status === 'success') {
        alert('Reminder set successfully!');
      } else {
        alert('Error setting reminder');
      }
    } catch (error) {
      console.error('Error setting reminder', error);
      alert('An error occurred while setting the reminder');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button type="submit">Set Reminder</button>
    </form>
  );
};

export default ExerciseReminderForm;


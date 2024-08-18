import React, { useState, useEffect, useRef } from 'react';
import './ChatbotComponent.css';
import sendSound from './Csend.mp3'; // sound files
import receiveSound from './Csend.mp3';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [typing, setTyping] = useState(false); // Typing indicator state
  const messagesEndRef = useRef(null); // Ref for auto-scrolling
  const sendAudioRef = useRef(null);
  const receiveAudioRef = useRef(null);

  // Introductory message with buttons
  const introMessage = `
    Hello !!<br>I'm your friendly health assistant. How can I help you today?<br>
    <button class="chatbot-button" onclick="window.open('http://localhost:3000/userlogin', '_blank')">Login</button><br>
    <button class="chatbot-button" onclick="window.open('http://localhost:3000/appointment-form', '_blank')">Book Appointment</button><br>
    <button class="chatbot-button" onclick="window.open('http://localhost:8000/get-doctor', '_blank')">Doctors</button><br>
    <button class="chatbot-button" onclick="window.open('http://localhost:3000/diet-plans', '_blank')">Diet Plans</button><br>
    <button class="chatbot-button" onclick="window.open('https://www.example.com/exercise-plans', '_blank')">Exercise Plans</button>
  `;

  // Predefined Q&A
  const predefinedQA = {
    "hello": "Hi there! How can I assist you today?",
    "how are you": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
    "what is your name": "I am MyHealthMate, your friendly chatbot assistant.",
    "what can you do": "I can help answer your questions and assist with basic tasks.",
    "diet plans": `I can help with diet plans. Please choose one of the options below:<br>
      <button class="chatbot-button" onclick="handleDietPlanChoice('weight_loss')">Weight Loss</button>
      <button class="chatbot-button" onclick="handleDietPlanChoice('muscle_gain')">Muscle Gain</button>
      <button class="chatbot-button" onclick="handleDietPlanChoice('balanced')">Balanced Diet</button>`,
    "exercise plans": `For exercise plans, you can find information and resources on Google: <button class="chatbot-button" onclick="window.open('https://www.google.com/search?q=exercise+plans', '_blank')">Exercise Plans</button> or visit our page: <button class="chatbot-button" onclick="window.open('https://www.example.com/exercise-plans', '_blank')">Exercise Plans Page</button>.`,
    "login": `You can login to your account using the button below: <br><button class="chatbot-button" onclick="window.open('http://localhost:3000/userlogin', '_blank')">Login</button>`,
    "appointment": `You can book an appointment using the button below: <br><button class="chatbot-button" onclick="window.open('http://localhost:3000/appointment', '_blank')">Book Appointment</button>`,
    "doctors": "Here is a list of available doctors:<br><div id='doctor-table'></div>"
  };

  // Fetch doctors data
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8000/get-doctor');
      const result = await response.json();
      if (result.status === 200) {
        setDoctors(result.data);
      } else {
        console.error('Failed to fetch doctors:', result.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Add introductory message and fetch doctors when component mounts
  useEffect(() => {
    setMessages([{ text: introMessage, user: 'bot' }]);
    fetchDoctors(); // Fetch doctors data
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Play send sound
  const playSendSound = () => {
    sendAudioRef.current.play();
  };

  // Play receive sound
  const playReceiveSound = () => {
    receiveAudioRef.current.play();
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim().toLowerCase();
      let botResponse = predefinedQA[userMessage] || "Sorry, I don't understand that question.";

      if (userMessage === "doctors") {
        botResponse = `<div id='doctor-table'>${generateDoctorTable()}</div>`;
      }

      setMessages([...messages, { text: input, user: 'me' }]);
      setInput('');
      playSendSound(); // Play send sound
      setTyping(true); // Show typing indicator

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: botResponse, user: 'bot' }]);
        setTyping(false); // Hide typing indicator
        playReceiveSound(); // Play receive sound after bot response
      }, 500); // Simulate typing delay
    }
  };

  // Generate doctor table HTML
  const generateDoctorTable = () => {
    if (doctors.length === 0) return 'No doctors available.';
    return `
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Specialty</th>
            <th>Contact Info</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          ${doctors.map(doctor => `
            <tr>
              <td>${doctor.first_name}</td>
              <td>${doctor.last_name}</td>
              <td>${doctor.specialty}</td>
              <td>${doctor.contact_info}</td>
              <td>${doctor.location}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  };

  // Handle diet plan choice
  const handleDietPlanChoice = (planType) => {
    const dietPlanLinks = {
      'weight_loss': 'http://localhost:3000/weight-loss',
      'muscle_gain': 'http://localhost:3000/muscle-gain',
      'balanced': 'http://localhost:3000/balanced-diet'
    };
    const link = dietPlanLinks[planType];
    setMessages([...messages, { text: `For ${planType.replace('_', ' ')} diet plans, visit: <a href="${link}" target="_blank">Diet Plan</a>`, user: 'bot' }]);
    playReceiveSound(); // Play receive sound for diet plan response
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h4>MyHealthMate</h4>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.user}`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          />
        ))}
        {typing && (
          <div className="chatbot-message bot typing-indicator">
            <span>Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Ref for auto-scrolling */}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <audio ref={sendAudioRef} src={sendSound} />
      <audio ref={receiveAudioRef} src={receiveSound} />
    </div>
  );
};

export default ChatbotComponent;

//2

// import React, { useState, useEffect, useRef } from 'react';
// import './ChatbotComponent.css';
// import sendSound from './Csend.mp3'; // sound files
// import receiveSound from './Csend.mp3';

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [typing, setTyping] = useState(false); // Typing indicator state
//   const messagesEndRef = useRef(null); // Ref for auto-scrolling
//   const sendAudioRef = useRef(null);
//   const receiveAudioRef = useRef(null);

//   // Introductory message with buttons
//   const introMessage = `
//     Hello !!<br>I'm your friendly health assistant. How can I help you today?<br>
//     <button class="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button><br>
//     <button class="chatbot-button" onClick={() => window.open('http://localhost:3000/appointment-form', '_blank')}>Book Appointment</button><br>
//     <button class="chatbot-button" onClick={() => handleShowDoctorOptions()}>Doctors</button><br>
//     <button class="chatbot-button" onClick={() => window.open('http://localhost:3000/diet-plans', '_blank')}>Diet Plans</button><br>
//     <button class="chatbot-button" onClick={() => window.open('https://www.example.com/exercise-plans', '_blank')}>Exercise Plans</button>
//   `;

//   // Predefined Q&A
//   const predefinedQA = {
//     "hello": "Hi there! How can I assist you today?",
//     "how are you": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
//     "what is your name": "I am MyHealthMate, your friendly chatbot assistant.",
//     "what can you do": "I can help answer your questions and assist with basic tasks.",
//     "diet plans": `I can help with diet plans. Please choose one of the options below:<br>
//       <button class="chatbot-button" onClick={() => handleDietPlanChoice('weight_loss')}>Weight Loss</button>
//       <button class="chatbot-button" onClick={() => handleDietPlanChoice('muscle_gain')}>Muscle Gain</button>
//       <button class="chatbot-button" onClick={() => handleDietPlanChoice('balanced')}>Balanced Diet</button>`,
//     "exercise plans": `For exercise plans, you can find information and resources on Google: <button class="chatbot-button" onClick={() => window.open('https://www.google.com/search?q=exercise+plans', '_blank')}>Exercise Plans</button> or visit our page: <button class="chatbot-button" onClick={() => window.open('https://www.example.com/exercise-plans', '_blank')}>Exercise Plans Page</button>.`,
//     "login": `You can login to your account using the button below: <br><button class="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button>`,
//     "appointment": `You can book an appointment using the button below: <br><button class="chatbot-button" onClick={() => window.open('http://localhost:3000/appointment', '_blank')}>Book Appointment</button>`,
//     "doctors": `
//       <div id='doctor-options'>
//         <select id="specialty-select">
//           <option value="">Select Specialty</option>
//           ${specialties.map(sp => `<option value="${sp}">${sp}</option>`).join('')}
//         </select><br>
//         <select id="location-select">
//           <option value="">Select Location</option>
//           ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
//         </select><br>
//         <button class="chatbot-button" onClick={handleFilterDoctors}>Filter Doctors</button>
//       </div>
//     `
//   };

//   // Fetch specialties and locations
//   const fetchSpecialtiesAndLocations = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get-specialties-and-locations');
//       const result = await response.json();
//       if (result.status === 200) {
//         setSpecialties(result.specialties);
//         setLocations(result.locations);
//       } else {
//         console.error('Failed to fetch specialties and locations:', result);
//       }
//     } catch (error) {
//       console.error('Error fetching specialties and locations:', error);
//     }
//   };

//   // Fetch doctors data based on filters
//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/get-doctors?specialty=${encodeURIComponent(selectedSpecialty)}&location=${encodeURIComponent(selectedLocation)}`);
//       const result = await response.json();
//       if (result.status === 200) {
//         setDoctors(result.data);
//       } else {
//         console.error('Failed to fetch doctors:', result);
//       }
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   // Handle showing doctor options
//   const handleShowDoctorOptions = async () => {
//     await fetchSpecialtiesAndLocations(); // Fetch specialties and locations
//     setMessages(prevMessages => [
//       ...prevMessages,
//       {
//         text: `
//           <div id='doctor-options'>
//             <select id="specialty-select">
//               <option value="">Select Specialty</option>
//               ${specialties.map(sp => `<option value="${sp}">${sp}</option>`).join('')}
//             </select><br>
//             <select id="location-select">
//               <option value="">Select Location</option>
//               ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
//             </select><br>
//             <button class="chatbot-button" onClick={handleFilterDoctors}>Filter Doctors</button>
//           </div>
//         `,
//         user: 'bot'
//       }
//     ]);
//   };

//   // Handle filtering doctors
//   const handleFilterDoctors = () => {
//     const specialtySelect = document.getElementById('specialty-select');
//     const locationSelect = document.getElementById('location-select');
//     setSelectedSpecialty(specialtySelect.value);
//     setSelectedLocation(locationSelect.value);
//     fetchDoctors(); // Fetch doctors based on selected filters
//   };

//   // Add introductory message when component mounts
//   useEffect(() => {
//     setMessages([{ text: introMessage, user: 'bot' }]);
//   }, []);

//   // Scroll to the bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Play send sound
//   const playSendSound = () => {
//     sendAudioRef.current.play();
//   };

//   // Play receive sound
//   const playReceiveSound = () => {
//     receiveAudioRef.current.play();
//   };

//   // Handle sending messages
//   const handleSendMessage = () => {
//     if (input.trim()) {
//       const userMessage = input.trim().toLowerCase();
//       let botResponse = predefinedQA[userMessage] || "Sorry, I don't understand that question.";

//       if (userMessage === "doctors") {
//         botResponse = `
//           <div id='doctor-options'>
//             <select id="specialty-select">
//               <option value="">Select Specialty</option>
//               ${specialties.map(sp => `<option value="${sp}">${sp}</option>`).join('')}
//             </select><br>
//             <select id="location-select">
//               <option value="">Select Location</option>
//               ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
//             </select><br>
//             <button class="chatbot-button" onClick={handleFilterDoctors}>Filter Doctors</button>
//           </div>
//         `;
//       }

//       setMessages([...messages, { text: input, user: 'me' }]);
//       setInput('');
//       playSendSound(); // Play send sound
//       setTyping(true); // Show typing indicator

//       setTimeout(() => {
//         setMessages(prevMessages => [...prevMessages, { text: botResponse, user: 'bot' }]);
//         setTyping(false); // Hide typing indicator
//         playReceiveSound(); // Play receive sound after bot response
//       }, 500); // Simulate a delay for the bot response
//     }
//   };

//   // Handle key press for sending message
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-messages">
//         {messages.map((message, index) => (
//           <div key={index} className={message.user === 'me' ? 'message me' : 'message bot'} dangerouslySetInnerHTML={{ __html: message.text }} />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chatbot-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//       <audio ref={sendAudioRef} src={sendSound} />
//       <audio ref={receiveAudioRef} src={receiveSound} />
//     </div>
//   );
// };

// export default ChatbotComponent;



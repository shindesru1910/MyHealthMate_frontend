// ChatbotComponent.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatbotComponent.css';
import sendSound from './Csend.mp3'; // sound files
import receiveSound from './Csend.mp3';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const messagesEndRef = useRef(null);
  const sendAudioRef = useRef(null);
  const receiveAudioRef = useRef(null);

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('authToken'); // Adjust based on your auth implementation
    setIsLoggedIn(!!token);
  }, []);
  

  const predefinedQA = {
    hello: "Hi there! How can I assist you today?",
    hi: "Hey! Tell me how can I help you?",
    "how are you": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
    "what is your name": "I am MyHealthMate, your friendly chatbot assistant.",
    "what can you do": "I can help answer your questions and assist with basic tasks.",
    doctors: "Please select a specialty and location to find doctors."
  };

  // handle BookAppointment function here
  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in, redirect to appointment form
      window.open('/appointment-form', '_blank');
    } else {
      // User is not logged in, prompt to login
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: (
            <div>
              <p>Please log in before Booking An Appointment.</p>
              <button
                className="chatbot-button"
                onClick={() => window.open('/userlogin', '_blank')}
              >Login</button>
            </div>
          ),
          user: 'bot'
        }
      ]);
    }
  };

  const introMessage = (
    <div>
      Hello !!<br />I'm your friendly health assistant. How can I help you today?<br />
      <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button><br />
      <button className="chatbot-button" onClick={handleBookAppointment}>Book Appointment</button><br />
      <button className="chatbot-button" onClick={() => handleSendMessage('doctors')}>Doctors</button><br />
      <button className="chatbot-button" onClick={() => handleDietPlansClick()}>Diet Plans</button><br />
      <button className="chatbot-button" onClick={() => handleExercisePlansClick()}>Exercise Plans</button>
    </div>
  );

  useEffect(() => {
    setMessages([{ text: introMessage, user: 'bot' }]);
  }, [isLoggedIn]); // Re-render intro message if login status changes

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSpecialtiesAndLocations = async (specialty = '') => {
    try {
      const response = await fetch(`http://localhost:8000/get-specialties-and-locations?specialty=${specialty}`);
      const result = await response.json();
      if (result.status === 200) {
        setSpecialties(result.specialties || []);
        setLocations(result.locations || []);
        setShowDropdowns(true); // Show dropdowns after fetching data
      } else {
        console.error('Failed to fetch specialties and locations:', result);
      }
    } catch (error) {
      console.error('Error fetching specialties and locations:', error);
    }
  };

  const fetchDoctors = async (specialty, location) => {
    try {
      const response = await fetch(`http://localhost:8000/get-doctors?specialty=${specialty}&location=${location}`);
      const result = await response.json();
      if (result.status === 200) {
        setDoctors(result.data || []);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: generateDoctorCards(result.data || []), user: 'bot' }
        ]);
      } else {
        console.error('Failed to fetch doctors:', result);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'No doctors available.', user: 'bot' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'An error occurred while fetching doctors.', user: 'bot' }
      ]);
    }
  };

  const playSendSound = () => {
    sendAudioRef.current.play();
  };

  const playReceiveSound = () => {
    receiveAudioRef.current.play();
  };

  const handleSendMessage = async (message = null) => {
    const userMessage = message ? message.toLowerCase() : input.trim().toLowerCase();

    if (userMessage) {
      const botResponse = predefinedQA[userMessage] || "Sorry, I don't understand that question.";

      setMessages([...messages, { text: input, user: 'me' }]);
      setInput('');
      playSendSound();
      setTyping(true);

      setTimeout(async () => {
        if (userMessage === 'doctors') {
          await fetchSpecialtiesAndLocations();
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Here is Doctors Information :', user: 'bot' }
          ]);
        } else {
          setShowDropdowns(false); // Hide dropdowns for other messages
          setMessages(prevMessages => [...prevMessages, { text: botResponse, user: 'bot' }]);
        }

        setTyping(false);
        playReceiveSound();
      }, 500);
    }
  };

  const handleDietPlansClick = () => {
    if (isLoggedIn) {
      // Redirect to the personalized diet plans section
      window.open('http://localhost:3000/health-recommendation#diet', '_blank');
    } else {
      // Prompt user to log in or choose to view non-personalized diet plans
      const promptMessage = (
        <div>
          To view personalized diet plans, please log in or sign up.<br />
          <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button><br />
          <button className="chatbot-button" onClick={() => handleNonPersonalizedDietClick()}>View Non-Personalized Diet Plans</button>
        </div>
      );

      setMessages([...messages, { text: promptMessage, user: 'bot' }]);
      playReceiveSound();
    }
  };

  const handleNonPersonalizedDietClick = () => {
    // Redirect to the external non-personalized diet plans page
    window.open('https://www.nutrition.gov/topics/diet-and-health-conditions', '_blank');
  };


  const handleExercisePlansClick = () => {
    if (isLoggedIn) {
      // Redirect to the personalized exercise plans section
      window.open('http://localhost:3000/health-recommendation#exercise', '_blank');
    } else {
      // Prompt user to log in or choose to view non-personalized exercise plans
      const promptMessage = (
        <div>
          To view personalized exercise plans, please log in or sign up.<br />
          <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button><br />
          <button className="chatbot-button" onClick={() => handleNonPersonalizedExerciseClick()}>View Non-Personalized Exercise Plans</button>
        </div>
      );

      setMessages([...messages, { text: promptMessage, user: 'bot' }]);
      playReceiveSound();
    }
  };

  const handleNonPersonalizedExerciseClick = () => {
    window.open('https://darebee.com/workouts.html', '_blank');  
  };


  const handleSpecialtyChange = async (event) => {
    const specialty = event.target.value;
    setSelectedSpecialty(specialty);
    if (specialty) {
      // Fetch locations for the selected specialty
      await fetchSpecialtiesAndLocations(specialty);
    } else {
      setLocations([]); // Clear locations if no specialty is selected
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleFindDoctorsClick = async () => {
    if (selectedSpecialty && selectedLocation) {
      await fetchDoctors(selectedSpecialty, selectedLocation);
      setShowDropdowns(false); // Hide dropdowns after fetching doctors
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Please select both specialty and location.', user: 'bot' }
      ]);
    }
  };

  const generateSpecialtyAndLocationButtons = () => (
    <div className="chatbot-dropdowns">
      <label htmlFor="specialty">Select Specialty:</label>
      <select id="specialty" value={selectedSpecialty} onChange={handleSpecialtyChange}>
        <option value="">--Select Specialty--</option>
        {specialties.map(specialty => (
          <option key={specialty} value={specialty}>{specialty}</option>
        ))}
      </select><br />
      <label htmlFor="location">Select Location:</label>
      <select id="location" value={selectedLocation} onChange={handleLocationChange}>
        <option value="">--Select Location--</option>
        {locations.map(location => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select><br />
      <button className="chatbot-button" onClick={handleFindDoctorsClick}>Find Doctors</button>
    </div>
  );

  const generateDoctorCards = (doctors) => {
    if (doctors.length === 0) return 'No doctors available.';

    return (
      <div className="doctor-cards">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <h4>{doctor.first_name} {doctor.last_name}</h4>
            <p><i className="fas fa-user-md"></i> <strong>Specialty:</strong> {doctor.specialty}</p>
            <p><i className="bi bi-telephone"></i> <strong>Contact Info:</strong> {doctor.contact_info}</p>
            <p><i className="fas fa-map-marker-alt icon"></i> <strong>Location:</strong> {doctor.location}</p>
            <button
              className="chatbot-button"
              onClick={handleBookAppointment}
            >Book an Appointment</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chat with MyHealthMate</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.user}`}>
            {message.text}
          </div>
        ))}
        {showDropdowns && generateSpecialtyAndLocationButtons()}
        {typing && (
          <div className="chatbot-message bot">
            <i>Typing...</i>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message here..."
          className="chatbot-input-field"
        />
        <button onClick={() => handleSendMessage()} className="send-button"><i class="fas fa-paper-plane rotate-right"></i> {/* Font Awesome send icon */}
        </button>
      </div>
      <audio ref={sendAudioRef} src={sendSound} />
      <audio ref={receiveAudioRef} src={receiveSound} />
    </div>
  );
};

export default ChatbotComponent;

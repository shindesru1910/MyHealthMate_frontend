
//final
//This is the final chatBot 
import React, { useState, useEffect, useRef } from 'react';
import './ChatbotComponent.css';
import sendSound from './Csend.mp3';
import receiveSound from './Csend.mp3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatbotComponent = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const sendAudioRef = useRef(null);
  const receiveAudioRef = useRef(null);

  const predefinedQA = {
    hello: "Hi there! How can I assist you today?",
    hi: "Hey! Tell me how can I help you?",
    "how are you": "I'm a chatbot, so I don't have feelings, but I'm here to help you!",
    "what is your name": "I am MyHealthMate, your friendly chatbot assistant.",
    "what can you do": "I can help answer your questions and assist with basic tasks.",
    doctors: "Please select a specialty and location to find doctors."
  };

  const introMessage = (
    <div>
      Hello !!<br />I'm your friendly health assistant. How can I help you today?<br />
      <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/userlogin', '_blank')}>Login</button><br />
      <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/appointment-form', '_blank')}>Book Appointment</button><br />
      <button className="chatbot-button" onClick={() => handleSendMessage('doctors')}>Doctors</button><br />
      <button className="chatbot-button" onClick={() => window.open('http://localhost:3000/diet-plans', '_blank')}>Diet Plans</button><br />
      <button className="chatbot-button" onClick={() => window.open('https://www.example.com/exercise-plans', '_blank')}>Exercise Plans</button>
    </div>
  );

  useEffect(() => {
    setMessages([{ text: introMessage, user: 'bot' }]);
  }, []);

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
  const handleBookAppointment = () => {
    navigate(`/appointment-form/`);
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
            <button className="chatbot-button" onClick={() => handleBookAppointment(doctor.id)}>Book Appointment</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h4>MyHealthMate</h4>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="chatbot-message bot typing-indicator">
            <span>Typing...</span>
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
        />
        <button onClick={() => handleSendMessage()}>Send</button>
      </div>
      {showDropdowns && generateSpecialtyAndLocationButtons()}
      <audio ref={sendAudioRef} src={sendSound} />
      <audio ref={receiveAudioRef} src={receiveSound} />
    </div>
  );
};

export default ChatbotComponent;
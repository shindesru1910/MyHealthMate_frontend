import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Define keyframes for animations
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styled components with animations
const StyledContainer = styled(Container)`
    max-width: 900px;
    margin-top: 50px;
    animation: ${fadeIn} 1s ease-in-out;
`;

const StyledCard = styled(Card)`
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-10px) scale(1.02);
    }
`;

const StyledCardTitle = styled(Card.Title)`
    font-weight: bold;
    font-size: 1.2rem;
    color: #007bff;
`;

const StyledCardText = styled.p`
    margin-bottom: 8px;
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const StyledHeading = styled.h1`
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin-bottom: 4rem;
    color: #2c3e50;
    animation: ${fadeIn} 1s ease-in-out;
`;

const Diet = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch diet recommendations
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found in local storage.");
                }

                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                const response = await axios.post('http://localhost:8000/get-diet-recommendations', {
                    dietary_preference: decodedToken.dietary_preferences,
                    health_condition: decodedToken.health_conditions
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Raw API Response:', response);
                const data = response.data;
                console.log('Parsed API Response:', data);

                setRecommendations(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching recommendations:", error.response || error.message || error);
                setError("An error occurred while fetching recommendations. Please try again later.");
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                });
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchRecommendations function when the component mounts
        fetchRecommendations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <StyledContainer>
            <StyledHeading>
                Your Personalized Diet Recommendations
            </StyledHeading>
            {recommendations && typeof recommendations === 'object' ? (
                <div>
                    <Row>
                        {Object.entries(recommendations).map(([mealTime, meals], index) => (
                            <Col md={6} lg={4} key={index} className="mb-4">
                                <StyledCard>
                                    <Card.Body>
                                        <StyledCardTitle>{mealTime}</StyledCardTitle>
                                        <ul>
                                            {Array.isArray(meals) ? (
                                                meals.map((meal, i) => (
                                                    <li key={i}>
                                                        {typeof meal === 'string' ? (
                                                            meal
                                                        ) : (
                                                            <>
                                                                <strong>{meal.name}</strong>: {meal.description}
                                                                {meal.image && <img src={meal.image} alt={meal.name} style={{ width: '100%', borderRadius: '8px', marginTop: '8px' }} />}
                                                            </>
                                                        )}
                                                    </li>
                                                ))
                                            ) : (
                                                <p>No meals available for this time.</p>
                                            )}
                                        </ul>
                                    </Card.Body>
                                </StyledCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <p className="text-center">No recommendations available for your dietary preferences and health condition.</p>
            )}
        </StyledContainer>
    );
};

export default Diet;

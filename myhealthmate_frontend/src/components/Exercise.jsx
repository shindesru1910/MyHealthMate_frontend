import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import Sidebar from './Sidebar'; // Import your sidebar component
// import Diet from './Diet'; // Import the Diet component

const ExerciseContainer = styled.div`
    background-color: transparent; /* Ensure component has no background */
    padding: 20px; /* Adjust padding as needed */
`;

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
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 220px; /* Adjust margin to account for sidebar width */
    padding-top: 50px;
    align-items: center; /* Center content horizontally */
`;

const ContentContainer = styled(Container)`
    max-width: 900px;
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

const StyledHeading = styled.h1`
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin-bottom: 4rem;
    color: #2c3e50;
    animation: ${fadeIn} 1s ease-in-out;
`;

const Exercise = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [activityLevel, setActivityLevel] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found in local storage.");
                }

                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);
                const activityLevel = decodedToken.activity_level;

                if (!activityLevel) {
                    throw new Error("Activity level not found in the token.");
                }

                setActivityLevel(activityLevel);

                const response = await axios.post('http://localhost:8000/get-exercise-recommendations', { 
                    activity_level: activityLevel
                });

                // Log API response to check data structure
                console.log('API Response:', response.data);

                setRecommendations(response.data);
            } catch (error) {
                setError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
        <ExerciseContainer>
            {/* <Sidebar /> Add the Sidebar component */}
            <ContentWrapper>
                <ContentContainer>
                    <StyledHeading>
                        Your Personalized Path to Fitness Starts Here!
                    </StyledHeading>
                    {recommendations ? (
                        <div>
                            <Row>
                                {Object.keys(recommendations).map((exercise) => (
                                    exercise !== 'videos' && (
                                        <Col md={6} lg={4} key={exercise} className="mb-4">
                                            <StyledCard>
                                                <Card.Body>
                                                    <StyledCardTitle>{exercise}</StyledCardTitle>
                                                    {typeof recommendations[exercise] === 'object' ? (
                                                        <>
                                                            {recommendations[exercise].Frequency && <p>Frequency: {recommendations[exercise].Frequency}</p>}
                                                            {recommendations[exercise].Duration && <p>Duration: {recommendations[exercise].Duration}</p>}
                                                            {recommendations[exercise].Intensity && <p>Intensity: {recommendations[exercise].Intensity}</p>}
                                                            {recommendations[exercise].Exercises && <p>Exercises: {recommendations[exercise].Exercises}</p>}
                                                            {recommendations[exercise].Reps && <p>Reps/Sets: {recommendations[exercise].Reps}</p>}
                                                            {recommendations[exercise].Focus && <p>Focus: {recommendations[exercise].Focus}</p>}
                                                            {recommendations[exercise].Goal && <p>Goal: {recommendations[exercise].Goal}</p>}
                                                        </>
                                                    ) : (
                                                        <p>{recommendations[exercise]}</p>
                                                    )}
                                                </Card.Body>
                                            </StyledCard>
                                        </Col>
                                    )
                                ))}
                            </Row>
                            {recommendations.videos && recommendations.videos.length > 0 && (
                                <div className="mt-5">
                                    <h3 className="text-center mb-4">Recommended Videos</h3>
                                    <Row>
                                        {recommendations.videos.map((link, index) => {
                                            try {
                                                const videoId = new URL(link).searchParams.get('v');
                                                if (!videoId) {
                                                    throw new Error("Invalid YouTube URL.");
                                                }
                                                return (
                                                    <Col md={4} key={index} className="mb-4">
                                                        <StyledCard>
                                                            <Card.Img variant="top" src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={`Video ${index + 1}`} />
                                                            <Card.Body>
                                                                <Button variant="primary" href={link} target="_blank" rel="noopener noreferrer" block>
                                                                    Watch Video {index + 1}
                                                                </Button>
                                                            </Card.Body>
                                                        </StyledCard>
                                                    </Col>
                                                );
                                            } catch (error) {
                                                console.error("Error processing video URL:", error.message);
                                                return null;
                                            }
                                        })}
                                    </Row>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center">No recommendations available for the selected activity level.</p>
                    )}
                </ContentContainer>
            </ContentWrapper>
            </ExerciseContainer>
        </>
    );
};

export default Exercise;

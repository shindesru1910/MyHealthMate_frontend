// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import Swal from 'sweetalert2';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import styled, { keyframes } from 'styled-components';

// // Define keyframes for animations
// const fadeIn = keyframes`
//     from {
//         opacity: 0;
//         transform: translateY(20px);
//     }
//     to {
//         opacity: 1;
//         transform: translateY(0);
//     }
// `;

// const pulse = keyframes`
//     0% {
//         transform: scale(1);
//     }
//     50% {
//         transform: scale(1.05);
//     }
//     100% {
//         transform: scale(1);
//     }
// `;

// // Styled components with animations
// const StyledContainer = styled(Container)`
//     max-width: 900px;
//     margin-top: 50px;
//     animation: ${fadeIn} 1s ease-in-out;
// `;

// const StyledCard = styled(Card)`
//     border-radius: 15px;
//     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//     transition: transform 0.3s ease-in-out;

//     &:hover {
//         transform: translateY(-10px) scale(1.02);
//         animation: ${pulse} 0.6s ease-in-out;
//     }
// `;

// const StyledCardTitle = styled(Card.Title)`
//     font-weight: bold;
//     font-size: 1.2rem;
//     color: #007bff;
// `;

// const StyledCardText = styled.p`
//     margin-bottom: 8px;
//     animation: ${fadeIn} 0.5s ease-in-out;
// `;

// const StyledHeading = styled.h1`
//     font-family: 'Arial', sans-serif;
//     text-align: center;
//     margin-bottom: 4rem;
//     color: #2c3e50;
//     animation: ${fadeIn} 1s ease-in-out;
// `;

// const Exercise = () => {
//     const [recommendations, setRecommendations] = useState(null);
//     const [activityLevel, setActivityLevel] = useState('');
//     const [healthGoals, setHealthGoals] = useState('');
//     const [videoLinks, setVideoLinks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error("Token not found in local storage.");
//                 }

//                 const decodedToken = jwtDecode(token);
//                 const activityLevel = decodedToken.activity_level;
//                 const healthGoals = decodedToken.health_goals;

//                 if (!activityLevel || !healthGoals) {
//                     throw new Error("Activity level or health goals not found in the token.");
//                 }

//                 setActivityLevel(activityLevel);
//                 setHealthGoals(healthGoals);

//                 const response = await axios.post('http://localhost:8000/get-exercise-recommendations', { 
//                     activity_level: activityLevel,
//                     health_goal: healthGoals
//                 });

//                 // Log API response to check data structure
//                 console.log('API Response:', response.data);

//                 const { videos, ...exerciseRecommendations } = response.data;
//                 setRecommendations(exerciseRecommendations);
//                 setVideoLinks(videos || []);
//             } catch (error) {
//                 setError(error.message);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: error.message
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecommendations();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     // Extract relevant data based on health goals
//     const filteredRecommendations = recommendations ? recommendations[healthGoals] : null;

//     return (
//         <StyledContainer>
//             <StyledHeading>
//                 Your Personalized Path to Fitness Starts Here!
//             </StyledHeading>
//             {filteredRecommendations ? (
//                 <div>
//                     <Row>
//                         {Object.keys(filteredRecommendations).map((exercise) => (
//                             exercise !== 'videos' && (
//                                 <Col md={6} lg={4} key={exercise} className="mb-4">
//                                     <StyledCard>
//                                         <Card.Body>
//                                             <StyledCardTitle>{exercise}</StyledCardTitle>
//                                             {typeof filteredRecommendations[exercise] === 'object' ? (
//                                                 <>
//                                                     {filteredRecommendations[exercise].Frequency && <StyledCardText>Frequency: {filteredRecommendations[exercise].Frequency}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Duration && <StyledCardText>Duration: {filteredRecommendations[exercise].Duration}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Intensity && <StyledCardText>Intensity: {filteredRecommendations[exercise].Intensity}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Exercises && <StyledCardText>Exercises: {filteredRecommendations[exercise].Exercises}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Reps && <StyledCardText>Reps/Sets: {filteredRecommendations[exercise].Reps}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Focus && <StyledCardText>Focus: {filteredRecommendations[exercise].Focus}</StyledCardText>}
//                                                     {filteredRecommendations[exercise].Goal && <StyledCardText>Goal: {filteredRecommendations[exercise].Goal}</StyledCardText>}
//                                                 </>
//                                             ) : (
//                                                 <StyledCardText>{filteredRecommendations[exercise]}</StyledCardText>
//                                             )}
//                                         </Card.Body>
//                                     </StyledCard>
//                                 </Col>
//                             )
//                         ))}
//                     </Row>
//                     <div className="mt-5">
//                         <h3 className="text-center mb-4">Recommended Videos</h3>
//                         {videoLinks.length > 0 ? (
//                             <Row>
//                                 {videoLinks.map((link, index) => {
//                                     // Ensure the URL is correctly formatted
//                                     try {
//                                         const videoId = new URL(link).searchParams.get('v');
//                                         if (!videoId) {
//                                             throw new Error("Invalid YouTube URL.");
//                                         }
//                                         return (
//                                             <Col md={4} key={index} className="mb-4">
//                                                 <StyledCard>
//                                                     <Card.Img variant="top" src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={`Video ${index + 1}`} />
//                                                     <Card.Body>
//                                                         <Button variant="primary" href={link} target="_blank" rel="noopener noreferrer" block>
//                                                             Watch Video {index + 1}
//                                                         </Button>
//                                                     </Card.Body>
//                                                 </StyledCard>
//                                             </Col>
//                                         );
//                                     } catch (error) {
//                                         console.error("Error processing video URL:", error.message);
//                                         return null;
//                                     }
//                                 })}
//                             </Row>
//                         ) : (
//                             <p className="text-center">No video recommendations available.</p>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-center">No recommendations available for the selected health goal.</p>
//             )}
//         </StyledContainer>
//     );
// };

// export default Exercise;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import Diet from './Diet';

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

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
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
        animation: ${pulse} 0.6s ease-in-out;
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
        <Diet/>
        <StyledContainer>
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
                                                    {recommendations[exercise].Frequency && <StyledCardText>Frequency: {recommendations[exercise].Frequency}</StyledCardText>}
                                                    {recommendations[exercise].Duration && <StyledCardText>Duration: {recommendations[exercise].Duration}</StyledCardText>}
                                                    {recommendations[exercise].Intensity && <StyledCardText>Intensity: {recommendations[exercise].Intensity}</StyledCardText>}
                                                    {recommendations[exercise].Exercises && <StyledCardText>Exercises: {recommendations[exercise].Exercises}</StyledCardText>}
                                                    {recommendations[exercise].Reps && <StyledCardText>Reps/Sets: {recommendations[exercise].Reps}</StyledCardText>}
                                                    {recommendations[exercise].Focus && <StyledCardText>Focus: {recommendations[exercise].Focus}</StyledCardText>}
                                                    {recommendations[exercise].Goal && <StyledCardText>Goal: {recommendations[exercise].Goal}</StyledCardText>}
                                                </>
                                            ) : (
                                                <StyledCardText>{recommendations[exercise]}</StyledCardText>
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
        </StyledContainer>
</>
    );
};

export default Exercise;

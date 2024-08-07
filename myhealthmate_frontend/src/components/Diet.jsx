import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';


// Import the slick-carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const DietContainer = styled.div`
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
const StyledContainer = styled(Container)`
    max-width: 900px;
    margin-top: 50px;
    margin-left: 220px; /* Adjust margin to account for sidebar width */
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

const Diet = () => {
    const [recommendations, setRecommendations] = useState(null);
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

        fetchRecommendations();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const imageStyle = {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginTop: '8px',
        marginBottom: '20px',
    };

    return (
        <DietContainer>
        <StyledContainer>
            <StyledHeading>Explore Your Personalized Diet Journey</StyledHeading>

            {/* Image Slider */}
            <Slider {...sliderSettings}>
                <div>
                    <img src="/assets/img/diet/oatmeal1.png" alt="Oatmeal 1" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal2.png" alt="Oatmeal 2" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal3.png" alt="Oatmeal 3" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal4.png" alt="Oatmeal 4" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal5.png" alt="Oatmeal 5" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal6.png" alt="Oatmeal 6" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal7.png" alt="Oatmeal 7" style={imageStyle} />
                </div>
                <div>
                    <img src="/assets/img/diet/oatmeal8.png" alt="Oatmeal 8" style={imageStyle} />
                </div>
            </Slider>

            {/* Diet Recommendation Cards */}
            {recommendations && typeof recommendations === 'object' ? (
                <div>
                    <Row>
                        {Object.entries(recommendations).map(([mealTime, meals], index) => (
                            <Col md={6} lg={4} key={index} className="mb-4">
                                <StyledCard>
                                    <Card.Body>
                                        <StyledCardTitle>{mealTime}</StyledCardTitle>
                                        <ul>
                                            {meals.map((meal, i) => (
                                                <li key={i}>{meal}</li>
                                            ))}
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
        </DietContainer>
    );
};

export default Diet;

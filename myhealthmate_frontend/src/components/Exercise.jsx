// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import Swal from 'sweetalert2';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import styled, { keyframes } from 'styled-components';
// import Slider from 'react-slick';
// import Sidebar from './Sidebar'; // Import your sidebar component

// // Import the slick-carousel styles
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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

// // Styled components with animations
// const ExerciseWrapper = styled.div`
//     background-color: #f9f9f9;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     color: #333;
//     margin-left: 200px;
//     padding-top: 50px;
// `;

// const ContentWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// const ContentContainer = styled(Container)`
//     max-width: 900px;
//     animation: ${fadeIn} 1s ease-in-out;
// `;

// const StyledCard = styled(Card)`
//     border-radius: 15px;
//     margin-top:50px;
//     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//     transition: transform 0.3s ease-in-out;
//     background-color:#dddddd;

//     &:hover {
//         transform: translateY(-10px) scale(1.02);
//     }
// `;

// const StyledCardTitle = styled(Card.Title)`
//     font-weight: bold;
//     font-size: 1.2rem;
//     color: #007bff;
// `;

// const StyledHeading = styled.h1`
//     font-family: 'Arial', sans-serif;
//     text-align: center;
//     margin-bottom: 4rem;
//     color: #2c3e50;
//     animation: ${fadeIn} 1s ease-in-out;
// `;

// const imageStyle = {
//     width: '100%',
//     height: '400px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     marginTop: '8px',
//     marginBottom: '20px',
// };

// // Slider settings
// const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
// };

// const Exercise = () => {
//     const [recommendations, setRecommendations] = useState(null);
//     const [activityLevel, setActivityLevel] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error("Token not found in local storage.");
//                 }

//                 const decodedToken = jwtDecode(token);
//                 console.log("Decoded Token:", decodedToken);
//                 const activityLevel = decodedToken.activity_level;

//                 if (!activityLevel) {
//                     throw new Error("Activity level not found in the token.");
//                 }

//                 setActivityLevel(activityLevel);

//                 const response = await axios.post('http://localhost:8000/get-exercise-recommendations', { 
//                     activity_level: activityLevel
//                 });

//                 console.log('API Response:', response.data);

//                 setRecommendations(response.data);
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

//     return (
//         <ExerciseWrapper>
//             <ContentWrapper>
//                 <ContentContainer>
//                     <StyledHeading>
//                         Your Personalized Path to Fitness Starts Here!
//                     </StyledHeading>

//                     {/* Image Slider */}
//                     <Slider {...sliderSettings}>
//                         <div>
//                             <img src="/assets/img/exercise/e1.png" alt="Exercise 1" style={imageStyle} />
//                         </div>
//                         <div>
//                             <img src="/assets/img/exercise/e2.png" alt="Exercise 2" style={imageStyle} />
//                         </div>
//                         <div>
//                             <img src="/assets/img/exercise/e3.png" alt="Exercise 3" style={imageStyle} />
//                         </div>
//                         <div>
//                             <img src="/assets/img/exercise/e4.png" alt="Exercise 4" style={imageStyle} />
//                         </div>
//                     </Slider>

//                     {recommendations ? (
//                         <div>
//                             <Row>
//                                 {Object.keys(recommendations).map((exercise) => (
//                                     exercise !== 'videos' && (
//                                         <Col md={6} lg={4} key={exercise} className="mb-4">
//                                             <StyledCard>
//                                                 <Card.Body>
//                                                     <StyledCardTitle>{exercise}</StyledCardTitle>
//                                                     {typeof recommendations[exercise] === 'object' ? (
//                                                         <>
//                                                             {recommendations[exercise].Frequency && <p>Frequency: {recommendations[exercise].Frequency}</p>}
//                                                             {recommendations[exercise].Duration && <p>Duration: {recommendations[exercise].Duration}</p>}
//                                                             {recommendations[exercise].Intensity && <p>Intensity: {recommendations[exercise].Intensity}</p>}
//                                                             {recommendations[exercise].Exercises && <p>Exercises: {recommendations[exercise].Exercises}</p>}
//                                                             {recommendations[exercise].Reps && <p>Reps/Sets: {recommendations[exercise].Reps}</p>}
//                                                             {recommendations[exercise].Focus && <p>Focus: {recommendations[exercise].Focus}</p>}
//                                                             {recommendations[exercise].Goal && <p>Goal: {recommendations[exercise].Goal}</p>}
//                                                         </>
//                                                     ) : (
//                                                         <p>{recommendations[exercise]}</p>
//                                                     )}
//                                                 </Card.Body>
//                                             </StyledCard>
//                                         </Col>
//                                     )
//                                 ))}
//                             </Row>
//                             {recommendations.videos && recommendations.videos.length > 0 && (
//                                 <div className="mt-5">
//                                     <h3 className="text-center mb-4">Recommended Videos</h3>
//                                     <Row>
//                                         {recommendations.videos.map((link, index) => {
//                                             try {
//                                                 const videoId = new URL(link).searchParams.get('v');
//                                                 if (!videoId) {
//                                                     throw new Error("Invalid YouTube URL.");
//                                                 }
//                                                 return (
//                                                     <Col md={4} key={index} className="mb-4">
//                                                         <StyledCard>
//                                                             <Card.Img variant="top" src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={`Video ${index + 1}`} />
//                                                             <Card.Body>
//                                                                 <Button variant="primary" href={link} target="_blank" rel="noopener noreferrer" block>
//                                                                     Watch Video {index + 1}
//                                                                 </Button>
//                                                             </Card.Body>
//                                                         </StyledCard>
//                                                     </Col>
//                                                 );
//                                             } catch (error) {
//                                                 console.error("Error processing video URL:", error.message);
//                                                 return null;
//                                             }
//                                         })}
//                                     </Row>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <p className="text-center">No recommendations available for the selected activity level.</p>
//                     )}
//                 </ContentContainer>
//             </ContentWrapper>
//         </ExerciseWrapper>
//     );
// };

// export default Exercise;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import Sidebar from './Sidebar'; // Import your sidebar component

// Import the slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
const ExerciseWrapper = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333;
    margin-left: 200px;
    padding-top: 50px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentContainer = styled(Container)`
    max-width: 900px;
    animation: ${fadeIn} 1s ease-in-out;
`;

const StyledCard = styled(Card)`
    border-radius: 15px;
    margin-top:50px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    background-color:#dddddd;

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

const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '8px',
    marginBottom: '20px',
};

// Slider settings
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

const Exercise = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [activityLevel, setActivityLevel] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unsplashImages, setUnsplashImages] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found in local storage.");
                }

                const decodedToken = jwtDecode(token);
                const activityLevel = decodedToken.activity_level;

                if (!activityLevel) {
                    throw new Error("Activity level not found in the token.");
                }

                setActivityLevel(activityLevel);

                const response = await axios.post('http://localhost:8000/get-exercise-recommendations', { 
                    activity_level: activityLevel
                });

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

        const fetchUnsplashImages = async () => {
            const UNSPLASH_ACCESS_KEY = 'MtmuZEWuLQ37d_Nai55JTtTglA1OrmZsVKaOx20wkUw';
            const url = `https://api.unsplash.com/photos/random?query=fitness&client_id=${UNSPLASH_ACCESS_KEY}&count=8`;
        
            try {
                const response = await axios.get(url);
                setUnsplashImages(response.data); // Data comes as an array in this case
            } catch (error) {
                console.error("Error fetching Unsplash images:", error.message);
            }
        };
        

        fetchRecommendations();
        fetchUnsplashImages();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ExerciseWrapper>
            <ContentWrapper>
                <ContentContainer>
                    <StyledHeading>
                        Your Personalized Path to Fitness Starts Here!
                    </StyledHeading>

                    {/* Image Slider */}
                    <Slider {...sliderSettings}>
                        {unsplashImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.urls.regular} alt={image.alt_description} style={imageStyle} />
                            </div>
                        ))}
                    </Slider>

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
        </ExerciseWrapper>
    );
};

export default Exercise;

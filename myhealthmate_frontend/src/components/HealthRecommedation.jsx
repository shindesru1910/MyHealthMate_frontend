import React from 'react';
import Diet from './Diet';
import Exercise from './Exercise';
import styled from 'styled-components';
import Sidebar from './Sidebar';

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: transparent; /* Ensure the wrapper has no background */
`;

const Heading = styled.h1`
    font-family: 'Arial', sans-serif;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 0.1rem;
    padding-left: 8rem;
    background-color: transparent; /* Ensure heading has no background */
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    background-color: transparent; /* Ensure content has no background */
`;

const Section = styled.section`
    background-color: transparent; /* Ensure sections have no background */
    padding: 0;
`;

const HealthRecommendation = () => {
    return (
        <Wrapper>
            <Sidebar />
            <Heading>Your Personalized Health Recommendations</Heading>
            <Content>
                <Section id="diet">
                    <Diet />
                </Section>
                <Section id="exercise">
                    <Exercise />
                </Section>
            </Content>
        </Wrapper>
    );
};

export default HealthRecommendation;


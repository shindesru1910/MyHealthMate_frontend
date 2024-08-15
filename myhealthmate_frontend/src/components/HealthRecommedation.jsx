// import React from 'react';
// import Diet from './Diet';
// import Exercise from './Exercise';
// import styled from 'styled-components';
// import Sidebar from './Sidebar';

// // Styled components
// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//     max-width: 1200px;
//     margin: 0 auto;
//     background-color: transparent;
    
//     @media (max-width: 768px) {
//         padding: 15px;
//     }

//     @media (max-width: 480px) {
//         padding: 10px;
//     }
// `;

// const Heading = styled.h1`
//     font-family: 'Arial', sans-serif;
//     color: #2c3e50;
//     text-align: center;
//     margin-bottom: 0.1rem;
//     padding-left: 8rem;
//     background-color: transparent;
    
//     @media (max-width: 768px) {
//         padding-left: 2rem;
//         font-size: 1.5rem;
//     }

//     @media (max-width: 480px) {
//         padding-left: 1rem;
//         font-size: 1.2rem;
//     }
// `;

// const Content = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     width: 100%;
//     gap: 10px;
//     background-color: transparent;

//     @media (max-width: 768px) {
//         gap: 8px;
//     }

//     @media (max-width: 480px) {
//         gap: 5px;
//     }
// `;

// const Section = styled.section`
//     background-color: transparent;
//     padding: 0;

//     @media (max-width: 768px) {
//         padding: 10px 0;
//     }

//     @media (max-width: 480px) {
//         padding: 8px 0;
//     }
// `;

// const SidebarWrapper = styled.div`
//     @media (max-width: 768px) {
//         display: none; /* Hide sidebar on smaller screens */
//     }
// `;

// const HealthRecommendation = () => {
//     return (
//         <Wrapper>
//             <SidebarWrapper>
//                 <Sidebar />
//             </SidebarWrapper>
//             <Heading>Your Personalized Health Recommendations</Heading>
//             <Content>
//                 <Section id="diet">
//                     <Diet />
//                 </Section>
//                 <Section id="exercise">
//                     <Exercise />
//                 </Section>
//             </Content>
//         </Wrapper>
//     );
// };

// export default HealthRecommendation;

import React from 'react';
import Diet from './Diet';
import Exercise from './Exercise';
import Blogs from './Blogs'; // Import the Blogs component
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
    background-color: transparent;
    
    @media (max-width: 768px) {
        padding: 15px;
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const Heading = styled.h1`
    font-family: 'Arial', sans-serif;
    color: #000080;
    text-align: center;
    margin-bottom: 1rem;
    padding-left: 13rem;
    background-color: transparent;
    font-size:2.5rem;
    
    @media (max-width: 768px) {
        padding-left: 2rem;
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        padding-left: 1rem;
        font-size: 1.2rem;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    background-color: transparent;

    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
`;

const Section = styled.section`
    background-color: transparent;
    padding: 0;

    @media (max-width: 768px) {
        padding: 10px 0;
    }

    @media (max-width: 480px) {
        padding: 8px 0;
    }
`;

const SidebarWrapper = styled.div`
    @media (max-width: 768px) {
        display: none; /* Hide sidebar on smaller screens */
    }
`;

const HealthRecommendation = () => {
    return (
        <Wrapper>
            <SidebarWrapper>
                <Sidebar />
            </SidebarWrapper>
            <Heading>Your Personalized Health Recommendations</Heading>
            <Content>
                <Section id="diet">
                    <Diet />
                </Section>
                <Section id="exercise">
                    <Exercise />
                </Section>
                <Section id="blogs"> {/* Add the Blogs section here */}
                    <Blogs />
                </Section>
            </Content>
        </Wrapper>
    );
};

export default HealthRecommendation;

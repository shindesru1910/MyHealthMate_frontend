import React from 'react';
import styled from 'styled-components';

// Styled component for the sidebar
const SidebarContainer = styled.div`
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #2c3e50;
    padding: 20px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

// Example sidebar item styling
const SidebarItem = styled.a`
    display: block;
    margin-bottom: 20px;
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarItem href="#diet">Diet</SidebarItem>
            <SidebarItem href="#exercise">Exercises</SidebarItem>
            <SidebarItem href="#blogs">Blogs</SidebarItem>
            {/* Add more sidebar items here */}
        </SidebarContainer>
    );
};

export default Sidebar;

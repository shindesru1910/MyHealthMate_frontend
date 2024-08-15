import React from 'react';
import styled from 'styled-components';

// Styled components for Blogs
const BlogWrapper = styled.div`
    margin-left: 200px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
`;

const BlogHeading = styled.h2`
    font-family: 'Arial', sans-serif;
    color: #2c3e50;
    margin-bottom: 20px;
`;

const BlogCard = styled.div`
    padding:80px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
    color: #ffffff; // Ensure text is readable against the background image
    position: relative; // Required for absolute positioning of content

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4); // Add a semi-transparent overlay for better text visibility
        border-radius: 8px;
        z-index: 1;
    }

    > * {
        position: relative;
        z-index: 2;
    }
`;

const BlogTitle = styled.h3`
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    margin-bottom: 10px;
`;

const BlogSummary = styled.p`
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    line-height: 1.6;
    margin-bottom: 10px;
`;

const ReadMoreLink = styled.a`
    font-family: 'Arial', sans-serif;
    color: #ffcc00; // Adjust color to be visible on the background
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const blogPosts = [
    {
        id: 1,
        title: 'The Benefits of a Balanced Diet',
        summary: 'Discover how a balanced diet can improve your overall health and well-being...',
        link: 'https://www.maxhealthcare.in/blogs/what-is-a-balanced-diet',
        imageUrl: 'https://images.pexels.com/photos/1105166/pexels-photo-1105166.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 2,
        title: 'Top 5 Exercises for a Strong Core',
        summary: 'Strengthen your core with these effective exercises that you can do at home...',
        link: 'https://www.healthline.com/health/best-core-exercises#advanced',
        imageUrl: 'https://images.pexels.com/photos/39671/physiotherapy-weight-training-dumbbell-exercise-balls-39671.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 3,
        title: 'How to Manage Stress through Healthy Eating',
        summary: 'Learn how your diet can affect your stress levels and tips for managing it...',
        link: '/blogs/how-to-manage-stress-through-healthy-eating',
        imageUrl: 'https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const Blogs = () => {
    return (
        <BlogWrapper>
            <BlogHeading>Latest Health Tips & Articles</BlogHeading>
            {blogPosts.map(post => (
                <BlogCard key={post.id} imageUrl={post.imageUrl}>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogSummary>{post.summary}</BlogSummary>
                    <ReadMoreLink href={post.link}>Read More</ReadMoreLink>
                </BlogCard>
            ))}
        </BlogWrapper>
    );
};

export default Blogs;

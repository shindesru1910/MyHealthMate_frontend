import React, { useState, useEffect } from 'react';
import './ArticleComponent.css';

const articlesData = [
  {
    id: 1,
    title: 'Healthy Eating for a Healthy Life',
    author: 'Dr. John Doe',
    date: 'August 7, 2024',
    imageUrl: '/assets/img/articles/healthy_eating.jpg',
    summary: 'Discover the essential nutrients your body needs and how to incorporate them into your diet for a healthier lifestyle.',
    link: 'https://example.com/healthy-eating'
  },
  {
    id: 2,
    title: 'The Benefits of Regular Exercise',
    author: 'Jane Smith, Fitness Coach',
    date: 'August 5, 2024',
    imageUrl: '/assets/img/articles/regular_exercise.jpg',
    summary: 'Learn about the physical and mental benefits of regular exercise and how to make it a part of your daily routine.',
    link: 'https://example.com/regular-exercise'
  },
  {
    id: 3,
    title: 'Managing Stress Through Mindfulness',
    author: 'Dr. Emily Watson',
    date: 'August 3, 2024',
    imageUrl: '/assets/img/articles/mindfulness.jpg',
    summary: 'Explore mindfulness techniques that can help you manage stress and improve your overall well-being.',
    link: 'https://example.com/mindfulness'
  }
];

const ArticleComponent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    setArticles(articlesData);
  }, []);

  return (
    <div className="articles-container">
      <h2>Health Articles</h2>
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <img src={article.imageUrl} alt={article.title} className="article-image" />
            <div className="article-content">
              <h3>{article.title}</h3>
              <p className="article-author">By {article.author} | {article.date}</p>
              <p className="article-summary">{article.summary}</p>
              <a href={article.link} className="read-more" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleComponent;

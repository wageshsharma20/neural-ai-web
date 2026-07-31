import React from 'react';
import { FEATURED_BLOGS } from '../../data/mockData';
import './FeaturedBlogs.css';

function FeaturedBlogs() {
  const displayBlogs = FEATURED_BLOGS.slice(0, 3);
  
  return (
    <section className="blogs section reveal" id="blogs" aria-labelledby="blogs-heading">
      <div className="container">
        <div className="blogs__header">
          <h2 className="eyebrow" id="blogs-heading" style={{ marginBottom: 0 }}>Blogs</h2>
        </div>

        <div className="blogs__grid">
          {displayBlogs.map((b) => (
            <article key={b.id} className="blog-card" id={b.id}>
              <div className="blog-card__meta">
                <span className="blog-card__category">{b.category}</span>
                <time className="blog-card__date" dateTime={b.publishedAt}>
                  {new Date(b.publishedAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </time>
              </div>
              <h3 className="blog-card__title">
                <a href={`/blogs/${b.id}`} className="blog-card__link">{b.title}</a>
              </h3>
              <div className="blog-card__footer">
                <span className="blog-card__author">{b.author}</span>
                <span className="blog-card__read-time">{b.readTime}</span>
              </div>
            </article>
          ))}
          
          <a href="/blogs" className="blog-card blog-card--more">
            <span className="blog-card__more-text">Explore All Blogs</span>
            <svg className="blog-card__more-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBlogs;

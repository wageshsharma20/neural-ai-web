import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { FEATURED_BLOGS } from '../../data/mockData';
import './FeaturedBlogs.css';

function FeaturedBlogs() {
  const displayBlogs = FEATURED_BLOGS.slice(0, 3);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.blog-card');
    cards.forEach(card => card.style.opacity = '0');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Define completely different speeds (durations) for the 4 boxes, much slower now
          const speeds = [2800, 2000, 1500, 3500]; // 1: Slow, 2: Medium, 3: Fast (relatively), 4: Very Slow
          
          cards.forEach((card, index) => {
            animate(card, {
              x: ['-20vw', 0],
              opacity: [0, 1],
              duration: speeds[index % speeds.length],
              ease: 'outQuint'
            });
          });

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="blogs section" id="blogs" aria-labelledby="blogs-heading" ref={sectionRef}>
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

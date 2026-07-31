import React from 'react';
import { FEATURED_BLOGS } from '../../data/mockData';
import './FeaturedBlogs.css';

function FeaturedBlogs() {
  return (
    <section className="blogs section reveal" id="blogs" aria-labelledby="blogs-heading">
      <div className="container">
        <div className="blogs__header">
          <div>
            <p className="eyebrow">Latest Writing</p>
            <h2 className="blogs__heading" id="blogs-heading">From the society's desk.</h2>
          </div>
          <a href="/blogs" className="blogs__all">All articles →</a>
        </div>

        <ul className="blogs__list" role="list">
          {FEATURED_BLOGS.map((b) => (
            <li key={b.id} className="blog-row" id={b.id}>
              <article>
                <div className="blog-row__meta">
                  <span className="blog-row__category">{b.category}</span>
                  <time className="blog-row__date" dateTime={b.publishedAt}>
                    {new Date(b.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </time>
                </div>
                <h3 className="blog-row__title">
                  <a href={`/blogs/${b.id}`} className="blog-row__title-link">{b.title}</a>
                </h3>
                <div className="blog-row__footer">
                  <span className="blog-row__author">{b.author}</span>
                  <span className="blog-row__read-time">{b.readTime}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturedBlogs;

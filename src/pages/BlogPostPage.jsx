import { ScrollAnimation } from '../components/ui/ScrollAnimation';
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { useApi } from '../hooks/useApi';
import { blogsAPI } from '../services/api';
import './BlogPostPage.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function BlogPostPage() {
  const { id } = useParams(); // actually the slug

  const { data: blogRes, loading } = useApi(() => blogsAPI.getBySlug(id), [id]);
  const blog = blogRes?.data?.blog;

  if (loading) {
    return (
      <PageLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner"></div>
        </div>
      </PageLayout>
    );
  }

  if (!blog) {
    return (
      <PageLayout>
        <div className="blog-post-not-found">
          <h1>Blog Post Not Found</h1>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="back-link">← Back to Blogs</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ScrollAnimation as="article" className="blog-post-page">
        <header className="blog-post-header">
          <div className="container">
            <Link to="/blogs" className="back-link">← Back to Blogs</Link>
            
            <div className="blog-post-meta">
              <span className="blog-post-tag">{blog.category}</span>
              <span className="blog-post-readtime">{blog.readTime}</span>
            </div>
            
            <h1 className="blog-post-title">{blog.title}</h1>
            
            <div className="blog-author">
              <span className="blog-author__initials">{blog.author?.name ? blog.author.name.charAt(0) : 'U'}</span>
              <div>
                <p className="blog-author__name">{blog.author?.name || 'Unknown'}</p>
                <p className="blog-author__role">{blog.author?.role || 'Member'} • {formatDate(blog.publishedAt)}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="blog-post-body">
          <div className="container blog-post-body__inner">
            <p className="blog-post-lead">{blog.excerpt}</p>
            
            {blog.content && (
              <div className="blog-post-content">
                {/* Splitting by double newline if any, or just rendering the string */}
                {blog.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
            
            <div className="blog-post-tags">
              {blog.tags && blog.tags.map(tag => (
                <span key={tag} className="post-tag-pill">#{tag}</span>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </PageLayout>
  );
}

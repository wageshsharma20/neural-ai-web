import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { ALL_BLOGS } from '../data/blogsData';
import './BlogPostPage.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function BlogPostPage() {
  const { id } = useParams();

  const blog = useMemo(() => {
    return ALL_BLOGS.find(b => b.id === id);
  }, [id]);

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
      <article className="blog-post-page reveal">
        <header className="blog-post-header">
          <div className="container">
            <Link to="/blogs" className="back-link">← Back to Blogs</Link>
            
            <div className="blog-post-meta">
              <span className="blog-post-tag">{blog.category}</span>
              <span className="blog-post-readtime">{blog.readTime}</span>
            </div>
            
            <h1 className="blog-post-title">{blog.title}</h1>
            
            <div className="blog-author">
              <div className="blog-author__initials" aria-hidden="true">{blog.authorInitials}</div>
              <div>
                <p className="blog-author__name">{blog.author}</p>
                <p className="blog-author__role">{blog.authorRole} • {formatDate(blog.publishedAt)}</p>
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
      </article>
    </PageLayout>
  );
}

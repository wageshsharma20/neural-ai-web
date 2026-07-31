import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { ALL_BLOGS, RESOURCES, RESOURCE_TYPES, DIFFICULTY_LEVELS } from '../data/blogsData';
import { BLOG_CATEGORIES } from '../data/mockData';
import './BlogsPage.css';

// ── Helpers ──
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Blogs & Resources Page
 * Sections per SITEMAP.md:
 *   - Featured Blog (large hero card)
 *   - Latest Blogs grid (filterable by category)
 *   - Learning Resources (filterable by type + difficulty)
 */
function BlogsPage() {
  const [blogCategory, setBlogCategory]   = useState('All');
  const [resourceType, setResourceType]   = useState('All');
  const [resourceDiff, setResourceDiff]   = useState('All');
  const [searchQuery,  setSearchQuery]    = useState('');

  // Featured = the explicitly flagged blog
  const featuredBlog = ALL_BLOGS.find(b => b.featured);
  const otherBlogs   = ALL_BLOGS.filter(b => !b.featured);

  const filteredBlogs = useMemo(() => {
    return otherBlogs.filter(b => {
      const matchCat   = blogCategory === 'All' || b.category === blogCategory;
      const matchQuery = searchQuery === '' ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [blogCategory, searchQuery, otherBlogs]);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchType = resourceType === 'All' || r.type === resourceType;
      const matchDiff = resourceDiff === 'All' || r.difficulty === resourceDiff;
      return matchType && matchDiff;
    });
  }, [resourceType, resourceDiff]);

  return (
    <PageLayout>
      <div className="blogs">

        {/* ── Page Header ── */}
        <header className="blogs__hero container" aria-labelledby="blogs-heading">
          <p className="eyebrow fade-in">Blogs &amp; Resources</p>
          <h1 className="blogs__heading fade-in fade-in--d1" id="blogs-heading">
            Knowledge,<br />Writing &amp; Resources.
          </h1>
          <p className="blogs__subhead fade-in fade-in--d2">
            Technical writing, research notes, and curated learning resources from the Neural AI community.
          </p>
        </header>

        {/* ── Featured Blog ── */}
        {featuredBlog && (
          <section
            className="blogs-section reveal"
            id="featured-blog"
            aria-labelledby="featured-heading"
          >
            <div className="container blogs-section__inner">
              <div className="blogs-section__label">
                <p className="eyebrow">Featured</p>
              </div>
              <div className="blogs-section__content">
                <h2 className="blogs-section__heading" id="featured-heading">
                  Latest Article.
                </h2>
                <article className="featured-blog-card" id={featuredBlog.id} aria-labelledby={`${featuredBlog.id}-title`}>
                  <div className="featured-blog-card__body">
                    <div className="featured-blog-card__meta">
                      <span className="blog-cat-tag">{featuredBlog.category}</span>
                      <span className="blog-date">{formatDate(featuredBlog.publishedAt)}</span>
                      <span className="blog-read-time">{featuredBlog.readTime}</span>
                    </div>
                    <h3 className="featured-blog-card__title" id={`${featuredBlog.id}-title`}>
                      {featuredBlog.title}
                    </h3>
                    <p className="featured-blog-card__excerpt">{featuredBlog.excerpt}</p>
                    <div className="featured-blog-card__footer">
                      <div className="blog-author">
                        <span className="blog-author__initials" aria-hidden="true">
                          {featuredBlog.authorInitials}
                        </span>
                        <div>
                          <p className="blog-author__name">{featuredBlog.author}</p>
                          <p className="blog-author__role">{featuredBlog.authorRole}</p>
                        </div>
                      </div>
                      <div className="featured-blog-card__tags">
                        {featuredBlog.tags.map(tag => (
                          <span key={tag} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* ── All Blogs ── */}
        <section
          className="blogs-section reveal"
          id="all-blogs"
          aria-labelledby="blogs-list-heading"
        >
          <div className="container blogs-section__inner">
            <div className="blogs-section__label">
              <p className="eyebrow">All Blogs</p>
            </div>
            <div className="blogs-section__content">
              <h2 className="blogs-section__heading" id="blogs-list-heading">
                From the community.
              </h2>

              {/* Search + Category filters */}
              <div className="blogs-controls">
                <div className="blogs-search-wrap">
                  <input
                    type="search"
                    id="blog-search"
                    className="blogs-search"
                    placeholder="Search articles…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    aria-label="Search blog articles"
                  />
                </div>
                <div className="blog-filters" role="tablist" aria-label="Blog categories">
                  {BLOG_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      role="tab"
                      id={`blog-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                      aria-selected={blogCategory === cat}
                      className={`blog-filter-btn ${blogCategory === cat ? 'blog-filter-btn--active' : ''}`}
                      onClick={() => setBlogCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog grid */}
              <ul
                className="blogs-grid"
                role="list"
                aria-live="polite"
                aria-label="Blog articles"
              >
                {filteredBlogs.map(blog => (
                  <li key={blog.id} className="blog-card" id={blog.id}>
                    <div className="blog-card__meta">
                      <span className="blog-cat-tag">{blog.category}</span>
                      <span className="blog-read-time">{blog.readTime}</span>
                    </div>
                    <h3 className="blog-card__title" id={`${blog.id}-title`}>{blog.title}</h3>
                    <p className="blog-card__excerpt">{blog.excerpt}</p>
                    
                    <div className="blog-card__footer">
                      <div className="blog-author blog-author--sm">
                        <span className="blog-author__initials blog-author__initials--sm" aria-hidden="true">
                          {blog.authorInitials}
                        </span>
                        <div>
                          <p className="blog-author__name">{blog.author}</p>
                          <p className="blog-author__role">{formatDate(blog.publishedAt)}</p>
                        </div>
                      </div>
                      <Link to={`/blogs/${blog.id}`} className="blog-read-more">Read More <span aria-hidden="true">→</span></Link>
                    </div>
                  </li>
                ))}
              </ul>

              {filteredBlogs.length === 0 && (
                <p className="blogs-empty">No articles match your search.</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Learning Resources ── */}
        <section
          className="blogs-section reveal"
          id="resources"
          aria-labelledby="resources-heading"
        >
          <div className="container blogs-section__inner">
            <div className="blogs-section__label">
              <p className="eyebrow">Resources</p>
            </div>
            <div className="blogs-section__content">
              <h2 className="blogs-section__heading" id="resources-heading">
                Learning Resources.
              </h2>

              {/* Resource filters */}
              <div className="resource-filters-row">
                <div className="resource-filter-group">
                  <p className="resource-filter-label">Type</p>
                  <div className="resource-filter-pills" role="group" aria-label="Resource type filter">
                    {RESOURCE_TYPES.map(type => (
                      <button
                        key={type}
                        id={`res-type-${type.toLowerCase().replace(/\s/g, '-')}`}
                        aria-pressed={resourceType === type}
                        className={`resource-filter-btn ${resourceType === type ? 'resource-filter-btn--active' : ''}`}
                        onClick={() => setResourceType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="resource-filter-group">
                  <p className="resource-filter-label">Difficulty</p>
                  <div className="resource-filter-pills" role="group" aria-label="Difficulty filter">
                    {DIFFICULTY_LEVELS.map(level => (
                      <button
                        key={level}
                        id={`res-diff-${level.toLowerCase()}`}
                        aria-pressed={resourceDiff === level}
                        className={`resource-filter-btn ${resourceDiff === level ? 'resource-filter-btn--active' : ''} ${
                          level === 'Beginner' ? 'resource-filter-btn--beginner' :
                          level === 'Advanced' ? 'resource-filter-btn--advanced' : ''
                        }`}
                        onClick={() => setResourceDiff(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resources list */}
              <ul className="resources-list" role="list" aria-live="polite">
                {filteredResources.map(res => (
                  <li key={res.id} className="resource-row" id={res.id}>
                    <div className="resource-row__left">
                      <div className="resource-row__top">
                        <span className="resource-type-badge">{res.type}</span>
                        <span className={`resource-diff-badge resource-diff-badge--${res.difficulty.toLowerCase()}`}>
                          {res.difficulty}
                        </span>
                      </div>
                      <p className="resource-row__title">{res.title}</p>
                      <p className="resource-row__desc">{res.description}</p>
                      <div className="resource-row__tags">
                        {res.tags.map(tag => (
                          <span key={tag} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={res.link}
                      className="resource-row__link"
                      id={`res-link-${res.id}`}
                      aria-label={`Open ${res.title}`}
                    >
                      Open →
                    </a>
                  </li>
                ))}
              </ul>

              {filteredResources.length === 0 && (
                <p className="blogs-empty">No resources match your filters.</p>
              )}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}

export default BlogsPage;

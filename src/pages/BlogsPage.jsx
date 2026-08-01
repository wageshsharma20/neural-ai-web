import { ScrollAnimation } from '../components/ui/ScrollAnimation';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { ALL_BLOGS, RESOURCES, RESOURCE_TYPES, DIFFICULTY_LEVELS } from '../data/blogsData';
import { BLOG_CATEGORIES } from '../data/mockData';
import PhotonBeam from '../components/ui/PhotonBeam';
import './BlogsPage.css';
import { LineAnimation } from '../components/ui/LineAnimation';

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
          <LineAnimation as="h1" className="blogs__heading" id="blogs-heading" text={"Knowledge,\nWriting & Resources."} direction="left" staggerDelay={0.1} />
          <LineAnimation as="p" className="blogs__subhead" text="Technical writing, research notes, and curated learning resources from the Neural AI community." direction="left" staggerDelay={0.1} />
        </header>

        {/* Photon Beam Separator */}
        <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden', mixBlendMode: 'screen' }}>
          <PhotonBeam
            mirrored={true}
            colorBg="transparent"
            colorLine="#005f6f"
            colorSignal="#00d9ff"
            colorSignal2="#00ffff"
            colorSignal3="#00b8d4"
            lineCount={80}
            spreadHeight={30.33}
            signalCount={94}
            speedGlobal={0.345}
            trailLength={3}
            bloomStrength={3.0}
            bloomRadius={0.5}
          />
        </div>

        {/* ── Featured Blog ── */}
        {featuredBlog && (
          <ScrollAnimation as="section" className="blogs-section"
            id="featured-blog"
            aria-labelledby="featured-heading"
          >
            <div className="container blogs-section__inner">
              <div className="blogs-section__label">
                <p className="eyebrow">Featured</p>
              </div>
              <div className="blogs-section__content">
                <LineAnimation as="h2" className="blogs-section__heading" id="featured-heading" text="Latest Article." direction="left" staggerDelay={0.1} />
                <article className="featured-blog-card" id={featuredBlog.id} aria-labelledby={`${featuredBlog.id}-title`}>
                  <div className="featured-blog-card__body">
                    <div className="featured-blog-card__meta">
                      <span className="blog-cat-tag">{featuredBlog.category}</span>
                      <span className="blog-date">{formatDate(featuredBlog.publishedAt)}</span>
                      <span className="blog-read-time">{featuredBlog.readTime}</span>
                    </div>
                    <LineAnimation as="h3" className="featured-blog-card__title" id={`${featuredBlog.id}-title`} text={featuredBlog.title} direction="left" staggerDelay={0.1} />
                    <LineAnimation as="p" className="featured-blog-card__excerpt" text={featuredBlog.excerpt} direction="left" staggerDelay={0.1} />
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
          </ScrollAnimation>
        )}

        {/* ── All Blogs ── */}
        <ScrollAnimation as="section" className="blogs-section"
          id="all-blogs"
          aria-labelledby="blogs-list-heading"
        >
          <div className="container blogs-section__inner">
            <div className="blogs-section__label">
              <p className="eyebrow">All Blogs</p>
            </div>
            <div className="blogs-section__content">
              <LineAnimation as="h2" className="blogs-section__heading" id="blogs-list-heading" text="From the community." direction="left" staggerDelay={0.1} />

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
                    <LineAnimation as="h3" className="blog-card__title" id={`${blog.id}-title`} text={blog.title} direction="left" staggerDelay={0.1} />
                    <LineAnimation as="p" className="blog-card__excerpt" text={blog.excerpt} direction="left" staggerDelay={0.1} />
                    
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
        </ScrollAnimation>

        {/* ── Learning Resources ── */}
        <ScrollAnimation as="section" className="blogs-section"
          id="resources"
          aria-labelledby="resources-heading"
          viewport={{ once: true, amount: 0.1, margin: "0px" }}
        >
          <div className="container blogs-section__inner">
            <div className="blogs-section__label">
              <p className="eyebrow">Resources</p>
            </div>
            <div className="blogs-section__content">
              <LineAnimation as="h2" className="blogs-section__heading" id="resources-heading" text="Learning Resources." direction="left" staggerDelay={0.1} />

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
                      <LineAnimation as="p" className="resource-row__title" text={res.title} direction="left" staggerDelay={0.1} />
                      <LineAnimation as="p" className="resource-row__desc" text={res.description} direction="left" staggerDelay={0.1} />
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
        </ScrollAnimation>

      </div>
    </PageLayout>
  );
}

export default BlogsPage;

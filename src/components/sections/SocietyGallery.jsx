import React, { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from 'lucide-react';
import { ScrollAnimation } from '../ui/ScrollAnimation';
import { LineAnimation } from '../ui/LineAnimation';
import { useApi } from '../../hooks/useApi';
import { galleryAPI } from '../../services/api';
import './SocietyGallery.css';

/**
 * Gallery section for the public society website.
 * Fetches public galleries (isPublic: true) and shows them in a grid.
 * Clicking a card opens a lightbox to browse all photos in that album.
 */
function SocietyGallery() {
  const { data, loading, error } = useApi(() => galleryAPI.getPublic({ limit: 12 }));
  const galleries = data?.data?.galleries || [];

  const [activeGallery, setActiveGallery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = activeGallery?.images || [];

  const closeLightbox = useCallback(() => {
    setActiveGallery(null);
    setActiveIndex(0);
  }, []);

  const step = useCallback(
    (dir) => {
      setActiveIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (!activeGallery) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeGallery, closeLightbox, step]);

  return (
    <ScrollAnimation as="section" className="society-section sg-section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container society-section__inner">
        <div className="society-section__label">
          <p className="eyebrow">Gallery</p>
        </div>
        <div className="society-section__content">
          <LineAnimation as="h2" className="society-section__heading" id="gallery-heading" text="Moments from the society." direction="left" staggerDelay={0.1} />

          {loading ? (
            <div className="spinner" style={{ margin: '3rem auto' }}></div>
          ) : error ? (
            <p className="sg-empty">Gallery is temporarily unavailable.</p>
          ) : galleries.length === 0 ? (
            <p className="sg-empty">Photos will appear here soon.</p>
          ) : (
            <ul className="sg-grid" role="list" aria-label="Society photo galleries">
              {galleries.map((g) => {
                const cover = g.coverImage?.url || g.images?.[0]?.url;
                const count = g.imageCount ?? g.images?.length ?? 0;
                return (
                  <li key={g._id} className="sg-card" id={g._id}>
                    <button
                      type="button"
                      className="sg-card__button"
                      onClick={() => { setActiveGallery(g); setActiveIndex(0); }}
                      aria-label={`Open ${g.title}`}
                    >
                      <span className="sg-card__media">
                        {cover ? (
                          <img src={cover} alt={g.title} loading="lazy" />
                        ) : (
                          <span className="sg-card__placeholder"><ImageIcon size={28} /></span>
                        )}
                        <span className="sg-card__count">
                          <Camera size={12} />
                          {count}
                        </span>
                      </span>
                      <span className="sg-card__body">
                        <span className="sg-card__meta">
                          <span className="sg-card__category">{g.category}</span>
                          <span className="sg-card__date">{new Date(g.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </span>
                        <span className="sg-card__title">{g.title}</span>
                        {g.description && <span className="sg-card__desc">{g.description}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {activeGallery && (
        <div className="sg-lightbox" role="dialog" aria-modal="true" aria-label={activeGallery.title} onClick={closeLightbox}>
          <div className="sg-lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <div className="sg-lightbox__top">
              <p className="sg-lightbox__title">{activeGallery.title}</p>
              <button type="button" className="sg-lightbox__close" onClick={closeLightbox} aria-label="Close gallery">
                <X size={18} />
              </button>
            </div>

            {images.length > 0 ? (
              <div className="sg-lightbox__stage">
                <figure className="sg-lightbox__slide" key={activeIndex}>
                  <img
                    src={images[activeIndex].url}
                    alt={images[activeIndex].caption || `${activeGallery.title} photo ${activeIndex + 1}`}
                  />
                  {images[activeIndex].caption && (
                    <figcaption className="sg-lightbox__caption">{images[activeIndex].caption}</figcaption>
                  )}
                </figure>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="sg-lightbox__nav sg-lightbox__nav--prev"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="sg-lightbox__nav sg-lightbox__nav--next"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <p className="sg-lightbox__counter">{activeIndex + 1} / {images.length}</p>
                  </>
                )}
              </div>
            ) : (
              <p className="sg-lightbox__empty">No photos in this album yet.</p>
            )}
          </div>
        </div>
      )}
    </ScrollAnimation>
  );
}

export default SocietyGallery;

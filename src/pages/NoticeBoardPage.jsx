import { ScrollAnimation } from '../components/ui/ScrollAnimation';
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useApi } from '../hooks/useApi';
import { noticesAPI, eventsAPI, recruitmentAPI } from '../services/api';
import { LineAnimation } from '../components/ui/LineAnimation';
import PhotonBeam from '../components/ui/PhotonBeam';
import './NoticeBoardPage.css';

// ── Helpers ──
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const RECRUITMENT_ROUNDS = [
  {
    id: 'round-01',
    num: '01',
    title: 'Application Form',
    description:
      'Fill in the online form with your background, area of interest, and a short statement of purpose. Takes about 10 minutes.',
  },
  {
    id: 'round-02',
    num: '02',
    title: 'Task Round',
    description:
      'Shortlisted applicants receive a domain-specific task — a short code problem, a paper summary, or a design brief.',
  },
  {
    id: 'round-03',
    num: '03',
    title: 'Interview',
    description:
      'A 20–30 minute conversation with domain leads. We look for curiosity, rigour, and collaborative intent — not just credentials.',
  },
];

const NOTICE_CATS   = ['All', 'Recruitment', 'Competitions', 'Academic', 'Workshops', 'General'];
const EVENT_TABS    = ['Upcoming', 'Ongoing', 'Past'];
const COMBINED_CATS = ['Notices', 'Events'];

import { animate, eases } from 'animejs';

/**
 * Notice Board Page
 * Sections:
 *   - Recruitment Panel  (3-round process, horizontal arrow flow)
 *   - Combined Notice Board (Notices + Events in one section, sub-tabs)
 */
function NoticeBoardPage() {
  const [boardTab,     setBoardTab]     = useState('Notices');
  const [noticeFilter, setNoticeFilter] = useState('All');
  const [eventTab,     setEventTab]     = useState('Upcoming');
  
  const recFlowRef = React.useRef(null);

  // ── API Calls ──
  const { data: noticeRes, loading: loadingNotices } = useApi(() => 
    noticesAPI.getPublic({ category: noticeFilter === 'All' ? undefined : noticeFilter })
  , [noticeFilter]);

  const { data: eventRes, loading: loadingEvents } = useApi(() => 
    eventsAPI.getPublic({ status: eventTab.toLowerCase() })
  , [eventTab]);

  const { data: cycleRes } = useApi(() => recruitmentAPI.getPublicCycle());

  const notices = noticeRes?.data?.notices || [];
  const events = eventRes?.data?.events || [];
  const activeCycle = cycleRes?.data?.cycle;
  
  const { data: featuredNoticeRes } = useApi(() => noticesAPI.getFeatured());
  const pinnedNotice = featuredNoticeRes?.data?.notice;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const cards = recFlowRef.current.querySelectorAll('.rec-round-card');
          const arrows = recFlowRef.current.querySelectorAll('.rec-flow__arrow');
          
          const button = recFlowRef.current.querySelector('.rec-mid-btn');
          
          if (cards.length >= 3) {
            // 1st Card: Slowest, starts first
            animate(cards[0], {
              x: ['-20vw', 0],
              opacity: [0, 1],
              duration: 1400,
              ease: 'outQuad'
            });
            
            // 2nd Card: Faster, starts after a delay
            animate(cards[1], {
              x: ['-20vw', 0],
              opacity: [0, 1],
              duration: 900,
              delay: 400,
              ease: eases.outQuad
            });
            
            // 3rd Card: Very fast, starts last
            animate(cards[2], {
              x: ['-20vw', 0],
              opacity: [0, 1],
              duration: 400,
              delay: 800,
              ease: 'out(6)' // Anime.js v4 specific custom ease
            });
          }
          
          if (arrows.length > 0) {
             animate(arrows[0], { opacity: [0, 1], duration: 400, delay: 500, ease: 'inOutQuad' });
             animate(arrows[1], { opacity: [0, 1], duration: 400, delay: 900, ease: 'inOutQuad' });
          }

          if (button) {
            animate(button, {
              x: ['20vw', 0],
              opacity: [0, 1],
              duration: 2000,
              delay: 1100,
              ease: 'outQuad'
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (recFlowRef.current) {
      observer.observe(recFlowRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  //   return () => observer.disconnect();
  // }, []);

  return (
    <PageLayout>
      <div className="nb">

        {/* ── Page Header ── */}
        <header className="nb__hero container" aria-labelledby="nb-heading">
          <p className="eyebrow fade-in">Notice Board</p>
          <LineAnimation as="h1" className="nb__heading" id="nb-heading" text={"Announcements,\nEvents & Recruitment."} direction="left" staggerDelay={0.1} />
          <LineAnimation as="p" className="nb__subhead" text={"The central communication record for Neural AI \u2014 all notices, events, and openings."} direction="left" staggerDelay={0.1} />
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

        {/* ── Recruitment Panel ── */}
        <ScrollAnimation as="section" className="nb-section"
          id="recruitment"
          aria-labelledby="rec-heading"
        >
          <div className="container nb-section__inner">
            <div className="nb-section__label">
              <p className="eyebrow">Recruitment</p>
            </div>

            <div className="nb-section__content" ref={recFlowRef}>
              <LineAnimation as="h2" className="nb-section__heading" id="rec-heading" text="How to join." direction="left" staggerDelay={0.1} />

              {/* 3-round horizontal flow */}
              <div className="rec-flow" role="list" aria-label="Recruitment rounds">
                {RECRUITMENT_ROUNDS.map((round, i) => (
                  <React.Fragment key={round.id}>
                    {/* Card */}
                    <div
                      className="rec-round-card"
                      id={round.id}
                      role="listitem"
                      data-num={round.num}
                      style={{ opacity: 0 }}
                    >
                      <span className="rec-round-card__num" aria-hidden="true">
                        {round.num}
                      </span>
                      <p className="rec-round-card__title">{round.title}</p>
                      <p className="rec-round-card__desc">{round.description}</p>
                    </div>

                    {/* Arrow connector (not after the last card) */}
                    {i < RECRUITMENT_ROUNDS.length - 1 && (
                      <div className="rec-flow__arrow" aria-hidden="true" style={{ opacity: 0 }}>
                        <div className="rec-flow__arrow-line" />
                        <svg
                          className="rec-flow__arrow-head"
                          viewBox="0 0 10 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L9 8L1 15"
                            stroke="var(--signal-violet)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {activeCycle ? (
                <div className="rec-whatsapp-link-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <a
                    href={activeCycle.applyUrl || '/portal'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rec-mid-btn"
                    style={{ opacity: 0 }}
                  >
                    Apply Now ↗
                  </a>
                  <p style={{ color: 'var(--mist)', fontSize: '0.85rem' }}>
                    Deadline: {formatDate(activeCycle.deadline)}
                  </p>
                </div>
              ) : (
                <div className="rec-whatsapp-link-wrapper">
                  <p className="rec-mid-btn" style={{ opacity: 0, pointerEvents: 'none', background: 'var(--space)', color: 'var(--mist)' }}>
                    Applications Closed
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>

        {/* ── Combined Notice Board ── */}
        <ScrollAnimation as="section" className="nb-section"
          id="notice-board"
          aria-labelledby="board-heading"
        >
          <div className="container nb-section__inner">
            <div className="nb-section__label">
              <p className="eyebrow">Notice Board</p>
            </div>

            <div className="nb-section__content">
              <LineAnimation as="h2" className="nb-section__heading" id="board-heading" text="Announcements & Events." direction="left" staggerDelay={0.1} />

              {/* Primary tabs: Notices / Events */}
              <div className="board-tabs" role="tablist" aria-label="Notice board sections">
                {COMBINED_CATS.map(tab => (
                  <button
                    key={tab}
                    role="tab"
                    id={`board-tab-${tab.toLowerCase()}`}
                    aria-selected={boardTab === tab}
                    aria-controls={`board-panel-${tab.toLowerCase()}`}
                    className={`board-tab ${boardTab === tab ? 'board-tab--active' : ''}`}
                    onClick={() => setBoardTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* ── Notices panel ── */}
              {boardTab === 'Notices' && (
                <div
                  id="board-panel-notices"
                  role="tabpanel"
                  aria-labelledby="board-tab-notices"
                >
                  {/* Pinned */}
                  {pinnedNotice && (
                    <div
                      className="notice-pinned"
                      id={`pinned-${pinnedNotice.id}`}
                      aria-label="Pinned announcement"
                    >
                      <span className="notice-pinned__tag">Pinned</span>
                      <LineAnimation as="p" className="notice-pinned__title" text={pinnedNotice.title} direction="left" staggerDelay={0.1} />
                      <LineAnimation as="p" className="notice-pinned__desc" text={pinnedNotice.description} direction="left" staggerDelay={0.1} />
                      <span className="notice-pinned__date">{formatDate(pinnedNotice.publishedAt || pinnedNotice.createdAt)}</span>
                    </div>
                  )}

                  {/* Category filter */}
                  <div className="notice-filters" role="group" aria-label="Notice categories">
                    {NOTICE_CATS.map(cat => (
                      <button
                        key={cat}
                        id={`notice-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                        aria-pressed={noticeFilter === cat}
                        className={`notice-filter-btn ${noticeFilter === cat ? 'notice-filter-btn--active' : ''}`}
                        onClick={() => setNoticeFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {loadingNotices ? (
                    <div className="spinner" style={{ margin: '2rem auto' }}></div>
                  ) : (
                  <ul className="notice-list" role="list" aria-live="polite">
                    {notices.map(notice => (
                      <li key={notice.id} className="notice-card" id={notice.id}>
                        <div className="notice-card__top">
                          <span className="notice-card__cat">{notice.category}</span>
                          <span className="notice-card__date">{formatDate(notice.publishedAt || notice.createdAt)}</span>
                        </div>
                        <LineAnimation as="p" className="notice-card__title" text={notice.title} direction="left" staggerDelay={0.1} />
                        <LineAnimation as="p" className="notice-card__desc" text={notice.description} direction="left" staggerDelay={0.1} />
                      </li>
                    ))}
                  </ul>
                  )}

                  {!loadingNotices && notices.length === 0 && (
                    <p className="board-empty">No notices in this category.</p>
                  )}
                </div>
              )}

              {/* ── Events panel ── */}
              {boardTab === 'Events' && (
                <div
                  id="board-panel-events"
                  role="tabpanel"
                  aria-labelledby="board-tab-events"
                >
                  {/* Event status sub-tabs */}
                  <div className="events-subtabs" role="group" aria-label="Event status">
                    {EVENT_TABS.map(tab => (
                      <button
                        key={tab}
                        id={`event-tab-${tab.toLowerCase()}`}
                        aria-pressed={eventTab === tab}
                        className={`events-subtab ${eventTab === tab ? 'events-subtab--active' : ''}`}
                        onClick={() => setEventTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {loadingEvents ? (
                    <div className="spinner" style={{ margin: '2rem auto' }}></div>
                  ) : (
                  <ul className="events-list" role="list" aria-live="polite">
                    {events.map(evt => (
                      <li key={evt.id} className="event-card" id={evt.id}>
                        <div className="event-card__meta">
                          <span className="event-card__cat">{evt.category}</span>
                          <span className="event-card__date">
                            {formatDate(evt.date)}
                            {evt.endDate ? ` — ${formatDate(evt.endDate)}` : ''}
                          </span>
                        </div>
                        <LineAnimation as="h3" className="event-card__title" text={evt.title} direction="left" staggerDelay={0.1} />
                        <LineAnimation as="p" className="event-card__desc" text={evt.description} direction="left" staggerDelay={0.1} />
                        <div className="event-card__details">
                          <span className="event-card__detail-item">
                            <span className="event-card__detail-key">Time</span>
                            {evt.time}
                          </span>
                          <span className="event-card__detail-item">
                            <span className="event-card__detail-key">Venue</span>
                            {evt.venue}
                          </span>
                        </div>
                        <div className="event-card__footer">
                          <div className="event-card__tags">
                            {evt.tags.map(tag => (
                              <span key={tag} className="event-tag">{tag}</span>
                            ))}
                          </div>
                          {evt.registrationOpen && evt.registrationUrl && (
                            <a
                              href={evt.registrationUrl}
                              className="event-card__register-btn"
                              id={`register-${evt.id}`}
                            >
                              Register →
                            </a>
                          )}
                          {evt.status === 'past' && (
                            <span className="event-card__past-badge">Concluded</span>
                          )}
                          {evt.status === 'ongoing' && (
                            <span className="event-card__ongoing-badge">● Ongoing</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  )}

                  {!loadingEvents && events.length === 0 && (
                    <p className="board-empty">No {eventTab.toLowerCase()} events right now.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>

      </div>
    </PageLayout>
  );
}

export default NoticeBoardPage;

import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { ALL_NOTICES, ALL_EVENTS } from '../data/noticeData';
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

  const filteredNotices = noticeFilter === 'All'
    ? ALL_NOTICES
    : ALL_NOTICES.filter(n => n.category === noticeFilter);

  const filteredEvents = ALL_EVENTS.filter(
    e => e.status === eventTab.toLowerCase()
  );

  const pinnedNotice = ALL_NOTICES.find(n => n.pinned);

  return (
    <PageLayout>
      <div className="nb">

        {/* ── Page Header ── */}
        <header className="nb__hero container" aria-labelledby="nb-heading">
          <p className="eyebrow fade-in">Notice Board</p>
          <h1 className="nb__heading fade-in fade-in--d1" id="nb-heading">
            Announcements,<br />Events &amp; Recruitment.
          </h1>
          <p className="nb__subhead fade-in fade-in--d2">
            The central communication record for Neural AI — all notices, events, and openings.
          </p>
        </header>

        {/* ── Recruitment Panel ── */}
        <section
          className="nb-section reveal"
          id="recruitment"
          aria-labelledby="rec-heading"
        >
          <div className="container nb-section__inner">
            <div className="nb-section__label">
              <p className="eyebrow">Recruitment</p>
            </div>

            <div className="nb-section__content">
              <h2 className="nb-section__heading" id="rec-heading">
                How to join.
              </h2>

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
                    >
                      <span className="rec-round-card__num" aria-hidden="true">
                        {round.num}
                      </span>
                      <p className="rec-round-card__title">{round.title}</p>
                      <p className="rec-round-card__desc">{round.description}</p>
                    </div>

                    {/* Arrow connector (not after the last card) */}
                    {i < RECRUITMENT_ROUNDS.length - 1 && (
                      <div className="rec-flow__arrow" aria-hidden="true">
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
            </div>
          </div>
        </section>

        {/* ── Combined Notice Board ── */}
        <section
          className="nb-section reveal"
          id="notice-board"
          aria-labelledby="board-heading"
        >
          <div className="container nb-section__inner">
            <div className="nb-section__label">
              <p className="eyebrow">Notice Board</p>
            </div>

            <div className="nb-section__content">
              <h2 className="nb-section__heading" id="board-heading">
                Announcements &amp; Events.
              </h2>

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
                      <p className="notice-pinned__title">{pinnedNotice.title}</p>
                      <p className="notice-pinned__desc">{pinnedNotice.description}</p>
                      <span className="notice-pinned__date">{formatDate(pinnedNotice.date)}</span>
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

                  <ul className="notice-list" role="list" aria-live="polite">
                    {filteredNotices.map(notice => (
                      <li key={notice.id} className="notice-card" id={notice.id}>
                        <div className="notice-card__top">
                          <span className="notice-card__cat">{notice.category}</span>
                          <span className="notice-card__date">{formatDate(notice.date)}</span>
                        </div>
                        <p className="notice-card__title">{notice.title}</p>
                        <p className="notice-card__desc">{notice.description}</p>
                      </li>
                    ))}
                  </ul>

                  {filteredNotices.length === 0 && (
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

                  <ul className="events-list" role="list" aria-live="polite">
                    {filteredEvents.map(evt => (
                      <li key={evt.id} className="event-card" id={evt.id}>
                        <div className="event-card__meta">
                          <span className="event-card__cat">{evt.category}</span>
                          <span className="event-card__date">
                            {formatDate(evt.date)}
                            {evt.endDate ? ` — ${formatDate(evt.endDate)}` : ''}
                          </span>
                        </div>
                        <h3 className="event-card__title">{evt.title}</h3>
                        <p className="event-card__desc">{evt.description}</p>
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

                  {filteredEvents.length === 0 && (
                    <p className="board-empty">No {eventTab.toLowerCase()} events right now.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}

export default NoticeBoardPage;

import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { EXECUTIVE_TEAM, LEGACY_TIMELINE, ACHIEVEMENTS, HALL_OF_FAME } from '../data/mockData';
import { CORE_VALUES } from '../data/societyData';
import TeamSlider from '../components/ui/TeamSlider';
import './SocietyPage.css';

/**
 * Society Page
 * Sections per SITEMAP.md: Our Story, Vision, Mission, Core Values,
 * Faculty Advisor, Executive Team, Departments, Legacy Timeline,
 * Hall of Fame, Society Achievements, Gallery
 */
function SocietyPage() {
  return (
    <PageLayout>
      <div className="society">

        {/* ── Page header ── */}
        <header className="society__hero container" aria-labelledby="society-heading">
          <p className="eyebrow fade-in">Society</p>
          <h1 className="society__heading fade-in fade-in--d1" id="society-heading">
            Neural AI —<br />Our Story, People<br />&amp; Legacy.
          </h1>
          <p className="society__subhead fade-in fade-in--d2">
            Founded in 2019. Chartered at DTU. Building at the frontier of AI.
          </p>
        </header>

        {/* ── Our Story ── */}
        <section className="society-section reveal" id="story" aria-labelledby="story-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Our Story</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="story-heading">
                A society born from curiosity and a whiteboard.
              </h2>
              <p className="society-section__body">
                In September 2019, twelve students gathered in a borrowed
                seminar room with one shared conviction: that AI was too important to be left to individual
                reading. They drafted a charter, elected the first set of office bearers, and registered
                Neural AI as the university's first dedicated AI research society.
              </p>
              <p className="society-section__body">
                What began as a reading group for foundational papers has grown into a community of
                240+ members, six research clusters, an annual hackathon drawing 400+ participants,
                and publications at ICLR, Springer, and NeurIPS workshops.
              </p>
              <p className="society-section__body">
                We remain, at our core, a group of students who believe the best way to understand
                AI is to build things with it — then break them, question them, and build better ones.
              </p>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="society-section reveal" id="vision" aria-labelledby="vision-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Vision &amp; Mission</p>
            </div>
            <div className="society-section__content">
              <div className="vm-grid">
                <div className="vm-item">
                  <p className="vm-item__label">Vision</p>
                  <h2 className="vm-item__statement" id="vision-heading">
                    To be the most rigorous student AI society in India — where theory and
                    practice meet, and where the next generation of AI researchers are formed.
                  </h2>
                </div>
                <div className="vm-item">
                  <p className="vm-item__label">Mission</p>
                  <p className="vm-item__body">
                    To create an environment where DTU students can go deep into AI —
                    through structured research, real project experience, peer mentorship,
                    and access to the broader research community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="society-section reveal" id="values" aria-labelledby="values-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Core Values</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="values-heading">What we stand by.</h2>
              <div className="values-timeline" role="list">
                {CORE_VALUES.map((v, i) => (
                  <div key={v.id} className="values-item" id={v.id} role="listitem">
                    <span className="values-item__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <p className="values-item__title">{v.title}</p>
                    <p className="values-item__body">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Faculty Advisor ── */}
        <section className="society-section reveal" id="faculty" aria-labelledby="faculty-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Faculty Advisor</p>
            </div>
            <div className="society-section__content">
              <div className="faculty-card" id="faculty-card">
                <div className="faculty-card__avatar" aria-hidden="true">
                  <span>PK</span>
                </div>
                <div>
                  <h2 className="faculty-card__name" id="faculty-heading">Prof. Pradeep Kumar</h2>
                  <p className="faculty-card__role">Associate Professor, Department of Computer Science</p>
                  <p className="faculty-card__dept">Delhi Technological University</p>
                  <p className="faculty-card__bio">
                    Prof. Kumar specialises in machine learning, neural architecture design, and
                    AI for healthcare. He has guided Neural AI since its founding, providing research
                    mentorship and connecting the society with industry and academic collaborators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Executive Team ── */}
        <section className="society-section reveal" id="team" aria-labelledby="team-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Executive Team</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="team-heading">2025–26 Office Bearers.</h2>
              <TeamSlider members={EXECUTIVE_TEAM} />
            </div>
          </div>
        </section>



        {/* ── Legacy Timeline ── */}
        <section className="society-section reveal" id="timeline" aria-labelledby="timeline-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Legacy Timeline</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="timeline-heading">Six years of progress.</h2>
              <ol className="timeline-list" role="list">
                {LEGACY_TIMELINE.map((era) => (
                  <li key={era.id} className="timeline-item" id={era.id}>
                    {/* Seal stamp beside each era */}
                    <svg className="timeline-item__seal" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" stroke="var(--signal-violet)" strokeWidth="0.7" opacity="0.5" />
                      <circle cx="8" cy="8" r="1.2" fill="var(--signal-violet)" opacity="0.8" />
                    </svg>
                    <div className="timeline-item__content">
                      <p className="timeline-item__year">{era.year}</p>
                      <p className="timeline-item__heading">{era.heading}</p>
                      <p className="timeline-item__body">{era.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Achievements ── */}
        <section className="society-section reveal" id="achievements" aria-labelledby="soc-ach-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Achievements</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="soc-ach-heading">Stated factually.</h2>
              <ul className="ach-list" role="list">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a.id} className="ach-row" id={`society-${a.id}`}>
                    <div>
                      <p className="ach-row__title">{a.title}</p>
                      <p className="ach-row__body">{a.body}</p>
                    </div>
                    <span className="ach-row__year">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Hall of Fame ── */}
        <section className="society-section reveal" id="hall-of-fame" aria-labelledby="hof-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Hall of Fame</p>
            </div>
            <div className="society-section__content">
              <h2 className="society-section__heading" id="hof-heading">
                Where our alumni are now.
              </h2>
              <TeamSlider members={HALL_OF_FAME} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="society-cta section reveal container">
          <div className="society-cta__inner">
            <p className="society-cta__label eyebrow">Apply to Join</p>
            <h2 className="society-cta__heading">Be part of what comes next.</h2>
            <p className="society-cta__body">
              Recruitment for 2025–26 is open. Applications close 10 August 2025.
            </p>
            <a href="/notices#recruitment" className="society-cta__btn">
              View Recruitment Details →
            </a>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}

export default SocietyPage;

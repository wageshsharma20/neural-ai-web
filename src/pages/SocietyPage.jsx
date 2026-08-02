import { ScrollAnimation } from '../components/ui/ScrollAnimation';
import { LineAnimation } from '../components/ui/LineAnimation';
import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import { EXECUTIVE_TEAM, LEGACY_TIMELINE, HALL_OF_FAME } from '../data/mockData';
import { CORE_VALUES } from '../data/societyData';
import TeamSlider from '../components/ui/TeamSlider';
import PhotonBeam from '../components/ui/PhotonBeam';
import { Timeline } from '../components/ui/Timeline';
import Achievements from '../components/sections/Achievements';
import './SocietyPage.css';


/**
 * Society Page
 * Sections per SITEMAP.md: Our Story, Vision, Mission, Core Values,
 * Faculty Advisor, Executive Team, Departments, Legacy Timeline,
 * Hall of Fame, Society Achievements, Gallery
 */
function SocietyPage() {
  const teamSectionRef = useRef(null);
  const { scrollYProgress: teamScrollProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start start", "end end"]
  });

  const hofSectionRef = useRef(null);
  const { scrollYProgress: hofScrollProgress } = useScroll({
    target: hofSectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <PageLayout>
      <div className="society">
        {/* ── Page header ── */}
        <header className="society__hero container" aria-labelledby="society-heading">
          <p className="eyebrow fade-in">Society</p>
          <LineAnimation 
            as="h1" 
            className="society__heading" 
            id="society-heading"
            text={"Neural AI —\nOur Story, People & Legacy."}
            direction="left"
            staggerDelay={0.1}
          />
          <LineAnimation 
            as="p" 
            className="society__subhead" 
            text="Founded in 2019. Chartered at DTU. Building at the frontier of AI."
            direction="left"
            staggerDelay={0.1}
          />
        </header>

        {/* Photon Beam Separator */}
        <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden', mixBlendMode: 'screen' }}>
          <PhotonBeam
            mirrored={true}
            colorBg="transparent"
            colorLine="#6b4fa0"
            useColor2={true}
            useColor3={true}
            colorSignal="#3fc7d6"
            colorSignal2="#9b6bff"
            colorSignal3="#ff2d87"
            lineCount={80}
            spreadHeight={30.33}
            signalCount={94}
            speedGlobal={0.345}
            trailLength={3}
            bloomStrength={3.0}
            bloomRadius={0.5}
          />
        </div>

        {/* ── Our Story ── */}
        <ScrollAnimation as="section" className="society-section" id="story" aria-labelledby="story-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Our Story</p>
            </div>
            <div className="society-section__content">
              <LineAnimation 
                as="h2" 
                className="society-section__heading" 
                text="A society born from curiosity and a whiteboard."
                direction="left"
                staggerDelay={0.1}
              />
              <LineAnimation 
                as="p" 
                className="society-section__body" 
                text="In September 2019, twelve students gathered in a borrowed seminar room with one shared conviction: that AI was too important to be left to individual reading. They drafted a charter, elected the first set of office bearers, and registered Neural AI as the university's first dedicated AI research society."
                direction="left"
                staggerDelay={0.1}
              />
              <LineAnimation 
                as="p" 
                className="society-section__body" 
                text="What began as a reading group for foundational papers has grown into a community of 240+ members, six research clusters, an annual hackathon drawing 400+ participants, and publications at ICLR, Springer, and NeurIPS workshops."
                direction="left"
                staggerDelay={0.1}
              />
              <LineAnimation 
                as="p" 
                className="society-section__body" 
                text="We remain, at our core, a group of students who believe the best way to understand AI is to build things with it — then break them, question them, and build better ones."
                direction="left"
                staggerDelay={0.1}
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* ── Vision & Mission ── */}
        <ScrollAnimation as="section" className="society-section" id="vision" aria-labelledby="vision-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Vision &amp; Mission</p>
            </div>
            <div className="society-section__content">
              <div className="vm-grid">
                <div className="vm-item">
                  <p className="vm-item__label">Vision</p>
                  <LineAnimation 
                    as="h2" 
                    className="vm-item__statement" 
                    id="vision-heading"
                    text="To be the most rigorous student AI society in India — where theory and practice meet, and where the next generation of AI researchers are formed."
                    direction="left"
                    staggerDelay={0.1}
                  />
                </div>
                <div className="vm-item">
                  <p className="vm-item__label">Mission</p>
                  <LineAnimation 
                    as="p" 
                    className="vm-item__body" 
                    text="To create an environment where DTU students can go deep into AI — through structured research, real project experience, peer mentorship, and access to the broader research community."
                    direction="left"
                    staggerDelay={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* ── Core Values ── */}
        <ScrollAnimation as="section" className="society-section" id="values" aria-labelledby="values-heading">
          <div className="container society-section__inner">
            <div className="society-section__label">
              <p className="eyebrow">Core Values</p>
            </div>
            <div className="society-section__content">
              <LineAnimation 
                as="h2" 
                className="society-section__heading" 
                id="values-heading"
                text="What we stand by."
                direction="left"
                staggerDelay={0.1}
              />
              <div className="values-timeline" role="list">
                {CORE_VALUES.map((v, i) => (
                  <div key={v.id} className="values-item" id={v.id} role="listitem">
                    <span className="values-item__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <LineAnimation as="p" className="values-item__title" text={v.title} direction="left" staggerDelay={0.1} />
                    <LineAnimation as="p" className="values-item__body" text={v.body} direction="left" staggerDelay={0.1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* ── Faculty Advisor ── */}
        <ScrollAnimation as="section" className="society-section" id="faculty" aria-labelledby="faculty-heading">
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
                  <LineAnimation as="h2" className="faculty-card__name" id="faculty-heading" text="Prof. Pradeep Kumar" direction="left" staggerDelay={0.1} />
                  <LineAnimation as="p" className="faculty-card__role" text="Associate Professor, Department of Computer Science" direction="left" staggerDelay={0.1} />
                  <LineAnimation as="p" className="faculty-card__dept" text="Delhi Technological University" direction="left" staggerDelay={0.1} />
                  <LineAnimation 
                    as="p" 
                    className="faculty-card__bio" 
                    text="Prof. Kumar specialises in machine learning, neural architecture design, and AI for healthcare. He has guided Neural AI since its founding, providing research mentorship and connecting the society with industry and academic collaborators." 
                    direction="left" 
                    staggerDelay={0.1} 
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* ── 5. Executive Team ── */}
        <div ref={teamSectionRef} className="society-section team-hscroll" id="team" aria-labelledby="team-heading">
          <div className="team-hscroll__sticky">
            <ScrollAnimation as="div" viewport={{ once: true, amount: 0.05 }}>
              <div className="container society-section__inner">
                <div className="society-section__label">
                  <p className="eyebrow">Executive Team</p>
                </div>
                <div className="society-section__content">
                  <h2 className="society-section__heading" id="team-heading">2025–26 Office Bearers.</h2>
                  <TeamSlider members={EXECUTIVE_TEAM} scrollYProgress={teamScrollProgress} />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* ── Legacy Timeline ── */}
        <ScrollAnimation as="section" className="society-section" id="timeline" aria-labelledby="timeline-heading">
          <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Legacy Timeline</p>
              <h2 className="society-section__heading" id="timeline-heading">Six years of progress.</h2>
            </div>
            
            <Timeline data={LEGACY_TIMELINE.map((era) => ({
              title: era.year,
              content: (
                <div>
                  <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--bone)' }}>
                    {era.heading}
                  </h4>
                  <p style={{ color: 'var(--mist-light)', lineHeight: '1.6' }}>
                    {era.body}
                  </p>
                </div>
              )
            }))} />
          </div>
        </ScrollAnimation>

        {/* ── Achievements ── */}
        <Achievements variant="society" />

        {/* ── Hall of Fame ── */}
        <div ref={hofSectionRef} className="society-section team-hscroll" id="hall-of-fame" aria-labelledby="hof-heading">
          <div className="team-hscroll__sticky">
            <ScrollAnimation as="div" viewport={{ once: true, amount: 0.05 }}>
              <div className="container society-section__inner">
                <div className="society-section__label">
                  <p className="eyebrow">Hall of Fame</p>
                </div>
                <div className="society-section__content">
                  <LineAnimation as="h2" className="society-section__heading" id="hof-heading" text="Where our alumni are now." direction="left" staggerDelay={0.1} />
                  <TeamSlider members={HALL_OF_FAME} scrollYProgress={hofScrollProgress} />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
        {/* ── CTA ── */}
        <ScrollAnimation as="section" className="society-cta section container">
          <div className="society-cta__inner">
            <p className="society-cta__label eyebrow">Apply to Join</p>
            <LineAnimation as="h2" className="society-cta__heading" text="Be part of what comes next." direction="left" staggerDelay={0.1} />
            <LineAnimation as="p" className="society-cta__body" text={"Recruitment for 2025\u201326 is open. Applications close 10 August 2025."} direction="left" staggerDelay={0.1} />
            <a href="/notices#recruitment" className="society-cta__btn">
              View Recruitment Details →
            </a>
          </div>
        </ScrollAnimation>

      </div>
    </PageLayout>
  );
}

export default SocietyPage;

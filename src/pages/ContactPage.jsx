import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for reaching out! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <PageLayout>
      <main className="contact-page container">
        <div className="contact-page__grid">
          
          {/* Left Section */}
          <section className="contact-info">
            <h1 className="contact-info__heading">Collaborate with us!</h1>
            <p className="contact-info__desc">
              Whether you're looking to partner on cutting-edge research, recruit top student talent, or sponsor our next major hackathon, Neural AI is your gateway to the brightest minds in artificial intelligence. Let's collaborate to push boundaries and drive community-driven innovation.
            </p>
            

            <div className="contact-details">
              <div className="contact-detail">
                <svg className="contact-detail__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:contact@neural-ai.in" className="contact-detail__text">contact@neural-ai.in</a>
              </div>
              <div className="contact-detail">
                <svg className="contact-detail__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="contact-detail__text">Delhi Technological University, Shahbad Daulatpur, Delhi 110042</span>
              </div>
            </div>
            
            {/* Abstract Background Visuals */}
            <div className="contact-info__bg-glow"></div>
            <div className="contact-info__bg-glow contact-info__bg-glow--alt"></div>
          </section>

          {/* Right Section: Form */}
          <section className="contact-form-wrapper">
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" name="message" className="form-input form-textarea" rows="4" value={formData.message} onChange={handleChange} required placeholder="Tell us more about your inquiry..."></textarea>
                </div>
                <button type="submit" className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
                <p className="form-note">We'll get back to you within 2–3 business days.</p>
              </form>
            </div>
          </section>

        </div>
      </main>
    </PageLayout>
  );
}

export default ContactPage;

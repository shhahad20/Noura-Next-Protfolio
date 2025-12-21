"use client";
import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube, Dribbble } from 'lucide-react';
import '../styles/ContactPage.scss';
import Navbar from './Navbar';
import Footer from './Footer';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    services: {
      websiteDesign: true,
      uxDesign: true,
      userResearch: false,
      contentCreation: false,
      strategyConsulting: false,
      other: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (service: keyof typeof formData.services) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <>
    <Navbar />
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__grid">
          {/* Left Column - Contact Info */}
          <div className="contact-page__info">
            <div>
              {/* <div className="contact-page__logo-section">
                <div className="contact-page__logo">
                  <div className="contact-page__logo-icon">
                    <div className="contact-page__logo-icon-inner">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <span className="contact-page__logo-text">Untitled UI</span>
                </div>
              </div> */}

              <div className="contact-page__contact-methods">
                <div className="contact-page__method">
                  <MessageCircle className="contact-page__method-icon" />
                  <div className="contact-page__method-content">
                    <h3 className="contact-page__method-title">Chat to us</h3>
                    <p className="contact-page__method-description">Our friendly team is here to help.</p>
                    <a href="mailto:noura.m.alth@gmail.com" className="contact-page__method-link">
                      noura.m.alth@gmail.com
                    </a>
                  </div>
                </div>

                {/* <div className="contact-page__method">
                  <MapPin className="contact-page__method-icon" />
                  <div className="contact-page__method-content">
                    <h3 className="contact-page__method-title">Visit us</h3>
                    <p className="contact-page__method-description">Come say hello at our office HQ.</p>
                    <p className="contact-page__method-address">100 Smith Street</p>
                    <p className="contact-page__method-address">Collingwood VIC 3066 AU</p>
                  </div>
                </div> */}

                <div className="contact-page__method">
                  <Phone className="contact-page__method-icon" />
                  <div className="contact-page__method-content">
                    <h3 className="contact-page__method-title">Call us</h3>
                    <p className="contact-page__method-description">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+15550000000" className="contact-page__method-link">
                      +1 (555) 000-0000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-page__socials">
              {/* <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter />
              </a> */}
              <a href="https://www.linkedin.com/in/noura-muhammad-252247177?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bf0ifJnl6TA6tNzygab8u%2FA%3D%3D" aria-label="LinkedIn">
                <Linkedin />
              </a>
              {/* <a href="#" aria-label="YouTube">
                <Youtube />
              </a> */}
              {/* <a href="#" aria-label="Dribbble">
                <Dribbble />
              </a> */}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-page__form-section">
            <div className="contact-page__form-container">
              <h1 className="contact-page__heading">
                Got ideas? We&apos;ve got the skills. Let&apos;s team up.
              </h1>
              <p className="contact-page__subheading">
                Tell us more about yourself and what you&apos;ve got in mind.
              </p>

              <div className="contact-page__form">
                <div className="contact-page__input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="contact-page__input"
                  />
                </div>

                <div className="contact-page__input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-page__input"
                  />
                </div>

                <div className="contact-page__input-group">
                  <textarea
                    name="project"
                    placeholder="Tell us a little about the project..."
                    value={formData.project}
                    onChange={handleInputChange}
                    rows={3}
                    className="contact-page__textarea"
                  />
                </div>

                <div className="contact-page__checkbox-section">
                  <p className="contact-page__checkbox-title">How can we help?</p>
                  <div className="contact-page__checkbox-grid">
                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.websiteDesign}
                          onChange={() => handleCheckboxChange('websiteDesign')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.websiteDesign && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">Website design</span>
                    </label>

                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.contentCreation}
                          onChange={() => handleCheckboxChange('contentCreation')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.contentCreation && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">Content creation</span>
                    </label>

                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.uxDesign}
                          onChange={() => handleCheckboxChange('uxDesign')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.uxDesign && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">UX design</span>
                    </label>

                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.strategyConsulting}
                          onChange={() => handleCheckboxChange('strategyConsulting')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.strategyConsulting && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">Strategy & consulting</span>
                    </label>

                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.userResearch}
                          onChange={() => handleCheckboxChange('userResearch')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.userResearch && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">User research</span>
                    </label>

                    <label className="contact-page__checkbox-label">
                      <div className="contact-page__checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={formData.services.other}
                          onChange={() => handleCheckboxChange('other')}
                          className="contact-page__checkbox"
                        />
                        {formData.services.other && (
                          <svg className="contact-page__checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="contact-page__checkbox-text">Other</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="contact-page__submit"
                >
                  Let&apos;s get started!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
}
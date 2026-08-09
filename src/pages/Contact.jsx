import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Clock, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'dealer',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5C6742', '#A94E1D', '#FAF6F0']
    });

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'dealer',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="section-padding animate-fade" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Schedule a <span>Free Consultation</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '14px' }}>
            Have a project in mind, want to join our dealership network, or register as an painter/applicator? Fill out the form below.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'stretch'
        }} className="contact-grid">
          
          {/* Left Column: Form */}
          <div style={{
            backgroundColor: 'var(--bg-white)',
            padding: '40px 30px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Send Us a Message</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
              We usually reply within 24 hours of receiving inquiries.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-double">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-double">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Inquiry Type / Purpose *
                  </label>
                  <select
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '14px',
                      color: 'var(--text-dark)',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="dealer">🤝 Become a Dealer / Partner</option>
                    <option value="painter">🎨 Become a Painter / Contractor</option>
                    <option value="product">📦 Product & Bulk Order Inquiry</option>
                    <option value="consultation">🏠 Free Wall Consultation / General</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Dealership query in Bhopal / Living room wall"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your walls, color selections, or dampness issues..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '14px 30px' }}>
                <Send size={16} /> Submit Details
              </button>
            </form>

            {/* Success Banner */}
            {isSubmitted && (
              <div style={{
                marginTop: '20px',
                backgroundColor: 'rgba(92, 103, 66, 0.08)',
                borderLeft: '5px solid var(--primary)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'fadeIn 0.3s ease'
              }}>
                <CheckCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Inquiry Submitted Successfully!</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Thank you. We have received your details. An inspection engineer will call you shortly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Direct Cards */}
            <div style={{
              backgroundColor: 'var(--bg-white)',
              padding: '30px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Corporate Contact Details
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Phone Call */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(169, 78, 29, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Call Anytime (Toll Free)</span>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)', marginTop: '2px' }}>
                      <a href="tel:+917225020180">7225020180</a>
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Monday - Saturday, 9 AM - 6 PM</p>
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(92, 103, 66, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Send Email Inquiry</span>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)', marginTop: '2px' }}>
                      <a href="mailto:awantikaradhyaindustries@gmail.com">awantikaradhyaindustries@gmail.com</a>
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>For partnership/dealer queries: <a href="mailto:awantikaradhyaindustries@gmail.com" style={{ textDecoration: 'underline' }}>awantikaradhyaindustries@gmail.com</a></p>
                  </div>
                </div>

              </div>
            </div>

            {/* Address Location Cards */}
            <div style={{
              backgroundColor: 'var(--bg-white)',
              padding: '30px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              flexGrow: 1
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Factory & Registered Office
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Factory & Corporate Head Office</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>
                      18-19, Sector-D, Industrial Area,<br />
                      Mandideep, Dist. Raisen, Bhopal,<br />
                      Madhya Pradesh - 462046
                    </p>
                  </div>
                </div>
              </div>

              {/* Group Banner */}
              <div style={{
                marginTop: '20px',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-dark)', letterSpacing: '0.5px' }}>
                  A unit of Awantika and Aaradhya Industries Pvt Ltd
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react'

export const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-intro">
            <span className="hero-greeting">Hi there! I'm</span>
            <h1 className="hero-name">Rogel T. Navarro Jr.</h1>
            <div className="hero-roles">
              <span className="role-tag">Software Engineer</span>
              <span className="role-tag">Web Developer</span>
              <span className="role-tag">Game Developer</span>
              <span className="role-tag">UI/UX Designer</span>
            </div>
            <p className="hero-description">
              Passionate about creating modern, user-friendly digital experiences 
              and continuously growing as a developer and designer.
            </p>
            <div className="hero-cta">
              <button className="cta-button primary">View My Work</button>
              <button className="cta-button secondary">Get In Touch</button>
            </div>
          </div>
          
          <div className="hero-chatbot-intro">
            <div className="chatbot-card">
              <div className="chatbot-icon">
                <span className="material-symbols-rounded">smart_toy</span>
              </div>
              <h3>Meet My AI Assistant</h3>
              <p>
                Welcome to my interactive chatbot! 🚀<br />
                Ask me about my skills, projects, or anything else you'd like to know.
              </p>
              <div className="chatbot-features">
                <span className="feature">💬 Chat with me</span>
                <span className="feature">📋 View my projects</span>
                <span className="feature">🎯 Learn about my skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

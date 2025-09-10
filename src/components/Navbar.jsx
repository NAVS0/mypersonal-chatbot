import React, { useState, useEffect } from 'react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h2>
            <span className="logo-text">Navs</span>
            <span className="logo-dot">.</span>
            <span className="logo-text">Devs</span>
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <a href="#home" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="link-text">Home</span>
          </a>
          <a href="#about" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
            <span className="link-text">About</span>
          </a>
          <a href="#projects" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
            <span className="link-text">Projects</span>
          </a>
          <a href="#contact" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
            <span className="link-text">Contact</span>
          </a>
          <div className="navbar-cta">
            <button className="cta-button">
              <span>Let's Talk</span>
              <span className="material-symbols-rounded">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#home" className="navbar-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              <span className="material-symbols-rounded">home</span>
              <span>Home</span>
            </a>
            <a href="#about" className="navbar-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
              <span className="material-symbols-rounded">person</span>
              <span>About</span>
            </a>
            <a href="#projects" className="navbar-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
              <span className="material-symbols-rounded">work</span>
              <span>Projects</span>
            </a>
            <a href="#contact" className="navbar-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              <span className="material-symbols-rounded">mail</span>
              <span>Contact</span>
            </a>
            <div className="mobile-cta">
              <button className="mobile-cta-button">
                <span>Let's Talk</span>
                <span className="material-symbols-rounded">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
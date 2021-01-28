import React from "react";
import { NavLink } from 'react-router-dom';

import '../assets/styles/hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="home-text">
          <div className="section-text__subtitle">Landing Page</div>
          <div className="section-text__title-big">
            Welcome to the slot game site.
          </div>
          <div className="section-text__body">
           Please register to play or login to continue.
          </div>
          <NavLink to="/register" className="btn register-btn">
            Register
          </NavLink>
        </div>

        <div className="section-image">
          <img src="../images/slotHero.png" alt="app preview" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

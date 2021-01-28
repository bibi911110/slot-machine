import React from "react";

import "../assets/styles/features.css" 

const Features = () => {
  return (
    <section id="features">
      <div className="container">
        <div className="section-image__small">
          <img src="../images/slotHero.png" alt="features" />
        </div>
        <div className="section-text">
          <div className="section-text__title">
            Some of the best features Of Our App!
          </div>

          <div className="row">
            <div className="feature-box col-50">
              <div className="section-text__title-small">Easy to customize</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>

            <div className="feature-box col-50">
              <div className="section-text__title-small">Extreme Security</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="feature-box col-50">
              <div className="section-text__title-small">Customer Support</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>

            <div className="feature-box col-50">
              <div className="section-text__title-small">Creative Design</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

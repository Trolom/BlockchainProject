import React from 'react';

function AboutUs() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Overview</h2>
        </div>
        <div className="row content">
          <div className="col-lg-6">
            <p>
            Robust backend built with Django, featuring user functionality and virtual wallets. Technologies used:
            </p>
            <ul>
              <li><i className="ri ri-check-double-line"></i>Backend: Django</li>
              <li><i className="ri ri-check-double-line"></i>Blockchain: Ganache-Cli</li>
              <li><i className="ri ri-check-double-line"></i>Frontend: React</li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <p>
            This project combines a robust Django backend with a responsive React frontend to create a seamless user experience for managing both fiat and cryptocurrencies.
            </p>
            <a href="#" className="btn-learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

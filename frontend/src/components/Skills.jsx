import React, { useEffect } from 'react';
import 'waypoints/lib/noframework.waypoints.min.js'; // Import Waypoints

function Skills() {
  useEffect(() => {

    // Initialize Waypoints for the skills content
    const skillsContent = document.querySelector('.skills-content');
    if (skillsContent) {
      new window.Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function (direction) {
          const progressBars = document.querySelectorAll('.progress .progress-bar');
          progressBars.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        },
      });
    }
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center" data-aos="fade-right" data-aos-delay="100">
            <img src="/img/skills.png" className="img-fluid" alt="Skills" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
            <h3>Programming Languages Used</h3>
            <p className="fst-italic">
              Here's a breakdown of everything we used to make it work
            </p>
            <div className="skills-content">
              <div className="progress">
                <span className="skill">Python <i className="val">35%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="progress">
                <span className="skill">Js <i className="val">30%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="progress">
                <span className="skill">HTML&CSS <i className="val">20%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="progress">
                <span className="skill">Solidity  <i className="val">5%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;

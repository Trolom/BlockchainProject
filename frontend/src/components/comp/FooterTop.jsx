import React from 'react';

function FooterTop() {
  return (
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-contact">
            <h3>Arsha</h3>
            <p>
            Splaiul Independenței 313, <br />
            București, 060042<br />
              United States <br /><br />
              <strong>Phone:</strong> 0730 309 671<br />
              <strong>Email:</strong> blockchain@info.com<br />
            </p>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="#">Faq</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Our LinkedIns</h4>
            <ul>
              <li><i className="bx bx-chevron-right"></i> <a href="https://www.linkedin.com/in/vlad-duica-ab8957257/">Vlad Duica</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="#">Tudor Puscasu</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="https://www.linkedin.com/in/dragos-rascanu-48230629b/">Dragos Rascanu</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Our Social Networks</h4>
            <p>Keep up with us</p>
            <div className="social-links mt-3">
              <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
              <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
              <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FooterTop;
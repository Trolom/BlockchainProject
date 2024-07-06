import React from 'react';

function Cta() {
  return (
    <section id="cta" className="cta">
      <div className="container" data-aos="zoom-in">
        <div className="row">
          <div className="col-lg-9 text-center text-lg-start">
            <h3>Our Virtual Wallet</h3>
            <p>
            Our virtual wallet serves as a comprehensive crypto management hub, enabling users to dive into the world of cryptocurrency with ease. Within their wallets, users can seamlessly handle both fiat (USD) and various cryptocurrencies. Our platform empowers users to effortlessly buy, sell, and convert cryptocurrencies, providing a flexible and dynamic trading experience. Additionally, with ETH allocated for gas fees, all blockchain transactions are guaranteed to be smooth and efficient. 
            </p>
          </div>
          <div className="col-lg-3 cta-btn-container text-center">
            <a className="cta-btn align-middle" href="#">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;

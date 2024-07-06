import React from 'react';

function Clients() {
  return (
    <section id="cliens" className="cliens section-bg">
      <div className="container">
        <div className="row" data-aos="zoom-in">
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/ETH.png" className="img-fluid" alt="Client 1" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/USDT.png" className="img-fluid" alt="Client 2" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/LINK.png" className="img-fluid" alt="Client 3" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/WBTC.png" className="img-fluid" alt="Client 4" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/DAI.png" className="img-fluid" alt="Client 5" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src="/img/clients/USDC.png" className="img-fluid" alt="Client 6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;

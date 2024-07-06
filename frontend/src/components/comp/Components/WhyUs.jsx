import React from 'react';

function WhyUs() {
  return (
    <section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
            <div className="content">
              <h3>Why Choose <strong>US</strong></h3>
              <p>
              Discover the key features and benefits of our platform that set us apart from the rest.
              </p>
            </div>

            <div className="accordion-list">
              <ul>
                <li>
                  <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1"><span>01</span> Solidity <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                    <p>
                    Solidity is a high-level programming language designed specifically for implementing smart contracts on blockchain platforms like Ethereum. With a syntax similar to JavaScript, Solidity allows developers to write and deploy contracts that execute automatically when certain conditions are met. These contracts ensure transparency, security, and immutability, making them ideal for decentralized applications (dApps). </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" className="collapsed"><span>02</span> Smart Contract Integration <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                    <p>
                    Utilizing Truffle, our platform incorporates smart contracts to enhance transaction security and efficiency. These smart contracts automate and enforce predefined rules, ensuring the integrity of transactions and the reliability of the platform. By leveraging smart contracts, users can execute transactions with confidence, knowing that their interactions are governed by transparent and immutable protocols.         
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" className="collapsed"><span>03</span> Transaction Capabilities <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                    <p>
                    Upon registration, users gain access to a range of transaction capabilities within the platform. They can seamlessly buy and sell various cryptocurrencies, including Bitcoin, Ethereum, and others. Additionally, users have the flexibility to convert between different cryptocurrencies, facilitating diversified investment strategies. With the ability to execute transactions securely and efficiently, users can actively participate in the dynamic cryptocurrency market and manage their digital assets with confidence.                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-5 align-items-stretch order-1 order-lg-2 img" style={{ backgroundImage: `url(/img/why-us.png)` }} data-aos="zoom-in" data-aos-delay="150">&nbsp;</div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;

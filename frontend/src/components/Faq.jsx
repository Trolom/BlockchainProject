import React from 'react';

function Faq() {
  return (
    <section id="faq" className="faq section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Frequently Asked Questions</h2>
          <p>
          Explore commonly asked questions about our blockchain project implementation. Find answers to queries about technologies used, backend features, connection to the blockchain, smart contract functionality, transaction execution, initial user balances, frontend framework, transaction security, transaction history tracking, and project documentation.
          </p>
        </div>

        <div className="faq-list">
          <ul>
            <li data-aos="fade-up" data-aos-delay="100">
              <i className="bx bx-help-circle icon-help"></i>
              <a data-bs-toggle="collapse" className="collapse" href="#faq-list-1">
              How is the user's wallet connected to the blockchain?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-chevron-up icon-close"></i>
              </a>
              <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                <p>
                The user's wallet is connected to the Ganache blockchain, where their cryptocurrency balances are stored. Transactions involving cryptocurrencies are executed on the blockchain, ensuring transparency and immutability.

                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="200">
              <i className="bx bx-help-circle icon-help"></i>
              <a data-bs-toggle="collapse" href="#faq-list-2" className="collapsed">
              What is the purpose of the smart contract implemented in the project?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-chevron-up icon-close"></i>
              </a>
              <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                <p>
                The smart contract facilitates basic transaction operations on the blockchain. It ensures the integrity and security of transactions by enforcing predefined rules and conditions.

                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="300">
              <i className="bx bx-help-circle icon-help"></i>
              <a data-bs-toggle="collapse" href="#faq-list-3" className="collapsed">
              How are transactions initiated and executed in the project?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-chevron-up icon-close"></i>
              </a>
              <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                <p>
                Transactions are initiated in the backend, where they are created and sent to the views. These transactions are then executed by calling the corresponding API endpoints from the frontend.
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="400">
              <i className="bx bx-help-circle icon-help"></i>
              <a data-bs-toggle="collapse" href="#faq-list-4" className="collapsed">
              How are transactions secured in the project?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-chevron-up icon-close"></i>
              </a>
              <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                <p>
                Transactions are secured using cryptographic techniques inherent to blockchain technology. Each transaction is cryptographically signed by the user, ensuring its authenticity and integrity.
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="500">
              <i className="bx bx-help-circle icon-help"></i>
              <a data-bs-toggle="collapse" href="#faq-list-5" className="collapsed">
              Can users track their transaction history?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-chevron-up icon-close"></i>
              </a>
              <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                <p>
                Yes, users can view their transaction history within the application. The backend maintains a record of all transactions associated with each user's wallet.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Faq;

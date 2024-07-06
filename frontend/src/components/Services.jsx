import React from 'react';

function Services() {
  return (
    <section id="services" className="services section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Technology</h2>
          <p>
          The technology we used to make it possible
          </p>
        </div>

        <div className="row">
          <div className="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bxl-dribbble"></i>
              </div>
              <h4>
                <a href="#">Web3</a>
              </h4>
              <p>Utilising Web3  allows us to establish the interaction with Ethereum blockchain networks. It provides a convenient way to communicate with Ethereum nodes, send transactions, deploy contracts, and query blockchain data.Web3.js offers robust support for Ethereum's rich ecosystem, including features like event monitoring, gas estimation, and blockchain filtering.</p>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-file"></i>
              </div>
              <h4>
                <a href="#">Celery</a>
              </h4>
              <p>Celery, a distributed task queue framework for Python, revolutionizes asynchronous task execution by utilizing a message broker like Redis or RabbitMQ to store tasks until worker processes become available. With Celery, tasks are executed asynchronously, enabling efficient handling of resource-intensive or long-running tasks without blocking the main application thread. Workers, the processes responsible for executing tasks, operate independently, allowing for scalable and parallel task execution. </p>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-tachometer"></i>
              </div>
              <h4>
                <a href="#">Blockchain Technology</a>
              </h4>
              <p>Blockchain technology offers the advantage of simulating mining in testing environments, allowing immediate block addition without the computational intensity of live networks. However, in real blockchain networks, mining involves solving complex cryptographic puzzles, ensuring security through Proof of Work mechanisms. This simulation capability facilitates rapid development and testing of blockchain applications, enabling efficient iteration before deployment. </p>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-layer"></i>
              </div>
              <h4>
                <a href="#">Ganache CLI</a>
              </h4>
              <p>As a local blockchain emulator, Ganache CLI provides a lightweight and customizable environment for simulating Ethereum networks locally on your development machine. With Ganache CLI, developers can rapidly iterate on their smart contracts and dApp logic in a controlled and predictable environment, without the need for deploying to a live blockchain network.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

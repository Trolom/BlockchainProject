// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className="container-fluid d-flex align-items-center fixed-top" style={{ backgroundColor: 'rgba(55,81,126, 0.9)', padding: '1rem', margin: '0', width: '100vw', paddingLeft: '285px', paddingRight: '350px' }}>
        <h1 className="logo me-auto"><a href="/">Blockchain</a></h1>
        <nav id="navbar" className="navbar">
        <ul>
            <li>
            <a className="nav-link scrollto active" href="#hero">Home</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#about">Overview</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#services">Technologies</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#faq">FAQ</a>
            </li>
            <li className="dropdown">
            <a href="#"><span>User</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/logout">Logout</a></li>
                <li><a href="/wallet">Wallet</a></li>
            </ul>
            </li>
            <li>
            <Link className="getstarted scrollto" href="#about">Get Started</Link>
            </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
    </div>
  );
};

export default Navbar;

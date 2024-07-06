// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><a href="/">Blockchain</a></h1>
        <nav id="navbar" className="navbar">
        <ul>
            <li>
            <a className="nav-link scrollto active" href="#hero">Home</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#about">About</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#services">Services</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#portfolio">Portfolio</a>
            </li>
            <li>
            <a className="nav-link scrollto" href="#team">Team</a>
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
            <Link className="nav-link scrollto" href="#contact">Contact</Link>
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

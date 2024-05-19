import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MyApp
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">
                            Wallet
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/services" className="navbar-link">
                            Services
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contact" className="navbar-link">
                            Contact
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/logout" className="navbar-link">
                            Logout
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/register" className="navbar-link">
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

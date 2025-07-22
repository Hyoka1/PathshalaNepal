import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-row">
          {/* Logo & Social Links */}
          <div className="footer-column">
            <h2 className="logo">
              <img
                src="./Images/logo.png" // Path to your logo image
                alt="Logo"
                style={{ width: "250px", height: "auto" }} // Adjust the size as needed
              />
            </h2>

            <p className="footer-description">
              Connecting adventurers with expert guides for unforgettable
              experiences around the world.
            </p>
            <div className="social-icons">
              <a href="#!" className="social-link">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#!" className="social-link">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#!" className="social-link">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#!" className="social-link">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li>
                <a href="#!">About Us</a>
              </li>
              <li>
                <a href="#!">Find Guides</a>
              </li>
              <li>
                <a href="#!">Destinations</a>
              </li>
              <li>
                <a href="#!">Travel Blog</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-list">
              <li>
                <a href="#!">Help Center</a>
              </li>
              <li>
                <a href="#!">Safety Guidelines</a>
              </li>
              <li>
                <a href="#!">Terms of Service</a>
              </li>
              <li>
                <a href="#!">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Contact Us</h4>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              support@guidecompass.com
            </p>
            <button className="btn-guide">
              <Link>Become a Guide </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 GuideCompass. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

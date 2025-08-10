import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="custom-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <h2 className="brand-name">🎓 Student Management</h2>
            <p>
              Empowering teachers and institutions with tools to manage student
              data, performance, and progress efficiently.
            </p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/students">Students</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>📞 +91-9876543210</p>
            <p>✉ info@studentmanagement.com</p>
            <p>📍 New Delhi, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Student Management. All Rights Reserved.
        </div>
      </footer>

      <style>{`
        .custom-footer {
          background-color: #0F172A;
          color: #fff;
          padding: 3rem 1rem;
          margin-top: 50px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }
        .footer-col {
          flex: 1;
          min-width: 220px;
        }
        .brand-col {
          flex: 1.5;
        }
        .brand-name {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #14B8A6;
        }
        .footer-col h4 {
          margin-bottom: 1rem;
          color: #14B8A6;
          font-size: 1.1rem;
          border-bottom: 2px solid #334155;
          padding-bottom: 0.5rem;
        }
        .footer-col p {
          font-size: 0.9rem;
          color: #E2E8F0;
          line-height: 1.5;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
        }
        .footer-col ul li {
          margin-bottom: 0.5rem;
        }
        .footer-col ul li a {
          color: #E2E8F0;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-col ul li a:hover {
          color: #14B8A6;
        }
        .social-icons {
          margin-top: 1rem;
        }
        .social-icons a {
          display: inline-block;
          margin-right: 10px;
          color: #E2E8F0;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        .social-icons a:hover {
          color: #14B8A6;
          transform: translateY(-2px);
        }
        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.85rem;
          color: #E2E8F0;
          border-top: 1px solid #334155;
          padding-top: 1rem;
        }
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
          .social-icons a {
            margin: 0 5px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

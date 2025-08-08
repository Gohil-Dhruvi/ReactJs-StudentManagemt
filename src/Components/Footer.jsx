import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Student Management System</h5>
            <p>
              A comprehensive solution for managing student records and
              information.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/students" className="text-white">
                  Students
                </a>
              </li>
              <li>
                <a href="/signin" className="text-white">
                  Sign In
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              <strong>Email:</strong> info@studentmanagement.com<br />
              <strong>Phone:</strong> (123) 456-7890
            </address>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Student Management System. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
import React from "react";
import { useSelector } from "react-redux";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaSearch, FaChartBar } from "react-icons/fa";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const carouselCaptionStyle = {
    background: "rgba(15, 23, 42, 0.65)", // Navy overlay
    padding: "20px",
    borderRadius: "12px",
  };

  const featureCardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "none",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.08)",
  };

  const featureIconStyle = {
    fontSize: "3rem",
    marginBottom: "15px",
    color: "#14B8A6", // Teal Accent
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const ctaBtnStyle = {
    padding: "12px 30px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  };

  return (
    <div className="home-page">
      <style>{`
        .feature-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>

      {/* Carousel Section */}
      <Carousel fade interval={3000}>
        {[
          {
            img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
            title: "Welcome to Student Management System",
            text: "Efficiently manage student records with our powerful system",
          },
          {
            img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
            title: "Track Student Progress",
            text: "Monitor and analyze student performance easily",
          },
          {
            img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
            title: "Generate Reports",
            text: "Get detailed insights on student performance and attendance",
          },
        ].map((slide, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.img}
              alt={slide.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption style={carouselCaptionStyle}>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5" style={sectionTitleStyle}>
          ✨ Key Features ✨
        </h2>
        <Row>
          {[
            {
              icon: <FaUserGraduate style={featureIconStyle} />,
              title: "Student Records",
              text: "Manage all student information in one centralized location.",
            },
            {
              icon: <FaSearch style={featureIconStyle} />,
              title: "Advanced Search",
              text: "Quickly find students with our powerful search and filter tools.",
            },
            {
              icon: <FaChartBar style={featureIconStyle} />,
              title: "Reports",
              text: "Generate detailed reports on student performance and attendance.",
            },
          ].map((feature, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 feature-card" style={featureCardStyle}>
                <Card.Body className="text-center">
                  {feature.icon}
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Call to Action Section */}
      <div
        className="py-5"

      >
        <Container className="text-center text-dark">
          <h2 className="mb-4">Ready to get started?</h2>
          {isAuthenticated ? (
            <Button
              as={Link}
              to="/students"
              size="lg"
              style={{
                background: "linear-gradient(135deg, #0F172A, #14B8A6)",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                fontSize: "1.2rem",
                borderRadius: "8px"
              }}
            >
              Manage Students
            </Button>

          ) : (
            <div>
              <Button
                as={Link}
                to="/signup"
                variant="light"
                size="lg"
                className="me-3"
                style={ctaBtnStyle}
              >
                Sign Up Now
              </Button>
              <Button
                as={Link}
                to="/signin"
                variant="outline-light"
                size="lg"
                style={ctaBtnStyle}
              >
                Sign In
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;

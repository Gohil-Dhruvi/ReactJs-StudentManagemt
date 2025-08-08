import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
            alt="Student Management System"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Welcome to Student Management System</h3>
            <p>Efficiently manage student records with our powerful system</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80"
            alt="Track Student Progress"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Track Student Progress</h3>
            <p>Monitor and analyze student performance easily</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80"
            alt="Generate Reports"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Generate Reports</h3>
            <p>Get detailed insights on student performance and attendance</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-3">📝</div>
                <Card.Title>Student Records</Card.Title>
                <Card.Text>
                  Manage all student information in one centralized location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-3">🔍</div>
                <Card.Title>Advanced Search</Card.Title>
                <Card.Text>
                  Quickly find students with our powerful search and filter tools.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="display-4 mb-3">📊</div>
                <Card.Title>Reports</Card.Title>
                <Card.Text>
                  Generate detailed reports on student performance and attendance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-light py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to get started?</h2>
          {isAuthenticated ? (
            <Button as={Link} to="/students" variant="primary" size="lg">
              Manage Students
            </Button>
          ) : (
            <div>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
                size="lg"
                className="me-3"
              >
                Sign Up Now
              </Button>
              <Button as={Link} to="/signin" variant="outline-primary" size="lg">
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

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/auth/actions";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4" sticky="top">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {/* Logo image */}
          <img
            src={logo}
            alt="Student Management Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          {/* Text next to logo */}
          {/* <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#fff" }}>
            Student Management
          </span> */}
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/students">
                  Students
                </Nav.Link>
                <Nav.Link as={Link} to="/students/add">
                  Add Student
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <>
                <span className="navbar-text me-3">
                  Welcome, {user?.displayName || user?.email || "User"}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" as={Link} to="/signin">
                  Login
                </Button>
                <Button variant="light" as={Link} to="/signup">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;

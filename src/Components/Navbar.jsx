import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/auth/actions";
import logo from "../assets/logo.webp";
import {
  FaHome,
  FaUserGraduate,
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

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
    <>
      <style>{`
        .navbar-custom {
          background: linear-gradient(90deg, #0F172A, #1E293B); /* Deep Navy Gradient */
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .navbar-custom .nav-link {
          color: #F8FAFC !important;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .navbar-custom .nav-link:hover {
          color: #14B8A6 !important; /* Teal Accent */
          transform: translateY(-2px);
        }
        .navbar-custom .btn {
          border-radius: 30px;
          padding: 6px 16px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .navbar-custom .btn:hover {
          transform: scale(1.05);
        }
        .navbar-custom .navbar-text {
          color: #E2E8F0;
          font-weight: 500;
        }
      `}</style>

      <BSNavbar expand="lg" className="navbar-custom" sticky="top" variant="dark">
        <Container>
          <BSNavbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center text-white fw-bold"
          >
            <img
              src={logo}
              alt="Student Management Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FaHome /> Home
              </Nav.Link>

              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/students">
                    <FaUserGraduate /> Students
                  </Nav.Link>
                  <Nav.Link as={Link} to="/students/add">
                    <FaPlusCircle /> Add Student
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
                    <FaSignOutAlt /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    className="me-2"
                    as={Link}
                    to="/signin"
                  >
                    <FaSignInAlt /> Login
                  </Button>
                  <Button variant="light" as={Link} to="/signup">
                    <FaUserPlus /> Register
                  </Button>
                </>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;

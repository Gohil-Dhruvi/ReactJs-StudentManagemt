import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentById, updateStudent } from "../../Redux/Students/actions";

import { FaEdit, FaArrowLeft } from "react-icons/fa";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedStudent, loading: studentLoading } = useSelector(
    (state) => state.students
  );

  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
    phone: "",
    gender: "",
    enrollmentDate: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setForm({
        name: selectedStudent.name || "",
        age: selectedStudent.age || "",
        course: selectedStudent.course || "",
        email: selectedStudent.email || "",
        phone: selectedStudent.phone || "",
        gender: selectedStudent.gender || "",
        enrollmentDate: selectedStudent.enrollmentDate || "",
        address: selectedStudent.address || "",
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateStudent(id, { ...form, name: form.name.trim() }));
      toast.success("Student updated successfully");
      navigate("/students");
    } catch (error) {
      toast.error(error.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  if (studentLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 800 }}>
      <Card className="p-4 shadow-lg border-0 rounded-4 stylish-card m-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h3 className="fw-bold text-gradient mb-0">
              <FaEdit className="me-2" />
              Edit Student
            </h3>
          </Col>
          <Col className="text-end">
            <Button
              as={Link}
              to="/students"
              variant="outline-primary"
              size="sm"
              className="student-list-btn"
            >
              <FaArrowLeft className="me-2" />
              Student List
            </Button>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h5 className="mb-3 section-title">Personal Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Information */}
          <h5 className="mb-3 section-title">Contact Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Academic Information */}
          <h5 className="mb-3 section-title">Academic Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Enter course name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enrollment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Address */}
          <h5 className="mb-3 section-title">Address</h5>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
            />
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" className="save-btn" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <FaEdit className="me-2" />
                Update Student
              </>
            )}
          </Button>
        </Form>
      </Card>

      {/* Custom CSS */}
      <style>{`
        .stylish-card {
          background: linear-gradient(145deg, #ffffff, #f3f4f6);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .text-gradient {
          background: linear-gradient(90deg, #4facfe, #00f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-weight: 600;
          color: #555;
          border-left: 4px solid #4facfe;
          padding-left: 8px;
        }
        .save-btn {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 500;
          box-shadow: 0 5px 15px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.25);
        }
        .student-list-btn {
          font-weight: 600;
          border-radius: 12px;
          padding: 6px 14px;
          box-shadow: 0 3px 10px rgba(79,172,254,0.4);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .student-list-btn:hover {
          background: #4facfe;
          color: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </Container>
  );
};

export default EditStudent;

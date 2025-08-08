// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import StudentForm from "./StudentForm";
// import { getStudentById, updateStudent } from "../../Services/studentService";
// import { toast } from "react-toastify";

// const EditStudent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState(null);

//   useEffect(() => {
//     getStudentById(id)
//       .then((data) => setInitialData(data))
//       .catch(() => toast.error("Failed to load student data."));
//   }, [id]);

//   const handleUpdateStudent = async (updatedData) => {
//     try {
//       await updateStudent(id, updatedData);
//       toast.success("Student updated successfully!");
//       navigate("/students");
//     } catch (error) {
//       toast.error("Failed to update student: " + error.message);
//     }
//   };

//   if (!initialData) return <div>Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Edit Student</h2>
//       <StudentForm initialData={initialData} onSubmit={handleUpdateStudent} />
//     </div>
//   );
// };

// export default EditStudent;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { updateStudent, fetchStudentById } from "../../Redux/Students/actions";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent, loading: studentLoading } = useSelector((state) => state.students);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    imageUrl: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchStudentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name || "",
        email: selectedStudent.email || "",
        age: selectedStudent.age?.toString() || "",
        course: selectedStudent.course || "",
        imageUrl: selectedStudent.imageUrl || ""
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }
    if (!formData.course.trim()) newErrors.course = "Course is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      await dispatch(updateStudent(id, {
        ...formData,
        age: Number(formData.age)
      }));
      
      toast.success("Student updated successfully!");
      navigate("/students");
    } catch (error) {
      toast.error(error.message || "Failed to update student");
    } finally {
      setSubmitting(false);
    }
  };

  if (studentLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Edit Student</h2>
          
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              Please fix the errors below
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age *</Form.Label>
              <Form.Control
                type="number"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course *</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/student.jpg"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Updating...
                  </>
                ) : "Update Student"}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate("/students")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditStudent;
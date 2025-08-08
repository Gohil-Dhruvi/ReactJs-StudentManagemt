import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { addStudent, updateStudent, fetchStudentById } from "../../Redux/Students/actions";
import { toast } from "react-toastify";

const StudentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent, loading } = useSelector((state) => state.students);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && selectedStudent) {
      setFormData({
        name: selectedStudent.name || "",
        email: selectedStudent.email || "",
        age: selectedStudent.age || "",
        course: selectedStudent.course || "",
        imageUrl: selectedStudent.imageUrl || ""
      });
    }
  }, [selectedStudent, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.age || !formData.course) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (isNaN(formData.age) || Number(formData.age) <= 0) {
      toast.error("Please enter a valid age");
      return;
    }

    try {
      if (id) {
        await dispatch(updateStudent(id, formData));
        toast.success("Student updated successfully!");
      } else {
        await dispatch(addStudent(formData));
        toast.success("Student added successfully!");
      }
      navigate("/students");
    // } catch (error) {
    } catch {
      toast.error("Error saving student");
    }
  };

  if (loading && id) return <Spinner animation="border" className="d-block mx-auto" />;

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">{id ? "Edit Student" : "Add New Student"}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                min="1"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                {id ? "Update Student" : "Add Student"}
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
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

export default StudentForm;
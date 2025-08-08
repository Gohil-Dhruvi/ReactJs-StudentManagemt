// // src/Components/Student/StudentDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getStudentById } from "../../Services/studentService";
// import { toast } from "react-toastify";

// const StudentDetails = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     getStudentById(id)
//       .then(setStudent)
//       .catch(() => toast.error("Failed to load student details."));
//   }, [id]);

//   if (!student) return <div>Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Student Details</h2>
//       <p><strong>Name: </strong>{student.name}</p>
//       <p><strong>Email: </strong>{student.email}</p>
//       <p><strong>Course: </strong>{student.course}</p>
//       <Link to="/students" className="btn btn-secondary mt-3">Back to list</Link>
//     </div>
//   );
// };

// export default StudentDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { fetchStudentById, deleteStudent } from "../../Redux/Students/actions";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent: student, loading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudentById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await dispatch(deleteStudent(id));
        toast.success("Student deleted successfully");
        navigate("/students");
    //   } catch (error) {
      } catch {
        toast.error("Failed to delete student");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  if (!student) {
    return (
      <Alert variant="warning" className="mt-4">
        Student not found
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-3"
      >
        <FaArrowLeft className="me-2" /> Back
      </Button>
      
      <Card className="shadow">
        {student.imageUrl ? (
          <Card.Img 
            variant="top" 
            src={student.imageUrl} 
            alt={student.name}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        ) : (
          <div className="text-center py-5 bg-light">
            <h1 className="display-1 text-muted">
              <span role="img" aria-label="Student">👨‍🎓</span>
            </h1>
          </div>
        )}
        
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title className="mb-0">
              {student.name} <Badge bg="info">Age: {student.age}</Badge>
            </Card.Title>
            <div>
              <Button 
                as={Link} 
                to={`/students/edit/${student.id}`} 
                variant="warning" 
                size="sm"
                className="me-2"
              >
                <FaEdit className="me-1" /> Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={handleDelete}
              >
                <FaTrash className="me-1" /> Delete
              </Button>
            </div>
          </div>
          
          <Card.Subtitle className="mb-3 text-muted">
            {student.course}
          </Card.Subtitle>
          
          <div className="mb-4">
            <h6>Contact Information</h6>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong> {student.email}
              </li>
              <li>
                <strong>Student ID:</strong> {student.id}
              </li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h6>Timestamps</h6>
            <ul className="list-unstyled">
              <li>
                <strong>Created:</strong> {new Date(student.createdAt).toLocaleString()}
              </li>
              <li>
                <strong>Last Updated:</strong> {new Date(student.updatedAt).toLocaleString()}
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentDetails;
// // src/Components/Student/StudentCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const StudentCard = ({ student }) => {
//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <h5 className="card-title">{student.name}</h5>
//         <p className="card-text">Email: {student.email}</p>
//         <p className="card-text">Course: {student.course}</p>
//         <Link to={`/students/${student.id}`} className="btn btn-info btn-sm me-2">
//           Details
//         </Link>
//         <Link to={`/students/edit/${student.id}`} className="btn btn-warning btn-sm">
//           Edit
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default StudentCard;

import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

const StudentCard = ({ student, onDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      {student.imageUrl ? (
        <Card.Img 
          variant="top" 
          src={student.imageUrl} 
          alt={student.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div className="text-center py-4 bg-light">
          <FaUserGraduate size={80} className="text-muted" />
        </div>
      )}
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {student.course}
        </Card.Subtitle>
        
        <div className="mb-3">
          <Badge bg="info" className="me-2">
            Age: {student.age}
          </Badge>
          <Badge bg="secondary">
            ID: {student.id.substring(0, 6)}...
          </Badge>
        </div>
        
        <Card.Text className="text-truncate">
          <small className="text-muted">{student.email}</small>
        </Card.Text>
        
        <div className="mt-auto d-grid gap-2">
          <Button 
            as={Link} 
            to={`/students/${student.id}`} 
            variant="outline-primary" 
            size="sm"
          >
            <FaInfoCircle className="me-1" /> Details
          </Button>
          
          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to={`/students/edit/${student.id}`} 
              variant="outline-warning" 
              size="sm"
              className="flex-grow-1"
            >
              <FaEdit className="me-1" /> Edit
            </Button>
            
            <Button 
              variant="outline-danger" 
              size="sm"
              className="flex-grow-1"
              onClick={() => onDelete(student.id)}
            >
              <FaTrash className="me-1" /> Delete
            </Button>
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer className="text-muted small">
        Updated: {new Date(student.updatedAt).toLocaleDateString()}
      </Card.Footer>
    </Card>
  );
};

export default StudentCard;
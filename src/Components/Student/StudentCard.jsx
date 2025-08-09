import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const StudentCard = ({ student, onDelete }) => {
  const initials = student.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <Card
      className="border-0 rounded-4 shadow-lg"
      style={{
        maxWidth: "350px",      
        height: "auto",         
        width: "100%",
        backdropFilter: "blur(8px)",
        background: "rgba(255, 255, 255, 0.85)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        animation: "fadeIn 0.5s ease",
        cursor: "pointer",
        margin: "auto",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 123, 255, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      }}
    >
      {/* Gradient Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #007bff, #00c6ff)",
          color: "#fff",
          padding: "0.8rem 1rem", 
          fontSize: "1.5rem",    
          textAlign: "center",
          fontWeight: "bold",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          userSelect: "none",
        }}
      >
        {initials}
      </div>

      <Card.Body
        className="d-flex flex-column justify-content-between"
        style={{ padding: "1rem 1.25rem 1rem 1.25rem" }} 
      >
        <Card.Title
          className="fw-bold text-primary mb-2"
          style={{ fontSize: "1.1rem", lineHeight: 1.2 }}
        >
          {student.name}
        </Card.Title>

        <div
          style={{
            fontSize: "0.8rem", 
            color: "#444",
            flexGrow: 1,
            lineHeight: 1.3,
          }}
        >
          <p style={{ marginBottom: "4px" }}>
            <strong>Course:</strong> {student.course || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Age:</strong> {student.age || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Gender:</strong> {student.gender || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Email:</strong> {student.email || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Phone:</strong> {student.phone || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Enrollment Date:</strong> {student.enrollmentDate || "N/A"}
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Address:</strong> {student.address || "N/A"}
          </p>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            as={Link}
            to={`/students/${student.id}`}
            variant="primary"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3"
            style={{ transition: "all 0.2s ease" }}
          >
            <FaEye /> View
          </Button>
          <Button
            as={Link}
            to={`/students/edit/${student.id}`}
            variant="warning"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3"
            style={{ transition: "all 0.2s ease" }}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3"
            style={{ transition: "all 0.2s ease" }}
            onClick={() => onDelete(student.id)}
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Card>
  );
};

export default StudentCard;

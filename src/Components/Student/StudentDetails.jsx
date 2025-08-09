import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../Config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Spinner, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          toast.error("Student not found");
        }
      } catch {
        toast.error("Failed to fetch student");
      }
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (!student)
    return <p className="text-center text-muted mt-4">No details available.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <Card className="shadow-lg border-0 rounded-4 p-4 stylish-card">
        <h2 className="text-primary fw-bold mb-3">{student.name}</h2>
        <p><strong>Age:</strong> {student.age || "N/A"}</p>
        <p><strong>Gender:</strong> {student.gender || "N/A"}</p>
        <p><strong>Email:</strong> {student.email || "N/A"}</p>
        <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
        <p><strong>Course:</strong> {student.course || "N/A"}</p>
        <p><strong>Enrollment Date:</strong> {student.enrollmentDate || "N/A"}</p>
        <p><strong>Address:</strong> {student.address || "N/A"}</p>
        <Button as={Link} to="/students" variant="secondary" className="mt-3">
          ← Back to List
        </Button>
      </Card>

      <style>{`
        .stylish-card {
          background: linear-gradient(145deg, #ffffff, #f3f4f6);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
};

export default StudentDetails;

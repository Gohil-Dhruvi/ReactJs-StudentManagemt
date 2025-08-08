// studentService.js
import { db } from "../Config/firebaseConfig";  // Adjust path as needed
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const studentsCollection = collection(db, "students");

// Get all students
export const getAllStudents = async () => {
  const snapshot = await getDocs(studentsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a student
export const addStudent = async (studentData) => {
  // Validate the studentData before sending (optional)
  const docRef = await addDoc(studentsCollection, studentData);
  return { id: docRef.id, ...studentData };
};

// Update student
export const updateStudent = async (id, updatedData) => {
  const docRef = doc(db, "students", id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

// Delete student
export const deleteStudent = async (id) => {
  const docRef = doc(db, "students", id);
  await deleteDoc(docRef);
};

// Get single student by ID
export const getStudentById = async (id) => {
  const docRef = doc(db, "students", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Student not found");
  return { id: docSnap.id, ...docSnap.data() };
};

// Search and sort (optional)
export const searchStudents = async (searchTerm, sortField, sortDirection) => {
  let q = studentsCollection;
  if (searchTerm) {
    q = query(q,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );
  }
  if (sortField) {
    q = query(q, orderBy(sortField, sortDirection || "asc"));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

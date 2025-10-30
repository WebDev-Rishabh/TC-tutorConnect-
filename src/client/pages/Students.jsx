import React, { useState } from "react";
import "../styles/Students.css";

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  // Sample student data (replace with fetched data later)
  const students = [
    {
      id: 1,
      name: "Dhruv",
      email: "dhruvchauhan53@gmail.com",
      course: "Maths",
      lastLogin: "4 days ago",
      enrolledDate: "3 Sept 2025",
      pendingClass: 2,
      totalClasses: 7,
    },
    {
      id: 2,
      name: "N/A",
      email: "Na@gmail.com",
      course: "N/A",
      lastLogin: "N/A",
    },
    {
      id: 3,
      name: "N/A",
      email: "N2@gmail.com",
      course: "N/A",
      lastLogin: "N/A",
    },
  ];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="studentsPage">
      <div className="studentsMain">
        <h2>
          Welcome Back,<span> Dhruv!</span>
        </h2>
        <p className="studentsSubtext">
          Manage your students, track progress, and engage effectively.
        </p>

        {/* Summary Cards */}
        <div className="summaryCards">
          <div className="card">
            <h3>Total Students</h3>
            <p>15</p>
          </div>
          <div className="card">
            <h3>Active Students</h3>
            <p>7</p>
          </div>
          <div className="card">
            <h3>New Enrolled</h3>
            <p>N/A</p>
            <span>Last 48 hrs</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Students Table */}
        <table className="studentsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Course</th>
              <th>Last login</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td className="emailCell">{student.email}</td>
                <td>{student.course}</td>
                <td>{student.lastLogin}</td>
                <td>
                  <button
                    className="manageBtn"
                    onClick={() => setSelectedStudent(student)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="seeAll">See all</p>
      </div>

      {/* Right Detail Panel */}
      {selectedStudent && (
        <div className="studentDetail">
          <button
            className="closeBtn"
            onClick={() => setSelectedStudent(null)}
          >
            ×
          </button>

          <div className="profileSection">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              alt="avatar"
              className="studentAvatar"
            />
            <h3>{selectedStudent.name}</h3>
            <p>{selectedStudent.email}</p>
            <p>Enrollment Date: {selectedStudent.enrolledDate}</p>
          </div>

          <div className="classInfo">
            <h4>Classes</h4>
            <div className="circleChart">
              <div className="circle">
                {selectedStudent.pendingClass} / {selectedStudent.totalClasses}
              </div>
              <p>{selectedStudent.course}</p>
            </div>
          </div>

          <div className="notesSection">
            <h4>Notes</h4>
            <textarea placeholder="Add a note..." />
            <button className="addNoteBtn">+</button>
          </div>

          <div className="manageActions">
            <button className="viewBtn">View Profile</button>
            <button className="removeBtn">Remove Student</button>
          </div>
        </div>
      )}
    </div>
  );
}

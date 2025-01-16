import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    class: "",
    venue: "",
    column: "",
    row: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, rollNumber: e.target.value });
  };

  const fetchStudentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getStudent?rollNumber=${formData.rollNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData({
          rollNumber: formData.rollNumber,
          class: data.Class,
          venue: data.Venue,
          column: data.Column,
          row: data.Row,
        });
        setError("");
      } else {
        setError("Student not found");
      }
    } catch (err) {
      setError("Error fetching data");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudentData();
  };

  return (
    <div className="form-container">
      <header>
       <b> <h1>Welcome To The Abbottabad University Of Science And Technology</h1>
        <h2>Department Of Computer Science</h2>
        <h3>Examination Section</h3></b>
      </header>
      <div className="form-section">
        <h4>Information Section</h4>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll No</label>
            <input
              type="text"
              id="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              placeholder="Roll Number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              value={formData.class}
              placeholder="Class"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              value={formData.venue}
              placeholder="Venue"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="column">Column</label>
            <input
              type="text"
              id="column"
              value={formData.column}
              placeholder="Column"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="row">Row</label>
            <input
              type="text"
              id="row"
              value={formData.row}
              placeholder="Row"
              readOnly
            />
          </div>
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default App;

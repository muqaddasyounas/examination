// Install necessary dependencies: express, csv-parser
// Run: npm install express csv-parser cors

const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch data by roll number
app.get("/api/getStudent", (req, res) => {
  const rollNumber = req.query.rollNumber;
  const results = [];

  fs.createReadStream("Book1.csv")
    .pipe(csv({ headers: ["Class", "RollNumber", "Venue", "Column", "Row"] }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const student = results.find((row) => row.RollNumber === rollNumber);

      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    });
});

// Start the server
app.listen(PORT, () => {
  console.log( `Server is running on http://localhost:${PORT}`);
});
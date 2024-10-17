import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; // For environment variables
import dbConnect from './dbConnect.js'; // MongoDB connection logic

// Load environment variables from .env file
dotenv.config(); 

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
dbConnect();

// Mapping from grades to numerical values
const gradeMapping = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'E': 0.0
};

// Function to check student eligibility
function checkStudentEligibility(grades) {
  const { introProg, oop, dsa, iwt, mad, isdm, mathComp, dbms, probStat } = grades;

  if (!['A', 'A+'].includes(introProg)) {
    return "Introduction to Programming must have a grade of 'A' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(oop)) {
    return "Object Oriented Programming must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(dsa)) {
    return "Data Structures and Algorithms must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(iwt)) {
    return "Internet and Web Technologies must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(mad)) {
    return "Mobile Application Development must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(isdm)) {
    return "Information Systems and Data Modeling must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(mathComp)) {
    return "Mathematics for Computing must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(dbms)) {
    return "Database Management Systems must have a grade of 'C+' or higher.";
  }

  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(probStat)) {
    return "Probability and Statistics must have a grade of 'C+' or higher.";
  }

  return "Congratulations! You meet the criteria to do SE.";
}

// API route to accept grades from the React frontend
app.post('/check-eligibility', (req, res) => {
  const grades = req.body;
  const result = checkStudentEligibility(grades);
  res.json({ message: result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

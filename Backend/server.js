import express from "express";
import { config } from "dotenv";
import cors from "cors";

// Importing your routes
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questionRoutes.js";
import groupMessageRoutes from "./routes/groupMessageRoutes.js";

import dbConnect from "./dbConnect.js";

// Allows us access to environment variables like from .env files
config();

// Database connection
dbConnect();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors()); // Only include once
app.use(express.json()); // Parse JSON request body

// Mount your routes
app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/api/group-messages", groupMessageRoutes);

// Function to check SE eligibility by grades
function checkSEEligibility(grades) {
  const { introProg, oop, dsa, iwt, mad, isdm, mathComp, dbms, probStat } = grades;

  if (!['A', 'A+'].includes(introProg)) {
    return "Introduction to Programming must have a grade of 'A' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(oop)) {
    return "Object Oriented Programming must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(dsa)) {
    return "Data Structures and Algorithms must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(iwt)) {
    return "Internet and Web Technologies must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(mad)) {
    return "Mobile Application Development must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(isdm)) {
    return "Information Systems and Data Modeling must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(mathComp)) {
    return "Mathematics for Computing must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(dbms)) {
    return "Database Management Systems must have a grade of 'C+' or higher to select the SE module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(probStat)) {
    return "Probability and Statistics must have a grade of 'C+' or higher to select the SE module.";
  }

  return "Congratulations! You meet the criteria to do SE.";
}

// Function to check DS eligibility by grades
function checkDSEligibility(grades) {
  const { introProg, mathComp, isdm, iwt, oop, dbms, dsa, probStat } = grades;

  // Check eligibility for DS stream based on the provided grades
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(introProg)) {
    return "Introduction to Programming must have a grade of 'C+' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B'].includes(mathComp)) {
    return "Mathematics for Computing must have a grade of 'B' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B'].includes(isdm)) {
    return "Information Systems and Data Modeling must have a grade of 'B' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(iwt)) {
    return "Internet and Web Technologies must have a grade of 'C+' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(oop)) {
    return "Object Oriented Programming must have a grade of 'C+' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B'].includes(dbms)) {
    return "Database Management Systems must have a grade of 'B' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B'].includes(dsa)) {
    return "Data Structures and Algorithms must have a grade of 'B' or higher to select the DS module.";
  }
  if (!['A+', 'A', 'A-', 'B+', 'B'].includes(probStat)) {
    return "Probability and Statistics must have a grade of 'B' or higher to select the DS module.";
  }

  return "Congratulations! You meet the criteria to do DS.";
}

// Unified API route to check both SE and DS eligibility based on grades
app.post('/check-eligibility', (req, res) => {
  const grades = req.body;

  if (!grades) {
    return res.status(400).json({ error: "Grades data is required." });
  }

  // Check SE eligibility first
  const seResult = checkSEEligibility(grades);

  // Check DS eligibility
  const dsResult = checkDSEligibility(grades);

  // Return both results to the frontend
  res.json({
    seResult,
    dsResult
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

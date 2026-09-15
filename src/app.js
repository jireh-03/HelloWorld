const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Student routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

// Authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;
require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/database");
const userModel = require("./src/models/userModel");

const port = 3000;

async function startServer() {
  await userModel.initializeTables();
  await pool.query("SELECT NOW()");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Database connected successfully");
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exitCode = 1;
});
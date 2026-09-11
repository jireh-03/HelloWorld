const app = require("./src/app");
const pool = require("./src/config/database");

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

pool.query("SELECT NOW()")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
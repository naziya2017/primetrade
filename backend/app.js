const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

module.exports = app;

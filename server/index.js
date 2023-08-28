// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

// Import routes
const usersRouter = require("./routes/users");

// Set default port for express app
const PORT = process.env.PORT || 4001;

// Create express app
const app = express();

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve(__dirname, "..", "public", "images")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/images/:id/:image", (req, res) => {
  const { id, image } = req.params;
  res.type("image/png");
  fs.readFile(
    path.join(__dirname, "..", "public", "images", `${id}/${image}`),
    function (err, content) {
      res.end(content);
    }
  );
});

// Implement users route
app.use("/users", usersRouter);

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send("Sorry we could not find that.");
});

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});

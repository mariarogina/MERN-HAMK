const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const storiesRoutes = require("./routes/stories-routes");
const usersRoutes = require("./routes/users-routes");

// routermäärittelyt tänne
//final version as of 2.8.2022
const app = express();

app.use(bodyParser.json());
// sallitaan CORS-pyynnot
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/api/stories", storiesRoutes);
app.use("/api/users", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

//ADD const options = ...

mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.zhn2t.mongodb.net/StoriesDB?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

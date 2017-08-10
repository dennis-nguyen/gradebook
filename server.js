// Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Schemas
const Students = require("./models/Students");
const Grades = require("./models/Grades");

// Express
const app = express();
const PORT = process.env.PORT || 3000;

// Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration
//mongoose.connect('mongodb://heroku_t2gfv3zf:uen6eu649kst00g6u8kpjc2430@ds151202.mlab.com:51202/heroku_t2gfv3zf'); //Deployed
mongoose.connect('mongodb://localhost/SGT'); //Local
const db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Routes

// This will redirect the users to index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Get route for articles
app.get("/students", function (req, res) {

  Students.find({}).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
      res.send(doc);
    }
  });

});

// Get route to query the notes
app.get("/grades", function (req, res) {
  console.log("get grades call")
  Grades.find({}).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });

});

// Post route to save students
app.post("/students", function (req, res) {
  // let newStudent = {
  //   "name": req.body
  // }
  Students.create(req.body, function (err) {
    console.log("working")
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Search");
    }
  });
});

// Post route to save notes
app.post("/grades", function (req, res) {
  Grades.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Grades");
    }
  });
});

// Delete route for students
app.delete("/students", function (req, res) {
  console.log(req.body);
  console.log("delete works")
  Students.remove(req.body, function (err) {
    if (err) {
      return handleError(err);
    } else {
      Grades.remove({
        student: req.body.name
      }, function (err) {
        if (err) {
          return handleError(err);
        } else {
          res.send("Deleted!")
        }
      });
    }
  });



});

// Delete route for notes
app.delete("/grades", function (req, res) {
  console.log(req.body);
  Grades.remove({
    _id: req.body
  }, function (err) {
    if (err) {
      return handleError(err);
    } else {
      res.send("Deleted!")
    }
  });
});

// This will redirect the users to index.html - wildcard
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
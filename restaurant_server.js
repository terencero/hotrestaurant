// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var sql = require("mysql");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:availability?", function(req, res) {

  var avail = req.params.availability;

  if (avail) {
    console.log(avail);
  } else {
    //something
  }

/* 

 if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        res.json(characters[i]);
        return;
      }
    }

    res.json(false);
  }
  else {
    res.json(characters);
  }

*/
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {

  var newReservation = req.body;


  var name = newReservation.reserve_name;
  var phone = newReservation.reserve_phone;
  var email = newReservation.reserve_email;
  var id = newReservation.reserve_uniqueID;

  console.log(newReservation);

  //update the DB

  //res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



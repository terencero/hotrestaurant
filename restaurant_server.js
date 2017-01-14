// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

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
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/make/:stuff?", function(req, res) {
    res.send('hello ' + req.params.stuff.toUpperCase())
        //res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/getsandwich", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function(req, res) {
    var chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                res.json(characters[i]);
                return;
            }
        }

        res.json(false);
    } else {
        res.json(characters);
    }
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    characters.push(newReservation);

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

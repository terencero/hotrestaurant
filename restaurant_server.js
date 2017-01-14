// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var sql = require("mysql");
var waitListCutoff = 3;
var reservations = [];
var waitlist = [];

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

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:action?", function(req, res) {

    var action = req.params.action;

    //if the action is reservations, send the reservation list
    if (action === 'reservations') {
        res.json(reservations);
    } else if (action === 'waitlist') {
        res.json(waitlist);
    } else {
        //let the client know that it was a bad request
        res.sendStatus(404);
    }

});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {

    //capture data from message and create a res object
    var newReservation = req.body;

    var resObject = {

        name: newReservation.reserve_name,
        phone: newReservation.reserve_phone,
        email: newReservation.reserve_email,
        id: newReservation.reserve_uniqueID,
    };

    console.log(resObject);

    //if there are more than 3 reservations, add to wailist
    var numCustomers = reservations.length;

    if (numCustomers < waitListCutoff) {

        reservations.push(resObject);
        res.sendStatus(200);

    } else {

        waitlist.push(resObject);
        res.sendStatus(200);

    }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

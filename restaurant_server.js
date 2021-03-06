// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var sql = require("mysql");
var waitListCutoff = 3;
var reservations = [{

    'name': 'brandon',
    'phone': '123-345-567',
    'email': 'branvh@gmail.com',
    'id': 'b123',
},
{

  'name': 'dan',
  'phone': '123-345-567',
  'email': 'branvh@gmail.com',
  'id': 'ddog',
},
{

  'name': 'mike',
  'phone': '123-345-567',
  'email': 'branvh@gmail.com',
  'id': 'mmmM',
}];
var waitlist = [{

  'name': 'joe',
  'phone': '123-345-567',
  'email': 'branvh@gmail.com',
  'id': 'jman',
}];

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
    console.log('sending reservations file');
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/tables", function(req, res) {
      console.log('sending tables file');
    res.sendFile(path.join(__dirname, "view.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:action?", function(req, res) {

    var action = req.params.action;

    //if the action is reservations, send the reservation list
    if (action === 'tables') {
      console.log('Sending reservations: ');
      console.log(reservations);
      res.json(reservations);
    } else if (action === 'waitlist') {
      console.log('Sending waitlist: ');
      console.log(waitlist);
      res.json(waitlist);

    } else {
        //let the client know that it was a bad request
        res.sendStatus(404);
    }

});

app.post("/api/clear", function(req, res){
  console.log('Clearing the tables...');
  reservations = [];
  waitlist = [];
  res.sendStatus(200);
})

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {

    //capture data from message and create a res object
    var newReservation = req.body;

    var resObject = {

        'name': newReservation.customerName,
        'phone': newReservation.phoneNumber,
        'email': newReservation.customerEmail,
        'id': newReservation.customerID,
    };

    console.log('Received new reservation request:');
    console.log(resObject);

    //if there are more than 3 reservations, add to wailist
    var numCustomers = reservations.length;

    if (numCustomers < waitListCutoff) {

        reservations.push(resObject);
        console.log(reservations);
        res.sendStatus(200);

    } else {

        waitlist.push(resObject);
        console.log(waitlist);
        res.sendStatus(200);

    }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

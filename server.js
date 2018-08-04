

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [{
        customerName: "Phil",
        customerEmail: "phil@phil.com",
        customerId: 1,
        phoneNumer: 1800
    },
    {
        customerName: "Christian",
        customerEmail: "christian@christian.com",
        customerId: 2,
        phoneNumer: 1900
    },
    {
        customerName: "Chris",
        customerEmail: "chris@chris.com",
        customerId: 3,
        phoneNumer: 1700
    },
    {
        customerName: "Kelsey",
        customerEmail: "kelsey@kelsey.com",
        customerId: 4,
        phoneNumer: 1600
    }
];

var waitlist = [{
    customerName: "Bob",
    customerEmail: "bob@bob.com",
    customerId: 5,
    phoneNumer: 1500
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/table", function (req, res) {
    res.sendFile(path.join(__dirname, "tablehtml.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reservehtml.html"));
});

// Displays all tables
app.get("/api/table", function (req, res) {
    return res.json(tables);
});



// Displays all tables
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// Create New table - takes in JSON input
app.post("/api/table", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newTable = req.body;
    if (tables.length < 5 && waitlist.length === 0) {
        tables.push(newTable)
    }
        if (tables.length < 5) {
            waitListToTables()
            waitlist.push(newTable)
    } else {
       waitlist.push(newTable)
    }

    console.log(newTable);
    res.json(newTable);
});

app.post("/api/waitlist", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newWaitlist = req.body;
    console.log(newWaitlist);
    waitlist.push(newWaitlist);
    res.json(newWaitlist);
});

app.get("/api/cleartable", function (req, res) {
    tables = []
    waitlist = []
    res.json(tables)
    res.json(waitlist)

})

function waitListToTables() {
    if (tables.length < 5) {
        tables.push(waitlist[0])
        waitlist.splice(0, 1)
        waitListToTables()
    }
}

function clear() {
    tables = []
    waitlist = []
}
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
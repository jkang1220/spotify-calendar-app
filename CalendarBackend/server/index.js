var express = require("express");
var bodyParser = require("body-parser");
var events = require("../db/models/event.js");
const APP_PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../../CalendarFrontEnd/dist"));

app.get("/events", function(req, res) {
  events
    .getAllEvents()
    .then(data => {
      res.send(data).status();
    })
    .catch(err => {
      console.error("Error retrieving all events from db", err);
      res.status(501);
    });
});
app.post("/events", function(req, res) {
  events.createEvent(req.body);
  res.sendStatus(200);
});

app.delete("/events/:id", function(req, res) {
  let eventId = req.params.id;
  events.deleteEvent(eventId);
  res.sendStatus(200);
});

app.put("/events/:id", function(req, res) {
  let eventId = req.params.id;
  let updatedEvent = req.body;
  events.updateEvent(eventId, updatedEvent);
  res.sendStatus(200);
});

app.listen(APP_PORT, function() {
  console.log(`listening on port ${APP_PORT}!`);
});

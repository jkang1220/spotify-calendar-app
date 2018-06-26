var mongoose = require("../").mongoose;

var eventSchema = mongoose.Schema({
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

var Event = mongoose.model("Event", eventSchema);

var getAllEvents = () => {
  return Event.find({}).exec();
};

var createEvent = event => {
  return Event.create(event, function(err, small) {
    if (err) return handleError(err);
  });
};

var updateEvent = (id, updatedEvent) => {
  return Event.findOne({ _id: id }).then(event => {
    event.set(updatedEvent);
    return event.save();
  });
};

var deleteEvent = id => {
  return Event.findOne({ _id: id }).then(event => {
    return event.remove();
  });
};

module.exports.getAllEvents = getAllEvents;
module.exports.createEvent = createEvent;
module.exports.updateEvent = updateEvent;
module.exports.deleteEvent = deleteEvent;

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };

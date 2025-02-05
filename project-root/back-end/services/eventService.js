const Event = require("../models/event");

async function createEvent(data) {
  const event = new Event(data);
  return await event.save();
}

async function getEvents() {
  return await Event.find();
}

async function updateEvent(id, data) {
  return await Event.findByIdAndUpdate(id, data, { new: true });
}

async function deleteEvent(id) {
  return await Event.findByIdAndDelete(id);
}

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};

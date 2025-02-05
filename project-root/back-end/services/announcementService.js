const Announcement = require("../models/announcement");

async function createAnnouncement(data) {
  const announcement = new Announcement(data);
  return await announcement.save();
}

async function getAnnouncements() {
  return await Announcement.find();
}

async function updateAnnouncement(id, data) {
  return await Announcement.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAnnouncement(id) {
  return await Announcement.findByIdAndDelete(id);
}

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};

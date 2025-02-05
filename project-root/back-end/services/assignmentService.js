const Assignment = require("../models/assignment");

async function createAssignment(data) {
  const assignment = new Assignment(data);
  return await assignment.save();
}

async function getAssignments() {
  return await Assignment.find();
}

async function updateAssignment(id, data) {
  return await Assignment.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAssignment(id) {
  return await Assignment.findByIdAndDelete(id);
}

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
};

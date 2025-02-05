const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true }, // lowercase: true ekledik
  password: { type: String, required: true },
  bio: String,
});

module.exports = mongoose.model("Admin", adminSchema);

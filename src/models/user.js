const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
    birthdate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String
  }
});

const Students = mongoose.model("Students", StudentSchema);
module.exports = Students;

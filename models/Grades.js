const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  student: {
    type: String
  },
  assignment: {
    type: String
  },
  grade: {
    type: Number
  },
  possible: {
    type: Number
  }
});

const Grades = mongoose.model("Grades", GradeSchema);
module.exports = Grades;

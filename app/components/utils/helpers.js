let axios = require("axios");

let helper = {
  // SAVE STUDENTS TO DB
  addStudent: function (name) {
    return axios.post("/students", {name: name});
  },
  // DELETES ARTICLES FROM DB
  deleteFromDB: function (article) {
    return axios({
    method: 'delete',
    url: '/students',
    data: article
    });
  },
  // QUERY SAVED STUDENTS FROM DB
  queryStudents: function () {
    return axios.get("/students");
  },
  // QUERY GRADES FROM DB
  queryGrades: function () {
    return axios.get("/grades");
  },
  // ADD GRADES TO DB
  addGrades: function (grade) {
    return axios.post("/grades", grade);
  },
  // DELETES GRADES FROM DB
  deleteGrade: function (ID) {
    return axios({
    method: 'delete',
    url: '/grades',
    data: ID
    });
  }
};

module.exports = helper;

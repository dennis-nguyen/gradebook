import React, {Component} from 'react';
import helpers from "../utils/helpers";

const SearchButton = () => (
  <button className="btn btn-primary center-block" type='submit'>Add</button>
)

class AddGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: "",
      assignment: "",
      grade: "",
      possible: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.gradeSubmit = this.gradeSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  gradeSubmit(e) {
    e.preventDefault();
    let studentGrade = {
      student: this.state.student,
      assignment: this.state.assignment,
      grade: this.state.grade,
      possible: this.state.possible
    }
    // Makes sure a student is selected
    if(this.state.student.length > 0){
      console.log(studentGrade)
      helpers.addGrades(studentGrade).then((data) => {
        this.props.obtainGrades();
      });
    }
  }

  render() {
    let studentOptions;
    if(this.props.studentList) {
      studentOptions = this.props.studentList.map((data,i) => {
          return (
            <option key={i}> {data}</option>
          );
      });
    }
    return (
      <div className="Search col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Add Grade</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.gradeSubmit}> 
              <div className="form-group">
                <h4 className="text-center">Student</h4>
                <select name="student" className="form-control" onChange={this.handleChange} value={this.state.selectValue} >
                  <option></option>
                  {studentOptions}
                </select>
                <h4 className="text-center">Assignment</h4>
                <input type="text" className="form-control text-center"
                name="assignment"
                onChange={this.handleChange}
                placeholder="Example: Project 2"
                required/>
                <h4 className="text-center">Student Grade</h4>
                <input type="Number" className="form-control text-center"
                name="grade"
                onChange={this.handleChange}
                placeholder="Example: 92"
                required/>
                <h4 className="text-center">Possible Max Grade</h4>
                <input type="Number" className="form-control text-center"
                name="possible"
                onChange={this.handleChange}
                placeholder="Example: 100"
                required/>
                <br/>
                <SearchButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddGrade;

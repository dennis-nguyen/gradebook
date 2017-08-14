import React, {Component} from 'react';
import helpers from "../utils/helpers";

class SavedGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      assignment: this.props.grades.assignment,
      grade: this.props.grades.grade,
      possible: this.props.grades.possible
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.updateTrue = this.updateTrue.bind(this);
  }
  updateTrue() {
    this.setState({update: true});
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  removeGrade(){
    helpers.deleteGrade(this.props.grades._id).then(()=>{
      this.props.obtainGrades();
    });
  }
  saveUpdate(e) {
    e.preventDefault();
    let studentGrade = {
      id: this.props.grades._id,
      student: this.props.student,
      assignment: this.state.assignment,
      grade: this.state.grade,
      possible: this.state.possible
    }
    // Makes sure a student is selected
      console.log(studentGrade)
      helpers.updateGrades(studentGrade).then((data) => {
        this.props.obtainGrades();
        this.setState({update: false});
      });
  }
  render() {
    if(this.state.update) {
      return (
          <tr>
            <td><input type="text" className="form-control text-center"
                name="assignment"
                onChange={this.handleChange}
                value={this.state.assignment}
                placeholder={this.props.grades.assignment}
                required/></td>
            <td> <input type="Number" className="form-control text-center"
                name="grade"
                onChange={this.handleChange}
                value={this.state.grade}
                placeholder={this.props.grades.grade}
                required/></td>
            <td><input type="Number" className="form-control text-center"
                name="possible"
                onChange={this.handleChange}
                value={this.state.possible}
                placeholder={this.props.grades.possible}
                required/></td>
            <td>{((this.state.grade/this.state.possible) * 100).toFixed(2)}% </td>
            <td><button className="btn btn-info" onClick={()=>this.saveUpdate(event)}>Save Update</button></td>
            <td><button className="btn btn-danger" onClick={this.removeGrade.bind(this)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button></td>
          </tr>
      );
   }
      return (
          <tr>
            <td>{this.props.grades.assignment}</td>
            <td>{this.props.grades.grade}</td>
            <td>{this.props.grades.possible}</td>
            <td>{((this.props.grades.grade/this.props.grades.possible) * 100).toFixed(2)}% </td>
            <td><button className="btn btn-info" onClick={()=>this.updateTrue()}>Update</button></td>
            <td><button className="btn btn-danger" onClick={this.removeGrade.bind(this)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button></td>
          </tr>
      );
  }
}

export default SavedGrades;

import React, {Component} from 'react';
import helpers from "../utils/helpers";

class SavedGrades extends Component {
  removeGrade(){
    helpers.deleteGrade(this.props.grades._id).then(()=>{
      this.props.obtainGrades();
    });
  }
  render() {
    return (
        <tr>
          <td>{this.props.grades.assignment}</td>
          <td>{this.props.grades.grade}</td>
          <td>{this.props.grades.possible}</td>
          <td>{((this.props.grades.grade/this.props.grades.possible) * 100).toFixed(2)}% </td>
          <td><button className="btn btn-danger" onClick={this.removeGrade.bind(this)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button></td>
        </tr>
    );
  }
}

export default SavedGrades;

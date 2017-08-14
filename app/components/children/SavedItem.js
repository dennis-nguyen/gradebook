import React, {Component} from 'react';
import helpers from "../utils/helpers";
import SavedGrades from "./SavedGrades";

class SavedItem extends Component {
  updateTotalGrade() {
    let totalPossible = 0;
    let totalGrade = 0; 
    if(this.props.grades.length > 0) {
      this.props.grades.map((grade)=>{
        totalPossible += grade.possible;
        totalGrade += grade.grade;
      });
      return "Current Average: " + ((totalGrade/totalPossible) * 100).toFixed(2) + "%";
    } else {
      return;
    }
  }
  
  deleteFromDb() {
    let student = {
      name: this.props.student
    }
    helpers.deleteFromDB(student).then((response)=>{
      this.props.deleteStudent(student.name);
    });
  }
  
  render() {
    let savedGrades;
    if(this.props.grades) {
      savedGrades = this.props.grades.map((data,i) => {
          return (
          <SavedGrades key={i} index={i} grades={data} obtainGrades={this.props.obtainGrades} student={this.props.student}/>
        );
      });
    }
    return (
     <div className="col-lg-12" id={"saved" + this.props.index}>
        <div className="Results col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading col-lg-12">
              <button className="btn btn-success col-lg-1 btn-xs" data-toggle="collapse" data-target={"#" + this.props.index}>Grades</button><div className="panel-title text-center col-lg-10">{this.props.student}</div> <button className="btn btn-danger col-lg-1 btn-xs" onClick={()=>{this.deleteFromDb()}}><i className="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            <div className="panel-body collapse" id={this.props.index}>
              <hr />
              <div className={"notes" + this.props.index}> 
                <h3 className="text-center">{this.updateTotalGrade()}</h3>
                 <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Assignment</th>
                        <th>Score</th>
                        <th>Max Possible Score</th>
                        <th>Percentage</th>
                        <th>Update</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedGrades}  
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedItem;

import React, {Component} from 'react';
import SavedItem from "./SavedItem";

class Saved extends Component {
  matchGrades(studentName) {
    let matchingGrades = [];
    if(this.props.grades) {
      this.props.grades.map((data,i) => {
         if(data.student == studentName){
           matchingGrades.push(data);
         }
      });
        return matchingGrades;
    }
  }
  render() {
    let savedItems;
    if(this.props.studentList) {
      savedItems = this.props.studentList.map((data,i) => {
        let matchGrades = this.matchGrades(data);
          return (
          <SavedItem key={i} index={i} student={data} grades={matchGrades} obtainGrades={this.props.obtainGrades} deleteStudent={this.props.deleteStudent}/>
        );
      });
    }
    return (
      <div className="Saved col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Students</h3>
          </div>
          <div className="panel-body studentPanel">
            {savedItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;

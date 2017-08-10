import React, {Component} from 'react';
import AddStudent from './children/AddStudent';
import Saved from './children/Saved';
import helpers from "./utils/helpers";
import Alert from "./children/Alert";
import AddGrade from "./children/AddGrade";
import Navbar from "./children/Navbar";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      savedGrades: [],
      alertVisible: false,
      addStudent: false,
      addGrade: false
    };

    this.obtainStudent = this.obtainStudent.bind(this);
    this.obtainNewGrades = this.obtainNewGrades.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.showAddStudent = this.showAddStudent.bind(this);
    this.showAddGrade = this.showAddGrade.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAddStudent(){
    this.setState({addStudent: true});
  }
  showAddGrade(){
    this.setState({addGrade: true});
  }
  componentDidMount() {
    helpers.queryStudents().then((response)=>{
        let studentList = [];
        response.data.map((student)=>{
          studentList.push(student.name);
        })
        this.setState({ studentList: studentList });
      });
    this.obtainNewGrades();
  }

  obtainStudent(newStudent) {
    let updatedList = this.state.studentList;
    updatedList.push(newStudent);
    this.setState({studentList: updatedList});
  }

  obtainNewGrades() {
    helpers.queryGrades().then((response) => {
      let gradesList = [];
       response.data.map((grades)=>{
          gradesList.push(grades);
        })
      this.setState({ savedGrades: gradesList });
    });
  }

  deleteStudent(student) {
    let index = this.state.studentList.findIndex(x => x == student);
    let currentSaved = this.state.studentList;
    currentSaved.splice(index, 1);
    this.setState({ studentList: currentSaved });
  }

  renderScreen() {
    if(this.state.addStudent === false && this.state.addGrade === false) {
      return (
        <div className="col-lg-8 col-lg-offset-2">
              <Saved studentList={this.state.studentList} grades={this.state.savedGrades} obtainGrades={this.obtainNewGrades} deleteStudent={this.deleteStudent}/>
        </div>
      );
    } else {
        return (
        <div className="col-lg-8">
              <Saved studentList={this.state.studentList} grades={this.state.savedGrades} obtainGrades={this.obtainNewGrades} deleteStudent={this.deleteStudent}/>
        </div>
      );
    }
  }
  hideAlert() {
    this.setState({ alertVisible: false });
  }
  showAlert() {
    this.setState({ alertVisible: true });
  }
  render() {
    return (
        <div className="content">
          <Alert alertVisible={this.state.alertVisible} alertHide={this.hideAlert}/>
          <Navbar openStudent={this.showAddStudent} openGrade={this.showAddGrade}/>
          <h1 className="text-center text-primary">Student Gradebook</h1>
          <div className="row">
            {this.renderScreen()}
            <div className="col-lg-4">
              {this.state.addStudent &&
                <AddStudent obtainStudent={this.obtainStudent} studentList={this.state.studentList} showAlert={this.showAlert}/>   
              }
              {this.state.addGrade &&
                <AddGrade studentList={this.state.studentList} obtainGrades={this.obtainNewGrades}/>  
              }
            </div>
          </div>
        </div>
    );
  }
}

export default Main;

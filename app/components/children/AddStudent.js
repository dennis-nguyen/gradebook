import React, {Component} from 'react';
import helpers from "../utils/helpers";

const AddButton = () => (
  <button className="btn btn-primary center-block" type='submit'>Add</button>
)

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.studentSubmit = this.studentSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  studentSubmit(e) {
    e.preventDefault();
    let name = this.state.name;
    if(this.props.studentList.indexOf(name) == -1) {
      helpers.addStudent(name).then((data) => {
        this.props.obtainStudent(name);
        this.refs.inputName.value="";
      });
    } else {
      this.props.showAlert();
    }

  }

  render() {
    return (
      <div className="Search col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Add Student</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.studentSubmit}> 
                  <div className="form-group">
                    <h4 className="text-center">Name</h4>
                    <input
                      type="text"
                      className="form-control text-center"
                      name="name"
                      ref="inputName"
                      onChange={this.handleChange}
                      placeholder="Example: John Smith"
                      required/>
                    <br/>
                      <AddButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
  }
}

export default AddStudent;

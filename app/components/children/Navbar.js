import React, {Component} from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/"><i className="fa fa-graduation-cap" aria-hidden="true"></i></a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="#" onClick={()=>{this.props.openStudent()}}>Add Student</a></li>
                            <li><a href="#" onClick={()=>{this.props.openGrade()}}>Add Grade</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

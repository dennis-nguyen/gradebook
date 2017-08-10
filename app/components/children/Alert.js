import React, {Component} from 'react';
import { Button, Alert } from 'react-bootstrap';

class AlertDismissable extends Component {
  constructor(props) {
      super(props);
      this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

  handleAlertDismiss() {
    this.props.alertHide();
  }

  render() {
      if (this.props.alertVisible) {
        return (
          <Alert bsStyle="danger" onDismiss={()=>this.handleAlertDismiss()}>
            <div>
              <h4>Student already exist in database!</h4>         
              <Button className="btn btn-warning btn-sm"onClick={()=>this.handleAlertDismiss()}>Hide Alert</Button>
            </div>
          </Alert>
          );
        }
        return (
          <div className="hidden"></div>
        );
    }
}

export default AlertDismissable;

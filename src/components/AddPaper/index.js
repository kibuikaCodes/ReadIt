import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';


class AddPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <center><strong>Add paper</strong></center>
            </div>
         );
    }
}
 
const condition = authUser =>
  authUser && authUser.email === 'kibuika1@gmail.com';
export default withAuthorization(condition)(withFirebase(AddPaper));
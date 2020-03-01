import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class Paper extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <center><strong>The paper will be displayed here</strong></center>
            </div>
         );
    }
}
 
const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(Paper));
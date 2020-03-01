import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';



class Unit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            unitDetails: {},
            id: ''
         }
    }

componentDidMount() {
    window.scrollTo(0,0);
    this.props.firebase.unit(this.props.match.params.id)
    .on('value', (snapshot) => {
      var unit = snapshot.val();
      console.log(`This is the data: ${this.props.match.params.id}`);
      if (unit) {
        this.setState({
          unitDetails: unit,
          id: this.props.match.params.id
        });
        console.log(`Unit: ${this.props.match.params.id}`);

      } else {
        console.log('No such Document!')
      }
    }); 
    
}

    render() { 
        return ( 
            <div>
                <h1>
                {this.state.unitDetails.name}
                </h1>
            </div>
         );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(Unit));
 

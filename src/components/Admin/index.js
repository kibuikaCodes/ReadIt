import React, { Component } from 'react';
// import * as ROLES from '../../constants/roles';
import Button from '@material-ui/core/Button';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

class AdminPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        users: [],
        units: [],
      };
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
          const usersObject = snapshot.val();
          const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
          }));
          // console.log(usersList);

          this.setState({
            users: usersList,
            loading: false,
          });
        });
        this.props.firebase.units().on('value', snapshot => {
          const unitsObject = snapshot.val();
          const unitsList = Object.keys(unitsObject).map(key => ({
            ...unitsObject[key],
            id: key,
          }));
          this.setState({
            units: unitsList,
          });
        });
    }

    // to avoid memory leaks
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading, units } = this.state;
        return (
          <div style={{margin: '2em'}}>
            <h1>Admin</h1>
            {loading && <div>Loading ...</div>}
            <div>
              <h4>All Users:</h4>
              <UserList users={users} />
            </div>
            <div>
              <h4>All Units:</h4>
              <UnitList units={units} />
            </div>
            <Link to='/addpaper' style={{textDecoration: 'none'}}>
              <Button variant='contained' color='primary'>Add New Paper</Button>
            </Link>
            
          </div>
        );
      }
    }
    const UserList = ({ users }) => (
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <span>
              {user.firstName}{" "}{user.lastName}
            </span>
            
          </li>
        ))}
      </ul>
    );

    const UnitList = ({ units }) => (
      <ul>
        {units.map(units => (
            <li key={units.id}>

              <span>
                {units.id}
              </span>
          </li>
          
        ))}
      </ul>
    );

const condition = authUser =>
  authUser && authUser.email === 'kibuika1@gmail.com';
export default withAuthorization(condition)(withFirebase(AdminPage));

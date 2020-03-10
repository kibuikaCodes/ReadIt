import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
//import ListItemText from '@material-ui/core/ListItemText';
import { deepOrange } from '@material-ui/core/colors';
// import MainProvider from '../state-management/providers/MainProvider';
// import {MainContext} from '../state-management/Context'
// import { withFirebase } from "../components/Firebase";
import SignOut from '../../src/components/SignOut';
import * as ROUTES from '../constants/routes';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import { withAuthorization } from '../components/Session';

const userEmail = localStorage.getItem('userID');

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: "black"
  },
  orange: {
    backgroundColor: deepOrange[500],
  },
});

export default function DrawerComponentAuth() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const condition = authUser =>
  authUser && authUser.email === 'kibuika1@gmail.com';

  const sideList = side => (
        <div>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <List
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Tusome
              </ListSubheader>
            }
          >
            {/* {['Home', 'Create Bell', 'Regular Bell', 'Impromptu Bell'].map((text, index) => ( */}
              <ListItem button style={{marginTop: '1em'}}>
                <Link to={ROUTES.LANDING} className={classes.link}>Landing</Link> 
              </ListItem>
              <ListItem button style={{marginTop: '1em'}}>
                <Link to={ROUTES.HOME} className={classes.link}>Home</Link>  
              </ListItem >
              {condition ? <ListItem button style={{marginTop: '1em'}}>
                <Link to={ROUTES.ADMIN} className={classes.link}>Admin</Link>  
              </ListItem> : <h6>{}</h6>}
              <Divider />
              {/* <MainProvider> */}
                {/* <MainContext.Consumer> */}
                  {/* {context => ( */}
                    <ListItem button>
                    <ListItemIcon>
                      <Avatar className={classes.orange}>U</Avatar>
                    </ListItemIcon>
                  <Link to="/user" className={classes.link}>{userEmail}</Link>
                  </ListItem>
                  
                  {/* )} */}
                {/* </MainContext.Consumer> */}
              {/* </MainProvider> */}
              <ListItem button>
                <SignOut />
              </ListItem>
            {/* ))} */}
          </List>
        </div>
      
      
</div>
     
    

    
  );

 

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)} style={{color: 'black', fontWeight: "bold"}}><img src="https://img.icons8.com/clouds/50/000000/menu.png" alt="menu icon" /></Button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}
import React, { Component } from 'react'
import { MainContext } from '../Context';
import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';



const INITIAL_USER_REG = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: null
}

const INITIAL_USER_LOG_IN = {
    email: "",
    password: "",
    error: null
}

class MainProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userSignUpInfo: { ...INITIAL_USER_REG },
            signUpError: "",
            userSignInInfo: { ...INITIAL_USER_LOG_IN },
            signInError: "",
            errorSignIn: false,
            units: [],
            unitsLoading: false,
            currentUserID: '',
            userDetails: {},
         }
    }

    componentDidMount() {
        this.setState({ unitsLoading: true});
        this.setState({ loading: true });        
        this.props.firebase.units().on('value', snapshot => {
          const unitsObject = snapshot.val();
          const unitsList = Object.keys(unitsObject).map(key => ({
            ...unitsObject[key],
            id: key,
          }));
          this.setState({
            units: unitsList,
            unitsLoading: false,
          });
        });

        this.props.firebase.user().once('value', snapshot => {
            console.log(snapshot.val())
        })
        
        
    }

componentWillUnmount() {
    this.props.firebase.units().off();
}

    // user registration details
handleSignUpInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(prevState => {
        return {
            userSignUpInfo: {
                ...prevState.userSignUpInfo,
                [name]: value
            }
        };
    });
};

// user registration function
handleUserSignUp = e => {
    e.preventDefault();
    // const {userSignUpInfo.email, userSignUpInfo.firstName, userSignUpInfo.lastName} = this.state;
    let userData = {
        firstName: this.state.userSignUpInfo.firstName,
        lastName: this.state.userSignUpInfo.lastName,
        email: this.state.userSignUpInfo.email,
        dateRegisered: new Date()
    }

    this.props.firebase
        .doRegister(this.state.userSignUpInfo.email, this.state.userSignUpInfo.password)
            .then(authUser => {
                // create user in firestore
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set(userData)
            })
            .then(authUser => {
                this.setState({ ...INITIAL_USER_REG });
                localStorage.setItem('userID', this.state.userSignUpInfo.email);
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ signUpError: error })
            });
        
}

// user log in details
handleSignInInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(prevState => {
        return {
            userSignInInfo: {
                ...prevState.userSignInInfo,
                [name]: value
            }
        };
    });
};


// user sign in function
handleUserSignIn = e => {
    e.preventDefault();
    this.props.firebase
        .doLogin(this.state.userSignInInfo.email, this.state.userSignInInfo.password)
            .then(authUser => {
                const { uid } = authUser.user.uid;
                localStorage.setItem('userID', this.state.userSignInInfo.email);
                this.setState({ ...INITIAL_USER_LOG_IN });
                this.setState({currentUserID: uid});
                console.log(`userID: ${authUser.user.uid}`)
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ signInError: error,
                        errorSignIn: true })
            });
        
}

handleSignOut = e => {
    e.preventDefault();
    this.props.firebase
        .doSignOut().then(authUser => {
            this.props.history.push(ROUTES.LANDING);

        });
}


    render() { 

        const isInvalid = 
            this.state.userSignUpInfo.firstName === "" ||
            this.state.userSignUpInfo.lastName === "" ||
            this.state.userSignUpInfo.email === "" ||
            this.state.userSignUpInfo.password === "";


        return ( 
            <MainContext.Provider
                value={{
                    state: this.state,
                    isInvalid: isInvalid,
                    handleSignUpInput: this.handleSignUpInput,
                    handleUserSignUp: this.handleUserSignUp,
                    handleSignInInput: this.handleSignInInput,
                    handleUserSignIn: this.handleUserSignIn,
                    handleSignOut: this.handleSignOut

                }}
            >
                {this.props.children}
            </MainContext.Provider>
         );
    }
}
 
export default withRouter(withFirebase(MainProvider));
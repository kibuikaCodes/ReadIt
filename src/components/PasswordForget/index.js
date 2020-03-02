import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import {TextField, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import styled from 'styled-components';

const MainDiv = styled.div`
    margin: 6em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;



class PasswordForget extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            error: null,
            info: false
         }
    }

    handleEmail = e => {
        e.preventDefault();
        this.setState({ email: e.target.value});
    }

    handlePasswordReset = e => {
        e.preventDefault();
        this.props.firebase
            .doPasswordReset(this.state.email).then(
                this.setState({info: true})
                
            ).catch(error => {
                this.setState({error})
            })
        
    }
    render() { 
        return ( 
            <MainDiv>
                {this.state.info && <Alert variant="filled" severity="success">
                Check your email {this.state.email} for a password reset link
                </Alert>}
                {this.state.error != null ? <Alert severity="error">{this.state.error.message}</Alert> : <h6>{}</h6>}
                <TextField
                variant="outlined"
                margin="normal"
                required
                style={{width: '20em'}}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleEmail}
              />
              
                <Button
                  type="submit"
                  halfWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handlePasswordReset}
                >
                  Send Password Reset email
                </Button>
                

            </MainDiv>
         );
    }
}
 
export default withFirebase(PasswordForget);
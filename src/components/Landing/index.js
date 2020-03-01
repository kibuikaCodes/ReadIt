import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import img from '../../images/bg-landing.jpg';

const LandingDiv = styled.div`
    background: #1c92d2;  
    background: -webkit-linear-gradient(to left, #f2fcfe, #1c92d2);  
    background: linear-gradient(to left, #f2fcfe, #1c92d2); 
    height: 100%;
    position:fixed;
    padding:0;
    margin:0;

 
    left:0;

    width: 100%;
    height: 100%;

    `;
const Content = styled.div`
    margin-left: 3em;
    margin-top: 7em;
    margin-right: 1.5em;
`;

const Title = styled.h1`
    font-size: 4em;
    font-weight: bolder;
    color: white;
    
    
`;

const Description = styled.p`
    font-size: 1.5em;
    color: white;
    
`;




function Landing() {
    return (
        <LandingDiv style={{ height: '100%'}}>
            <Content>
                <Title>Welcome to Tusome</Title>
                <Description>Get access to all School of Computing Past Papers</Description>
                <Link to={ROUTES.HOME} style={{ textDecoration: 'none'}}><Button variant="contained" color="primary" style={{  marginTop: '2em'}}>
                    Get Started
                </Button></Link>
                
            </Content>
        </LandingDiv>
    )
}

export default Landing

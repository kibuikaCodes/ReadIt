import React, { Component } from 'react';
import styled from 'styled-components';
import {breakpoints} from '../Media';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const HomeDiv = styled.div`
    margin-top: 2em;
    margin-bottom: 2em;
    margin-left: 4em;
    margin-right: 4em;


    @media (max-width: ${breakpoints.mobileMax}) {
        margin-left: 1em;
    }
`;

const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    float: left;
    
`;

const CardsDiv = styled.div`
    display: grid; 
    margin-left: 2em;
    margin-right: 4em;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;

    @media (max-width: ${breakpoints.mobileMax}) {
        margin-left: 0.3em;
        margin-right: 0.3em;
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 20px;
    }
`;

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 20rem;
    height: 18rem;
    margin-top: 2em;
    margin-left: 2em;
    
    

    &: hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    @media (max-width:${breakpoints.mobileMax}){
        width: 9em;
        margin-left: 1em;
    }
`;

const UnitName = styled.h1`
    font-size: 1.5em;
    float: center;
    text-align: center;
    justify-content: center;
    margin-top: 1.5em;
`;



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
                    <HomeDiv>
                        <div style={{ height: '10vh'}}>
                            <Title>{this.state.unitDetails.name}</Title>
                        </div>
                        <CardsDiv>
                                    <Card ></Card>
                                    <UnitName>Hey</UnitName>
                                    <hr />
                        </CardsDiv>
                        <CardsDiv>
                                    <Card ></Card>
                                    <UnitName>Hey</UnitName>
                                    <hr />
                        </CardsDiv>
                        <CardsDiv>
                                    <Card ></Card>
                                    <UnitName>Hey</UnitName>
                                    <hr />
                        </CardsDiv>
                        <CardsDiv>
                                    <Card ></Card>
                                    <UnitName>Hey</UnitName>
                                    <hr />
                        </CardsDiv>
                        <CardsDiv>
                                    <Card ></Card>
                                    <UnitName>Hey</UnitName>
                                    <hr />
                        </CardsDiv>
                    </HomeDiv>
         );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(Unit));
 

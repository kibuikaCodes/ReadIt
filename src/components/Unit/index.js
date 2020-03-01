import React, { Component } from 'react';
import styled from 'styled-components';
import {breakpoints} from '../Media';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

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
        margin-left: 0em;
        margin-right: 0em;
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
    margin-top: 1em;
    margin-left: 1em;
    
    

    &: hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    @media (max-width:${breakpoints.mobileMax}){
        width: 9em;
        margin-left: 0.5em;
    }
`;


const CardSection = styled.div`
    height: 35vh;
`;

const CardSubtitle = styled.p`
    margin-left: 2em;
`;

const Image = styled.img`
    width: 100%;
    height: 100%
`;



class Unit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            unitDetails: [],
            id: '',
            unitName: {},
         }
    }

componentDidMount() {
    window.scrollTo(0,0);
    this.props.firebase.unit(this.props.match.params.id)
    .on('value', (snapshot) => {
      var unit = snapshot.val();
      if (unit) {
        this.setState({
          unitName: unit,
        });

      } else {
      }
    }); 
    this.props.firebase.unitPapers(this.props.match.params.id).on('value', snapshot => {
        const unitObject = snapshot.val();
        const unitList = Object.keys(unitObject).map(key => ({
          ...unitObject[key],
          id: key,
        }));
        // console.log(unitList)

        this.setState({
          unitDetails: unitList,
        //   loading: false,
        });
      });
    
}

    render() { 

        return ( 
                    <HomeDiv>
                        <div style={{ height: '10vh'}}>
                            <Title>{this.state.unitName.id}</Title>
                        </div>
                        <CardsDiv>
                            {this.state.unitDetails.length === 0 && 
                                <div>
                                <h2>Sorry! No files here.</h2>
                                <Link to={ROUTES.HOME} style={{ textDecoration: 'none'}}><button>Back</button></Link>
                                </div>
                                
                            }
                            {this.state.unitDetails.map(unit => (
                                <a href={unit.image} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}>
                                <Card key={unit.id}>
                                    <CardSection><Image src={unit.image} alt=""/></CardSection>
                                    <hr />
                                    <CardSubtitle >{unit.year}</CardSubtitle>
                                </Card>
                                </a>
                            ))}
                                    
                                    
                        </CardsDiv>
                        
                        
                        
                    </HomeDiv>
         );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(Unit));
 

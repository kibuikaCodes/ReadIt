import React from 'react'
import styled from 'styled-components';
import { withAuthorization } from '../Session';
import MainProvider from '../../state-management/providers/MainProvider';
import { MainContext } from '../../state-management/Context';
import { Link } from 'react-router-dom';
import { breakpoints } from '../Media';


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
    height: 6rem;
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

function Home() {
    return (
        <MainProvider>
            <MainContext.Consumer>
                {context => (
                    <HomeDiv>
                        <div style={{ height: '10vh'}}>
                            <Title>Home</Title>
                        </div>
                        <CardsDiv>
                        {context.state.unitsLoading && <div>Loading ...</div>}
                            {context.state.units.map(unit => (
                                <Link to={`unit/${unit.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                    <Card key={unit.id}><UnitName>{unit.name}</UnitName></Card>
                                 </Link>
                                
                            ))}
                        </CardsDiv>
                    </HomeDiv>
                )}
            </MainContext.Consumer>
        </MainProvider>
        
        
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);

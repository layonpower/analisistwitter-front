import React, { useState } from 'react';
import {Container, Row, Col } from 'reactstrap';

import HeaderDashboard from './HeaderDashboard';
import OneTweet from './twitter/OneTweet';
import ListAccounts from './twitter/ListAccounts';
import DashBoard from './twitter/DashBoard';
import UserDashBoard from './twitter/UserDashBoard';
import Hashtag from './twitter/Hashtag';



export default function Home(props){

  const [show, setShow] = useState(<ListAccounts />);

  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push("/");
  }

  const handleOnShow = (option) => {
    if (option === 4){
      setShow(<OneTweet />);
    }else if (option === 5){
      setShow(<ListAccounts />);
    }
    else if (option === 6){
      setShow(<DashBoard />);
    }
    else if (option === 7){
      setShow(<Hashtag />);
    }

    
  }

  if (sessionStorage.getItem("username") === null){
    props.history.push("/");
  }
  else{
    return (
      <Container>
        <Row>
          <Col><HeaderDashboard onLogout = {handleLogout} onShow= {handleOnShow} /></Col>
        </Row>
        <Row>
          <Col xs="12">
              {show}
            </Col>
        </Row>
      </Container>
    );
  }
}

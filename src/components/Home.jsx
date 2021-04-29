import React, { useState } from 'react';
import {Container, Row, Col } from 'reactstrap';

import HeaderDashboard from './HeaderDashboard';
import MyPostList from './posts/MyPostList';
import PostList from './posts/PostList';
import OneTweet from './twitter/OneTweet';
import ListAccounts from './twitter/ListAccounts';

export default function Home(props){

  const [show, setShow] = useState(<PostList />);

  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push("/");
  }

  const handleOnShow = (option) => {
    if (option === 1){
      setShow(<PostList />);
    }else if (option === 2){
      setShow(<MyPostList />);
    }else if (option === 3){
        //TODO Show UserEdit component!
        alert('Usuario: '+sessionStorage.getItem('username')+"\nRol: "+sessionStorage.getItem('role'));
    }else if (option === 4){
      setShow(<OneTweet />);
    }else if (option === 5){
      setShow(<ListAccounts />);
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

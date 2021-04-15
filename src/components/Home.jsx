import React, { useState } from 'react';
import {Container, Row, Col } from 'reactstrap';

import HeaderDashboard from './HeaderDashboard';
import MyPostList from './posts/MyPostList';
import PostList from './posts/PostList';

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

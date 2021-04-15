import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle, Alert } from 'reactstrap';

import { login } from "../utils/apicalls.js";
import PostList from './posts/PostList';

export default function Signin(props){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);

  const onSignin = (e) => {
    e.preventDefault();
    //Check valid user in the database
    login(username, password).then((res) => checkLogin(res, username));
  }

  const checkLogin = (res, username) => {
    //if user is valid..
    if (res.message === 'ok') {

      sessionStorage.setItem('role', res.role);
      sessionStorage.setItem('iduser', res.id);
      sessionStorage.setItem('username', username);

      props.history.push("/home");
    }
    //else, show error message...
    else {
      setLoginMessage(<Alert color="danger">{res.message}</Alert>);
    }
  }

  return (
    <Container>
      <Row>
        <Col xs= "9">
          <PostList/>
        </Col>
        <Col xs="3">
          <Card body>
          <CardTitle tag="h4">Login</CardTitle>
            {loginMessage}
            <Form>
              <FormGroup>
                <Label for="aUsername">Username</Label>
                <Input type="text" name="username" id="aUsername" placeholder="Introduce tu username" onChange={(e) => setUsername(e.target.value)} required/>
              </FormGroup>
              <FormGroup>
                <Label for="aPassword">Password</Label>
                <Input type="password" name="password" id="aPassword" placeholder="Introduce tu password" onChange={(e) => setPassword(e.target.value)} required/>
              </FormGroup>
              <Button onClick={onSignin}>Entrar</Button>
            </Form>
          </Card>
        <Row>
          <Col tag="center">
            <Link to="/signup"><strong className="text-muted">Registrarse</strong></Link>
          </Col>
        </Row>
      </Col>
    </Row>
    </Container>
  );
}

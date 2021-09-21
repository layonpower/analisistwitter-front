import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle } from 'reactstrap';

import { Link } from 'react-router-dom';
import { postNewUser } from "../utils/apicalls.js";

export default function Signup(props){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('subscriber');

  const onSignup = (e) => {
    //Post a new user in the database
    postNewUser(username, password, fullname, email, role)
      .then((res) => checkPOSTNewUser(res));
  }

  //Check the response from the server
  const checkPOSTNewUser = (res) => {
    //if response is OK: create a new user and redirect to login page
    if (res === "OK")
      props.history.push("/");
    else{
      //TODO Show Modal error adding a new user
    }
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card body>
          <CardTitle tag="h4">Nuevo usuario</CardTitle>
            <Form>
              <FormGroup>
                <Label for="aUsername">Username</Label>
                <Input type="text" name="username" id="aUsername" placeholder="Introduce tu username" onChange={(e) => setUsername(e.target.value)} required/>
              </FormGroup>
              <FormGroup>
                <Label for="aPassword">Password</Label>
                <Input type="password" name="password" id="aPassword" placeholder="Introduce tu password" onChange={(e) => setPassword(e.target.value)} required/>
              </FormGroup>
              <FormGroup>
                <Label for="aFullname">Nombre completo</Label>
                <Input type="text" name="fullname" id="aFullname" placeholder="Introduce tu nombre completo" onChange={(e) => setFullname(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="aEmail">Email</Label>
                <Input type="email" name="email" id="aEmail" placeholder="Introduce tu email" onChange={(e) => setEmail(e.target.value)} required/>
              </FormGroup>

              <Button onClick={onSignup}>Aceptar</Button>
            </Form>
          </Card>

        </Col>
      </Row>
    </Container>
  );

}

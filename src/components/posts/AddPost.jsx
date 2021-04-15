import React, { useState } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { postNewPost } from "../../utils/apicalls.js";

export default function AddPost(props){

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addPost = (e) => {
    e.preventDefault();
    //Save post in database with post api call
    postNewPost(sessionStorage.getItem('iduser'), title, description)
      .then((res) => checkPOSTNewPost(res));
  }

  //Check the response from the server
  const checkPOSTNewPost = (res) => {
    if (res === "OK"){
      //TODO Show Modal when a new post is added
      props.updateMyPosts();
    }else{
      //TODO Show Modal when an error adding a new post occurs
    }
  }

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Añadir un nuevo post</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aTitulo">Titulo</Label>
            <Input type="text" name="title" value={title} id="aTitulo" placeholder="Introduce un título" onChange={(e) => setTitle(e.target.value)} required/>
          </FormGroup>
          <FormGroup>
            <Label for="aDescripcion">Descripción</Label>
            <Input style={{height: '200px'}} type="textarea" name="description" value={description} id="aDescripcion" placeholder="Introduce una descripción" onChange={(e) => setDescription(e.target.value)}/>
          </FormGroup>
          <Button onClick={addPost}>Añadir</Button>
        </Form>
      </Card>
    </div>
  );
}

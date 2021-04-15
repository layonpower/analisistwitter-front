import React, { useState, useEffect } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { putExistingPost } from "../../utils/apicalls.js";

export default function EditPost(props){

  const [title, setTitle] = useState(props.post.title);
  const [description, setDescription] = useState(props.post.title);

  const editPost = (e) => {
    e.preventDefault();
    //Update post in database with put api call
    putExistingPost(props.post._id, title, description)
      .then((res) => checkPUTPost(res));
  }

  //Check the response from the server
  const checkPUTPost = (res) => {
    if (res === "OK"){
      //TODO Show Modal when a the post is updated
      props.updateMyPosts();
    }else{
      //TODO Show Modal when an error updating the post occurs
    }
  }

  useEffect(() =>{
    setTitle(props.post.title);
    setDescription(props.post.description);
  },[props.post]);

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Editar post</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aTitulo">Titulo</Label>
            <Input type="text" name="title" id="aTitulo" placeholder="Introduce un título" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </FormGroup>
          <FormGroup>
            <Label for="aDescripcion">Descripción</Label>
            <Input style={{height: '200px'}} type="textarea" name="description" id="aDescripcion" placeholder="Introduce una descripción" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </FormGroup>
            <Button onClick={editPost}>Actualizar</Button>
        </Form>
      </Card>
    </div>
  );
}

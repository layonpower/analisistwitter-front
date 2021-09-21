import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getTweet } from "../../utils/apicalls.js";

import DashBoard from './DashBoard';

export default function OneTweet(){

  const [panel, setPanel] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = React.useState([]);
  const [tweets, setPosts] = useState([]);
   
  const [id_tweet,  setId_Tweet] = useState("");

  const {register, errors, handleSubmit} = useForm();

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };

  const ShowPanel = (id, e) => {
    e.preventDefault();
    console.log('Panelaco');
    setId_Tweet(id);
    console.log('el id es'+id);
    if (id!==undefined)
      setPanel(1);
    else{
      return (
        <Alert color="danger">Debe añadir un tuit para la obtención de métricas</Alert>

      );
    }
  }

  const getTweets = (term) => {
    //getTweet('1370805087254290432').then((tweets) => {
      if (term.length > 3) {
        getTweet(term).then((tweets) => {
        setPosts(tweets);
        console.log("front");
        console.log(tweets);
      });
  }
  }

  /*useEffect(() =>{
    getTweets();
  },[]);
  */

  useEffect(() => {
    //if (searchTerm)
      getTweets(searchTerm);
  
   
  }, [searchTerm]);


  if (panel==1){

    console.log("aqui va el dashboard");
    console.log('encvío'+id_tweet);
    return (
            <DashBoard id = {id_tweet} />

    );

  }
  else {
    console.log("aqui va la búsqueda");

  return (


    
    <div>
      <label>Introduzca un Tweet</label>
       <input 
                placeholder="id"
                value ={searchTerm}
                type="text"
                onChange={handleChange}
      >
      </input>

      

       <Table>
        <tbody>
          { tweets.map((tweet, index) => {
            
            return(
            
              <div>
                <Alert color="dark">
                  <Row>
                    <Col>
                      <CardTitle tag="h5">
                      {tweet.title === 'Not Found Error' ? 'Tweet no encontrado' : 'Tweet id: '+tweet.id}
                      </CardTitle>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              { tweet.title === 'Not Found Error' ? '' :  tweet.text
                              }
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              { tweet.title === 'Not Found Error' ? '' :  tweet.public_metrics.retweet_count
                              }
                            </Col>
                          </Row>
                          <Row>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Alert>
                  <Row>
                      <Col>
                        <Button onClick={(e) => ShowPanel(tweet.id, e)}>Métricas</Button>
                      </Col>
                    </Row>

              </div>)
          
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
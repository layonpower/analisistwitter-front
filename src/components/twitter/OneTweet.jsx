import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getTweet } from "../../utils/apicalls.js";

export default function OneTweet(){


  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = React.useState([]);
  const [tweets, setPosts] = useState([]);

  const {register, errors, handleSubmit} = useForm();

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };

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



  return (
    
    <div>
      <input 
                //id="key"
                placeholder="id tweet..."
                //onChange={handleChange}
                type="text"
                onChange={handleChange}
      >
      </input>

      

      <CardTitle tag="center"><Alert color="info"><strong>Tweets </strong><Badge pill>{tweets.length}</Badge></Alert></CardTitle>
      <Table>
        <tbody>
          { tweets.map((tweet, index) => {
            
            return(
            
              <div>
                <Alert color="dark">
                  <Row>
                    <Col>
                      <CardTitle tag="h5"><FaFeather />
                      {tweet.title === 'Not Found Error' ? 'Error, tweet no encontrado' :tweet.id}
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
              </div>)
          
            })}
          </tbody>
        </Table>
      </div>
    );
}
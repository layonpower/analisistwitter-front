import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';

import { FaFeather } from 'react-icons/fa';


import { getTweet } from "../../utils/apicalls.js";

export default function OneTweet(){

  const [tweets, setPosts] = useState([]);

  const getTweets = () => {
    getTweet().then((tweets) => {
      setPosts(tweets);
    });
  }

  useEffect(() =>{
    getTweets();
  },[]);

  return (
    <div>
      <CardTitle tag="center"><Alert color="info"><strong>Tweets </strong><Badge pill>{tweets.length}</Badge></Alert></CardTitle>
      <Table>
        <tbody>
          { tweets.map((tweet, index) => {
            return(
              <div>
                <Alert color="dark">
                  <Row>
                    <Col>
                      <CardTitle tag="h5"><FaFeather /> {tweet.id}</CardTitle>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              {tweet.text}
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
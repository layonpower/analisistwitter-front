import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getAccount } from "../../utils/apicalls.js";

export default function ListAccounts(){


  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = React.useState([]);
  const [tweets, setPosts] = useState([]);


  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };

  const getAccounts = (term) => {
      if (term.length > 3) {
        getAccount(term).then((tweets) => {
        setPosts(tweets);
        console.log("front");
        console.log(tweets);
      });
  }
  }

  useEffect(() => {
    getAccounts(searchTerm);
  
   
  }, [searchTerm]);



  return (
    
    <div>
      <input 
                //id="key"
                placeholder="cuenta..."
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
                      {tweet.title === 'Not Found Error' ? 'Error, usuario no encontrado' :tweet.id}
                      </CardTitle>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              { tweet.title === 'Not Found Error' ? '' :  <img src={tweet.profile_image_url}></img>
                              }
                            </Col>
                            <Col>
                              { tweet.title === 'Not Found Error' ? '' :  tweet.name
                              }
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              { //tweet.title === 'Not Found Error' ? '' :  tweet.public_metrics.followers_count
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
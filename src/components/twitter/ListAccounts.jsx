import React, { useState, useEffect } from 'react';
import {Button, Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getAccount } from "../../utils/apicalls.js";
import UserDashBoard from './UserDashBoard';

//para el selector de fecha
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("esp", es);


export default function ListAccounts(){

  const [panel, setPanel] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = React.useState([]);
  const [tweets, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user_names, setUsers_Names] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  }

  const handleDateChange = e => {
    //alert(e.target.value);
    setStartDate(e.target.value);
  }

  

  const handleClick = e => {
    console.log('clicccck');
    AddUser();

  }

  const AddUser = (userid , username, e) => {
    e.preventDefault();
    console.log('Añadir user');
    console.log('id user: '+userid);
    let previous_users = users;
    let previous_user_names = user_names;
    console.log('cuenta seleccionada: '+previous_users);
    previous_users.push(userid);
    previous_user_names.push(username);
    console.log('Array usuarios '+previous_users);
    setUsers(previous_users);
    setUsers_Names(previous_user_names);
    //para disparar el useEffect
    setSearchTerm("");
    let vacio = [];
    setPosts(vacio);
  }

  const DeleteUser = (username, e) => {
    e.preventDefault();
    console.log('eliminar user: '+username);
    //let previous_users = users;
    
    let previous_user_names = user_names.filter(function(name){
      return name !==username;

    });

    console.log('elementos eliminaos: '+previous_user_names);

    setUsers_Names(previous_user_names);
    //para disparar el useEffect
    setSearchTerm("");
  }

  const AddtoProfile = (username, e) => {
    e.preventDefault();

  }
  

  const ShowPanel = (e) => {
    e.preventDefault();
    console.log('Panelaco');

    setPanel(1);
  }
  

  const getAccounts = (term) => {
      //La extensión de las cuentas de Twitter comienza por 4
      if (term.length > 3) {
        getAccount(term).then((tweets) => {
        setPosts(tweets);
        console.log("front");
        console.log(tweets);
      });
  }
  }

  useEffect(() => {
    console.log('la fecha es '+startDate);
    getAccounts(searchTerm);
  
   
  }, [searchTerm]);



  if (panel==1){

    console.log("aqui va el dashboard");
    return (
            <UserDashBoard id = {users} name = {user_names}  fechaini= {startDate} fechafin={endDate} />

    );

  }
  else {
    console.log("aqui va la búsqueda");
    console.log('else del panal fecha es '+startDate);

  return (
    
    <div>
      <label>Introduzca una cuenta de Twitter</label>
      <input 
                placeholder="mínimo 4 carácteres"
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
                      { tweet.title === 'Not Found Error' ? '' :  <img src={tweet.profile_image_url}></img>
                              }
                      {tweet.title === 'Not Found Error' ? 'Usuario no encontrado' :'@'+tweet.username}
                      </CardTitle>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>

                              { tweet.title === 'Not Found Error' ? '' :  tweet.name
                              }
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                            <Button  color="success" onClick={(e) => AddUser(tweet.id, tweet.username, e)}>Seleccionar</Button>
                            </Col>
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
        <Table>
        <Alert>
        <Row>
            <Col>
              <strong>Análisis</strong>
            </Col>
        </Row>
        <Row>
            <Col>
            Fecha Inicial <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} locale="esp" dateFormat="dd/MM/yyyy" />
            </Col>
        </Row>
        <Row>
            <Col>
            Fecha Final <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} locale="esp" dateFormat="dd/MM/yyyy" />
            </Col>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
            <Col>
              <Button onClick={(e) => ShowPanel(e)}>Métricas</Button>
            </Col>
        </Row>

        </Alert>
        </Table>

        <Table>
        <tbody>
          { user_names.map((user_name, index) => {
            
            return(
            
              <div>
                <Alert color="dark">
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              @{user_name}
                            </Col>
                            <Col>
                            <Button  color="danger" onClick={(e) => DeleteUser(user_name, e)}>Eliminar</Button>
                            </Col>
                            <Col>
                            <Button  color="warning" onClick={(e) => AddtoProfile(user_name, e)}>Añadir al perfil</Button>
                            </Col>
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
}
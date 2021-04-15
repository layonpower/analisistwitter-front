import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Row, Col, Card, CardTitle, Badge, UncontrolledCollapse, CardBody,
Table, Alert, Button, Nav, NavItem, NavLink, Navbar, NavbarBrand, TabContent,
TabPane, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaFeather, FaEdit, FaTrashAlt } from 'react-icons/fa';

import { getMyPosts, deletePost } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";

import AddPost from './AddPost';
import EditPost from './EditPost';

export default function MyPostList(props){

  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
  const [activeTab, setActiveTab] = useState('1');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const getPosts = () => {
      getMyPosts(sessionStorage.getItem('iduser')).then((posts) => {
          setPosts(posts);
      });
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab)
      setActiveTab(tab);
  }

  const handleUpdateMyPosts = () => {
    getPosts();
  }

  const askForDelete = (post) => {
    setShowDeleteModal(
      <Modal isOpen="true" className={props.className}>
        <ModalHeader>Eliminar post</ModalHeader>
        <ModalBody>
          ¿Está seguro que desea eliminar el post <strong>{post.title}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={() => deletePostSel(post)}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={() => setShowDeleteModal(null)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }

  //Deleting selected post
  const deletePostSel = (post) => {
    deletePost(post._id)
      .then((res) => checkDELETEPost(res));
  }

  //Check the response from server
  const checkDELETEPost = (res) => {
    //if ok, remove modal and reset edit component
    if (res === "OK"){
      setShowDeleteModal(null);
      setEdit(<Alert color="warning">Seleccione editar un post de la lista</Alert>);
      handleUpdateMyPosts();
    }else{
      //TODO Show a modal when error from server
    }
  }

  const handleShowEdit = (post) => {
    setEdit(<EditPost post= {post} updateMyPosts = {handleUpdateMyPosts} />);
  }

  useEffect(() =>{
    getPosts();
  },[]);

  return(
    <div>
      {showDeleteModal}
      <Row>
        <Col xs="7">
          <CardTitle tag="center"><Alert color="info"><strong>Mis Posts publicados </strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
          <Table>
            <tbody>
              { posts.map((post, index) => {
                return(<div>
                  <Row>
                    <Col>
                      <Navbar expand="md">
                        <NavbarBrand href="#" id={"toggler"+index}><h5><FaFeather /> {post.title}</h5></NavbarBrand>
                        <Nav className="ml-auto" navbar>
                          <NavItem>
                            <NavLink>
                              <Button outline onClick={() => handleShowEdit(post)}><FaEdit /></Button>
                              {' '}
                              <Button outline onClick={() => askForDelete(post)}><FaTrashAlt /></Button>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Navbar>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <UncontrolledCollapse toggler={"#toggler"+index}>
                        <Card>
                          <CardBody>
                            <Row><Col>{post.description}</Col></Row>
                            <Row><Col align="right"><small>{getDateInStrFormat(new Date(post.publicationdate))} - {post.user.username}</small></Col></Row>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </Col>
                  </Row>
                </div>)
              })}
            </tbody>
          </Table>
        </Col>
        <Col xs="5">
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                Añadir
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                Editar
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <AddPost updateMyPosts = {handleUpdateMyPosts}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  {edit}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
}

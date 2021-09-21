import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Media, Row, Col, Container } from 'reactstrap';

import { AiOutlineCopyright } from 'react-icons/ai';

import MyPlaceHolderPicture from '../images/lynx.png';
var imgStyle = {
  maxWidth: "85px",
};

export default function HeaderApp(){
  return(
    <Container >
      <Row>
        <Col>
          <Navbar color="warning" light expand="md" >
            <NavbarBrand><h4 className="text-white">Analisis rendimiento Twitter</h4></NavbarBrand>

          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}

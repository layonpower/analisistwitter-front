import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Media, Row, Col, Container } from 'reactstrap';

import { AiOutlineCopyright } from 'react-icons/ai';

import MyPlaceHolderPicture from '../images/lynx.png';
var imgStyle = {
  maxWidth: "85px",
};

export default function HeaderApp(){
  return(
    <Container>
      <Row>
        <Col>
          <Navbar color="dark" light expand="md">
            <NavbarBrand><h4 className="text-warning">Analisis rendimiento Twitter</h4></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="" target="_blank">
                  <span className="text-white">beta </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}

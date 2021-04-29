import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Tooltip } from 'reactstrap';

import { FaSignOutAlt, FaCogs } from 'react-icons/fa';

export default function HeaderDashboard(props){

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Navbar color="warning" light expand="md">
      <NavbarBrand><FaCogs /> Dashboard</NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(1)}>Todos los Posts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(2)}>Mis Posts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(3)}>{sessionStorage.getItem('username')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(4)}>Tweets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(5)}>Cuentas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" id="tooltip_logout" onClick={ props.onLogout }><FaSignOutAlt />
            <Tooltip placement="bottom" isOpen={tooltipOpen} target="tooltip_logout" toggle={() => setTooltipOpen(!tooltipOpen)}>
              Salir
            </Tooltip>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  );
}

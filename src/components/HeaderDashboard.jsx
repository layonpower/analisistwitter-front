import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Tooltip } from 'reactstrap';

import { FaSignOutAlt, FaCogs } from 'react-icons/fa';

export default function HeaderDashboard(props){

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Navbar color="warning" light expand="md">
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" className="text-white" onClick={() => props.onShow(5)}>Cuentas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white" onClick={() => props.onShow(4)}>Tweets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white" onClick={() => props.onShow(7)}>Hashtags</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white" onClick={() => props.onShow(7)}>Mi Perfil</NavLink>
          </NavItem>
          
          <NavItem>
            
            <NavLink href="#" className="text-white" id="tooltip_logout" onClick={ props.onLogout }><FaSignOutAlt />
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

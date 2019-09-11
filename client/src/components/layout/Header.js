import React, { Component } from 'react';


// reactstrip import

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col } from 'reactstrap';

class Header extends Component {

	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      isOpen: false
	    };
	  }

	  toggle() {
	      this.setState({
	        isOpen: !this.state.isOpen
	      });
	    }
	render() {
		return (
			<div>
        <Navbar color="dark" light expand="md">
        	<Container>
	          <NavbarBrand href="/" className='text-white'>DEV</NavbarBrand>
	          <NavbarToggler onClick={this.toggle} />
	          <Collapse isOpen={this.state.isOpen} navbar>
	            <Nav className="ml-auto" navbar>
	              <NavItem>
	                <NavLink href="/components/" className='text-white'>Components</NavLink>
	              </NavItem>
	              <NavItem>
	                <NavLink href="https://github.com/reactstrap/reactstrap" className='text-white'>GitHub</NavLink>
	              </NavItem>
	              <UncontrolledDropdown nav inNavbar>
	                <DropdownToggle nav caret className='text-white'>
	                  Options
	                </DropdownToggle>
	                <DropdownMenu right>
	                  <DropdownItem>
	                    Option 1
	                  </DropdownItem>
	                  <DropdownItem>
	                    Option 2
	                  </DropdownItem>
	                  <DropdownItem divider />
	                  <DropdownItem>
	                    Reset
	                  </DropdownItem>
	                </DropdownMenu>
	              </UncontrolledDropdown>
	            </Nav>
	          </Collapse>
          </Container>
        </Navbar>
      </div>
		);
	}
}

export default Header;

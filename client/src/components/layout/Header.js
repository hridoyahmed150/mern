import React, { Component } from 'react';
import {Link} from 'react-router-dom'



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
        <Navbar color="dark" light expand="md" className="mb-4">
        	<Container>
	          <Link to="/" className='text-white navbar-brand'>DEV</Link>
	          <Link to="/profile" className='text-white navbar-brand'>Developer</Link>
	          <NavbarToggler onClick={this.toggle} />
	          <Collapse isOpen={this.state.isOpen} navbar>
	            <Nav className="ml-auto" navbar>
	              <NavItem>
	                <Link to="/register" className='text-white nav-link'>Sing Up</Link>
	              </NavItem>
	              <NavItem>
	                <Link to="/login" className='text-white nav-link'>Login</Link>
	              </NavItem> 
	            </Nav>
	          </Collapse>
          </Container>
        </Navbar>
      </div>
		);
	}
}

export default Header;

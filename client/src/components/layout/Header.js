import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import {connect } from 'react-redux';
import {logoutUser} from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileAction";

// reactstrip import

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container} from 'reactstrap';

class Header extends Component {
	state = {	
      isOpen: false
    };

	toggle=()=> {
	      this.setState({
	        isOpen: !this.state.isOpen
	      });
	    }
	onLogoutClick=(e)=>{
		e.preventDefault();
		this.props.logoutUser();
		this.props.clearCurrentProfile();
	}
	render() {

		const {isAuthenticated , user} =this.props.auth;
		const authLink=(
				<Nav className="ml-auto" navbar>
					<NavItem>
					  <Link to="/dashboard" className='text-white nav-link'>Dashboard</Link>
					</NavItem>
					<NavItem>
					  <Link to="/feed" className='text-white nav-link'>Post Feed</Link>
					</NavItem>
				  <NavItem>
				    <a 
				    	href='/' 
				    	onClick={this.onLogoutClick} 
				    	className='nav-link'>
				    	<img 
				    		src={user.avatar} 
				    		alt={user.name} 
				    		title="You must have a gravater connect to your email to display an image " 
				    		style={{width:'25px' , marginRight:'5px'}}
				    		className='rounded-circle'/>
				    	{' '}
							Logout
				    </a>
				  </NavItem>
				</Nav>
			)
		const gestLink=(
				<Nav className="ml-auto" navbar>
				  <NavItem>
				    <Link to="/register" className='text-white nav-link'>Sing Up</Link>
				  </NavItem>
				  <NavItem>
				    <Link to="/login" className='text-white nav-link'>Login</Link>
				  </NavItem> 
				</Nav>
			)
		return (
			<div>
        <Navbar color="dark" light expand="md" className="mb-4">
        	<Container>
	          <Link to="/" className='text-white navbar-brand'>DEV</Link>
	          <Link to="/profiles" className='text-white navbar-brand'>Developer</Link>
	          <NavbarToggler onClick={this.toggle} />
	          <Collapse isOpen={this.state.isOpen} navbar>
	            {isAuthenticated?authLink:gestLink}
	          </Collapse>
          </Container>
        </Navbar>
      </div>
		);
	}
}
Header.propTypes={
	logoutUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
	auth:state.auth,
})
export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Header);

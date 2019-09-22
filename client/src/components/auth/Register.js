import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import {connect} from "react-redux";
import { registerUser } from "../../actions/authAction";
import TextFieldGroup from './../common/TextFieldGroup';


class Register extends Component {
	state={
		name:'',
		email:'',
		password:'',
		password2:'',
		errors:{}
	}

	inputChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	componetnWillReceiveProps(nextProps){
		if (nextProps.errors) {
			this.setState({errors:nextProps.errors})
		}
	}
	
	componentDidMount(){
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	submitForm=(e)=>{
		e.preventDefault();
		let newUser={
			name:this.state.name,
			email:this.state.email,
			password:this.state.password,
			password2:this.state.password2
		}
		this.props.registerUser(newUser,this.props.history)
	}
	render() {
		let {errors} =this.props

		return (
			<div className="register">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-8 m-auto">
			        <h1 className="display-4 text-center">Sign Up</h1>
			        <p className="lead text-center">Create your DevConnector account</p>
			        <form noValidate onSubmit={this.submitForm} >			            
						<TextFieldGroup
							type="text"
							onChange={this.inputChange}
							placeholder='Name'
							value={this.state.name}
							name="name"
							error={errors.name}	
						/>
						<TextFieldGroup
							type="email"
							onChange={this.inputChange}
							placeholder='Email Address'
							value={this.state.email}
							name="email"
							error={errors.email}
							info="This site uses Gravatar so if you want a profile image, use a Gravatar email"	
						/>

						<TextFieldGroup
							type="password"
							onChange={this.inputChange}
							placeholder='Password'
							value={this.state.password}
							name="password"
							error={errors.password}
						/>

						 <TextFieldGroup 
							type='password'
							onChange={this.inputChange}
							name="password2"
							value={this.state.password2}
							placeholder="Confirm Password"
							error={errors.password2}
				          />
			          <input type="submit" className="btn btn-info btn-block mt-4" />
			        </form>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

Register.propTypes={
	registerUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	errros:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
	auth:state.auth,
	errors:state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));

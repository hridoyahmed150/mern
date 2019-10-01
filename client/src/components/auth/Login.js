import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect } from "react-redux";
import {loginUser} from "../../actions/authAction";
import TextFieldGroup from './../common/TextFieldGroup';
class Login extends Component {
	state={
		email:"",
		password:'',
		errors:{}
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
		if (nextProps.errors) {
			this.setState({errors:nextProps.errors})
		}
	}

	componentDidMount(){
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}else{
			this.props.history.push('/login');
		}
	}
	onChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}
	onSubmit=(e)=>{
		e.preventDefault();
		let userData={
			email:this.state.email,  
			password:this.state.password
		}
		this.props.loginUser(userData)
	}
	render() {
		const {errors}=this.state;
		return (
			<div className="login">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-8 m-auto">
			        <h1 className="display-4 text-center">Log In</h1>
			        <p className="lead text-center">Sign in to your DevConnector account</p>
			        <form onSubmit={this.onSubmit}>
			          
			          <TextFieldGroup 
						type='email'
						onChange={this.onChange}
						name="email"
						value={this.state.email}
						placeholder="Email Address"
						error={errors.email}
			          />
			          <TextFieldGroup 
						type='password'
						onChange={this.onChange}
						name="password"
						value={this.state.password}
						placeholder="Password"
						error={errors.password}
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
Login.propTypes={
	loginUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
	auth:state.auth,
	errors:state.errors
})
export default connect(mapStateToProps,{loginUser})(Login);
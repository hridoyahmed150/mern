import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextAreaFieldGroup';
import InputGroup from './../common/InputGroup';
import SelectListGroup from './../common/SelectListGroup';
import { createProfile } from './../../actions/profileAction';
import { faFacebookF ,faTwitter ,faLinkedin,faYoutube,faInstagram} from "@fortawesome/free-brands-svg-icons"



class CreateProfile extends Component {
	state={
		displaySocialInputs:false,
		handle:'',
		company:'',
		website:'',
		location:'',
		status:'',
		skills:'',
		githubusername:'',
		bio:'',
		twitter:'',
		facebook:'',
		linkedin:'',
		youtube:'',
		instagram:'',
		errors:{}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({errors:nextProps.errors})	
	}

	onChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	onSubmit=(e)=>{
		e.preventDefault();
		const profileData={
			handle:this.state.handle,
			company:this.state.company,
			website:this.state.website,
			location:this.state.location,
			status:this.state.status,
			skills:this.state.skills,
			githubusername:this.state.githubusername,
			bio:this.state.bio,
			twitter:this.state.twitter,
			facebook:this.state.facebook,
			linkedin:this.state.linkedin,
			youtube:this.state.youtube,
			instagram:this.state.instagram,
		}
		this.props.createProfile(profileData,this.props.history)
	}

	render() {
		const {errors,displaySocialInputs} = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs=(
					<div>
						<InputGroup 
							placeholder="Twitter Profile URL"
							name="twitter"
							icon={faTwitter}
							onChange={this.onChange}
							value={this.state.twitter}
							error={errors.twitter}
						/>
						<InputGroup 
							placeholder="Facebook page URL"
							name="facebook"
							icon={faFacebookF}
							onChange={this.onChange}
							value={this.state.facebook}
							error={errors.facebook}
						/>
						<InputGroup 
							placeholder="Linkedin Profile URL"
							name="linkedin"
							icon={faLinkedin}
							onChange={this.onChange}
							value={this.state.linkedin}
							error={errors.linkedin}
						/>
						<InputGroup 
							placeholder="Youtube channel URL"
							name="youtube"
							icon={faYoutube}
							onChange={this.onChange}
							value={this.state.youtube}
							error={errors.youtube}
						/>
						<InputGroup 
							placeholder="Instagram page URL"
							name="instagram"
							icon={faInstagram}
							onChange={this.onChange}
							value={this.state.instagram}
							error={errors.instagram}
						/>
					</div>
				)
		}
		// select options for status 
		const options=[
			{label:"* Select Professional status",value:0},
			{label:"Developer",value:"Developer"},
			{label:"Junior Developer",value:"Junior Developer"},
			{label:"Senior Developer",value:"Senior Developer"},
			{label:"Manager",value:"Manager"},
			{label:"Student or Learning",value:"Student or Learning"},
			{label:"Instructor or Teacher",value:"Instructor or Teacher"},
			{label:"Intern",value:"Intern"},
			{label:"Other",value:"Other"},
		]

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">Let's get some information to make your profile stand out</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A uniqe handle for your profile URL . Your full name , company name, nickname"
								/>
								<SelectListGroup
									placeholder="Status"
									name='status'
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info="GIve us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own website or a company one"
								/>
								<TextFieldGroup
									placeholder="Location"
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city & state suggested (eg. Dhaka , Bangladesh"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated value (eg. HTML,CSS,JavaScript,PHP"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name='githubusername'
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and github link, include your username"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button 
										onClick={()=>{
												this.setState(prevState=>({
													displaySocialInputs: !prevState.displaySocialInputs
												}) )
											}
										} 
										className="btn btn-light" type='button'>
											Add Social Network Links
										</button>
										<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<button type="submit" className='btn btn-info btn-block mt-4' value="Submit">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes={
	profile:PropTypes.object.isRequired,
	errors:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
	profile:state.profile,
	errors:state.errors
})

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));
import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import { FaCheck } from "react-icons/fa";

export class ProfileAbout extends Component {
	render() {
		const {profile} =this.props;

		// get first name 
		const firstName=profile.user.name.trim().split(' ')[0];
		const skills=profile.skills.map((skill,index)=>{
			return (
				<div key={index} className="p-3">
					<FaCheck />  {skill}
				</div>)
			})
		return (
			<div className="row">
			  <div className="col-md-12">
			    <div className="card card-body bg-light mb-3">
			      <h3 className="text-center text-info">{firstName}</h3>
			      <p className="lead">{isEmpty(profile.bio)?(<span>{firstName} has no bio</span>):(
			      		<span>{profile.bio}</span>
			      	)}
			      </p>
			      <hr />
			      <h3 className="text-center text-info">Skill Set</h3>
			      <div className="row">
			        <div className="d-flex flex-wrap justify-content-center align-items-center">
			          {skills}
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
export default ProfileAbout;
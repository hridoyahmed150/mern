import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {Link} from 'react-router-dom';
export class ProfileHeader extends Component {
	render() {
		const {profile}=this.props
		return (
			<div className="row">
			  <div className="col-md-12">
			    <div className="card card-body bg-info text-white mb-3">
			      <div className="row">
			        <div className="col-4 col-md-3 m-auto">
			          <img className="rounded-circle" src={profile.user.avatar} alt="" />
			        </div>
			      </div>
			      <div className="text-center">
			        <h1 className="display-4 text-center">{profile.user.name}</h1>
			        <p className="lead text-center">{profile.status} {isEmpty(profile.company)?null:(<span> at {profile.company}</span>)}</p>
			        {isEmpty(profile.location)?null:(<p><span>{profile.location}</span></p>)}
			        <p>
			        	{isEmpty(profile.website)?null:(
				          <Link to="chart" target="_blank" to="http://link2external.page.com" >Test</Link>
			        		)}
			          
			          <a className="text-white p-2" href="#">
			            <i className="fab fa-twitter fa-2x"></i>
			          </a>
			          <a className="text-white p-2" href="#">
			            <i className="fab fa-facebook fa-2x"></i>
			          </a>
			          <a className="text-white p-2" href="#">
			            <i className="fab fa-aedin fa-2x"></i>
			          </a>
			          <a className="text-white p-2" href="#">
			            <i className="fab fa-instagram fa-2x"></i>
			          </a>
			        </p>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
export default ProfileHeader;
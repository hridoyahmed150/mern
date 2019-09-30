import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {Link} from 'react-router-dom';
import { FaGlobe,FaTwitter,FaFacebook,FaLinkedin,FaInstagram,FaYoutube } from "react-icons/fa";


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
				          <Link className="text-white p-2" target="_blank" to={`//${profile.website}`} ><FaGlobe size={32}/></Link>
			        	)}

			        	{isEmpty(profile.social && profile.social.twitter)?null:(
										<a className="text-white p-2" target="_blank" href={`//${profile.social.twitter}`} ><FaTwitter color="yellow"  size={32} /></a>
			        		)}
			          
			          {isEmpty(profile.social && profile.social.facebook)?null:(
										<a className="text-white p-2" target="_blank" href={`//${profile.social.facebook}`} ><FaFacebook color="#3B5998" bakcground="white" size={32} /></a>
			        		)}
			          {isEmpty(profile.social && profile.social.linkedin)?null:(
									<a className="text-white p-2" target="_blank" href={`//${profile.social.linkedin}`} ><FaLinkedin size={32} color="#0077B5" /></a>
			        	)}
			          {isEmpty(profile.social && profile.social.instagram)?null:(
									<a className="text-white p-2" target="_blank" href={`//${profile.social.instagram}`} ><FaInstagram size={32} /></a>
			        	)}
			        	{isEmpty(profile.social && profile.social.youtube)?null:(
									<a className="text-white p-2" target="_blank" href={`//${profile.social.youtube}`} ><FaYoutube size={32} /></a>
			        	)}
			        </p>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
export default ProfileHeader;
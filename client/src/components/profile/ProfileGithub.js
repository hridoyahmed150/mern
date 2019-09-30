import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export class ProfileGithub extends Component {
	state={
		clientId:'c44c6d375392ea78f2f2',
		clientSecret:'0f1703c23b1d52c16aca719679124af42cd39add',
		count:5,
		sort:'created: asc',
		repos:[]
	}

	componentDidMount() {
		const {username} =this.props;
		const{count,sort,clientId,clientSecret}=this.state;
		fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}$client_id=${clientId}$cllient_secret=${clientSecret}`)
		.then(res=>res.json())
		.then(data=>{
			this.setState({repos:data})
		}).catch(err=>console.log(err))
	}
	render() {
		const {repos}=this.state;
		return (
			<div ref="myRef">
	      <hr />
	      <h3 class="mb-4">Latest Github Repos</h3>
	      <div key={repo.id} class="card card-body mb-2"> 
	        <div class="row">
	          <div class="col-md-6">
	            <h4>
	              <Link to={repo.html_url} class="text-info" target="_blank"> Repository One
	              </Link>
	            </h4>
	            <p>Repository description</p>
	          </div>
	          <div class="col-md-6">
	            <span class="badge badge-info mr-1">
	              Stars: 44
	            </span>
	            <span class="badge badge-secondary mr-1">
	              Watchers: 21
	            </span>
	            <span class="badge badge-success">
	              Forks: 122
	            </span>
	          </div>
	        </div>
	      </div>
	    </div>
		);
	}
}
export default ProfileGithub;
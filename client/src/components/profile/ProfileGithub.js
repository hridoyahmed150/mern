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
		fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
		.then(res=>res.json())
		.then(data=>{
			this.setState({repos:data})
		}).catch(err=>console.log(err))
	}
	render() {
		const {repos}=this.state;
		const repoItems=repos.map(repo=>{
			return (
					<div key={repo.id} className="card card-body mb-2">
						<div className="row">
							<div className="col-md-6">
								<h4>
									<Link to={`//${repo.html_url}`} className="text-info" target="_blank">
										{repo.name}
									</Link>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div className="col-md-6">
								<span className="badge badge-info mr-1">
									Start:{repo.stargazers_count}
								</span>
								<span className="badge badge-secondary mr-1">
									Watchers:{repo.watchers_count}
								</span>
								<span className="badge badge-success mr-1">
									Forks:{repo.forks_count}
								</span>
							</div>
						</div>
					</div>
				)
		})
		return (
			<div>
				<hr/>
				<h3 className="mb-4">
					Listest Github Repos
				</h3>
					{repoItems}
			</div>
		);
	}
}
ProfileGithub.propTypes={
	username:PropTypes.string.isRequired 
}
export default ProfileGithub;
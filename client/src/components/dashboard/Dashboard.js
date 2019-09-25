import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getCurrentProfile} from '../../actions/profileAction';
import Spinner from './../common/Spinner';


class Dashboard extends Component {
	componentDidMount(){
		this.props.getCurrentProfile();
	}

	render() {

		const {user}=this.props.auth;
		const  {profile,loading}=this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />
		}else{
			// dashboardContent= <h1>hello</h1>
			if (Object.keys(profile).length>0) {
				dashboardContent=<h1>TODO: Display Profile</h1>

			}else{
				// user is loged in but has not profile
				dashboardContent=(
						<div>
							<p className="lead text-muted">welcome {user.name}</p>
							<p>You have not yet setup a profile , please add some info</p>
							<Link to='/create-profile' className="btn btn-lg btn-info">
								Create Profile
							</Link>
						</div>
					)
			}
		}
		return ( 
			<div className="dashboar">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="display-4">
								{dashboardContent}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes={
	getCurrentProfile:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	profile:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
	auth:state.auth,
	profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
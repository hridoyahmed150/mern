import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom'
import { FaTimes , FaThumbsDown , FaThumbsUp  } from 'react-icons/fa';
import {deletePosts ,addLike,removeLike} from './../../actions/postAction';

class PostItem extends Component {
	onDeleteClick=(id)=>{
		this.props.deletePosts(id);
	}
	render() {
		const {post,auth }=this.props; 
		const {text}=this.props.post;
		return (
			<div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <FaThumbsUp />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <FaThumbsDown />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>

            {post.user === auth.user.id ? (
            	<button type="button" className="btn btn-danger mr-1" onClick={()=>this.onDeleteClick(post._id)}>
              	<FaTimes />
            	</button>
            ):null}
            
          </div>
        </div>
      </div>
		);
	}
}

PostItem.propTypes={
  removeLike:PropTypes.func.isRequired,
  addLike:PropTypes.func.isRequired,
  deletePosts:PropTypes.func.isRequired,
	post:PropTypes.object.isRequired,
	auth:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
	auth:state.auth
})

export default connect(mapStateToProps,{deletePosts,addLike,removeLike})(PostItem);
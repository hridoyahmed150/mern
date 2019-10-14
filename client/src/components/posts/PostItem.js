import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { FaTimes , FaRegThumbsUp } from 'react-icons/fa';
import {deletePosts ,addLike,removeLike} from './../../actions/postAction';

class PostItem extends Component {
	onDeleteClick=(id)=>{
		this.props.deletePosts(id);
	}
  onLikeClick=(id)=>{
    this.props.addLike(id);
  }
  onUnlikeClick=(id)=>{
    this.props.removeLike(id);
  }
  findUserLike=(likes)=>{
    const { post, auth } = this.props;
    if (likes.filter(like=>like.user===auth.user.id).length>0) {
      return ( 
          <button onClick={()=>this.onUnlikeClick(post._id)} type="button" className="btn btn-light mr-1">
            <FaRegThumbsUp color={"blue"} />
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
        )
    }else{
      return (
          <button onClick={()=>this.onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
            <FaRegThumbsUp />
            
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
        )
    }
  }
	render() {
		const { post , auth , showActions}=this.props; 
		// const {text}=this.props.post;
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
            {/*<button onClick={()=>this.onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
                          <FaThumbsUp />
                          {this.findUserLike(post.likes)?<FaThumbsDown />:<FaThumbsUp />}
                          <span className="badge badge-light">{post.likes.length}</span>
                        </button>*/}
            { showActions ? this.findUserLike(post.likes):null}
            {/*<button onClick={()=>this.onUnlikeClick(post._id)} type="button" className="btn btn-light mr-1">
              <FaThumbsDown />
            </button>*/}

            {showActions?(<span>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {post.user === auth.user.id ? (
                <button type="button" className="btn btn-danger mr-1" onClick={()=>this.onDeleteClick(post._id)}>
                  <FaTimes />
                </button>
              ):null} 
            </span>):null}         
          </div>
        </div>
      </div>
		);
	}
}
PostItem.defaultProps={
  showActions:true
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
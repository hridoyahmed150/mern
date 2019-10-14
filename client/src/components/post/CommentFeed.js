import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
	render() {
		const {comments,postId}=this.props;

		return comments.map(
			comment=> <CommentItem key={comment._id}  postId={postId} comment={comment}/>
			)
	}
}

CommentFeed.propTypes={
	comments:PropTypes.array.isRequired,
}

export default CommentFeed;
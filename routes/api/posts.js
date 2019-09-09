const express = require('express');

const router = express.Router();

const mongoose=require('mongoose');
const passport=require('passport');

// Post model
const Post=require('../../models/Post');

// Profile module
const Profile=require('../../models/Profile');
// Validation 
const validatePostInput=require('../../validation/post');

// @route  GET api/posts/test
// @desc   test profile route
// @access public
router.get('/test', (req, res) => {
  res.json({
    "message": "posts works"
  })
})

// @route  GET api/posts
// @desc   get Post
// @access public

router.get('/', (req, res) => {
	Post.find()
		.sort({date:-1})
		.then(posts=>res.json(posts))
		.catch(err=>res.status(404).json(err));
})


// @route  GET api/posts/:id
// @desc   get Post by id
// @access public

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(posts=>res.json(posts))
		.catch(err=>res.status(404).json(err));
})


// @route  POST api/posts
// @desc   create post
// @access private

router.post('/',passport.authenticate('jwt',{session:false}), (req, res) => {
  const {errors,isValid}=validatePostInput(req.body);

  if(!isValid){
  	return res.status(400).json(errors);
  }
	
  const newPost=new Post({
  	text:req.body.text,
  	name:req.body.name,
  	avatar:req.body.avatar,
  	user:req.user.id
  })
  newPost.save().then(post=>res.json(post));
})


// @route  DELETE api/posts
// @desc   Delete post
// @access private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post=>{
					// check for post owner
 					if (post.user.toString() !== req.user.id) {
						res.status(401).json({notauthorize:"user not authorize"})
					}
					post.remove().then(()=>res.json({success:true}))
				})
				.catch(err=>res.status(404).json({postnotfound:'no post found'}))
		})
})

// @route  POST api/posts/like/:id
// @desc   like post
// @access private

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post=>{
					if (post.likes.filter(like=>like.user.toString()===req.user.id).length>0) {
						return res.status(400).json({alreadyliked: 'User already liked this post'})
					}
					// Add user id to likes array
					post.likes.unshift({user:req.user.id})

					post.save().then(post=>res.json(post))
				})
				.catch(err=>res.status(404).json({postnotfound:'no post found'}))
		})
})

// @route  POST api/posts/unlike/:id
// @desc   inlike post
// @access private

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post=>{
					if (post.likes.filter(like=>like.user.toString()===req.user.id).length===0) {
						return res.status(400).json({unlike: 'first like it!'})
					}
					// remove  user id to likes array
					let removeIndex=post.likes.map(item=>item.user.toString()).indexOf(req.user.id);

					post.likes.splice(removeIndex,1);

					post.save().then((psot)=>res.json(post))
				})
				.catch(err=>res.status(404).json({postnotfound:'no post found'}))
		})
})


// @route  POST api/posts/comment/:post_id
// @desc   add comment to post
// @access private
 
router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

	const {errors,isValid}=validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}


	Post.findById(req.params.post_id)
		.then(post=>{
			const newComment={
				text:req.body.text,
				name:req.body.name,
				avatar:req.body.avatar,
				user:req.user.id
			}
			// add to comment Array

			post.comments.unshift(newComment);

			// save
			post.save().then(post=>{res.json(post)})
		}).catch(err=>res.status(404).json({error: 'psot not found'}));
})

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @desc   delete comment to post
// @access private
 
router.delete('/comment/:post_id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

	Post.findById(req.params.post_id)
	.then(post=>{
		// check to see if comment exists
		if (post.comments.filter(comment=>comment.id.toString()===req.params.comment_id).length===0) {
			return res.status(404).json({commentnotexists:'Comment does not exist'});
		}
     
		// get remove index
		const removeIndex=post.comments.map(item=>item._id.toString()).indexOf(req.params.comment_id)

		// splice comment out of array	
		post.comments.splice(removeIndex,1);
		post.save().then(post=>res.json(post));	
	}).catch(err=>res.status(404).json({error: 'psot not found'}));
})

module.exports = router;
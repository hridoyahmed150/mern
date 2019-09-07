const express = require('express');

const router = express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

// Load profile model
const Profile=require('../../models/Profile');

// load user profile
const User=require('../../models/Users');

const validaterProfileInput=require('../../validation/profile'); 
const validaterExperienceInput=require('../../validation/experience'); 
const validateEducationInput=require('../../validation/education'); 

// @route  GET api/profile/test
// @desc   test profile route
// @access public

router.get('/test', (req, res) => {
  res.json({
    "message": "profile works"
  })
})

// @route  GET api/profile
// @desc   get current user profile
// @access privet

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
	const errors={};
	Profile.findOne({user:req.user.id})
		.populate('user',['name','avatar'])
		.then(profile=>{
			if (!profile) {
				errors.noprofile='there is no profile for this user';
				return res.status(404).json(errors);
			}
			return res.json(profile)
		})
		.catch(err=>res.status(404).json(err));
})

// @route  GET api/profile/handle/:handle
// @desc   get Profile by handle
// @access public

router.get('/handle/:handle',(req,res)=>{
	const errors={};
	Profile.findOne({handle:req.params.handle})
		.populate('user',['name','avatar'])
		.then(profile=>{
			if (!profile) {
				errors.noprofile='there is no profile for this user';
				return res.status(404).json(errors);
			}
			return res.json(profile)
		})
		.catch(err=>res.status(404).json(err));
})


// @route  GET api/profile/all
// @desc   get all Profile
// @access public

router.get('/all',(req,res)=>{
	const errors={}

	Profile.find()
		.populate('user',['name','avatar'])
		.then(profiles=>{
			if (!profiles) {
				errors.noprofile='there are no profile';
				return res.status(404).json(errors)
			}
			res.json(profiles)
		})
		.catch(err=>{
			res.status(404).json({profile:'there is no profile'});
		})

})


// @route  GET api/profile/user/:user_id
// @desc   get Profile by user id
// @access public

router.get('/user/:user_id',(req,res)=>{
	const errors={};
	Profile.findOne({user:req.params.user_id})
		.populate('user',['name','avatar'])
		.then(profile=>{
			if (!profile) {
				errors.noprofile='there is no profile for this user';
				return res.status(404).json(errors);
			}
			return res.json(profile)
		})
		.catch(err=>res.status(404).json({profile:"there is no profile for this user"}));
})
// @route  GET api/profile
// @desc   get current user profile
// @access privet

router.post('/',passport.authenticate('jwt',{session:false}),( req , res )=>{
	const {errors,isValid}=validaterProfileInput(req.body);
	// check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// get fields
	const profileFields={};
	profileFields.user=req.user.id;

	if (req.body.handle) profileFields.handle=req.body.handle;
	if (req.body.company) profileFields.company=req.body.company;
	if (req.body.website) profileFields.website=req.body.website;
	if (req.body.location) profileFields.location=req.body.location;
	if (req.body.bio) profileFields.bio=req.body.bio;
	if (req.body.status) profileFields.status=req.body.status;
	if (req.body.githubusername) profileFields.githubusername=req.body.githubusername;
	
	// skills -split into Array

	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills=req.body.skills.split(',')
	}
	// social
	profileFields.social={};
	if (req.body.youtube) profileFields.social.youtube=req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter=req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook=req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin=req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram=req.body.instagram;
	

	Profile.findOne({user:req.user.id})
		.then(profile=>{
			if (profile) {
				// update
				Profile.findOneAndUpdate(
					{user:req.user.id},
					{$set:profileFields},
					{new:true})
						.then(profile=>res.json(profile));
			}else{
				// create

				// check if handle exists
				Profile.findOne({handle:profileFields.handle})
				.then(profile=>{
					if (profile) {
						errors.handle='that handle already exists';
						res.status(400).json(errors);
					}
				});

				// save profile
				new Profile(profileFields).save().then(profile=>{
					res.json(profile)
				});
			}
		})

})

// @route  GET api/profile/experience
// @desc   add experience to profile
// @access privet
router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{

	const {errors,isValid}=validaterExperienceInput(req.body);
	// check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}


	Profile.findOne({user:req.user.id})
	.then(profile=>{
		const newExp={
			title:req.body.title,
			company:req.body.company,
			location:req.body.location,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description
		}
		// add to exp Array
		profile.experience.unshift(newExp);

		profile.save().then(profile=>res.json(profile))
	})
})

// @route  GET api/profile/eduction
// @desc   add eduction to profile
// @access privet
router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{

	const {errors,isValid}=validateEducationInput(req.body);
	// check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({user:req.user.id})
	.then(profile=>{
		const newEdu={
			school:req.body.school,
			degree:req.body.degree,
			fieldofstudy:req.body.fieldofstudy,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description
		}
		// add to exp Array
		profile.education.unshift(newEdu);

		profile.save().then(profile=>res.json(profile))
	})
})

module.exports = router;
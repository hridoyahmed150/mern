import axios from 'axios';
import { 
	GET_PROFILE ,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
	} from './types';

// get current profile 
export const getCurrentProfile=()=>dispatch=>{
	dispatch(setProfileLoading);
	axios.get('/api/profile')
		.then(res=>{
			dispatch({
				type:GET_PROFILE,
				payload:res.data
			})
		})
		.catch(err=>{
			dispatch({
				type:GET_PROFILE,
				payload:{}
			})
		})
}

// get Profile by handle
export const getProfileByHandle=(handle)=>dispatch=>{
	dispatch(setProfileLoading);
	axios.get(`/api/profile/handle/${handle}`)
		.then(res=>{
			dispatch({
				type:GET_PROFILE,
				payload:res.data
			})
		})
		.catch(err=>{
			dispatch({
				type:GET_PROFILE,
				payload:null
			})
		})
}


// Create Profile 
export const createProfile=(profileData, history)=>dispatch=>{
	axios
		.post('/api/profile',profileData)
		.then(res=>history.push('/dashboard'))
		.catch(
						err=>dispatch({
													type: GET_ERRORS ,
													payload:err.response.data
												}
					))
}

// Delete account and profile 
export const deleteAccount=()=>dispatch=>{
	if (window.confirm('Are you sure? this can not be undone!')) {
		axios
		.delete('/api/profile')
		.then(res=>{
			dispatch({
				type:SET_CURRENT_USER,
				payload:{}
			})
		})
		.catch(err=>{
			dispatch({
				type:GET_ERRORS,
				payload:err.response.data
			})
		})
	}
}

// add education
export const addEducation=(eduData, history)=>dispatch=>{
	axios
		.post('/api/profile/education', eduData)
		.then(res=>{
			history.push('/dashboard')
		})
		.catch(err=>{
			dispatch({
				type:GET_ERRORS,
				payload:err.response.data
			})
		})
}

// delete education 

 export const deleteEducation=(id)=>dispatch=>{
 	axios
 		.delete(`/api/profile/education/${id}`)
 			.then(res=>{
 					dispatch({
 						type:GET_PROFILE,
 						payload:res.data
 					})
 			})
 			.catch(err=>
 					dispatch({
 						type:GET_ERRORS,
 						payload:err.response.data
 					})
 				)
 }

// add experience 

export const addExperience=(expData, history)=>dispatch=>{
	axios
		.post('/api/profile/experience', expData)
		.then(res=>{
			history.push('/dashboard')
		})
		.catch(err=>{
			dispatch({
				type:GET_ERRORS,
				payload:err.response.data
			})
		})
}

// delete experience
export const deleteExperience=(id)=>dispatch=>{
	axios
		.delete(`/api/profile/experience/${id}`)
			.then(res=>{
					dispatch({
						type:GET_PROFILE,
						payload:res.data
					})
			})
			.catch(err=>
					dispatch({
						type:GET_ERRORS,
						payload:err.response.data
					})
				)
}


// get add Profiles 

export const getProfiles=()=>dispatch=>{
	dispatch(setProfileLoading())
	axios
		.get(`/api/profile/all`)
			.then(res=>{
					dispatch({
						type:GET_PROFILES,
						payload:res.data
					})
			})
			.catch(err=>
					dispatch({
						type:GET_PROFILES,
						payload:null
					})
				)
}

// Profile loading

export const setProfileLoading=()=>{
	return {
		type:PROFILE_LOADING
	}
}

// clrar profile

export const clearCurrentProfile=()=>{
	return {
		type:CLEAR_CURRENT_PROFILE
	}
}

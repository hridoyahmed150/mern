import React from 'react'
import classname from "classname";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InputGroup=({
	name,
	placeholder,
	value,
	error,
	icon,
	type,
	onChange,
})=> {
	return (
		<div className="input-group mb-3">
		<div className="input-group-prepend">
			<span className="input-group-text">
				<FontAwesomeIcon icon={icon}/>
				{/*<i className={icon}></i>*/}
			</span>
		</div>
		  <input 
		  onChange={onChange} 
		  className={classname("form-control form-control-lg",{
		  	'is-invalid':error
		  })}  
		  placeholder={placeholder} 
		  name={name}
		  value={value}
		   />
		  {error && (<div className='invalid-feedback'>{error}</div>)}
		</div>
	)
}

InputGroup.propTypes = {
	name:PropTypes.string.isRequired,
	placeholder:PropTypes.string,
	value:PropTypes.string.isRequired,
	icon:PropTypes.string,
	error:PropTypes.string,
	type:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired
}

InputGroup.defaultProps={
	type:'text'
}
export default InputGroup;

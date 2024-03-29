import React from 'react'
import classname from "classname";
import PropTypes from 'prop-types'

const TextAreaFieldGroup=({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
})=> {
	return (
		<div className="form-group">
		  <textarea 
		  onChange={onChange} 
		  className={classname("form-control form-control-lg",{
		  	'is-invalid':error
		  })}  
		  placeholder={placeholder} 
		  name={name}
		  value={value}
		   />
		  {info && <small className='form-text text-muted'>{info}</small>}

		  {error && (<div className='invalid-feedback'>{error}</div>)}
		</div>
	)
}

TextAreaFieldGroup.propTypes = {
	name:PropTypes.string.isRequired,
	placeholder:PropTypes.string,
	value:PropTypes.string.isRequired,
	info:PropTypes.string,
	error:PropTypes.string,
	onChange:PropTypes.func.isRequired
}

export default TextAreaFieldGroup;

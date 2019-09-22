import React from 'react'
import classname from "classname";
import PropTypes from 'prop-types'

const TextFieldGroup=({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
})=> {
	return (
		<div className="form-group">
		  <input 
		  type={type}
		  onChange={onChange} 
		  className={classname("form-control form-control-lg",{
		  	'is-invalid':error
		  })}  
		  placeholder={placeholder} 
		  name={name}
		  value={value}
		  disabled={disabled} />
		  {info && <small className='form-text text-muted'>{info}</small>}

		  {error && (<div className='invalid-feedback'>{error}</div>)}
		</div>
	)
}

TextFieldGroup.propTypes = {
	name:PropTypes.string.isRequired,
	placeholder:PropTypes.string,
	value:PropTypes.string.isRequired,
	info:PropTypes.string,
	error:PropTypes.string,
	type:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired,
	disable:PropTypes.string,
}

export default TextFieldGroup

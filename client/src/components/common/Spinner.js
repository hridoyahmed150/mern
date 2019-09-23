import React, { Component } from 'react';
import spinner from './spinner.gif';
class Spinner extends Component {
	render() {
		const imgStyle={
					width:'200px',
					margin:'auto',
					display:'block'
				}
		return (
			<div>
				<img src={spinner} alt="Loading ..." style={imgStyle}/>
			</div>
		);
	}
}
export default Spinner;
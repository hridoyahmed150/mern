import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation} from "./../../actions/profileAction";


class Education extends Component {
	onDeleteClick=(id)=>{
			this.props.deleteEducation(id);
	}
	render() {
		const education=this.props.education.map(edu=>(
				<tr key={edu._id}>
					<td>{edu.school}</td>
					<td>{edu.degree}</td>
					<td>
						 <Moment format="YYYY/MM/DD">
               {edu.from}
            	</Moment> - 
            	{edu.to==null?" Now": (<Moment format="YYYY/MM/DD">
               {edu.to}
            	</Moment>)}            	
						</td>
					<td><button onClick={()=>this.onDeleteClick(edu._id)} className="btn btn-danger">Delete</button></td>
				</tr>
			))
		return (
			<div style={{fontSize:'1rem'}}>
				<h4 className="mb-4">
					Education Credentials
				</h4>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">School</th>
							<th scope="col">Degree</th>
							<th scope="col">From - To</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{education}
					</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes={
	deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education);

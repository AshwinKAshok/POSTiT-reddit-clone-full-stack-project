import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const HeadingGeneric = (props) => (
	<div className="container-fluid text-center p-3 m-3">
		<div className="h1">{props.text}</div>
	</div>
)

export default withRouter(connect(
	(state) => state,
	(dispatch) => {
		return {}
	})(HeadingGeneric));


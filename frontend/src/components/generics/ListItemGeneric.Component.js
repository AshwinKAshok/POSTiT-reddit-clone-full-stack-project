import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListItemGeneric = (props) => (
	<div className="container list-group-item">
		<Link to={props.link} className="">
			<h4>{props.title}</h4>
			<p>{props.subreddit}</p>
		</Link>
	</div>
)

export default withRouter(connect(
	(state) => state,
	(dispatch) => {
		return {}
	})(ListItemGeneric));


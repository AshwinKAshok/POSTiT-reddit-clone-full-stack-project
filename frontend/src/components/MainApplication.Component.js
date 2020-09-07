import React from 'react';
import { connect } from 'react-redux';
import TopBar from './TopBar.Component'
import MainRoutes from '../components/MainRoutes.Component'
import { withRouter } from 'react-router-dom';

const MainApplication = () => (
	<div>
		<TopBar />
		<MainRoutes />
	</div>
)

export default withRouter(connect(
	(state) => state,
	(dispatch) => {
		return {}
	})(MainApplication));

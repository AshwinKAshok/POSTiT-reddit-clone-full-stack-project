import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SearchBar from "../containers/SearchBar.Container"
import { IsLoggedIn } from "../utility/SessionUtility"

const TopBar = (props) => (
	<nav className="navbar navbar-expand-sm navbar-light bg-light">
		<Link to="/" className="navbar-brand">POSTiT</Link>
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link to="/" className="nav-link">Home</Link>
				</li>
				<li className="nav-item">
					<Link to="/collections" className="nav-link">Collections</Link>
				</li>
				<li className="nav-item">
					<Link to="/privacy" className="nav-link">Privacy</Link>
				</li>
				{!IsLoggedIn() &&
					<li className="nav-item">
						<Link to="/register" className="nav-link">Register</Link>
					</li>
				}
				{!IsLoggedIn() &&
					<li className="nav-item">
						<Link to="/login" className="nav-link">Login</Link>
					</li>
				}
				{IsLoggedIn() &&
					<li className="nav-item">
						<Link to="/posts" className="nav-link">Your Posts</Link>
					</li>
				}
				{IsLoggedIn() &&
					<li className="nav-item">
						<Link to={`/profile/${localStorage.getItem("uid")}`} className="nav-link">{localStorage.getItem("username")}`s profile</Link>
					</li>
				}
				{IsLoggedIn() &&
					<li className="nav-item">
						<div
							className="nav-link"
							onClick={() => {
								localStorage.removeItem('token')
								props.history.push('/')
								window.location.reload()
							}}
						>Logout</div>
					</li>
				}
			</ul>
			<SearchBar />
		</div>
	</nav>
)

export default withRouter(connect(
	(state) => state.searchReducer,
	(dispatch) => {
		return {}
	})(TopBar));

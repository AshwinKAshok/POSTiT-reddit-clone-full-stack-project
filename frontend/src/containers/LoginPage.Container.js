import React from "react";
import { findPersonByUsername, loginPerson } from "../services/personService";
import { connect } from 'react-redux';
import { performLoginAction } from '../reducers/loginReducer.js';
import { withRouter, Link } from 'react-router-dom';
import { IsLoggedIn } from '../utility/SessionUtility'
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"

class LoginPage extends React.Component {
	state = {
		username: "",
		password: "",
		forced: false
	}

	componentDidMount() {
		this.setState({ forced: this.props.location.search === "?forced" })
	}

	usernameChangeHandler = (event) => {
		this.setState({
			username: event.target.value
		})
	}

	passwordChangeHandler = (event) => {
		this.setState({
			password: event.target.value
		})
	}

	submitLogin = async () => {
		await this.props.dispatchLogin(this.state.username, this.state.password)

		if (IsLoggedIn()) {
			this.props.history.push("/");
		} else {
			alert("Username/password incorrect");
		}
	}

	render() {
		return (
			<div>
				{this.state.forced &&
					<div className="alert alert-danger" role="alert">
						You must login to visit this page!
					</div>
				}

				<HeadingGeneric text="Login" />

				<form className="container">
					<div className="form-group">
						<label htmlFor="inputUsername">Username</label>
						<input type="text" className="form-control" id="inputUsername" placeholder="Username"
							onChange={this.usernameChangeHandler} value={this.state.username}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword">Password</label>
						<input type="password" className="form-control" id="inputPassword" placeholder="Password"
							onChange={this.passwordChangeHandler} value={this.state.password}
						/>
					</div>
					<div className="btn btn-primary mr-2"
						onClick={this.submitLogin}>
						Login
					</div>

					<Link to="/" className="btn btn-primary">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}

export default withRouter(connect(
	(state) => state,
	(dispatch) => {
		return {
			dispatchLogin: async (username, password) => {
				const r = await loginPerson({ username, password })
				if (r.authStatus === "success") {
					localStorage.setItem("token", r.jwt);
					const userCredsResponse = await findPersonByUsername(username)
					localStorage.setItem("username", userCredsResponse.username);
					localStorage.setItem("uid", userCredsResponse.id);

					dispatch(performLoginAction({
						token: r.jwt,
						authenticatedUserCredentials: {
							"username": userCredsResponse.username,
							"uid": userCredsResponse.id,
						}
					}))
				}
			}
		}
	}
)(LoginPage));

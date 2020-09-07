import React from "react";
import { createPerson } from "../services/personService";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"

class RegisterPage extends React.Component {
	state = {
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		dob: "",
		address: "",
		phone: "",
	}

	firstnameChangeHandler = (event) => {
		this.setState({
			firstname: event.target.value
		})
	}

	lastnameChangeHandler = (event) => {
		this.setState({
			lastname: event.target.value
		})
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

	dobChangeHandler = (event) => {
		this.setState({
			dob: event.target.value
		})
	}

	addressChangeHandler = (event) => {
		this.setState({
			address: event.target.value
		})
	}

	phoneChangeHandler = (event) => {
		this.setState({
			phone: event.target.value
		})
	}


	submitPersonInfo = () => {
		this.props.dispatchRegister(this.state);
		alert("Registration successful")
		this.props.history.push("/")
	}

	render() {
		return (
			<div>
				<HeadingGeneric text="Register" />

				<div>
					<form className="container">
						<div className="form-group">
							<label htmlFor="inputfirstname">First Name</label>
							<input type="text" className="form-control" id="inputfirstname" placeholder="First Name"
								onChange={this.firstnameChangeHandler} value={this.state.firstname}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputlastname">Last Name</label>
							<input type="text" className="form-control" id="inputlastname" placeholder="Last Name"
								onChange={this.lastnameChangeHandler} value={this.state.lastname}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputUserName">User Name</label>
							<input type="text" className="form-control" id="inputUserName" placeholder="User Name"
								onChange={this.usernameChangeHandler} value={this.state.username}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword">Password</label>
							<input type="password" className="form-control" id="inputPassword" placeholder="Password"
								onChange={this.passwordChangeHandler} value={this.state.password}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputDOB">Date of Birth</label>
							<input type="date" className="form-control" id="inputDOB" placeholder="Date of Birth"
								onChange={this.dobChangeHandler} value={this.state.dob}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputAddress">Address</label>
							<input type="text" className="form-control" id="inputAddress" placeholder="Address"
								onChange={this.addressChangeHandler} value={this.state.address} />
						</div>
						<div className="form-group">
							<label htmlFor="inputPhone">Phone</label>
							<input type="phone" className="form-control" id="inputPhone" placeholder="Phone"
								onChange={this.phoneChangeHandler} value={this.state.phone} />
						</div>
						{/*<div className="form-check">*/}
						{/*	<input type="checkbox" className="form-check-input" id="inputIsAdmin" />*/}
						{/*	<label className="form-check-label" htmlFor="inputIsAdmin">Is Admin</label>*/}
						{/*</div>*/}

						<div className="form-group">
							<div className="btn btn-primary mr-2"
								onClick={this.submitPersonInfo}>
								Register
							</div>

							<Link to="/" className="btn btn-primary">
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(
	(state) => state,
	(dispatch) => {
		return {
			dispatchRegister: async (personData) => {
				await createPerson({
					"firstname": personData.firstname,
					"lastname": personData.lastname,
					"username": personData.username,
					"password": personData.password,
					"dob": personData.dob,
					"address": personData.address,
					"phone": personData.phone
				})
			}

		}
	}
)(RegisterPage));

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createCollection, getAllCollections, findAllCollectionOfPerson } from '../services/collectionService.js';
import { performGetAllCollections, performCreateCollection, performGetAllCollectionsForPerson } from "../reducers/collectionReducer.js";
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"
import CollectionRowComponent from "../components/CollectionRow.Component.js";
import { IsLoggedIn } from '../utility/SessionUtility'

class CollectionsListPage extends React.Component {
	state = {
		collection_name: "",
		collection_description: ""
	}

	componentDidMount() {
		this.props.dispatchGetAllCollections();

		if (IsLoggedIn())
			this.props.dispatchGetUserCollections(localStorage.getItem("uid"));
	}

	nameHandler = (event) => {
		this.setState({
			collection_name: event.target.value
		})
	}

	descriptionHandler = (event) => {
		this.setState({
			collection_description: event.target.value
		})
	}

	createCollection = () => {
		this.props.dispatchCreateCollection(localStorage.getItem("uid"), {
			collection_name: this.state.collection_name,
			collection_description: this.state.collection_description
		})
	}

	render() {
		return (
			<div>
				<HeadingGeneric text="Collections Page" />

				<div className="container-fluid row">
					<div className="col text-center">
						<ul className='list-group'>
							<div className="container list-group-item-secondary p-2">
								<div className="h4">
									All Collections
								</div>
							</div>
							{this.props.collections && this.props.collections.map((col, idx) =>
								<CollectionRowComponent
									key={idx}
									collection={col}
								/>
							)}
						</ul>
					</div>
					{IsLoggedIn() &&
						<div className="col text-center">
							<ul className='list-group'>
								<div className="container list-group-item-secondary p-2">
									<div className="h4">
										Your Collections
								</div>
								</div>
								{this.props.collections && this.props.personCollections.map((col, idx) =>
									<CollectionRowComponent
										key={idx}
										collection={col}
									/>
								)}
							</ul>
						</div>
					}

					{IsLoggedIn() &&
						<div className="col-3">
							<div className="container">
								<div className="h4">
									Create Collection
							</div>
								<form>
									<div className="form-group">
										<label htmlFor="inputName">Name</label>
										<input type="text" className="form-control" id="inputName" placeholder="name"
											onChange={this.nameHandler} value={this.state.collection_name}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="inputDescription">Description</label>
										<input type="Description" className="form-control" id="inputDescription" placeholder="description"
											onChange={this.descriptionHandler} value={this.state.collection_description}
										/>
									</div>
									<div className="btn btn-primary mr-2"
										onClick={this.createCollection}>
										Create!
								</div>
								</form>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default withRouter(connect(
	(state) => state.collectionReducer,
	(dispatch) => {
		return {
			dispatchGetAllCollections: () => {
				getAllCollections()
					.then(r => dispatch(performGetAllCollections({ collections: r })))
			},
			dispatchGetUserCollections: (uid) => {
				findAllCollectionOfPerson(uid)
					.then(r => dispatch(performGetAllCollectionsForPerson({ personCollections: r })))
			},
			dispatchCreateCollection: (uid, collection) => {
				createCollection(collection, uid)
					.then(r => dispatch(performCreateCollection({ newCollection: r })))
			}
		}
	}
)(CollectionsListPage));

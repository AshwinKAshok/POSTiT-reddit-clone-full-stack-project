import React from "react";
import { Link } from "react-router-dom";

const CollectionRowComponent = (props) => (
	<div className="container list-group-item">
		<Link to={`/collections/${props.collection.id}`}>
			<h2>{props.collection.collection_name}</h2>
			<p>Description: {props.collection.collection_description}</p>
		</Link>
	</div>
)

export default CollectionRowComponent;
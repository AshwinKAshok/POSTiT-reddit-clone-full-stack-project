import React from "react";
import { Link } from "react-router-dom";
import '../static/postRow.style.css'

class PostRow extends React.Component {
	render() {
		return (
			<div className="container list-group-item ">
				<div className={"prj-post-row"} style={{ "float": "left" }}>
					<p style={{ "float": "left", "marginRight": "1.5em" }}><i className="fas fa-heart" style={{ "color": "red" }}></i> {this.props.post.likes} </p>
					<Link style={{ "float": "left" }} to={`/details/${this.props.postId}`}>
						<h4>{this.props.post.post}</h4>
					</Link>
					<br />
				</div>

				<div style={{ "float": "right" }} >
					<button style={{ "float": "right" }} className={"btn"} onClick={() => {
						this.props.deletePost(this.props.postId);
					}}><i className="fas fa-times"></i></button>
				</div>
			</div>
		);
	}
}

export default PostRow;

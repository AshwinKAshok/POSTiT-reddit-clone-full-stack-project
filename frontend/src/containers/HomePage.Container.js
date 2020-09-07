import React from "react";
import { withRouter, Link } from "react-router-dom";
import { findPostsForPerson } from "../reducers/postsReducer";
import { connect } from "react-redux";
import redditService from "../services/redditService";
import { findTrendingPosts } from "../reducers/searchReducer";
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"
import ListItemGenericComponent from '../components/generics/ListItemGeneric.Component';
import { IsLoggedIn } from '../utility/SessionUtility'
import { findAllPostOfPerson, findAllPosts } from "../services/postService"

class HomePage extends React.Component {
	componentDidMount() {
		this.props.findTrendingPosts();

		if (IsLoggedIn())
			this.props.findAllPostsOfPerson(localStorage.getItem("uid"))
	}

	render() {
		return (
			<div>
				{!localStorage.getItem('displayPrivacy') &&
					<div className={"alert alert-info"} role="alert">
						Please refer to our privacy policy <Link to="/privacy">here</Link>
					</div>
				}
				<HeadingGeneric text="Home Page" />

				<div className="container-fluid row">
					<div className="col">
						<div className="container list-group-item-secondary p-2">
							<div className="h4 text-center">
								Trending posts
							</div>
						</div>
						<ul className="list-group">
							{this.props.trendingPosts.trendingPosts && this.props.trendingPosts.trendingPosts.map((post, idx) =>
								<ListItemGenericComponent
									key={idx}
									link={"/details/" + post.id}
									title={post.title}
									subreddit={post.subreddit}
								/>
							)}
							{this.props.trendingPosts.trendingPosts && this.props.trendingPosts.trendingPosts.map((post, idx) =>
								<ListItemGenericComponent
									key={idx}
									link={"/details/" + post.id}
									title={post.title}
									subreddit={post.subreddit}
								/>
							)}
						</ul>
					</div>

					{IsLoggedIn() &&
						<div className="col">
							<ul className='list-group'>
								<div className="container list-group-item-secondary p-2">
									<div className="h4 text-center">
										Your posts
									</div>
								</div>
								{this.props.posts && this.props.posts.map((post, idx) =>
									<ListItemGenericComponent
										key={idx}
										link={"/details/" + post.id}
										title={post.post}
									/>
								)}
							</ul>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default withRouter(connect(
	(state) => {
		return {
			posts: state.postReducer.posts,
			trendingPosts: state.searchReducer
		}
	},
	(dispatch) => {
		return {
			findTrendingPosts: async () => {
				let redditPosts = await redditService.getTrendingPosts()
				redditPosts = redditPosts.map((e) => {
					return {
						id: e.id, title: e.title, subreddit: e.subreddit
					}
				})

				let databasePosts = await findAllPosts()
				databasePosts = databasePosts.map(
					(e) => {
						return {
							id: e.id, title: e.post, subreddit: e.category
						}
					})

				dispatch(findTrendingPosts({
					trendingPosts: [...databasePosts, ...redditPosts]
				}))
			}
			,
			findAllPostsOfPerson: (personId) => {
				findAllPostOfPerson(personId)
					.then((allPosts) => dispatch(findPostsForPerson({ posts: allPosts })))
			},
		};
	})(HomePage));

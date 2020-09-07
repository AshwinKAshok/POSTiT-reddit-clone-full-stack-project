import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import redditService from '../services/redditService.js';
import { findAllPosts } from '../services/postService.js';
import { performSearchAction } from '../reducers/searchReducer.js';

class SearchBar extends React.Component {
  state = {
    searchField: '',
  }

  componentDidMount() {
    if (this.props.location.search) {
      const searchField = this.props.location.search.substring(3)
      this.setState({ searchField: searchField })
      this.props.dispatchSearch(this.props.location.search)
    }
    else if (this.props.location.pathname.substring(12).length > 1) {
      this.props.dispatchSearch(this.props.location.pathname.substring(12))
    }
  }

  onTextChange = (e) => {
    this.setState({
      searchField: e.target.value,
    });
  }

  onSubmit = () => {
    if (this.state.searchField === "" || this.state.searchField.length === 0) {
      alert("Enter search keyword to search");
    } else {
      this.props.dispatchSearch(this.state.searchField);
      this.props.history.push(`/app/search/${this.state.searchField}`);
    }
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" placeholder="Search" onChange={this.onTextChange} value={this.state.searchField} />
        <div className="btn btn-outline-success my-2 my-sm-0"
          onClick={this.onSubmit}
        >Search</div>
      </form>
    )
  }
}

export default withRouter(connect(
  (state) => state.searchReducer,
  (dispatch) => {
    return {
      dispatchSearch: async (q) => {
        let posts = await findAllPosts()

        let mathchedPosts = posts
          .filter(({ post }) => {
            return post.toLowerCase().includes(q)
          })

        let r = await redditService.searchTopPosts(q)

        let results = [...mathchedPosts.map(e => {
          return {
            id: e.id,
            title: e.post,
            subreddit: e.category
          }
        }), ...r]

        dispatch(performSearchAction({ query: q, results: results }))
      },
    };
  })(SearchBar));

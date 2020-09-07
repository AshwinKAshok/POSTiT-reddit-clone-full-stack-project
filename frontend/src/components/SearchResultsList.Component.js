import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import redditService from '../services/redditService.js';
import { performSearchAction } from '../reducers/searchReducer.js';
import HeadingGeneric from "./generics/HeadingGeneric.Component"
import ListItemGenericComponent from './generics/ListItemGeneric.Component';
import { findAllPosts } from '../services/postService.js';

const SearchResultsList = (props) => (
  <div>
    <HeadingGeneric text="Search Results" />

    <ul className={'list-group'}>
      {props.results && props.results.map((r, id) =>
      {
        console.log(r)
        return <ListItemGenericComponent
          key={id}
          link={"/details/" + r.id}
          title={r.title}
          subreddit={r.subreddit}
        />}
      )}
    </ul>
  </div>
)

export default withRouter(connect(
  (state) => state.searchReducer,
  (dispatch) => {
    return {
    }
  }
)(SearchResultsList));


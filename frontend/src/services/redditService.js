import { REDDIT_API } from '../constants/redditAPI.js';

export default {
  getTrendingPosts: () => {
    return fetch(`${REDDIT_API}/top/.json?count=15`)
        .then((response) => response.json())
        .then((json) => json.data.children.map((e) => e.data))
    // .then((r) => { console.log(r); return r })
  },
  searchTopPosts: (query) => {
    return fetch(`${REDDIT_API}/search.json?q=${query}`)
      .then((response) => response.json())
      .then((json) => json.data.children.map((e) => e.data))
      // .then((r) => { console.log(r); return r })
  },

  getPostById: (id) => {
  return fetch(`${REDDIT_API}/comments/${id}/.json`)
    .then((response) => response.json())
    .then(json => json[0])
    .then((json) => json.data.children.map((e) => e.data))
    .then(json => json[0])
},
};

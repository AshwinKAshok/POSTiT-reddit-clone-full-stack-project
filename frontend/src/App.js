import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from "react-router-dom"
import loginReducer from './reducers/loginReducer';
import collectionReducer from './reducers/collectionReducer';
import personReducer from './reducers/personReducer';
import postSlice from "./reducers/postsReducer";
import currentSelectedPostSlice from "./reducers/currentSelectedPostReducer";
import searchSlice from "./reducers/searchReducer";
import MainApplication from "./components/MainApplication.Component";
import commentSlice from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    loginReducer: loginReducer,
    collectionReducer: collectionReducer,
    postReducer: postSlice.reducer,
    commentReducer: commentSlice.reducer,
    currentSelectedPostReducer: currentSelectedPostSlice.reducer,
    searchReducer: searchSlice.reducer,
    personReducer: personReducer
  },
})

const App = () =>
  <Provider store={store}>
    <Router>
      <MainApplication />
    </Router>
  </Provider>;

export default App;

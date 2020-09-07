import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from "../containers/HomePage.Container";
import RegisterPage from "../containers/RegisterPage.Container";
import LoginPage from "../containers/LoginPage.Container";
import SearchResultsList from '../components/SearchResultsList.Component';
import PrivacyPage from '../components/PrivacyPage.Component';
import PostPage from '../containers/PostPage.Container';
import CollectionsListPage from '../containers/CollectionsListPage.Container';
import CollectionPage from '../containers/CollectionPage.Container'
import ProfilePage from '../containers/ProfilePage.Container';
import PostListContainer from "../containers/PostList.Container";

const MainRoutes = () => (
	<Switch>
		{/*Home page of the web application*/}
		<Route
			path={"/"}
			exact={true}
			component={HomePage}
		/>
		{/*Registration page*/}
		<Route
			path={"/register"}
			exact={true}
			component={RegisterPage}
		/>
		{/*Login page*/}
		<Route
			path={"/login"}
			exact={true}
			component={LoginPage}
		/>
		{/*Result page*/}
		<Route
			path={"/details/:postId"}
			exact={true}
			component={PostPage}
		/>
		{/*Privacy policy page*/}
		<Route
			path={"/privacy"}
			exact={true}
			component={PrivacyPage}
		/>
		{/*Collections page*/}
		<Route
			path={"/collections"}
			exact={true}
			component={CollectionsListPage}
		/>
		{/*Posts page*/}
		<Route
			path={"/posts"}
			exact={true}
			component={PostListContainer}
		/>
		{/*Individual Collection page*/}
		<Route
			path={"/collections/:collectionId"}
			exact={true}
			component={CollectionPage}
		/>
		{/*Profile page*/}
		<Route
			path={"/profile"}
			exact={true}
			component={ProfilePage}
		/>
		{/*Profile page*/}
		<Route
			path={"/profile/:personId"}
			exact={true}
			component={ProfilePage}
		/>
		<Route
			path={"/app/search/:searchParams"}
			exact={true}
			component={SearchResultsList}
		/>

	</Switch>
)

export default connect(
	(state) => state,
	(dispatch) => { return {} }
)(MainRoutes);

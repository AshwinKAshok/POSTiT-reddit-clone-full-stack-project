import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
	name: 'collectionReducer',
	initialState: { collections: [], personCollections: [], collection: {} },
	reducers: {
		performGetAllCollections(s, a) {
			if (Array.isArray(a.payload.collections))
				s.collections = a.payload.collections
		},
		performGetAllCollectionsForPerson(s, a) {
			if (Array.isArray(a.payload.personCollections))
				s.personCollections = a.payload.personCollections
		},
		performCreateCollection(s, a) {
			s.collections.push(a.payload.newCollection)
			s.personCollections.push(a.payload.newCollection)
		},
		performGetCollection(s, a) {
			s.collection = a.payload.collection
		},
	},
});

const { actions, reducer } = collectionSlice;
export const { performGetAllCollections, performGetCollection, performCreateCollection, performGetAllCollectionsForPerson } = actions;
export default reducer;

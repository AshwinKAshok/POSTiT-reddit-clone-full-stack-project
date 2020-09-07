import { createSlice } from '@reduxjs/toolkit';

const personSlice = createSlice({
	name: 'personReducer',
	initialState: { person: {} },
	reducers: {
		performFindPerson(s, a) {
			s.person = a.payload.person
		},
		performUpdatePerson(s, a) {
			s.person = a.payload.updatedPerson
		}
	},
});

const { actions, reducer } = personSlice;
export const { performUpdatePerson, performFindPerson } = actions;
export default reducer;

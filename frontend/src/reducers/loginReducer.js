import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loginReducer',
  initialState: { token: "", authenticatedUserCredentials: {}},
  reducers: {
    performLoginAction(s, a) {
      localStorage.setItem("token", a.payload.token);
      if(a.payload.authenticatedUserCredentials) {
        localStorage.setItem("username", a.payload.authenticatedUserCredentials.username);
        localStorage.setItem("uid", a.payload.authenticatedUserCredentials.uid);
      }

      s.token = a.payload.token
      s.authenticatedUserCredentials = {...a.payload.authenticatedUserCredentials}
    }
  },
});

const { actions, reducer } = loginSlice;
export const { performLoginAction } = actions;
export default reducer;

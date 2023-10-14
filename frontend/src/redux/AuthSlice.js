import { deleteUser, loginUser, signupUser } from "../utils/Thunks";

const { createSlice } = require("@reduxjs/toolkit");

const authToken = localStorage.getItem("inventiAuthToken");

const AuthSlice = createSlice({
	name: "authentication",
	initialState: {
		isLoggedIn: authToken && true,
		authToken: authToken,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				// Update the state based on the action payload
				// For example, set authToken and isLoggedIn
				state.authToken = action.payload.token;
				state.isLoggedIn = true;
				// You may also store the authToken in localStorage
				localStorage.setItem("inventiAuthToken", action.payload.token);
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				// Update the state based on the action payload
				state.authToken = action.payload.token;
				state.isLoggedIn = true;
				localStorage.setItem("inventiAuthToken", action.payload.token);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.loading = false;
				// Clear user authentication data and set isLoggedIn to false
				state.authToken = null;
				state.isLoggedIn = false;
				localStorage.removeItem("inventiAuthToken"); // Remove the authToken from localStorage
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setAuthToken, clearAuthToken } = AuthSlice.actions;
export default AuthSlice;

import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "../utils/Thunks";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null, // User data
		loading: false, // Loading state
		error: null, // Error state
	},
	reducers: {},
	extraReducers: (builder) => {
		// Extra reducers for handling async actions
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default userSlice;

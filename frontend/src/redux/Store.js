import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";

const Store = configureStore({
	reducer: {
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
	},
});

export default Store;

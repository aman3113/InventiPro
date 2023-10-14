import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";
import InventorySlice from "./InventorySlice";
import SalesSlice from "./SalesSlice";

const Store = configureStore({
	reducer: {
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
		inventory: InventorySlice.reducer,
		sales: SalesSlice.reducer,
	},
});

export default Store;

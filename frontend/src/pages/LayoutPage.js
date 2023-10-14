import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

import { fetchUser } from "../utils/Thunks";
import { fetchInventory } from "../redux/InventorySlice";
import { fetchSales } from "../redux/SalesSlice";

const LayoutPage = () => {
	const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchInventory());
		dispatch(fetchSales());
	}, []);

	if (!isLoggedIn) {
		return <Navigate to="/signup" />;
	}

	return (
		<div className="w-full h-[90vh] flex flex-col-reverse md:flex-row">
			<SideBar />
			<div className="h-full overflow-y-auto w-full p-3 py-5">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutPage;

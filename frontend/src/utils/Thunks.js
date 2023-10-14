import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Axios";
import { clearAuthToken } from "../redux/AuthSlice";

// User actions

// Action to fetch user information
export const fetchUser = createAsyncThunk(
	"user/fetch",
	async (_, { getState }) => {
		const authToken = getState().auth.authToken;
		const response = await api.get("/user", {
			headers: {
				Authorization: authToken,
			},
		});
		return response.data;
	}
);

// Action to update user information
export const updateUser = createAsyncThunk(
	"user/update",
	async (userData, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			const response = await api.post("/user", JSON.stringify(userData), {
				headers: {
					Authorization: authToken,
				},
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

// Action to delete user
export const deleteUser = createAsyncThunk(
	"user/delete",
	async (_, { getState, dispatch }) => {
		const authToken = getState().auth.authToken;

		try {
			// Make a DELETE request to delete the user
			await api.delete("/user", {
				headers: {
					Authorization: authToken,
				},
			});

			// Dispatch a logout action to clear user authentication data

			return true; // Indicate successful deletion
		} catch (error) {
			throw error;
		}
	}
);

//Signup user
export const signupUser = createAsyncThunk("user/signup", async (userData) => {
	try {
		const response = await api.post("/auth/signup", JSON.stringify(userData), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
});

// Action to log in a user
export const loginUser = createAsyncThunk("user/login", async (userData) => {
	try {
		const response = await api.post("/auth/login", JSON.stringify(userData), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
});

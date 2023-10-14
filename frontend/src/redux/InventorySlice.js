import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/Axios"; // Import your Axios API configuration

// Inventory Slice and Async Thunks
const InventorySlice = createSlice({
	name: "inventory",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	},
	reducers: {
		// Additional reducers for synchronous actions if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInventory.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchInventory.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchInventory.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateInventory.fulfilled, (state, action) => {
				const updatedItem = action.payload;
				state.data = state.data.map((item) =>
					item._id === updatedItem._id ? updatedItem : item
				);
			})
			.addCase(addInventory.fulfilled, (state, action) => {
				state.data.push(action.payload);
			})
			.addCase(deleteInventory.fulfilled, (state, action) => {
				state.data = state.data.filter(
					(item) => item._id !== action.payload._id
				);
			});
	},
});

// Async Thunks
export const fetchInventory = createAsyncThunk(
	"inventory/fetchInventory",
	async (_, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;
			const response = await api.get("/item", {
				headers: {
					Authorization: authToken,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateInventory = createAsyncThunk(
	"inventory/updateInventory",
	async (data, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.post(`/item/${data.id}`, data, {
				headers: {
					Authorization: authToken,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addInventory = createAsyncThunk(
	"inventory/addInventory",
	async (data, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.post("/item", data, {
				headers: {
					Authorization: authToken,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteInventory = createAsyncThunk(
	"inventory/deleteInventory",
	async (id, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.delete(`/item/${id}`, {
				headers: {
					Authorization: authToken,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export default InventorySlice;

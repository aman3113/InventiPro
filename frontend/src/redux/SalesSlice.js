import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/Axios"; // Import your Axios API configuration

// Sales Slice and Async Thunks
const SalesSlice = createSlice({
	name: "sales",
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
			.addCase(fetchSales.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchSales.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchSales.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateSales.fulfilled, (state, action) => {
				const updatedSale = action.payload;
				state.data = state.data.map((sale) =>
					sale._id === updatedSale._id ? updatedSale : sale
				);
			})
			.addCase(addSales.fulfilled, (state, action) => {
				state.data.push(action.payload);
			})
			.addCase(deleteSales.fulfilled, (state, action) => {
				state.data = state.data.filter(
					(sale) => sale._id !== action.payload._id
				);
			});
	},
});

// Async Thunks
export const fetchSales = createAsyncThunk(
	"sales/fetchSales",
	async (_, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.get("/sales", {
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

export const updateSales = createAsyncThunk(
	"sales/updateSales",
	async (data, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.post(`/sales/${data.id}`, data, {
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

export const addSales = createAsyncThunk(
	"sales/addSales",
	async (data, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.post("/sales", data, {
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

export const deleteSales = createAsyncThunk(
	"sales/deleteSales",
	async (id, { rejectWithValue, getState }) => {
		try {
			const authToken = getState().auth.authToken;

			const response = await api.delete(`/sales/${id}`, {
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

export default SalesSlice;

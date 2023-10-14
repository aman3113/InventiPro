import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/v1", // Replace with your API's base URL
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;

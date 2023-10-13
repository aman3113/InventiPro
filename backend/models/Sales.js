const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	salePrice: {
		type: Number, // You can use Decimal128 for more precise monetary values
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number, // Original price of the item
		required: true,
	},
	revenue: {
		type: Number,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User model
	},
	itemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Inventory", // Reference to the Inventory model
	},
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;

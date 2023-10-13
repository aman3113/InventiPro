const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number, // You can use Decimal128 for more precise monetary values
		required: true,
	},
	sales: {
		type: Number,
	},
	category: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User model
	},
	itemUrl: {
		type: String,
	},
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;

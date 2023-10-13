const express = require("express");
const mongoose = require("mongoose");
const salesRouter = express.Router();
const Sales = mongoose.model("Sales"); // Import your Sales model
const Inventory = mongoose.model("Inventory"); // Import your Inventory model

// Get a list of all sales transactions for the logged-in user
salesRouter.get("/", async (req, res) => {
	try {
		const userId = req.userId;
		const sales = await Sales.find({ userId }); // Filter by userId and populate the associated Inventory item
		res.json(sales);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Get details of a specific sales transaction by ID
salesRouter.get("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const sale = await Sales.findOne({ _id: req.params.id, userId }).populate(
			"itemId"
		);
		if (!sale) {
			return res.status(404).json({ message: "Sales transaction not found" });
		}
		res.json(sale);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Record a new sales transaction
salesRouter.post("/", async (req, res) => {
	try {
		const userId = req.userId;
		const { name, salePrice, quantity, description } = req.body;
		const revenue = salePrice * quantity;

		// Find the corresponding inventory item by name
		const inventoryItem = await Inventory.findOne({ userId, name });
		if (!inventoryItem) {
			return res.status(400).json({ message: "Inventory item not found" });
		}

		const newItem = new Sales({
			description,
			salePrice,
			quantity,
			price: inventoryItem.price, // Original price from the inventory item
			userId,
			itemId: inventoryItem._id,
			revenue, // Reference to the Inventory item
		});

		await newItem.save();
		res.json(newItem);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Edit an existing sales transaction by ID
salesRouter.post("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const updatedSale = await Sales.findOneAndUpdate(
			{ _id: req.params.id, userId },
			{ $set: req.body },
			{ new: true }
		);
		if (!updatedSale) {
			return res.status(404).json({ message: "Sales transaction not found" });
		}
		res.json(updatedSale);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Delete a sales transaction by ID
salesRouter.delete("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const deletedSale = await Sales.findOneAndRemove({
			_id: req.params.id,
			userId,
		});
		if (!deletedSale) {
			return res.status(404).json({ message: "Sales transaction not found" });
		}
		res.json(deletedSale);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

module.exports = router;

const express = require("express");
const itemRouter = express.Router();
const mongoose = require("mongoose");
const Inventory = mongoose.model("Inventory"); // Import your Inventory model

// Get a list of all inventory items for the logged-in user
itemRouter.get("/", async (req, res) => {
	try {
		const userId = req.userId;
		const inventoryItems = await Inventory.find({ userId }); // Filter by userId
		res.json(inventoryItems);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Get details of a specific inventory item by ID
itemRouter.get("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const inventoryItem = await Inventory.findOne({
			_id: req.params.id,
			userId,
		});
		if (!inventoryItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.json(inventoryItem);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Add a new inventory item
itemRouter.post("/", async (req, res) => {
	try {
		const userId = req.userId;
		const newItem = new Inventory({ ...req.body, userId }); // Create a new item with userId
		await newItem.save();
		res.json(newItem);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Edit an existing inventory item by ID
itemRouter.post("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const updatedItem = await Inventory.findOneAndUpdate(
			{ _id: req.params.id, userId },
			{ $set: req.body },
			{ new: true }
		);
		if (!updatedItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.json(updatedItem);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

// Delete an inventory item by ID
itemRouter.delete("/:id", async (req, res) => {
	try {
		const userId = req.userId;
		const deletedItem = await Inventory.findOneAndRemove({
			_id: req.params.id,
			userId,
		});
		if (!deletedItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.json(deletedItem);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
});

module.exports = itemRouter;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addInventory,
	deleteInventory,
	updateInventory,
} from "../redux/InventorySlice"; // Import your Redux inventory actions

function InventoryPage() {
	const dispatch = useDispatch();
	const inventory = useSelector((state) => state.inventory.data);

	// Local state for form inputs
	const [newItem, setNewItem] = useState({
		name: "",
		quantity: 0,
		price: 0,
		category: "",
	});

	// Handle form submission
	const handleAddItem = (e) => {
		console.log(newItem);
		e.preventDefault();
		dispatch(addInventory(newItem)); // Dispatch the action to add a new item
		setNewItem({ name: "", quantity: 0, price: 0, category: "" }); // Reset the form
	};

	// Handle item update
	const handleUpdateItem = (item) => {
		dispatch(updateInventory(item)); // Dispatch the action to update an item
	};

	// Handle item deletion
	const handleDeleteItem = (itemId) => {
		dispatch(deleteInventory(itemId)); // Dispatch the action to delete an item
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

			{/* Add Item Form */}
			<div className="mb-4">
				<h2 className="text-xl font-semibold">Add Item to Inventory</h2>
				<form>
					<input
						type="text"
						placeholder="Item Name"
						value={newItem.name}
						onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
						className="mr-2 p-2 border rounded"
					/>
					<input
						type="number"
						placeholder="Quantity"
						value={newItem.quantity}
						onChange={(e) =>
							setNewItem({ ...newItem, quantity: e.target.value })
						}
						className="mr-2 p-2 border rounded"
					/>
					<input
						type="number"
						placeholder="Price"
						value={newItem.price}
						onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
						className="mr-2 p-2 border rounded"
					/>
					<input
						type="text"
						placeholder="Category"
						value={newItem.category}
						onChange={(e) =>
							setNewItem({ ...newItem, category: e.target.value })
						}
						className="mr-2 p-2 border rounded"
					/>
					<button
						onClick={handleAddItem}
						className="p-2 bg-blue-500 text-white rounded"
					>
						Add Item
					</button>
				</form>
			</div>

			{/* Inventory List */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Inventory List</h2>
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-2">Name</th>
							<th className="border p-2">Quantity</th>
							<th className="border p-2">Price</th>
							<th className="border p-2">Category</th>
							<th className="border p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{inventory.map((item) => (
							<tr key={item._id}>
								<td className="border p-2">{item.name}</td>
								<td className="border p-2">{item.quantity}</td>
								<td className="border p-2">{item.price}</td>
								<td className="border p-2">{item.category}</td>
								<td className="border p-2">
									<button
										onClick={() => handleUpdateItem(item)}
										className="bg-blue-500 text-white p-2 rounded mr-2"
									>
										Update
									</button>
									<button
										onClick={() => handleDeleteItem(item._id)}
										className="bg-red-500 text-white p-2 rounded"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default InventoryPage;

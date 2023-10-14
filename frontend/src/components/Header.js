import React, { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import InventiLogo from "../images/Inventipro logo.png";
import SmallLogo from "../images/SmallInventipro logo.png";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { deleteUser, updateUser } from "../utils/Thunks";
import { Link } from "react-router-dom";

const Header = () => {
	const dispatch = useDispatch();
	const { user, error, loading } = useSelector((store) => store.user);
	const { authToken, error: deleteError } = useSelector((store) => store.auth);

	const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
	const [openUserModal, setOpenUserModal] = useState(false);
	const [editProfile, setEditProfile] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user?.firstName,
		lastName: user?.lastName,
		profilePicture: user?.profilePicture,
	});

	function handleInputChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		dispatch(updateUser(formData));
		setEditProfile(false);
	}

	function handleDeleteUser() {
		dispatch(deleteUser());
		setOpenUserModal(false);
	}

	useEffect(() => {
		setFormData({
			firstName: user?.firstName,
			lastName: user?.lastName,
			profilePicture: user?.profilePicture,
		});
	}, [isLoggedIn]);

	return (
		<header className="h-[10vh] p-3 px-5 flex justify-between items-center">
			<Link to="/" className="w-[80px] md:w-[200px] h-full">
				<img
					src={InventiLogo}
					alt="xneo logo"
					className="w-full h-full hidden md:block"
				/>
				<img
					src={SmallLogo}
					alt="xneo logo"
					className="w-full h-full md:hidden"
				/>
			</Link>
			{isLoggedIn ? (
				<p className="hidden sm:block">
					Hi, welcome{" "}
					<strong className="text-pink-900">{user?.firstName}</strong>
				</p>
			) : (
				<p className="hidden sm:block text-2xl font-bold text-pink-900">
					Welcome My Friend.
				</p>
			)}

			<div className="flex gap-3 items-center">
				<a
					href="https://github.com/aman3113/Xneo_Fit"
					target="_blank"
					rel="noreferrer"
					className="text-pink-500 font-semibold underline"
				>
					GITHUB
				</a>
				{isLoggedIn && (
					<Avatar
						name={user?.firstName}
						size="sm"
						src={user?.profilePicture}
						className="cursor-pointer"
						onClick={() => setOpenUserModal(true)}
					/>
				)}
			</div>
			<Drawer
				isOpen={openUserModal}
				placement="right"
				onClose={() => setOpenUserModal(false)}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						Hi {user?.firstName} {user?.lastName}
					</DrawerHeader>

					<DrawerBody>
						{(error || deleteError) && (
							<p className="text-2xl text-red-600 text-center">
								{error || deleteError}
							</p>
						)}

						{loading ? (
							<div className="flex justify-center">
								<Spinner
									thickness="4px"
									speed="0.65s"
									emptyColor="gray.200"
									color="blue.500"
									size="xl"
								/>
							</div>
						) : (
							<div className="flex flex-col items-center gap-4">
								<Avatar
									name={user?.firstName}
									size="2xl"
									src={user?.profilePicture}
									className="cursor-pointer"
									onClick={() => setOpenUserModal(true)}
								/>
								{editProfile ? (
									<button
										className="border border-black bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md text-white"
										onClick={() => setEditProfile(false)}
									>
										Cancel
									</button>
								) : (
									<button
										className="border border-black bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
										onClick={() => setEditProfile(true)}
									>
										Edit
									</button>
								)}
								{editProfile ? (
									<form
										onSubmit={handleFormSubmit}
										className="flex flex-col gap-3 items-center w-full"
									>
										<label>
											<strong>First Name</strong>
											<input
												type="text"
												name="firstName"
												value={formData.firstName}
												onChange={handleInputChange}
											/>
										</label>
										<label>
											<strong>Last Name</strong>
											<input
												type="text"
												name="lastName"
												value={formData.lastName}
												onChange={handleInputChange}
											/>
										</label>
										<label>
											<strong>Profile Picture</strong>
											<input
												type="url"
												name="profilePicture"
												value={formData.profilePicture}
												onChange={handleInputChange}
											/>
										</label>
										<button className="border border-black bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-white">
											Save Changes
										</button>
									</form>
								) : (
									<div>
										<p>
											<strong>First Name: </strong>
											{user?.firstName}
										</p>
										<p>
											<strong>Lat Name: </strong>
											{user?.lastName}
										</p>
										<p>
											<strong>Email: </strong>
											{user?.email}
										</p>
									</div>
								)}

								<button
									className="border-2 border-black hover:bg-pink-50 px-3 py-1 rounded-md text-pink-400 font-semibold"
									onClick={handleDeleteUser}
								>
									Delete Account
								</button>
							</div>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</header>
	);
};

export default Header;

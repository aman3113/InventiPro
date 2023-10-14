import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoFitnessOutline } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { clearAuthToken } from "../redux/AuthSlice";

const SideBar = () => {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();
	function handleLogout() {
		dispatch(clearAuthToken());
	}

	return (
		<div className="w-full md:w-[20%] md:h-full md:py-4 flex justify-evenly  p-2 md:flex-col gap-4">
			<NavLink
				to="/"
				className={({ isActive }) =>
					`${
						isActive && "text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<AiOutlineDashboard size={25} />
				<span className="hidden md:block">Dashboard</span>
			</NavLink>
			<NavLink
				to="/inventory"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<IoFitnessOutline size={25} />
				<span className="hidden md:block">Inventory</span>
			</NavLink>
			<NavLink
				to="/sales"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<BiFoodMenu size={25} />
				<span className="hidden md:block">Sales</span>
			</NavLink>
			{/* <NavLink
				to="/goal"
				className={({ isActive }) =>
					`${
						isActive && " text-pink-400 border-blue-800 md:border-l-8"
					} flex gap-2 items-center p-2  font-semibold pl-4`
				}
			>
				<GoGoal size={25} />
				<span className="hidden md:block">Goals</span>
			</NavLink> */}
			<p
				className="flex gap-2 items-center p-2  font-semibold pl-4 cursor-pointer"
				onClick={() => setOpenModal(true)}
			>
				<BiLogOut size={25} />
				<span className="hidden md:block">Logout</span>
			</p>
			<Modal
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
				size={"xs"}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody fontWeight={600} textAlign="center" mt={10}>
						Are you sure want to Exit?
					</ModalBody>

					<ModalFooter justifyContent="center">
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => setOpenModal(false)}
						>
							No
						</Button>
						<Button colorScheme="pink" onClick={handleLogout}>
							Yes
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default SideBar;

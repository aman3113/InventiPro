import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Spinner, useToast } from "@chakra-ui/react";
import signup from "../images/signup.jpg";
import { signupUser } from "../utils/Thunks";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const toast = useToast();
	const { authToken, loading, error } = useSelector((store) => store.auth);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSignUP(e) {
		e.preventDefault();
		if (
			formData.firstName.trim() === "" ||
			formData.email.trim() === "" ||
			formData.password.trim() === ""
		) {
			return alert("Please fill all fields.");
		}

		dispatch(signupUser(formData));
		toast({
			title: "Account created.",
			description: "We've created your account for you.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	}

	if (authToken) {
		return <Navigate to="/" />;
	}

	return (
		<div className="p-2">
			<div className="flex items-center justify-center min-h-[80vh]">
				<section className="flex flex-col sm:flex-row items-center w-full justify-center">
					<div className="w-[50%] ">
						<img src={signup} alt="login here" />
					</div>
					<div className=" w-full sm:w-[50%] flex flex-col items-center p-2">
						<p className="text-2xl font-bold text-center">
							Let's get you Started
						</p>
						{error && (
							<p className="text-sm text-center text-red-600 my-2">{error}</p>
						)}
						<form
							onSubmit={handleSignUP}
							className="flex sm:w-[80%]  flex-col gap-3 my-4"
						>
							<div className="flex gap-2">
								<input
									className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="Your first name"
								/>
								<input
									className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Your last name"
								/>
							</div>
							<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
								<BiUser />
								<input
									type="text"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your email"
									required
									className="border-none outline-none w-full"
								/>
							</div>
							<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
								<RiLockPasswordLine />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="border-none outline-none w-full"
									required
								/>
								<div
									className="ml-auto cursor-pointer"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
								</div>
							</div>
							<button
								onClick={handleSignUP}
								className="border-2  border-black rounded-md bg-pink-400 text-white p-2 px-3 w-full"
							>
								{loading ? (
									<Spinner
										thickness="2px"
										speed="0.65s"
										emptyColor="gray.200"
										color="blue.500"
										size="lg"
									/>
								) : (
									"Sign Up"
								)}
							</button>
						</form>
						<p>
							Already have an account?
							<Link className="text-pink-800 font-semibold ml-1" to="/login">
								Log In
							</Link>
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default SignUpPage;

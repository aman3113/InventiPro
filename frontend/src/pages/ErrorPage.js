import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center py-5">
			<h1 className="text-3xl font-bold py-5">No such Route Exists.</h1>
			<Link className="px-4 py-1 rounded-md bg-pink-400 text-white" to="/">
				Back To Home.
			</Link>
		</div>
	);
};

export default ErrorPage;

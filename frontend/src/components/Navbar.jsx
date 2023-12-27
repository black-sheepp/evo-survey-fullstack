import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Navbar({ login, logoutClick }) {
	const handleLogout = async () => {
		try {
			// const response = await Axios.get("/sign-out");

			// if (response.status === 200) {
			// 	localStorage.removeItem("userData");
			// 	logoutClick(false);
			// } else {
			// 	console.error("Logout failed with status:", response.status);
			// }
			localStorage.removeItem("userData");
			logoutClick(false);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<nav className='bg-white border-gray-200 dark:bg-gray-900'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
				<Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Flowbite Logo' />
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						EvoSurvey
					</span>
				</Link>
				<div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
					{login ? (
						<>
							<button className='text-white mx-2 bg-[#0000FF] hover:bg-[#29297e] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center'>
								Admin
							</button>
							<button
								onClick={handleLogout}
								className='text-white mx-2 bg-[#0000FF] hover:bg-[#29297e] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center'>
								Logout
							</button>
						</>
					) : (
						<Link
							to='/sign-in'
							className='text-white bg-[#0000FF] hover:bg-[#29297e] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center'>
							Admin Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

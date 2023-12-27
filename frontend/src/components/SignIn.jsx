import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignIn = ({ login }) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(`${BASE_URL}/sign-in`, credentials);

			if (response.status === 401) {
				console.error("Authentication failed - 401 Unauthorized");
			}

			if (response.status === 200) {
				localStorage.setItem("userData", JSON.stringify(response.data));
				login(true);
				setLoading(false);
				console.log("Authentication successful:", response.data);
			}
		} catch (error) {
			console.error("Error during sign-in:", error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full max-w-[400px] px-3 mx-auto md:flex-0 shrink-0'>
			<div className='relative z-0 flex flex-col min-w-0 mt-9 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
				<div className='p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl'>
					<h5 className='font-bold text-2xl text-[#0000FF]'>Login with EvoSurvey</h5>
				</div>

				{loading ? (
					<Loader />
				) : (
					<div className='flex-auto p-6'>
						<form role='form text-left' onSubmit={handleSignIn}>
							<div className='mb-4'>
								<input
									aria-describedby='email-addon'
									aria-label='Email'
									placeholder='Email'
									className='text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow'
									type='email'
									name='email'
									value={credentials.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className='mb-4'>
								<input
									aria-describedby='password-addon'
									aria-label='Password'
									placeholder='Password'
									className='text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow'
									type='password'
									name='password'
									value={credentials.password}
									onChange={handleInputChange}
								/>
							</div>
							<div className='text-center'>
								<button
									className='inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white'
									type='submit'>
									Sign In
								</button>
							</div>
							<p className='mt-4 mb-0 leading-normal text-sm'>
								Don't have an account?{" "}
								<Link to='/sign-up' className='font-bold text-slate-700'>
									Sign Up
								</Link>
							</p>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default SignIn;

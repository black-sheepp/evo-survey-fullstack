import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminDash() {
	const [surveys, setSurveys] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDataString = localStorage.getItem("userData");
				const userData = JSON.parse(userDataString);
				const token = userData ? userData.token : null;

				const response = await axios.get(`${BASE_URL}/get-survey`, {
					headers: {
						Authorization: token,
					},
				});

				setSurveys(response.data.data || []);
			} catch (error) {
				console.error("Axios Error:", error);
				setError("Error fetching data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<p className='text-[#0000FF] text-3xl font-bold text-center my-10'>Admin Dashboard</p>

			{loading ? (
				<Loader />
			) : error ? (
				<p className='text-red-500'>{error}</p>
			) : (
				<ul role='list' className='divide-y divide-gray-100 mx-20'>
					{surveys.map((survey) => (
						<li key={survey._id} className='flex justify-between gap-x-6 py-5'>
							<div className='flex min-w-0 gap-x-4'>
								<div className='min-w-0 flex-auto'>
									<p className='text-lg font-semibold leading-6 text-black'>
										{survey.name}
									</p>
									<p className='mt-1 text-sm leading-5 text-[#0000FF]'> {survey.message}</p>
									<p className='mt-1 truncate text-sm leading-5 text-gray-500'>
										{survey.nationality}
									</p>
								</div>
							</div>
							<div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
								<p className='text-lg leading-6 text-gray-900'>{survey.email}</p>
								<p className='mt-1 truncate text-sm leading-5 text-gray-500'>{survey.phone}</p>
								<p className='mt-1 text-sm leading-5 text-gray-500'>{survey.address}</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default AdminDash;

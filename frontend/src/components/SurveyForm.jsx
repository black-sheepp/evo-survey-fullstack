import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Loader from "./Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SurveyForm() {
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [nationality, setNationality] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [message, setMessage] = useState("");

	const [verified, setVerified] = useState(false);
	const [formCreated, setFormCreated] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleNameChange = (e) => setName(e.target.value);
	const handleGenderChange = (e) => setGender(e.target.value);
	const handleNationalityChange = (e) => setNationality(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePhoneChange = (e) => setPhone(e.target.value);
	const handleAddressChange = (e) => setAddress(e.target.value);
	const handleMessageChange = (e) => setMessage(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("gender", gender);
		formData.append("nationality", nationality);
		formData.append("email", email);
		formData.append("phone", phone);
		formData.append("address", address);
		formData.append("message", message);

		const surveyData = Object.fromEntries(formData.entries());
		console.log(surveyData);

		const response = await axios.post(`${BASE_URL}/create-survey`, surveyData);

		if (response.status === 201) {
			setFormCreated(true);
			console.log(response.data);
			setLoading(false);
		} else {
			console.log("Error creating survey");
		}
	};

	function onChange(value) {
		console.log("Captcha value:", value);
		setVerified(true);
	}

	return (
		<div>
			{loading ? (
				<Loader />
			) : formCreated ? (
				<>
					<p className='text-green-500 text-3xl font-bold text-center my-10'>Congratulation 🎉 🎉</p>
					<p className='text-black text-2xl font-semibold text-center my-10'> We have recieved your survey !!</p>
				</>
			) : (
				<>
					<h1 className='text-black text-3xl font-semibold text-center my-8'>
						Wecome to EvoSurvey App !!
					</h1>

					<form onSubmit={handleSubmit}>
						<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
							<div className='w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0'>
								<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
									<p className='text-xl font-bold leading-tight tracking-tight text-blue-700 md:text-2xl'>
										Please, Fill the Survey form
									</p>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Your Name
										</label>
										<input
											placeholder='JohnDoe'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='username'
											type='text'
											value={name}
											onChange={handleNameChange}
											required
										/>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Gender
										</label>
										<div className='flex gap-4'>
											<div className='flex items-center'>
												<input
													checked={gender === "male"}
													id='male'
													type='radio'
													name='gender'
													value='male'
													onChange={handleGenderChange}
													required
												/>
												<label
													htmlFor='male'
													className='ms-2 text-sm font-medium text-gray-900'>
													Male
												</label>
											</div>
											<div className='flex items-center'>
												<input
													checked={gender === "female"}
													id='female'
													type='radio'
													name='gender'
													value='female'
													onChange={handleGenderChange}
												/>
												<label
													htmlFor='female'
													className='ms-2 text-sm font-medium text-gray-900'>
													Female
												</label>
											</div>
											<div className='flex items-center'>
												<input
													checked={gender === "other"}
													id='other'
													type='radio'
													name='gender'
													value='other'
													onChange={handleGenderChange}
												/>
												<label
													htmlFor='other'
													className='ms-2 text-sm font-medium text-gray-900'>
													Other
												</label>
											</div>
										</div>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Nationality
										</label>
										<input
											placeholder='Enter nationality'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='nationality'
											type='text'
											value={nationality}
											onChange={handleNationalityChange}
											required
										/>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Email
										</label>
										<input
											placeholder='john.doe@example.com'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='email'
											type='text'
											value={email}
											onChange={handleEmailChange}
											required
										/>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Phone
										</label>
										<input
											placeholder='Enter phone number'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='phone'
											type='text'
											value={phone}
											onChange={handlePhoneChange}
											required
										/>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Address
										</label>
										<input
											placeholder='Enter address'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='address'
											type='text'
											value={address}
											onChange={handleAddressChange}
											required
										/>
									</div>
									<div>
										<label className='block mb-2 text-sm font-medium text-gray-900'>
											Message
										</label>
										<textarea
											placeholder='Your message'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
											id='message'
											rows='4'
											value={message}
											onChange={handleMessageChange}
											required
										/>
									</div>
									<ReCAPTCHA
										sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
										onChange={onChange}
									/>
									{verified ? (
										<button
											className='w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white'
											type='submit'>
											Submit
										</button>
									) : (
										<p className='text-blue-500'>Please, verify you are not a robot.</p>
									)}
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</div>
	);
}

export default SurveyForm;

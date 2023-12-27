const Survey = require("../Model/survey");

module.exports.createNewSurvey = async function (req, res) {
	try {
		const { name, gender, nationality, email, phone, address, message } = req.body;

		console.log(req.body);
		const newSurvey = new Survey({
			name,
			gender,
			nationality,
			email,
			phone,
			address,
			message,
		});

		const savedSurvey = await newSurvey.save();

		res.status(201).json({
			status: "created",
			data: savedSurvey,
			message: "Survey created successfully",
		});
	} catch (error) {
		console.error("Error creating survey:", error);
		res.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
};

module.exports.getSurvey = async function (req, res) {
	try {
		const surveys = await Survey.find();
		res.status(200).json({
			status: "success",
			data: surveys,
			message: "Surveys retrieved successfully",
		});
	} catch (error) {
		console.error("Error retrieving surveys:", error);
		res.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
};

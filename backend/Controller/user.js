const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/user");
const dotenv = require("dotenv").config();

module.exports.signUp = async function (req, res) {
	try {
		const { email, name, password } = req.body;

		if (!email || !name || !password) {
			return res.status(400).send({ message: "Please provide name, email, and password" });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).send({ message: "Email already exists!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			email,
			name,
			password: hashedPassword,
		});

		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
		return res.status(201).send({ token, message: "User created successfully" });
	} catch (error) {
		console.error("Error in signUp:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

module.exports.signIn = async function (req, res) {
	const { email, password } = req.body;

	try {
		if (email && password) {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).send({ message: "Invalid email or password" });
			}
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res.status(401).send({ message: "Invalid email or password" });
			}

			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

			return res.status(200).send({ token, message: "Authentication successful" });
		} else {
			return res.status(400).send({ message: "Please provide email and password" });
		}
	} catch (error) {
		console.error("Error in signIn:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

module.exports.signOut = function (req, res) {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).send({ message: "Unauthorized - No token provided" });
		}
		return res.status(200).send({ message: "Logout successful" });
	} catch (error) {
		console.error("Error in logout:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateKey } = require("crypto");

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Please enter email and password" });
	}

	try {
		const user = await User.findOne({ email });
		console.log("USER", user);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate a token for the user
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h", // Adjust expiration as needed
		});

		res.status(200).json({
			message: "Login successful",
			token,
			user: { name: user.name, email: user.email },
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ message: "Server error" });
	}
};

const googleSSOSignIn = async (req, res) => {
	const {
		email,
		familyName,
		givenName,
		name,
		id,
		photo,
		password,
		confirmPassword,
	} = req.body;

	try {
		const user = await User.findOne({ email });
		console.log("USER", user);

		if (user) {
			return res.status(404).json({ message: "User already exists" });
		}

		const newUser = {
			email,
			familyName,
			givenName,
			googleId: id,
			name,
			photo,
			password,
			confirmPassword,
		};

		await User.create(newUser);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { loginUser, googleSSOSignIn };

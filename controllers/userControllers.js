const User = require("../models/userModel"); // Import the User model
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

///for google sign in

const googleSignIn = async (req, res) => {
	try {
		const { googleId, name, email, photoUrl } = req.body;

		// Check if user already exists
		let user = await User.findOne({ googleId });
		if (!user) {
			user = new User({ googleId, name, email, photoUrl });
			await user.save();
		}

		res.status(200).json({ message: "User saved successfully", user });
	} catch (error) {
		console.error("Error saving user", error);
		res.status(500).json({ message: "Error saving user" });
	}
};

const getUsers = async (req, res) => {
	console.log("hello");
	try {
		// Find all users in the 'users' collection
		const users = await User.find();
		console.log("USERS", users);
		res.status(200).json(users); // Send back the list of users as JSON
	} catch (err) {
		console.error("Failed to retrieve users:", err);
		res.status(500).send("Server error");
	}
};

const createUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body; // Example of receiving user data from the request

	if (!name || !email || !password || !confirmPassword) {
		return res
			.status(400)
			.json({ message: "Please add all necessary information" });
	}

	const isEmailValid = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegex.test(email);
	};

	if (!isEmailValid(email)) {
		return res.status(400).json({ message: "Incorrect email format" });
	}

	const existingEmail = await User.findOne({ email: email });

	if (existingEmail) {
		return res.status(409).json({ message: "Duplicate email" });
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			confirmPassword,
		});

		await newUser.save();

		res
			.status(201)
			.json({ message: "User created successfully", user: newUser });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

const resetPassword = async (req) => {
	const { email } = req.body;

	// if (!email) {
	// 	return NextResponse.json(
	// 		{
	// 			status: 400,
	// 			message: "Please provide an email address",
	// 		},
	// 		{
	// 			status: 400,
	// 		}
	// 	);
	// }

	try {
		// const existingAccount = await User.findOne({ email });

		// if (!existingAccount) {
		// 	return NextResponse.json(
		// 		{ status: 400, message: "Bad Request" },
		// 		{
		// 			status: 400,
		// 		}
		// 	);
		// }

		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = Date.now() + 3600000;

		existingAccount.resetPasswordToken = resetToken;
		existingAccount.resetPasswordExpires = resetTokenExpiry;
		await existingAccount.save();

		const resetUrl = `${process.env.FRONTEND_URL}/reset-password?resetToken=${resetToken}`;

		const data = {
			service_id: "service_rdidfqm",
			template_id: "template_369b2nq",
			user_id: "cgTZ0KclmEDTBcp_l",
			template_params: {
				to_email: email,
				reset_url: resetUrl,
				to_name: existingAccount.firstName,
				from_name: "Yessi Loves Animals",
			},
		};

		await axios
			.post("https://api.emailjs.com/api/v1.0/email/send", data)
			.then(function (response) {
				console.log("Your mail is sent!");
			})
			.catch(function (error) {
				console.log("Oops... " + JSON.stringify(error));
			});
		return NextResponse.json({
			status: 200,
			message: "Password reset link sent to your email",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				status: 500,
				message: "Internal Server Error",
			},
			{
				status: 500,
			}
		);
	}
};

module.exports = {
	getUsers,
	createUser,
	resetPassword,
	googleSignIn,
};

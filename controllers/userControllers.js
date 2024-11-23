const User = require("../models/userModel"); // Import the User model
const bcrypt = require("bcryptjs");

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
};

// if (!name || !email || !password || !confirmPassword) {
// 	return NextResponse.json(
// 		{
// 			status: 400,
// 			message: "Please add all necessary information",
// 		},
// 		{
// 			status: 400,
// 		}
// 	);
// }

// if (!emailValidator(email)) {
// 	return NextResponse.json(
// 		{
// 			status: 400,
// 			message: "Incorrect email format",
// 		},
// 		{
// 			status: 400,
// 		}
// 	);
// }

// const existingEmail = await UsersModel.findOne({ email: email });

// if (existingEmail) {
// 	return NextResponse.json(
// 		{ status: 409, message: "Duplicate email" },
// 		{
// 			status: 409,
// 		}
// 	);
// }

// try {
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new UsersModel({
	name,
	email,
	password: hashedPassword,
	role,
});

await newUser.save();
console.log(newUser);

// 	return NextResponse.json({ status: 201, message: "User created" });
// } catch (error) {
// 	console.log("ERROR", error);
// 	return handleMongoError();
// }

module.exports = {
	getUsers,
	createUser,
};

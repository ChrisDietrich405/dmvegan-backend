const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	familyName: { type: String, required: false },
	givenName: { type: String, required: false },
	googleId: { type: String, required: false },
	photo: { type: String, required: false },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: false },
	// confirmPassword: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

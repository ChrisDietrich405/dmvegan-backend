const Event = require("../models/eventModel");

const addEvent = async (req, res) => {
	const { nameOfEvent, address, date, time, description, url } = req.body; // Example of receiving user data from the request

	// if (!name || !email || !password || !confirmPassword) {
	// 	return res
	// 		.status(400)
	// 		.json({ message: "Please add all necessary information" });
	// }

	try {
		const newEvent = new Event({
			nameOfEvent,
			date,
			address,
			date,
			time,
			description,
			url,
		});

		console.log("event", newEvent);

		await newEvent.save();

		res
			.status(201)
			.json({ message: "User created successfully", event: newEvent });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	addEvent,
};

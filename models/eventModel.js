const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	nameOfEvent: { type: String, required: true },
	address: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	description: { type: String, required: true },
	url: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

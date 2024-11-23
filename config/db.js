const mongoose = require("mongoose");

const connectDB = () => {
	mongoose
		.connect(
			"mongodb+srv://chrisdietrich366:Devindiet1@dietrichlandcare.kq6v5mn.mongodb.net/dmvegan",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((err) => {
			console.error("Failed to connect to MongoDB", err);
		});
};

module.exports = connectDB;

const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const connectDB = require("./config/db"); // Import the database connection

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/v1/api", userRoutes);
app.use("/v1/api", authRoutes);
app.use("/v1/api", eventRoutes);

// app.use("/api", () => console.log("hello"));

connectDB();

app.get("/", (req, res) => {
	res.send("Hello, Node.js!");
});

const PORT = 3000;

// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

// Start the Server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

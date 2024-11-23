const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db"); // Import the database connection

app.use(express.json());
app.use(cors());

app.use("/v1/api", userRoutes);

// app.use("/api", () => console.log("hello"));

connectDB();

app.get("/", (req, res) => {
	res.send("Hello, Node.js!");
});

const PORT = 3001;

// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

// Start the Server
app.listen(PORT, () => {
	console.log(`Server is running on http://192.168.1.163:${PORT}`);
});

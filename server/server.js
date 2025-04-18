const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Route to create a new itinerary
app.post("/", async (req, res) => {
    console.log("Create endpoint hit");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

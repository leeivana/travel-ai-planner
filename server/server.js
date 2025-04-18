const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const OpenAI = require("openai");

// Load environment variables
require("dotenv").config();

const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY;

if (!openRouterApiKey) {
    console.error("OPEN_ROUTER_API_KEY is not set in environment variables");
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Route to create a new itinerary
app.post("/", async (req, res) => {
    try {
        const { city, numberOfDays, interests } = req.body;

        if (!city || !numberOfDays || !interests) {
            return res.status(400).json({
                error: "Missing required fields",
                details: "Please provide city, numberOfDays, and interests",
            });
        }

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: openRouterApiKey,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AI Travel Itinerary",
            },
        });

        const prompt = `Generate a ${numberOfDays}-day travel itinerary for a trip to ${city}. 
        The person is interested in: ${interests}. 
        Include detailed plans for each day with cultural, food, and scenic activities.`;

        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }],
        });

        const rawItinerary = completion.choices[0].message.content;
        const parsedItinerary = parseItinerary(rawItinerary);

        res.json({
            success: true,
            itinerary: parsedItinerary,
        });
    } catch (error) {
        console.error("Error in OpenAI request:", error);
        res.status(500).json({
            error: "Failed to generate itinerary",
            details: error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
        `OpenRouter API Key is ${openRouterApiKey ? "set" : "not set"}`
    );
});

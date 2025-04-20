import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { parseItinerary } from "./utils";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

interface TravelRequest {
    city: string;
    numberOfDays: number;
    notes: string;
}

interface ApiResponse {
    success: boolean;
    itinerary?: any;
    error?: string;
    details?: string;
}

const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY;

if (!openRouterApiKey) {
    console.error("OPEN_ROUTER_API_KEY is not set in environment variables");
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Route to create a new itinerary
app.post(
    "/",
    async (req: Request<{}, {}, TravelRequest>, res: Response<ApiResponse>) => {
        try {
            const { city, numberOfDays, notes = "" } = req.body;

            if (!city || !numberOfDays) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields",
                    details: "Please provide city and numberOfDays",
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

            const prompt = `Generate a ${numberOfDays}-day travel itinerary for a trip to ${city}. ${
                notes
                    ? `Here are some other notes about my trip: ${notes}.`
                    : ""
            }Include detailed plans for each day with cultural, food, and scenic activities.`;

            const completion = await openai.chat.completions.create({
                model: "mistralai/mistral-7b-instruct",
                messages: [{ role: "user", content: prompt }],
            });

            const parsedItinerary = parseItinerary(
                completion.choices[0].message.content || ""
            );

            const response: ApiResponse = {
                success: true,
                itinerary: parsedItinerary,
            };

            res.json(response);
        } catch (error) {
            console.error("Error in OpenAI request:", error);
            const errorResponse: ApiResponse = {
                success: false,
                error: "Failed to generate itinerary",
                details:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            };
            res.status(500).json(errorResponse);
        }
    }
);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
        `OpenRouter API Key is ${openRouterApiKey ? "set" : "not set"}`
    );
});

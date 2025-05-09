# Travel Itinerary Planner

A modern web application that helps users create personalized travel itineraries using AI. The application generates detailed day-by-day travel plans based on user preferences, including activities, meals, and notes.

<img width="1427" alt="Screenshot 2025-04-20 at 6 00 06 PM" src="https://github.com/user-attachments/assets/c6b88ae7-532c-4c6f-bed6-26e33e23115c" />
<img width="1434" alt="Screenshot 2025-04-20 at 5 59 42 PM" src="https://github.com/user-attachments/assets/75f49c98-af81-4bd1-9a74-09e051fc2b87" />

## Features

-   Interactive travel planning interface
-   AI-powered itinerary generation
-   Day-by-day activity scheduling
-   Customizable trip parameters
-   Easy plan reset and modification

## Tech Stack

-   **Frontend:**
    -   React
    -   TypeScript
    -   Tailwind CSS
    -   React Hooks

-   **Backend:**
    -   Node.js
    -   Express
    -   OpenAI API (via OpenRouter)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   OpenRouter API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/travel-api-planner.git
cd travel-api-planner
```

2. Install dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
   Create a `.env` file in the server directory:

```env
PORT=3001
OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development servers:

```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd ../
npm start
```

The application should now be running at `http://localhost:3000`

## Future Enhancements
-   [ ] Chat bot answer questions and modify existing itinerary
-   [ ] Add user authentication
-   [ ] Save and share itineraries
-   [ ] Export itinerary to PDF/Calendar

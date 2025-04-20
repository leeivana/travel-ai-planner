import "./App.css";
import TravelItineraryForm from "./components/TravelItineraryForm.tsx";
import DisplayItinerary from "./components/DisplayItinerary.tsx";
import { useState } from "react";
import LoadingAnimation from "./components/LoadingAnimation.tsx";
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:3001/";

function App() {
    const [plan, setPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onHandleSubmit = async (formData) => {
        setIsLoading(true);
        const resp = await fetch(SERVER_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await resp.json();
        setIsLoading(false);
        setPlan(data.itinerary);
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-8 bg-zinc-900 text-zinc-100">
            {!isLoading && plan && (
                <DisplayItinerary plan={plan} onUndo={() => setPlan(false)} />
            )}
            {isLoading && !plan && (
                <div className="flex items-center justify-center flex-grow w-full">
                    <LoadingAnimation />
                </div>
            )}
            {!isLoading && !plan && (
                <TravelItineraryForm onSubmit={onHandleSubmit} />
            )}
        </div>
    );
}

export default App;

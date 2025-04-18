import "./App.css";
import TravelItineraryForm from "./components/TravelItineraryForm.tsx";
import DisplayItinerary from "./components/DisplayItinerary.tsx";
import { useState } from "react";

function App() {
    const [plan, setPlan] = useState(false);

    const handleSubmit = async (formData) => {
        const resp = await fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await resp.json();
        setPlan(data);
    };

    return (
        <div>
            <header>AI Trip Planner</header>
            {plan ? (
                <DisplayItinerary plan={plan} />
            ) : (
                <TravelItineraryForm onSubmit={handleSubmit} />
            )}
        </div>
    );
}

export default App;

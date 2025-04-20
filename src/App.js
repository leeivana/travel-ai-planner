import "./App.css";
import TravelItineraryForm from "./components/TravelItineraryForm.tsx";
import DisplayItinerary from "./components/DisplayItinerary.tsx";
import { useState } from "react";

function App() {
    const [plan, setPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onHandleSubmit = async (formData) => {
        setIsLoading(true);
        const resp = await fetch("http://localhost:3001/", {
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
        <div>
            <header>AI Trip Planner</header>
            {isLoading && !plan && <div>isLoading</div>}
            {plan ? (
                <DisplayItinerary
                    plan={plan.plan}
                    onUndo={() => setPlan(false)}
                />
            ) : (
                <TravelItineraryForm onSubmit={onHandleSubmit} />
            )}
        </div>
    );
}

export default App;

import React from "react";
import { Itinerary } from "../types";
import Accordion from "./Accordion.tsx";

const thing = {};

interface DisplayItineraryProps {
    plan: Itinerary;
    onUndo: () => void;
}

const DisplayItinerary = ({ plan, onUndo }: DisplayItineraryProps) => {
    const { days = [], title = "" } = plan;
    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="min-h-80">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                {days?.map((day, index) => (
                    <div key={index}>
                        <Accordion title={`Day ${index + 1}`}>
                            <p className="text-gray-700">
                                <div>
                                    {day.morning?.map((el) => el.description)}
                                </div>
                                <div>Lunch</div>
                                <div>
                                    {day.lunch?.map((el) => el.description)}
                                </div>
                                <div>Afternoon</div>
                                <div>
                                    {day.afternoon?.map((el) => el.description)}
                                </div>
                                <div>Dinner</div>
                                <div>
                                    {day.dinner?.map((el) => el.description)}
                                </div>
                            </p>
                        </Accordion>
                    </div>
                ))}
            </div>
            <button className="fixed bottom-4 right-4" onClick={() => onUndo()}>
                Reset Plan
            </button>
        </div>
    );
};

export default DisplayItinerary;

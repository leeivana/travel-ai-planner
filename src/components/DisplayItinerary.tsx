import React from "react";
import { Itinerary } from "../types";

const DisplayItinerary = (plan: Itinerary) => {
    const { days = [], title } = plan;
    return (
        <div>
            <h1>{title}</h1>
            {days?.map((day, index) => (
                <div key={index}>
                    <h2>Day {index + 1}</h2>
                    <div>{day.morning}</div>
                </div>
            ))}
        </div>
    );
};

export default DisplayItinerary;

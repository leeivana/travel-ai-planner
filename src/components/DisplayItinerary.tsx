import React from "react";
import { Itinerary } from "../types";

const DisplayItinerary = (plan: Itinerary, onUndo: () => {}) => {
    const { days = [], title = "" } = plan;
    return (
        <div>
            <h1>{title}</h1>
            {days?.map((day, index) => (
                <div key={index}>
                    <h2>Day {index + 1}</h2>
                    <div>Morning</div>
                    <div>{day.morning?.map((el) => el.description)}</div>
                    <div>Lunch</div>
                    <div>{day.lunch?.map((el) => el.description)}</div>
                    <div>Afternoon</div>
                    <div>{day.afternoon?.map((el) => el.description)}</div>
                    <div>Dinner</div>
                    <div>{day.dinner?.map((el) => el.description)}</div>
                </div>
            ))}

            <button onClick={onUndo}>Reset Plan</button>
        </div>
    );
};

export default DisplayItinerary;

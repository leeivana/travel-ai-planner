import React, { useState } from "react";
import { PlannerFormData } from "../types";

interface TravelPlannerFormProps {
    onSubmit: (data: PlannerFormData) => void;
}

enum interestTypes {
    FOOD = "Food",
    SHOPPING = "Shopping",
    ENTERTAINMENT = "Entertainment",
    CULTURE = "Culture",
    NATURE = "Nature",
    ADVENTURE = "Adventure",
}

/**
 * TravelItineraryForm Component
 *
 * A form component that collects travel planning details from users including:
 * - Destination city
 * - Trip dates (start and end)
 * - Budget
 * - Notes
 * - Interest categories (Food, Shopping, Entertainment, etc.)
 *
 * The form data is managed using React useState hook and is submitted to a parent
 * component through the onSubmit prop callback.
 */
const TravelItineraryForm = ({ onSubmit }: TravelPlannerFormProps) => {
    const [formData, setFormData] = useState({
        city: "",
        numberOfDays: 1,
        interests: [],
    });

    const onHandleInterestChange = (interest: interestTypes) => {
        const { interests } = formData;
        setFormData({
            ...formData,
            interests: interests?.includes(interest)
                ? interests.filter((val) => val !== interest)
                : [...interests, interest],
        });
    };

    const onHandleDateChange = (type: string, date: string) => {
        const updated = {
            ...formData,
            [type]: date,
        };
        const startDate = new Date(updated.startDate);
        const endDate = new Date(updated.endDate);
        const numberOfDays =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        setFormData({
            ...updated,
            numberOfDays,
        });
    };

    return (
        <div className="travel-itinerary-form">
            <h2>Travel Itinerary</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
            >
                <div className="form-group">
                    <label>Destination</label>
                    <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        required
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                            onHandleDateChange("startDate", e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        required
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                            onHandleDateChange("endDate", e.target.value)
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Budget</label>
                    <input
                        required
                        type="number"
                        value={formData.budget}
                        onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Notes</label>
                    <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                        }
                    />
                </div>
                <div>
                    Interests
                    {Object.values(interestTypes).map((interest) => (
                        <div key={interest}>
                            <input
                                type="checkbox"
                                value={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={() =>
                                    onHandleInterestChange(interest)
                                }
                            />
                            {interest}
                        </div>
                    ))}
                </div>
                <button type="submit">Create Itinerary</button>
            </form>
        </div>
    );
};

export default TravelItineraryForm;

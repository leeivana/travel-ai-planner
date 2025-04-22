import React, { useState } from "react";
import { PlannerFormData } from "../types";

interface TravelPlannerFormProps {
    onSubmit: (data: PlannerFormData) => void;
}

enum Page {
    City = "city",
    Dates = "dates",
    Budget = "budget",
    Notes = "notes",
}

const pageMap = {
    1: Page.City,
    2: Page.Dates,
    3: Page.Budget,
    4: Page.Notes,
};

const pageCount = Object.keys(pageMap).length;

/**
 * TravelItineraryForm Component
 * A form component that collects travel planning details from users including:
 * - Destination city
 * - Trip dates (start and end)
 * - Budget
 * - Notes
 */
const TravelItineraryForm = ({ onSubmit }: TravelPlannerFormProps) => {
    const [formData, setFormData] = useState({
        city: "",
        numberOfDays: 1,
        page: 1,
        startDate: "",
        endDate: "",
        notes: "",
    });

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

    const onValidateData = (): boolean => {
        const val = pageMap[formData.page];
        if (val === Page.Dates) {
            if (!formData.startDate || !formData.endDate) {
                return true;
            }
        }

        if ([Page.Budget, Page.City].includes(val)) {
            if (formData.budget === "") {
                return true;
            }
        }

        return false;
    };

    return (
        <div className="flex items-center justify-center flex-grow w-full">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const isDataInvalid = onValidateData();
                    if (isDataInvalid) {
                        return;
                    }

                    if (formData.page === pageCount) {
                        return onSubmit(formData);
                    }

                    setFormData({
                        ...formData,
                        page: formData.page + 1,
                    });
                }}
            >
                <div className="flex text-zinc-100">
                    {formData.page > 1 && (
                        <button
                            className="text-white hover:text-blue-600 px-4 py-2 text-lg transition"
                            type="submit"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    page: formData.page - 1,
                                });
                            }}
                        >
                            ←
                        </button>
                    )}
                    <div className="pt-3">
                        {formData.page === 1 && (
                            <div>
                                I want to travel to
                                <input
                                    required
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            city: e.target.value,
                                        })
                                    }
                                    pattern="[a-zA-Z]+"
                                    placeholder="city..."
                                    className="border-b-2 bg-transparent text-zinc-100 px-2 focus:outline-none focus:border-blue-700 w-40 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                />
                            </div>
                        )}

                        {formData.page === 2 && (
                            <div>
                                I will travel from
                                <input
                                    required
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) =>
                                        onHandleDateChange(
                                            "startDate",
                                            e.target.value
                                        )
                                    }
                                    className="border-b-2 bg-transparent text-zinc-100 px-2 focus:outline-none focus:border-blue-700 w-40"
                                />{" "}
                                to{" "}
                                <input
                                    required
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) =>
                                        onHandleDateChange(
                                            "endDate",
                                            e.target.value
                                        )
                                    }
                                    className="border-b-2 bg-transparent text-zinc-100 px-2 focus:outline-none focus:border-blue-700 w-40"
                                />
                            </div>
                        )}

                        {formData.page === 3 && (
                            <div>
                                The budget for my trip is
                                <input
                                    required
                                    type="text"
                                    value={formData.budget}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            budget: e.target.value,
                                        })
                                    }
                                    pattern="[0-9]*"
                                    placeholder="budget..."
                                    className="border-b-2 bg-transparent text-zinc-100 px-2 focus:outline-none focus:border-blue-700 w-40 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                />
                            </div>
                        )}
                        {formData.page === 4 && (
                            <div>
                                A few other notes about my trip are
                                <input
                                    type="text"
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            notes: e.target.value,
                                        })
                                    }
                                    placeholder="notes..."
                                    className="border-b-2 bg-transparent text-zinc-100 px-2 focus:outline-none focus:border-blue-700 w-40"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        className="text-white hover:text-blue-600 px-4 py-2 text-lg transition"
                        type="submit"
                    >
                        →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TravelItineraryForm;

export interface TravelPlan {
    city: string;
    numberOfDays: number;
    interests: string[];
    itinerary: DayPlan[];
}

export interface DayPlan {
    day: number;
    activities: string[];
    meals: string[];
    notes?: string;
}

export interface PlannerFormData {
    city: string;
    numberOfDays: number;
    interests: string[];
}

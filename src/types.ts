export interface TravelPlan {
    city: string;
    numberOfDays: number;
    notes: string;
    itinerary: DayPlan[];
}

export interface DayPlan {
    day: number;
    activities: string[];
    meals: string[];
    notes?: string;
}

export interface Activity {
    description: string;
    time?: string;
    address?: string;
}

export interface DaySection {
    morning?: Activity[];
    lunch?: Activity[];
    afternoon?: Activity[];
    dinner?: Activity[];
    night?: Activity[];
}

export interface Itinerary {
    title: string;
    days: DaySection[];
}

export interface PlannerFormData {
    city: string;
    numberOfDays: number;
    notes: string;
}

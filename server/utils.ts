interface Activity {
    description: string;
    time?: string;
    address?: string;
}

interface DaySection {
    morning?: Activity[];
    lunch?: Activity[];
    afternoon?: Activity[];
    dinner?: Activity[];
    night?: Activity[];
}

interface ParsedItinerary {
    title: string;
    days: DaySection[];
}

export const parseItinerary = (text: string): ParsedItinerary => {
    // Extract title
    const titleMatch = text.match(/Title: (.*?)\n/);
    const title = titleMatch ? titleMatch[1] : "";

    // Split into days
    const days: DaySection[] = [];
    const dayRegex = /Day \d+:([\s\S]*?)(?=Day \d+:|$)/g;
    let match;

    while ((match = dayRegex.exec(text)) !== null) {
        const dayContent = match[1].trim();
        const dayParts: DaySection = {};

        // Parse sections (Morning, Lunch, Afternoon, Dinner, Night)
        ["Morning", "Lunch", "Afternoon", "Dinner", "Night"].forEach(
            (section) => {
                const sectionRegex = new RegExp(
                    `${section}:\\s*([\\s\\S]*?)(?=(?:Morning|Lunch|Afternoon|Dinner|Night):|$)`
                );
                const sectionMatch = dayContent.match(sectionRegex);
                if (sectionMatch) {
                    // Parse activities for each section
                    const activities: Activity[] = sectionMatch[1]
                        .trim()
                        .split("\n")
                        .map((activity) => activity.trim())
                        .filter((activity) => activity.startsWith("- "))
                        .map((activity) => ({
                            description: activity.substring(2),
                        }));

                    dayParts[section.toLowerCase() as keyof DaySection] =
                        activities;
                }
            }
        );

        days.push(dayParts);
    }

    return {
        title,
        days,
    };
};

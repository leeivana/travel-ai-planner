import "./App.css";
import TravelItineraryForm from "./components/TravelItineraryForm.tsx";

function App() {
    const handleSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div>
            <header>AI Trip Planner</header>
            <TravelItineraryForm onSubmit={handleSubmit} />
        </div>
    );
}

export default App;

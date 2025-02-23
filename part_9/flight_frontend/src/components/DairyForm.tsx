import { NewDiaryEntry, Weather, Visibility } from "../types/types";
import { useState } from "react";
import DairyService from "../services/DairyService";
import { AxiosError } from "axios";

const DairyForm = () => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState("");
    const [visibility, setVisibility] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            console.log('weather', weather);
            console.log('visibility', visibility);
            console.log('comment', comment);
            console.log('date', date);
            const newEntry: NewDiaryEntry = {
                date,
                weather,
                visibility,
                comment,
            };
            await DairyService.addEntry(newEntry);
        } catch (error) {
            console.log('error', error);
            if (error instanceof AxiosError) {
                setError(error.response?.data);
            } else {
                setError("An unknown error occurred");
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };


    const weatherOptions = Object.values(Weather).map((weather) => (
        <label key={weather} htmlFor={`weather-${weather}`}>
            <input 
                type="radio" 
                id={`weather-${weather}`}
                name="weather" 
                value={weather} 
                onChange={({ target }) => setWeather(target.value)} 
            />
            {weather}
        </label>
    ));

    const visibilityOptions = Object.values(Visibility).map((visibility) => (
        <label key={visibility} htmlFor={`visibility-${visibility}`}>
            <input 
                type="radio" 
                id={`visibility-${visibility}`}
                name="visibility" 
                value={visibility} 
                onChange={({ target }) => setVisibility(target.value)} 
            />
            {visibility}
        </label>
    ));

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    <fieldset>
                        <legend>Weather</legend>
                        {weatherOptions}
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <legend>Visibility</legend>
                        {visibilityOptions}
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input type="text" id="comment" value={comment} onChange={({ target }) => setComment(target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default DairyForm;
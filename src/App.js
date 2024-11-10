import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dailyHabits, setDailyHabits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { // once component mounts/renders
    const fetchDailyHabits = async () => { // fetch dailyHabits
      try {
        const response = await fetch('/api/dayview'); // fetch per GET request for user dailyHabits from backend
        const result = await response.json(); // parse response body as json
        if (response.ok) {
          setDailyHabits(result.dailyHabits); // set dailyHabits state with response data
        } else {
          setError(result.error); // set error if status !ok
        }
      } catch (err) {
        setError('Error fetching daily habits')
      }; // if can not fetch dailyHabits/set error state
    }
    fetchDailyHabits(); // evoke fetchDailyHabits to start fetching dailyHabits 
  }, []);

  return (
    <div>
      <h1 className="dailyHeader">Your Daily Habits</h1>
      {error /* renders the error message if error is defined */ && <p>{error}</p>}
      <ul>
        {dailyHabits.map((habit, index) => ( // map each habit element
          <li key={index}>
            <button onClick={() => { /* initiates the get request to Spotify API for a curated playlist based on "mood" */ }}>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-mood">{habit.mood}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

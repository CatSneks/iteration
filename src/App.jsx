import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import YourTune from './components/YourTune';
import seeds from './components/spotifySeeds';
import VibeDropDown from './components/VibeDropDown';

function App() {
  const [vibe, setVibe] = useState('');
  const [dailyHabits, setDailyHabits] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  
  const searchInputRef = useRef(null);

  const fetchUserId = async (userName) => {
    try {
      const responseId = await fetch(`/api/userId?userName=${userName}`);
      const resultId = await responseId.json(); // parse response body as json
      if (responseId.ok) {
        setUserId(resultId.userId) // set dailyHabits state with response data
      } else {
        setError(resultId.error); // set error if status !ok
      }
    } catch (err) {
      setError('Error getting Id');
    }
  };

  useEffect(() => {
    // once component mounts/renders
    if (!userId) return;
    const fetchDailyHabits = async () => {
      // fetch dailyHabits
      try {
        const responseHabits = await fetch(`/api/dayview?userId=${userId}`); // fetch per GET request for user dailyHabits from backend
        const resultHabits = await responseHabits.json(); // parse response body as json
        if (responseHabits.ok) {
          setDailyHabits(resultHabits.dailyHabits); // set dailyHabits state with response data
        } else {
          setError(resultHabits.error); // set error if status !ok
        }
      } catch (err) {
        setError('Error fetching daily habits');
      } // if can not fetch dailyHabits/set error state
    };
    fetchDailyHabits(); // evoke fetchDailyHabits to start fetching dailyHabits
  }, [userId]);

  return (
    <div className='App'>
      <header className='App-header'></header>
      <main>
        <h1 className='dailyHeader'>Your Daily Habits</h1>
        {error /* renders the error message if error is defined */ && (
          <p>{error}</p>
        )}
        <div>
          <input
            type="text"
            id="userName"
            placeholder="Please enter your user name"
            ref={searchInputRef} // once this element is rendered, React assigns the input field to searchInputRef.current, allows direct interaction after
            onKeyDown={(e) => { // search triggers on pressing enter or with button click below
              if (e.key === 'Enter') fetchUserId(searchInputRef.current.value.trim());
            }}
          />
          <button onClick={() => fetchUserId(searchInputRef.current.value.trim())}>Login</button>
        </div>
        <ul>
          {dailyHabits.map(
            (
              habit,
              index // map each habit element
            ) => (
              <li key={index}>
                <button
                  onClick={() => {
                    /* initiates the get request to Spotify API for a curated playlist based on "mood" */
                  }}
                >
                  <span className='habit-name'>{habit}</span>
                  {/* <span className='habit-mood'>{habit.mood}</span> */}
                </button>
              </li>
            )
          )}
        </ul>
        <h1>Attune</h1>
          <VibeDropDown options={seeds} updateVibe={setVibe} />
          <YourTune seed={seeds[vibe]()} />
      </main>
    </div>
  );
}

export default App;

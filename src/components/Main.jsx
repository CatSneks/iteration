import React, { useState } from 'react';
import seeds from './spotifySeeds';
import YourTune from './YourTune';
import VibeDropDown from './VibeDropDown';
import CreateHabit from './CreateHabit';
import UserHabits from './UserHabits';

//dailyHabits = [{ 'Nature Walk' : `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}` }]

const tempData = [];
function Main({ dailyHabits }) {
  //setVibe will eventually be wrapped in a function that returns the sected habit and mood (seed) back to database;
  const [error, setError] = useState(null);
  const [vibe, setVibe] = useState('Nature Walk');

  return (
    <main>
      <h2 className='dailyHeader'>Your Daily Habits</h2>
      {error /* renders the error message if error is defined */ && (
        <p>{error}</p>
      )}
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
                <span className='habit-name'>{habit.name}</span>
                <span className='habit-mood'>{habit.mood}</span>
              </button>
            </li>
          )
        )}
      </ul>

      {/*yourtune randomly generates a vibe: this should be replaced by createdHabit*/}
      <YourTune seed={seeds[vibe]()} updateVibe={setVibe} />

      <VibeDropDown options={seeds} updateVibe={setVibe} />
      <CreateHabit />
      <UserHabits dailyHabits={tempData} />
    </main>
  );
}

export default Main;

import React, { useState, useEffect } from 'react';
import seeds from './spotifySeeds';
import YourTune from './YourTune';
import CreateHabit from './CreateHabit';
import UserHabits from './UserHabits';

function Main({ userId }) {
  const [error, setError] = useState(null);
  const [vibe, setVibe] = useState('Nature Walk');
  const [dailyHabits, setDailyHabits] = useState([]);
  const [showCreateHabit, setShowCreateHabit] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  useEffect(() => {
    if (!userId) return;
    const fetchDailyHabits = async () => {
      try {
        const responseHabits = await fetch(
          `http://localhost:3000/api/dayview?userId=${userId}`
        );
        const resultHabits = await responseHabits.json();
        if (responseHabits.ok) {
          setDailyHabits(resultHabits.dailyHabits[0].habits);
        } else {
          setError(resultHabits.error);
        }
      } catch (err) {
        setError('Error fetching daily habits');
      }
    };
    fetchDailyHabits();
  }, [userId]);

  return (
    <main className='container mx-auto p-4'>
      <YourTune seed={seeds[vibe]()} updateVibe={setVibe} />

      <div id='VibeDropDown'>
        <select
          name='vibes'
          id='vibes'
          value={selectedValue}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        >
          <option value='' disabled>
            Choose a vibe...
          </option>
          {Object.keys(seeds).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setShowCreateHabit(true)}
        className='bg-indigo-400 text-white px-6 py-3 rounded-full text-base cursor-pointer mt-5 hover:bg-indigo-500 transition-colors'
      >
        Add More
      </button>

      {showCreateHabit && (
        <CreateHabit
          seeds={seeds}
          setVibe={setVibe}
          onClose={() => setShowCreateHabit(false)}
          userId={userId}
        />
      )}

      <UserHabits dailyHabits={dailyHabits} />
    </main>
  );
}

export default Main;

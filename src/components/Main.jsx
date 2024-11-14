import React, { useState, useEffect } from 'react';
import seeds from './spotifySeeds';
import CreateHabit from './CreateHabit';
import UserHabits from './UserHabits';

function Main({ userId, isEditMode }) {
  const [error, setError] = useState(null);
  const [vibe, setVibe] = useState('Nature Walk');
  const [dailyHabits, setDailyHabits] = useState([]);
  const [showCreateHabit, setShowCreateHabit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDailyHabits = async () => {
    if (!userId) return;

    setIsLoading(true);
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
      console.error('Error fetching daily habits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyHabits();
  }, [userId]);

  const sortedSeeds = Object.keys(seeds)
    .sort()
    .reduce((acc, key) => {
      acc[key] = seeds[key];
      return acc;
    }, {});

  const handleHabitCreated = () => {
    fetchDailyHabits();
    setShowCreateHabit(false);
  };

  const handleHabitDeleted = async (habitName) => {
    // Optimistically update UI
    setDailyHabits((prevHabits) =>
      prevHabits.filter((habit) => habit !== habitName)
    );

    // Refresh habits from server to ensure consistency
    await fetchDailyHabits();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/purpleWaveBg2.png)`,
      }}
      className='flex-1 flex items-center justify-center bg-cover bg-bottom'
    >
      <main className='container mx-auto p-4'>
        {error && (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
            role='alert'
          >
            <span className='block sm:inline'>{error}</span>
            <button
              className='absolute top-0 right-0 px-4 py-3'
              onClick={() => setError(null)}
            >
              <span className='sr-only'>Dismiss</span>×
            </button>
          </div>
        )}

        {showCreateHabit && (
          <CreateHabit
            seeds={sortedSeeds}
            setVibe={setVibe}
            onClose={() => setShowCreateHabit(false)}
            userId={userId}
            onHabitCreated={handleHabitCreated}
          />
        )}

        <UserHabits
          dailyHabits={dailyHabits}
          isEditMode={isEditMode}
          userId={userId}
          onHabitDeleted={handleHabitDeleted}
          isLoading={isLoading}
        />

        <button
          onClick={() => setShowCreateHabit(true)}
          className='bg-white text-indigo-400 px-5 py-3 rounded-full text-base cursor-pointer mt-5 hover:bg-indigo-500 hover:text-white transition-colors font-bold'
        >
          +
        </button>
      </main>
    </div>
  );
}

export default Main;

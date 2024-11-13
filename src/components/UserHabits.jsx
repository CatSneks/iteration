import React from 'react';
import YourTune from './YourTune';

function UserHabits({ dailyHabits }) {
  if (!dailyHabits || dailyHabits.length === 0) {
    return (
      <section className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Habits</h3>
        <p className='text-gray-500'>
          No habits added yet. Create one to get started!
        </p>
      </section>
    );
  }

  const habits = dailyHabits.map((habit, index) => {
    const [habitKey, habitDetails] = Object.entries(habit)[0];
    return (
      <div key={index} className='mb-6'>
        <h4 className='text-lg font-medium mb-2'>{habitKey}</h4>
        <YourTune seed={habitDetails} />
      </div>
    );
  });

  return (
    <section className='mt-8'>
      <h3 className='text-xl font-semibold mb-4'>Habits</h3>
      <div>{habits}</div>
    </section>
  );
}

export default UserHabits;

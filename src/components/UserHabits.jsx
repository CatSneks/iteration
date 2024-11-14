import React from 'react';
import YourTune from './YourTune';

const UserHabits = ({
  dailyHabits,
  isEditMode,
  userId,
  onHabitDeleted,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <section className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Habits</h3>
        <div className='flex justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500'></div>
        </div>
      </section>
    );
  }

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

  const handleHabitDeleted = (habitName) => {
    if (onHabitDeleted) {
      onHabitDeleted(habitName);
    }
  };

  const habits = dailyHabits.map((habit, index) => {
    const [habitKey, habitDetails] = Object.entries(habit)[0];
    return (
      <div key={`${habitKey}-${index}`} className='mb-6'>
        <YourTune
          seed={habitDetails}
          habitName={habitKey}
          isEditMode={isEditMode}
          userId={userId}
          onHabitDeleted={handleHabitDeleted}
        />
      </div>
    );
  });

  return (
    <section>
      <h3 className='text-xl font-semibold mb-4'>Habits</h3>
      <div className='space-y-6'>{habits}</div>
    </section>
  );
};

export default UserHabits;

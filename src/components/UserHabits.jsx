import React from 'react';
import YourTune from './YourTune';

const UserHabits = ({ dailyHabits, isEditMode }) => {
  if (!dailyHabits || dailyHabits.length === 0) {
    return (
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Habits</h3>
        <p className="text-gray-500">
          No habits added yet. Create one to get started!
        </p>
      </section>
    );
  }

  const habits = dailyHabits.map((habit, index) => {
    const [habitKey, habitDetails] = Object.entries(habit)[0];
    return (
      <div key={index} className="mb-6">
        <YourTune seed={habitDetails} habitName={habitKey} isEditMode={isEditMode} />
      </div>
    );
  });

  return (
    <section>
      {/* <h3 className="text-xl font-semibold mb-10">Habits</h3> */}
      <div className="space-y-6">{habits}</div>
    </section>
  );
};


export default UserHabits;
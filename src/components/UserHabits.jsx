import React from 'react';
import YourTune from './YourTune';

function UserHabits({ dailyHabits }) {
  console.log(dailyHabits);
  const habits = dailyHabits.map((habit, index) => {
    const [habitKey, habitDetails] = Object.entries(habit)[0];
    return (<div key={index}>
     <span>{habitKey}</span>
      <YourTune seed={habitDetails} />
     </div>)
  });

  return (
    <section>
      <h3>Habits</h3>
      <div>{habits}</div>
    </section>
  );
}

export default UserHabits;

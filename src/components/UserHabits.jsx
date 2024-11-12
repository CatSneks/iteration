import React from 'react';
import YourTune from './YourTune';

function UserHabits({ dailyHabits }) {
  // const habitsTest = {
  //   'Nature Walk':
  //     '?seed_genres=folk,acoustic,country&target_valence=0.5759277905703928&target_energy=0.46366762362491326&target_tempo=85&target_acousticness=0.9217140119077961&target_danceability=0.5924534615954699',

  //   'At the Gym':
  //     '?seed_genres=folk,acoustic,country&target_valence=0.5759277905703928&target_energy=0.46366762362491326&target_tempo=85&target_acousticness=0.9217140119077961&target_danceability=0.5924534615954699',

  //   Meditation:
  //     '?seed_genres=folk,acoustic,country&target_valence=0.5759277905703928&target_energy=0.46366762362491326&target_tempo=85&target_acousticness=0.9217140119077961&target_danceability=0.5924534615954699',
  // };
  console.log(dailyHabits);
  const habits = dailyHabits.map((habit, index) => {
    const [habitKey, habitDetails] = Object.entries(habit)[0];
    return (<div key={index}>
     <span>{habitKey}</span>
      <YourTune seed={habitDetails} />
     </div>)
  });

  console.log({ habits });

  return (
    <section>
      <h3>Habits</h3>
      <div>{habits}</div>
    </section>
  );
}

export default UserHabits;

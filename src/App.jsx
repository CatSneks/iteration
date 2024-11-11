import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import './App.css';
import Header from './components/Header';

function App() {
  const [dailyHabits, setDailyHabits] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ name: 'Fish' });

  useEffect(() => {
    // once component mounts/renders
    const fetchDailyHabits = async () => {
      // fetch dailyHabits
      try {
        const response = await fetch('/api/dayview'); // fetch per GET request for user dailyHabits from backend
        const result = await response.json(); // parse response body as json
        if (response.ok) {
          setDailyHabits(result.dailyHabits); // set dailyHabits state with response data
        } else {
          setError(result.error); // set error if status !ok
        }
      } catch (err) {
        setError('Error fetching daily habits');
      } // if can not fetch dailyHabits/set error state
    };
    fetchDailyHabits(); // evoke fetchDailyHabits to start fetching dailyHabits
  }, [user]);

  return (
    <div className='App'>
      <Header setUser={setUser} user={user.name} />
      <Main dailyHabits={dailyHabits} />
    </div>
  );
}

export default App;

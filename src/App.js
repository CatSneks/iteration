import React, { useEffect, useState } from 'react';
import './App.css';
import React, { useState, useEffect } from 'react';
// import Header from './components/Header.jsx';
import View from './components/View.jsx';
// import Footer from '.components/Footer.jsx'

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState({ username: 'Fishy', user_id: 1 });
  const [todaysList, setList] = useState([
    { task: 'iron clothes', task_id: 1 },
    { task: 'go for a run', task_id: 2 },
    { task: 'go grocery shopping', task_id: 3 },
  ]);
  const [activeView, setActiveView] = useState('');

  useEffect(() => {
    //get user data // assumes that the user has already logged in and been authenticated
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/dayview/user?id=${user_id}`
        );
        const data = await response.json();
        setList(data.tasklist);
        setActiveView('dayview');
      } catch (error) {
        console.error('error fetching user task list' + error);
      }
    };
  }, []);

  const handleViewChange = (view) => {
    return () => {
      setActiveView(view);
    };
  };
  return (
    // <Header user={user}>
    <main>
      <View
        activeView={activeView}
        list={todaysList}
        handleViewChange={handleViewChange}
      />
    </main>
    // <Footer/>
=======
  const [dailyHabits, setDailyHabits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { // once component mounts/renders
    const fetchDailyHabits = async () => { // fetch dailyHabits
      try {
        const response = await fetch('/api/dayview'); // fetch per GET request for user dailyHabits from backend
        const result = await response.json(); // parse response body as json
        if (response.ok) {
          setDailyHabits(result.dailyHabits); // set dailyHabits state with response data
        } else {
          setError(result.error); // set error if status !ok
        }
      } catch (err) {
        setError('Error fetching daily habits')
      }; // if can not fetch dailyHabits/set error state
    }
    fetchDailyHabits(); // evoke fetchDailyHabits to start fetching dailyHabits 
  }, []);

  return (
    <div>
      <h1 className="dailyHeader">Your Daily Habits</h1>
      {error /* renders the error message if error is defined */ && <p>{error}</p>}
      <ul>
        {dailyHabits.map((habit, index) => ( // map each habit element
          <li key={index}>
            <button onClick={() => { /* initiates the get request to Spotify API for a curated playlist based on "mood" */ }}>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-mood">{habit.mood}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
>>>>>>> e9c64f674acf8503ef2683217190307e7ccfa772
  );
}

export default App;
<<<<<<< HEAD

/* react app boilerplate: <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
=======
>>>>>>> e9c64f674acf8503ef2683217190307e7ccfa772

import React, { useEffect, useState } from 'react';
import './App.css';
import React, { useState, useEffect } from 'react';
// import Header from './components/Header.jsx';
import View from './components/View.jsx';
// import Footer from '.components/Footer.jsx'

function App() {
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
  );
}

export default App;

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

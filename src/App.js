import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ username: 'Fishy', user_id: 1 });
  const [todaysList, setList] = useState([
    { task: 'iron clothes', task_id: 1 },
    { task: 'go for a run', task_id: 2 },
    { task: 'go grocery shopping', task_id: 3 },
  ]);
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    //get user data
    fetch(`http://localhost:3000/dayview/user?id=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.tasklist) setActiveTab('dayview');
        if (data.tasklist) set;
      });
  }, []);

  return <div className='App'></div>;
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

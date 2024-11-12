import React, { useState, useEffect, useRef } from 'react';
import Main from './components/Main';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const searchInputRef = useRef(null);

  const fetchUserId = async (userName) => {
    try {
      const responseId = await fetch(
        `http://localhost:3000/api/userId?userName=${userName}`
      );
      const resultId = await responseId.json();
      const id = resultId.userId[0].id;
      setUserId(id);
      if (!responseId.ok) {
        setError(resultId.error);
      }
    } catch (err) {
      setError('Error getting Id');
    }
  };

    useEffect(() => {
      const TodaysDate = () => {
        const today = new Date();
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const daysOfWeek = [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        ];
        const day = today.getDate();
        const dayOfWeek = daysOfWeek[today.getDay()];
        const month = months[today.getMonth()];

        setDayOfWeek(dayOfWeek);
        setMonth(month);
        setDay(day);
      }
      TodaysDate();
    }, []);

    return (
      <div className="App">
        {error && <div>{error}</div>}
  
        {userId ? (
          // Header for authenticated users
          <header className="App-header container">
            <h1 className="App-header">aTune</h1>
            <h2>Welcome!</h2>
            <div className="date-header">{`${dayOfWeek}, ${month} ${day}`}</div>
          </header>
        ) : (
          // Header for non-authenticated users
          <header className="App-header container">
            <h1 className="App-header">Attune</h1>
            <div>
              <input
                type="text"
                id="userName"
                placeholder="Please enter your user name"
                ref={searchInputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') fetchUserId(searchInputRef.current.value.trim());
                }}
              />
              <button onClick={() => fetchUserId(searchInputRef.current.value.trim())}>
                Login
              </button>
            </div>
          </header>
        )}
  
        {/* Conditionally render the Main component if userId is set */}
        {userId && <Main userId={userId} />}
      </div>
    );
  }

export default App;

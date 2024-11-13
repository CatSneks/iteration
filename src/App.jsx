import React, { useState, useEffect, useRef } from 'react';
import Main from './components/Main';

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
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const day = today.getDate();
      const dayOfWeek = daysOfWeek[today.getDay()];
      const month = months[today.getMonth()];

      setDayOfWeek(dayOfWeek);
      setMonth(month);
      setDay(day);
    };
    TodaysDate();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          {error}
        </div>
      )}

      {userId ? (
        // Header for authenticated users
        <header className='container mx-auto px-4 py-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-blue-600 mb-4'>aTune</h1>
            <h2 className='text-2xl text-gray-700 mb-2'>Welcome!</h2>
            <div className='text-gray-500 font-medium'>
              {`${dayOfWeek}, ${month} ${day}`}
            </div>
          </div>
        </header>
      ) : (
        // Header for non-authenticated users
        <header className='container mx-auto px-4 py-16'>
          <div className='max-w-md mx-auto text-center'>
            <h1 className='text-4xl font-bold text-blue-600 mb-8'>Attune</h1>
            <div className='flex flex-col gap-4 sm:flex-row sm:gap-2 justify-center'>
              <input
                type='text'
                id='userName'
                placeholder='Please enter your user name'
                ref={searchInputRef}
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    fetchUserId(searchInputRef.current.value.trim());
                }}
              />
              <button
                onClick={() => fetchUserId(searchInputRef.current.value.trim())}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Login
              </button>
            </div>
          </div>
        </header>
      )}

      {userId && <Main userId={userId} />}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Main from './components/Main';

function App() {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:5001/api/login';
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:5001/api/logout';
    setUserId(null);
    setAccessToken(null);
    setUserProfile(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/check-auth', {
          credentials: 'include', // Important for sending cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setUserId(data.userId);
            setAccessToken(data.accessToken);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Parse URL parameters after OAuth redirect
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');

    if (errorParam) {
      setError(errorParam);
      setIsLoading(false);
    } else {
      checkAuth();
    }

    // Set date information
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

  // Function to fetch user data after authentication
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && accessToken) {
        try {
          const response = await fetch('http://localhost:5001/api/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include', // Important for sending cookies
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setUserProfile(userData.profile);
        } catch (err) {
          setError('Failed to fetch user data');
        }
      }
    };

    fetchUserData();
  }, [userId, accessToken]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center'>
        <div className='text-blue-600 text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col'>
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          {error}
        </div>
      )}

      {userId ? (
        <header className='container mx-auto px-4 py-8'>
          <div className='relative text-center'>
            <button
              onClick={handleLogout}
              className='absolute right-0 top-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
            >
              Logout
            </button>

            <h1 className='text-4xl font-bold text-blue-600 mb-4'>aTune</h1>

            <div className='flex items-center justify-center gap-4 mb-4'>
              {userProfile?.images?.[0]?.url ? (
                <img
                  src={userProfile.images[0].url}
                  alt='Profile'
                  className='w-12 h-12 rounded-full border-2 border-blue-600'
                />
              ) : (
                <div className='w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl'>
                  {userProfile?.display_name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <h2 className='text-2xl text-gray-700'>
                Welcome, {userProfile?.display_name || 'there'}!
              </h2>
            </div>

            <div className='text-gray-500 font-medium'>
              {`${dayOfWeek}, ${month} ${day}`}
            </div>
          </div>
        </header>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-blue-600 mb-8'>Attune</h1>
            <button
              onClick={handleSpotifyLogin}
              className='px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2'
            >
              <span>Login with Spotify</span>
            </button>
          </div>
        </div>
      )}

      {userId && <Main userId={userId} accessToken={accessToken} />}
    </div>
  );
}

export default App;

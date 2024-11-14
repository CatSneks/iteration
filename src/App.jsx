import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import { Menu } from 'lucide-react';
import NavBar from './components/NavBar';

function App() {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:5001/api/login';
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:5001/api/logout';
    setUserId(null);
    setAccessToken(null);
    setUserProfile(null);
  };

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setIsNavOpen(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/check-auth', {
          credentials: 'include',
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

    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');

    if (errorParam) {
      setError(errorParam);
      setIsLoading(false);
    } else {
      checkAuth();
    }

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && accessToken) {
        try {
          const response = await fetch('http://localhost:5001/api/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
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
      <NavBar
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onLogout={handleLogout}
        onEdit={handleEdit}
        isEditMode={isEditMode}
        userProfile={userProfile}
      />

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
              onClick={() => setIsNavOpen(true)}
              className='absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-lg'
            >
              <Menu size={24} />
            </button>

            <h1 className='text-4xl font-bold text-blue-600 mb-4'>aTune</h1>

            <div className='text-gray-500 font-medium text-2xl mb-6'>
              {`${dayOfWeek}, ${month} ${day}`}
            </div>

            <h2 className='text-4xl font-bold text-custom-blue mb-6'>
              {getTimeBasedGreeting()},{' '}
              {(userProfile?.display_name || 'there').split(' ')[0]}
            </h2>

            <div className='text-gray-500 font-medium text-2xl'>
              <h2>What would you like to do today?</h2>
            </div>
          </div>
        </header>
      ) : (
        <div
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/homePageBg2.png)`,
          }}
          className='flex-1 flex items-center justify-center bg-cover bg-center'
        >
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <div className='flex flex-col justify-center items-center h-screen text-center'>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/logo.png`}
                  alt='logo'
                  className='mx-auto mb-4 w-32 h-32 rounded-full object-cover'
                />
                <div>
                  <h2 className='mb-2 text-5xl font-bold'>
                    Build better habits.
                  </h2>
                  <h2 className='mb-2 text-5xl font-bold'>Find your vibe.</h2>
                  <h3 className='mb-4 text-2xl text-gray-500'>
                    Find the beat that moves you.
                  </h3>
                </div>
                <button
                  onClick={handleSpotifyLogin}
                  className='px-8 py-3 bg-indigo-500 text-white text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2'
                >
                  <span>Login with Spotify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {userId && (
        <Main
          userId={userId}
          accessToken={accessToken}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}

export default App;

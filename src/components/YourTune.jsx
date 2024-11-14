import React, { useState } from 'react';

const YourTune = ({ seed, habitName, isEditMode }) => {
  const [tune, setTune] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = async () => {
    setIsCollapsed(!isCollapsed); // sets isCollapsed state to the opposite of what it currently is

    if (tune) {
      setTune(null);
      setContentHeight(0);
      return;
    }

    setIsLoading(true); // isLoading is true until the code block below runs and finally isLoading is set to false
    try {
      const response = await fetch(`http://localhost:3000/recommendations?seed_genres=${seed}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Recommendations:', data);
      
      if (data.recommendations && data.recommendations.length > 0) {
        setTune(data.recommendations[0]);
        setTimeout(() => setContentHeight(48), 50);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => async () => {
    try {
      const response = await fetch('http://localhost:3000/deleteHabit', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 'USER_ID', habit: habitName }), // replace 'USER_ID' with the actual user ID
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Deleted habit:', data.updatedHabits); 
      //might have to refresh updated habits
     
    } catch (error) {
      console.error('Error deleting habit:', error);
    }

  };

  return (
    <div 
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 ease-in-out
                 p-4 rounded-lg bg-white hover:bg-gray-50 shadow-sm border border-gray-200 
                 cursor-pointer ${isLoading ? 'w-full' : 'w-auto'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <div className="text-gray-800 font-bold text-lg flex items-center gap-2">
              {habitName}
              {isLoading && (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
            </div>
          </div>
          <div 
            style={{ height: `${contentHeight}px` }}
            className="transition-all duration-300 ease-in-out"
          >
            {tune && (
              <div className="text-gray-600">
                <div className="font-medium">{tune.name}</div>
                <div>{tune.artist}</div>
              </div>
            )}
          </div>
        </div>
        <div 
          style={{ width: tune ? '5rem' : '0' }}
          className="ml-4 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
        >
          {tune && (
            <a 
              href={tune.uri}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                className="w-20 rounded-md shadow-sm hover:opacity-90 transition-opacity"
                alt={`album art for ${tune.artist}`} 
                src={tune.artwork} 
              />
            </a>
          )}
        </div>
      </div>
      {isEditMode && isCollapsed && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent collapsing
            handleDelete();
          }}
          className="absolute top-0 right-0 mt-2 mr-2 bg-indigo-400 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
        >
          -
        </button>
      )}
      {isLoading && ( // if isLoading is true, ease in animation
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300"
          style={{
            width: '100%',
            animation: 'loadingProgress 2s infinite ease-in-out'
          }}
        />
      )}
      <style jsx>{`
        @keyframes loadingProgress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default YourTune;
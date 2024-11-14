import React, { useState } from 'react';
import { X } from 'lucide-react';

const YourTune = ({ seed, habitName, isEditMode, userId, onHabitDeleted }) => {
  const [tune, setTune] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async () => {
    setIsCollapsed(!isCollapsed);

    if (tune) {
      setTune(null);
      setContentHeight(0);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/recommendations?seed_genres=${seed}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent the card from collapsing
    if (!userId || !habitName || isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:5001/api/deleteHabit', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          habit: habitName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete habit: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Deleted habit:', data.updatedHabits);

      // Notify parent component about the deletion
      if (onHabitDeleted) {
        onHabitDeleted(habitName);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 ease-in-out
                 p-4 rounded-lg bg-white hover:bg-gray-50 shadow-sm border border-gray-200 
                 cursor-pointer ${isLoading ? 'w-full' : 'w-auto'}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex-grow'>
          <div className='flex items-center gap-2'>
            <div className='text-gray-800 font-bold text-lg flex items-center gap-2'>
              {habitName}
              {isLoading && (
                <div className='flex gap-1'>
                  <div
                    className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{ height: `${contentHeight}px` }}
            className='transition-all duration-300 ease-in-out'
          >
            {tune && (
              <div className='text-gray-600'>
                <div className='font-medium'>{tune.name}</div>
                <div>{tune.artist}</div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ width: tune ? '5rem' : '0' }}
          className='ml-4 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden'
        >
          {tune && (
            <a href={tune.uri} onClick={(e) => e.stopPropagation()}>
              <img
                className='w-20 rounded-md shadow-sm hover:opacity-90 transition-opacity'
                alt={`album art for ${tune.artist}`}
                src={tune.artwork}
              />
            </a>
          )}
        </div>
      </div>
      {isEditMode && isCollapsed && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`absolute top-4 right-4 p-2 rounded-full
            bg-red-500 hover:bg-red-600 active:bg-red-700
            text-white shadow-sm
            transition-all duration-300 ease-in-out
            hover:shadow-md hover:scale-110
            hover:rotate-90 hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            group
            ${isDeleting ? 'cursor-not-allowed opacity-50' : ''}`}
          aria-label='Delete habit'
        >
          {isDeleting ? (
            <div className='w-6 h-6 flex items-center justify-center'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : (
            <X
              size={20}
              className='transition-transform duration-300 ease-in-out'
            />
          )}
          <div
            className='absolute -top-8 left-1/2 transform -translate-x-1/2 
                        bg-gray-800 text-white text-xs py-1 px-2 rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity 
                        pointer-events-none whitespace-nowrap'
          >
            Delete habit
          </div>
        </button>
      )}
      {isLoading && (
        <div
          className='absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300'
          style={{
            width: '100%',
            animation: 'loadingProgress 2s infinite ease-in-out',
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

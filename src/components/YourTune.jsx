import React, { useState } from 'react';

const YourTune = ({ seed, habitName }) => {
  const [tune, setTune] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const handleClick = async () => {
    if (tune) {
      setTune(null);
      setContentHeight(0);
      return;
    }

    setIsLoading(true);
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
      {isLoading && (
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
import React, { useState } from 'react';

const YourTune = ({ seed, habitName }) => {
  const [tune, setTune] = useState(null);

  const getTune = async () => {
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
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div 
      onClick={getTune}
      className="p-4 rounded-lg bg-white hover:bg-gray-50 shadow-sm border border-gray-200 
                 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          <div className="text-gray-800 font-bold text-lg">{habitName}</div>
          {tune && (
            <div className="text-gray-600">
              <div className="font-medium">{tune.name}</div>
              <div>{tune.artist}</div>
            </div>
          )}
        </div>
        {tune && (
          <div className="w-20 ml-4 flex-shrink-0">
            <a href={tune.uri}>
              <img 
                className="w-full rounded-md shadow-sm hover:opacity-90 transition-opacity"
                alt={`album art for ${tune.artist}`} 
                src={tune.artwork} 
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourTune;

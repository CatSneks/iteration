import React, { useState } from 'react';

function YourTune({ seed }) {
  const [tune, setTune] = useState(null);

  //console.log(seed);

  // `http://localhost:3000/recommendations?seed_genres=${seed}&target_valence=0.8&target_danceability=0.7`,

  const getTune = (seed) => () => {
    fetch(`http://localhost:3000/recommendations?seed_genres=${seed}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recommendations:', data); // Log the data for debugging
        if (data.recommendations && data.recommendations.length > 0) {
          setTune(data.recommendations[0]); // Set the first recommendation as the tune
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <section>
      <button onClick={getTune(seed)}>Reveal Tune</button>
      {tune && <h2>{tune.name}</h2>}
      {tune && <h3>{tune.artist}</h3>}
      {tune && (
        <a href={tune.uri}>
          <img alt={`album art for ${tune.artist}`} src={tune.artwork} />
        </a>
      )}
    </section>
  );
}

export default YourTune;

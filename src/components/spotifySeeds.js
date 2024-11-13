function addRandomness(value, range = 0.1) {
  const adjustment = Math.random() * range * 2 - range; // Adjusts between -range and +range
  return Math.min(1, Math.max(0, value + adjustment)); // Keeps value between 0 and 1
}

const seeds = {
  'Mood 1': () => {
    const seed_genres = 'folk,acoustic,country';
    const target_valence = addRandomness(0.6);
    const target_energy = addRandomness(0.5);
    const target_tempo = 85;
    const target_acousticness = addRandomness(0.9);
    const target_danceability = addRandomness(0.5);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },

  'Mood 2': () => {
    const seed_genres = 'hip-hop,edm,rock';
    const target_valence = addRandomness(0.9);
    const target_energy = addRandomness(0.95);
    const target_tempo = 140;
    const target_danceability = addRandomness(0.85);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  },

  'Mood 3': () => {
    const seed_genres = 'pop,indie,electronic';
    const target_valence = addRandomness(0.7);
    const target_energy = addRandomness(0.65);
    const target_tempo = 105;
    const target_danceability = addRandomness(0.75);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  },

  'Mood 4': () => {
    const seed_genres = 'ambient,classical,chill';
    const target_valence = addRandomness(0.4);
    const target_energy = addRandomness(0.1);
    const target_tempo = 50;
    const target_acousticness = addRandomness(0.95);
    const target_danceability = addRandomness(0.2);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },

  'Mood 5': () => {
    const seed_genres = 'jazz,lo-fi,blues';
    const target_valence = addRandomness(0.6);
    const target_energy = addRandomness(0.4);
    const target_tempo = 75;
    const target_acousticness = addRandomness(0.8);
    const target_danceability = addRandomness(0.5);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },

  'Mood 6': () => {
    const seed_genres = 'rock,blues,reggae';
    const target_valence = addRandomness(0.75);
    const target_energy = addRandomness(0.8);
    const target_tempo = 115;
    const target_danceability = addRandomness(0.65);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  },

  'Mood 7': () => {
    const seed_genres = 'classical,ambient,acoustic';
    const target_valence = addRandomness(0.5);
    const target_energy = addRandomness(0.25);
    const target_tempo = 60;
    const target_acousticness = addRandomness(0.85);
    const target_danceability = addRandomness(0.3);

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },
};

export default seeds;

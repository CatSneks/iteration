function addRandomness(value, range = 0.1) {
  const adjustment = Math.random() * range * 2 - range; // Adjusts between -range and +range
  return Math.min(1, Math.max(0, value + adjustment)); // Keeps value between 0 and 1
}

const seeds = {
  'C-pop': () => {
    const seed_genres = 'mandopop,cantopop,chinese pop'; // Relevant C-pop genres
    const target_valence = addRandomness(0.75); // Positive, upbeat mood
    const target_energy = addRandomness(0.7); // High energy, upbeat
    const target_tempo = 110; // Upbeat tempo, typical of C-pop
    const target_acousticness = addRandomness(0.2); // Low acousticness, more electronic elements
    const target_danceability = addRandomness(0.75); // High danceability, C-pop is often very danceable

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },
  EDM: () => {
    const seed_genres =
      'progressive house,big room house,future house,trap,dubstep'; // Festival EDM genres
    const target_valence = addRandomness(0.9); // High valence for positive, uplifting festival vibes
    const target_energy = addRandomness(0.85); // High energy, perfect for festival crowds
    const target_tempo = 128; // Common festival EDM tempo (range 120-130 BPM)
    const target_acousticness = addRandomness(0.05); // Very low acousticness, electronic-heavy
    const target_danceability = addRandomness(0.85); // High danceability, as it's festival-ready

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },

  Eurobeat: () => {
    const seed_genres = 'eurodance,house,dance pop,techno'; // Genres that define the Eurodance sound
    const target_valence = addRandomness(0.85); // High valence for a very positive, upbeat vibe
    const target_energy = addRandomness(0.8); // High energy, typical of Eurodance tracks
    const target_tempo = 130; // Fast tempo, common for Eurodance (120-140 BPM)
    const target_acousticness = addRandomness(0.1); // Very low acousticness, mostly electronic
    const target_danceability = addRandomness(0.85); // Extremely danceable beats

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },
  'Top of the Charts': () => {
    const seed_genres = 'pop,hip hop,rap,dance pop,edm'; // Popular genres in the USA charts
    const target_valence = addRandomness(0.75); // Upbeat, energetic vibe that works across pop, hip hop, and dance
    const target_energy = addRandomness(0.8); // High energy, reflecting the upbeat nature of current hits
    const target_tempo = 120; // Typical tempo for chart-topping hits across genres (usually 100-130 BPM)
    const target_acousticness = addRandomness(0.2); // Low acousticness, most chart-toppers are heavily produced
    const target_danceability = addRandomness(0.85); // Very danceable, as most hits are meant to be catchy and fun

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },
  'Lo-Fi': () => {
    const seed_genres = 'lo-fi,ambient,chillhop,relaxation'; // Core lo-fi genres and sub-genres
    const target_valence = addRandomness(0.4); // Low-to-moderate valence, relaxing vibe
    const target_energy = addRandomness(0.3); // Low energy, fitting the chill and mellow nature of lo-fi
    const target_tempo = 75; // Slower tempo, typical of lo-fi music (usually around 60-90 BPM)
    const target_acousticness = addRandomness(0.6); // Moderate acousticness, as lo-fi can blend both acoustic and electronic sounds
    const target_danceability = addRandomness(0.2); // Very low danceability, lo-fi isn't made for dancing

    return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  },
  // 'Nature Walk': () => {
  //   const seed_genres = 'folk,acoustic,country';
  //   const target_valence = addRandomness(0.6);
  //   const target_energy = addRandomness(0.5);
  //   const target_tempo = 85;
  //   const target_acousticness = addRandomness(0.9);
  //   const target_danceability = addRandomness(0.5);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  // },

  // 'At the Gym': () => {
  //   const seed_genres = 'hip-hop,edm,rock';
  //   const target_valence = addRandomness(0.9);
  //   const target_energy = addRandomness(0.95);
  //   const target_tempo = 140;
  //   const target_danceability = addRandomness(0.85);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  // },

  // 'Laundry or Dishes': () => {
  //   const seed_genres = 'pop,indie,electronic';
  //   const target_valence = addRandomness(0.7);
  //   const target_energy = addRandomness(0.65);
  //   const target_tempo = 105;
  //   const target_danceability = addRandomness(0.75);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  // },

  // Meditation: () => {
  //   const seed_genres = 'ambient,classical,chill';
  //   const target_valence = addRandomness(0.4);
  //   const target_energy = addRandomness(0.1);
  //   const target_tempo = 50;
  //   const target_acousticness = addRandomness(0.95);
  //   const target_danceability = addRandomness(0.2);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  // },

  // 'Answering Emails': () => {
  //   const seed_genres = 'jazz,lo-fi,blues';
  //   const target_valence = addRandomness(0.6);
  //   const target_energy = addRandomness(0.4);
  //   const target_tempo = 75;
  //   const target_acousticness = addRandomness(0.8);
  //   const target_danceability = addRandomness(0.5);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  // },

  // 'Yard Work': () => {
  //   const seed_genres = 'rock,blues,reggae';
  //   const target_valence = addRandomness(0.75);
  //   const target_energy = addRandomness(0.8);
  //   const target_tempo = 115;
  //   const target_danceability = addRandomness(0.65);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_danceability=${target_danceability}`;
  // },

  // Reading: () => {
  //   const seed_genres = 'classical,ambient,acoustic';
  //   const target_valence = addRandomness(0.5);
  //   const target_energy = addRandomness(0.25);
  //   const target_tempo = 60;
  //   const target_acousticness = addRandomness(0.85);
  //   const target_danceability = addRandomness(0.3);

  //   return `?seed_genres=${seed_genres}&target_valence=${target_valence}&target_energy=${target_energy}&target_tempo=${target_tempo}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}`;
  // },
};

export default seeds;

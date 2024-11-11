import React, { useState } from 'react';
import './App.css';
import YourTune from './components/YourTune';
import seeds from './components/spotifySeeds';
import VibeDropDown from './components/VibeDropDown';

function App() {
  const [vibe, setVibe] = useState('Nature Walk');
  return (
    <div className='App'>
      <header className='App-header'></header>
      <main>
        <h1>Attune</h1>
        <VibeDropDown options={seeds} updateVibe={setVibe} />
        <YourTune seed={seeds[vibe]()} />
      </main>
    </div>
  );
}

export default App;

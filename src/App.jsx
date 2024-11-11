import React, { useState } from 'react';
import Main from './components/Main';
import './App.css';
import Header from './components/Header';

function App() {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  //const [user, setUser] = useState({ name: 'Fish' });

  return (
    <div className='App'>
      {error && console.log(error)}
      <Header userId={userId} setUserId={setUserId} setError={setError} />
      {userId && <Main userId={userId} />}
    </div>
  );
}

export default App;

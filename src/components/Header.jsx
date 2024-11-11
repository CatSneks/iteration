import React, { useRef } from 'react';
//import edit from '../edit.svg';
import TodaysDate from './TodayDate';

function Header({ userId, setUserId, setError }) {
  const searchInputRef = useRef(null);

  const fetchUserId = async (userName) => {
    try {
      const responseId = await fetch(
        `http://localhost:3000/api/userId?userName=${userName}`
      );
      const resultId = await responseId.json(); // parse response body as json
      if (responseId.ok) {
        setUserId(resultId.userId); // set dailyHabits state with response data
      } else {
        setError(resultId.error); // set error if status !ok
      }
    } catch (err) {
      setError('Error getting Id');
    }
  };

  // const useEffect = () =>

  //     const handleClick = (event) => {

  //         const input event.target.value;

  //         // fetch user

  //         setUser(user);

  //     }

  return userId ? (
    <header className='App-header container'>
      <h1 className='App-header'>attune</h1>

      <h2>{`Welcome, ${userId}`}</h2>
      {/*button for adding a habit
      <button type='submit'>
        add habit button
        {/*todo: add logic for routing to /addhabit*/}
      <TodaysDate />
    </header>
  ) : (
    <header className='App-header container'>
      <h1 className='App-header'>Attune</h1>
      {/*create form with value of username / password to submit on handleclick*/}
      {/* <form className='app-header'>
        <label for='username'>username: </label>
        <input
          type='text'
          name='username'
          id='username'
          required
          minlength='4'
          maxlength='15'
          size='10'
        ></input>
        <label for='password'>password: </label>
        <input type='password' id='password' name='password'></input>
        </form> */}
      <div>
        <input
          type='text'
          id='userName'
          placeholder='Please enter your user name'
          ref={searchInputRef} // once this element is rendered, React assigns the input field to searchInputRef.current, allows direct interaction after
          onKeyDown={(e) => {
            // search triggers on pressing enter or with button click below
            if (e.key === 'Enter')
              fetchUserId(searchInputRef.current.value.trim());
          }}
        />
        <button
          onClick={() => fetchUserId(searchInputRef.current.value.trim())}
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;

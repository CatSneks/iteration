import React from 'react';
import edit from '../edit.svg';
import TodaysDate from './TodayDate';

function Header({ setUser, user }) {
  // const useEffect = () =>

  //     const handleClick = (event) => {

  //         const input event.target.value;

  //         // fetch user

  //         setUser(user);

  //     }

  return user ? (
    <header className='App-header container'>
      <h1 className='App-header'>attune</h1>

      <h2>{`Welcome, ${user}`}</h2>
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
      <form className='app-header'>
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
      </form>
    </header>
  );
}

export default Header;

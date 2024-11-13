import { div } from 'framer-motion/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaTimes, FaBars } from 'react-icons/fa'; // can also use the 'x' and hamburger icons from the React Icons library
const Navbar = ({ handleSidebarBtn, isNavOpen }) => {
  const navigate = useNavigate();
  const gameLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='navbar'>
      <div className='sidebar' style={{ width: isNavOpen ? '100%' : '0' }}>
        <h1 className='close-btn' to='#' onClick={handleSidebarBtn}>
          X
        </h1>
        <h2 className='nav-title' onClick={() => navigate(`/`)}>
          Home
        </h2>
        {gameLevels.map((lvl) => {
          return (
            <h2 className='nav-title' onClick={() => navigate(`/level${lvl}`)}>
              Level {lvl}
            </h2>
          );
        })}
      </div>
      <button className='open-btn' onClick={handleSidebarBtn}>
        &#9776;
      </button>
    </div>
  );
};
export default Navbar;
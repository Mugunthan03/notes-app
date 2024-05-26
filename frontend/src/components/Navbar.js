import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut, auth } from '../pages/Firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logOut(auth);
      console.log('logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className='bg-white flex items-center justify-between gap-5 px-6 py-2 drop-shadow '>
        <h1 className='text-xl font-medium text-black py-2'>Notes</h1>
        {loggedIn ? (
          <button onClick={handleLogout} className='border-2 px-3 py-1 border-black rounded-lg font-bold
           hover:bg-blue-400 hover:border-none transition-all duration-100 '>Logout</button>
        ) : (
          <button onClick={() => navigate('/login') } className='border-2 px-3 py-1 border-black rounded-lg font-bold
          hover:bg-blue-400  hover:border-none transition-all duration-100 '>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { async } from 'regenerator-runtime';
import { clear } from 'console';

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './module.HeaderStyle.css';

const setActiveLink = (isActive) => ({ color: isActive ? 'red' : 'black' });

export default function Layout({ wallet, isSignedIn }) {
  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };
  return (
    <div className="container">
      <div className="bookJack">PROMIS</div>
      {isSignedIn ? (
        <div className="login" onClick={signOut}>
          EXIT
        </div>
      ) : (
        <div className="login" onClick={signIn}>
          LOGIN
        </div>
      )}

      <div className="navMenu">
        <NavLink className="menuItem" to="/">
          ABOUT
        </NavLink>
        <NavLink className="menuItem" to="bet">
          BET
        </NavLink>
        <NavLink className="menuItem" to="read">
          READ
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

import { async } from 'regenerator-runtime';
import { clear } from 'console';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './module.HeaderStyle.css';
import enter from './enter.png';
import exit from './exit.png';

const setActiveLink = (isActive) => ({ color: isActive ? 'red' : 'black' });

export default function Layout({ wallet, isSignedIn, guestBook }) {
  const [user, setUser, userName, setUserName] = useContext(Context);
  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };

  return (
    <div className="container">
      <div className="bookJack">PROMISE</div>
      {isSignedIn ? (
        <div className="login" onClick={signOut}>
          <img className="enter" src={exit} />
        </div>
      ) : (
        <div className="login" onClick={signIn}>
          <img className="enter" src={enter} />
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

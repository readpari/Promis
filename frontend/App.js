import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { async } from 'regenerator-runtime';
import { clear } from 'console';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/About';
import Bet from './components/Bet';
import Read from './components/Read';
import NotFound from './components/NotFound';

const App = ({ isSignedIn, guestBook, wallet }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isSignedIn={isSignedIn} guestBook={guestBook} wallet={wallet} />}>
          <Route index element={<About />} />
          <Route
            path="bet"
            element={<Bet isSignedIn={isSignedIn} guestBook={guestBook} wallet={wallet} />}
          />
          <Route
            path="read"
            element={<Read isSignedIn={isSignedIn} guestBook={guestBook} wallet={wallet} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

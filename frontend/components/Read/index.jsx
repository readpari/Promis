import { async } from 'regenerator-runtime';
import { clear } from 'console';
import 'regenerator-runtime/runtime';
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { publicRoutes, privateRoutes } from '../router';

export default function Read({ isSignedIn, guestBook, wallet }) {
  const [readOn, setReadOn] = useState(false);
  const [readTimer, setReadTimer] = useState(0);
  const read = async () => {
    setReadTimer((readTimer) => readTimer + 1);
    await guestBook.timer();
  };

  useEffect(() => {
    // var book = ePub('alice.epub');
    // var rendition = book.renderTo('area', { width: 600, height: 400 });
    // var displayed = rendition.display();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(readTimer);
      if (readOn) read();
    }, 60000);

    return () => {
      clearInterval(interval);
      console.log('interval clear');
    };
  }, [readOn]);

  var book = ePub('alice.epub');
  var rendition = book.renderTo('area', { width: 600, height: 400 });
  var displayed = rendition.display();
  console.log(ePub);
  return (
    <>
      <button onClick={() => setReadOn(!readOn)}>{readOn ? 'stop' : 'start'}</button>
    </>
  );
}

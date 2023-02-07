import { async } from 'regenerator-runtime';
import { clear } from 'console';
import 'regenerator-runtime/runtime';
import React, {useCallback, useMemo, useRef} from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { publicRoutes, privateRoutes } from '../router';

export default function Read({ isSignedIn, guestBook, wallet }) {
  const [readOn, setReadOn] = useState(false);
  const [readTimer, setReadTimer] = useState(0);
  const startButtonRef = useRef();

  const read = async () => {
    setReadTimer((readTimer) => readTimer + 1);
    await guestBook.timer();
  };

  const createBookElementInPage = useCallback(() => {
    const div = document.createElement('div' )
    div.id = 'area'

    if(!startButtonRef.current){
      return;
    }

    document.querySelector('.container').insertAdjacentElement('beforeend', div);


  }, [startButtonRef])

  const createBookInstance = useCallback(() => {
    const book = ePub('https://s3.amazonaws.com/moby-dick/OPS/package.opf');
    const rendition = book.renderTo('area', {
      height: "75vh",
      manager: "continuous",
      flow: "scrolled",
      width: '100vw',
      allowScriptedContent: true });
    const displayed = rendition.display("epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)");
  }, [startButtonRef])

  useEffect(() => {
    createBookElementInPage()
    createBookInstance()
  }, [createBookElementInPage, createBookInstance]);

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

  return (
    <>
      <button ref={startButtonRef} onClick={() => setReadOn(!readOn)}>{readOn ? 'stop' : 'start'}</button>
    </>
  );
}

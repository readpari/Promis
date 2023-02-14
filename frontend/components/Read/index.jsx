import { async } from 'regenerator-runtime';
import { clear } from 'console';
import 'regenerator-runtime/runtime';
import React, { useCallback, useMemo, useRef } from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookInput from '../BookInput/BookInput';
import './read.css';

// import { publicRoutes, privateRoutes } from '../router';

export default function Read({ isSignedIn, guestBook, wallet }) {
  const [readOn, setReadOn] = useState(false);
  const [readTimer, setReadTimer] = useState(0);
  const [bookBytes, setBook] = useState(null);
  const [showBook, setShowBook] = useState(false);
  const [rendi, setRendi] = useState();
  // const startButtonRef = useRef();

  const read = async () => {
    setReadTimer((readTimer) => readTimer + 1);
    await guestBook.timer();
  };

  // const createBookElementInPage = useCallback(() => {
  //   const div = document.createElement('div');
  //   div.id = 'area';
  //   div.className = 'bookClassArea';

  //   if (!startButtonRef.current) {
  //     return;
  //   }

  //   document.querySelector('.container').insertAdjacentElement('beforeend', div);
  // }, [startButtonRef]);

  const createBookInstance = useCallback(() => {
    const book = ePub(bookBytes);

    rendition = book.renderTo('area', {
      height: '100vh',
      manager: 'continuous',
      flow: 'paginated',
      width: '100vw',
      allowScriptedContent: true,
      // snap: true,
    });
    setRendi(rendition);
    var displayed = rendition.display('epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)');

    displayed.then(function (renderer) {
      // -- do stuff
    });

    book.loaded.navigation.then(function (toc) {
      // console.log(toc);
    });

    //-------------------

    var slide = function () {
      var cfi = book.locations.cfiFromPercentage(slider.value / 300);
      rendition.display(cfi);
    };

    setShowBook(true);
  }, [bookBytes]);

  useEffect(() => {
    if (!bookBytes) {
      return;
    }

    // createBookElementInPage();
    createBookInstance();
  }, [createBookInstance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showBook) {
        if (document.hidden) {
          console.log('close');
        } else {
          read();
          console.log('open');
        }
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      console.log('interval clear');
    };
  }, [showBook]);

  const nextPage = () => {
    rendi.next();
  };
  const prevPage = () => {
    rendi.prev();
  };

  return (
    <>
      {!showBook && (
        <>
          <h1 className="readHeader">Add a book in .epub format </h1>
          <BookInput onBookLoaded={setBook} />
          {/* <button ref={startButtonRef} onClick={() => setReadOn(!readOn)}>
            {readOn ? 'stop' : 'start'}
          </button> */}
        </>
      )}

      {showBook && (
        <>
          <div className="closeBook" onClick={() => setShowBook(false)}>
            &#10006;
          </div>
          <div className="nextPage" onClick={() => nextPage()}></div>
          <div className="prevPage" onClick={() => prevPage()}></div>
          <div id="area" className="bookClassArea"></div>
        </>
      )}
    </>
  );
}

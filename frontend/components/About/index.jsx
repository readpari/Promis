import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { text, chat } from './text';
import style from './module.styleAbout.css';

export default function About() {
  const [activeLang, setActiveLang] = useState('EN');
  const [textLang, setTextLang] = useState(text['EN']);
  const [chatLang, setChatLang] = useState(chat['EN']);

  return (
    <>
      <div className="languageButtons">
        {Object.keys(text).map((lang) => (
          <div
            key={lang}
            className="lang"
            onPointerDown={() => (
              setActiveLang(lang), setTextLang(text[lang]), setChatLang(chat[lang])
            )}
            style={{ color: lang == activeLang ? 'brown' : 'black' }}>
            {lang}
          </div>
        ))}
      </div>
      <div className="textContainer">
        {textLang.map((item, index) => (
          <p key={index} className="aboutText">
            {item}
          </p>
        ))}

        <h1 className="chatHeader">ChatGPT</h1>

        {chatLang.map((item, index) => (
          <div key={index}>{index % 2 ? <p className="aboutText">{item}</p> : <h2>{item}</h2>}</div>
        ))}
      </div>
    </>
  );
}

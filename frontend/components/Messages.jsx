import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {
  return (
    <>
      <h2>Messages</h2>
      {messages.map((message, i) => (
        // TODO: format as cards, add timestamp
        <p key={i}>
          {/* <strong>{message.sender}</strong>:<br /> */}
          {message.user} | bet: {message.bet}| hours: {message.hours} | days: {message.days} | game:
          {message.readProcess}
        </p>
      ))}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
};

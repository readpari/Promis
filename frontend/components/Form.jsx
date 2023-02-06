import React from 'react';
import PropTypes from 'prop-types';

export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, {currentAccountId}!</p>
        <p className="highlight">
          <label htmlFor="user">user:</label>
          <input autoComplete="off" autoFocus id="user" required />
        </p>
        <p>
          <label htmlFor="bet">bet</label>
          <input autoComplete="off" defaultValue={'0'} id="bet" min="0" step="1" type="number" />
        </p>
        <p>
          <label htmlFor="hours">hours</label>
          <input autoComplete="off" defaultValue={'0'} id="hours" min="0" step="1" type="number" />
        </p>
        <p>
          <label htmlFor="days">days</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="days"
            min="0"
            step="0.0001"
            type="number"
          />
        </p>

        <button type="submit">Sign</button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};

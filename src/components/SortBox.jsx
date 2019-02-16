import React from 'react';
import PropTypes from 'prop-types';
import { FORWARD, REVERSE } from './constants';

const SortBox = ({ setSort }) => (
  <select onChange={evt => setSort(evt.target.value)}>
    <option value={FORWARD}>A-Z</option>
    <option value={REVERSE}>Z-A</option>
  </select>
);
SortBox.propTypes = {
  setSort: PropTypes.func.isRequired,
};

export default SortBox;

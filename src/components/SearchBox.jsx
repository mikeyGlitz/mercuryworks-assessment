import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ setSearchTerm }) => (
  <input id="searchBox" onChange={evt => setSearchTerm(evt.target.value)} placeholder="Search..." />
);

SearchBox.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBox;

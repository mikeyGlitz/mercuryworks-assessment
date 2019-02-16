import React from 'react';
import PropTypes from 'prop-types';
import './PersonCard.css';
import SpeciesDisplay from './SpeciesDisplay';

/**
 * @description A display card for an individual person
 * @param {Object} props The React properties
 * The react properties contains a person from the API
 * A Person has the following fields:
 * * name - the person's name
 * * height - the height of the person
 * * mass - how much mass the person has
 * * species - the species of a person
 * @returns {Object} React component of the PeopleCard
 */
const PersonCard = ({
  person: {
    name,
    height,
    mass,
    gender,
    species: [species],
  },
}) => {
  let speciesIndex = '';
  if (species) {
    const speciesArray = new URL(species).pathname
      .split('/')
      .filter(segment => typeof segment === 'string' && segment.length > 0);
    speciesIndex = speciesArray[speciesArray.length - 1];
  }

  return (
    <div className="personCard">
      <div className="iconBlock">
        <SpeciesDisplay speciesLink={speciesIndex} />
      </div>
      <div className="personBlock">
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <span>Height:</span>&nbsp;
          <span>{height}</span>
          &nbsp;
          <i className="fa fa-xs fa-square" />
          &nbsp;
          <span>Mass:</span>&nbsp;
          <span>{mass}</span>
          &nbsp;
          <i className="fa fa-xs fa-square" />
          &nbsp;
          <span>Gender:</span>&nbsp;
          <span>{gender}</span>&nbsp;
        </div>
      </div>
    </div>
  );
};

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    height: PropTypes.string,
    mass: PropTypes.string,
    gender: PropTypes.string,
    species: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PersonCard;

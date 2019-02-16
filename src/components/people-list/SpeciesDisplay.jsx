import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../Loader';

const SpeciesDisplay = ({ speciesLink }) => (
  <Query
    variables={{
      species: speciesLink,
    }}
    query={gql`
      query GetSpecies($species: String) {
        species(species: $species)
          @rest(type: Species, path: "species/{args.species}") {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Loader />;
      }

      if (error) {
        console.error(error);
      }

      if (data && data.species) {
        const {
          species: { name },
        } = data;
        let className = '';
        switch (name) {
          case 'Droid':
            className = 'fa-android';
            break;
          case 'Human':
            className = 'fa-user-circle';
            break;
          default:
            className = 'fa-question';
            break;
        }

        return <i className={`fa ${className}`} />;
      }

      return <span />;
    }}
  </Query>
);

SpeciesDisplay.propTypes = {
  speciesLink: PropTypes.string.isRequired,
};

export default SpeciesDisplay;

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FORWARD } from '../constants';
import Loader from '../Loader';
import PersonCard from './PersonCard';

const forwardSort = ({ name: aName }, { name: bName }) => {
  if (aName > bName) {
    return 1;
  }
  if (aName < bName) {
    return -1;
  }
  return 0;
};

const reverseSort = ({ name: aName }, { name: bName }) => {
  if (aName > bName) {
    return -1;
  }
  if (aName < bName) {
    return 1;
  }
  return 0;
};

/**
 * @description The list of people that a person has
 * @param {Object} props The React properties
 * The react properties for this component are the searchTerm and page
 * @returns {React.ReactNode} A react node which displays the list of people
 */
const PeopleList = ({
  searchTerm,
  page,
  sortOrder,
  setPageNumber,
}) => (
  <Query
    variables={{
      page,
      search: searchTerm,
    }}
    query={gql`
      query GetPeople($search: String, $page: Int) {
        people(search: $search, page: $page)
          @rest(type: PeoplePayload, path: "people/?{args}") {
          count
          next
          results {
            name
            height
            mass
            gender
            species
          }
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
        return (
          <div className="fetch-error">
            There was a problem processing request
          </div>
        );
      }
      if (data && data.people) {
        const {
          people: { results = [] },
        } = data;
        if (results.length === 0) {
          return (
            <div>
              <h1>We couldn&#39;t find the droids you were looking for</h1>
              <p>Please try again with a different search query</p>
            </div>
          );
        }
        return (
          <div>
            <div className="progressButtons">
              {page > 1 && (
                <button id="previousButton" onClick={() => setPageNumber(page - 1)} type="button">
                  <i className="fa fa-chevron-left" />
                </button>
              )}
              {data.people.next && (
                <button id="nextButton" onClick={() => setPageNumber(page + 1)} type="button">
                  <i className="fa fa-chevron-right" />
                </button>
              )}
            </div>
            {results
              .sort(sortOrder === FORWARD ? forwardSort : reverseSort)
              .map(person => (
                <PersonCard key={person.name} person={person} />
              ))}
          </div>
        );
      }
      return <span />;
    }}
  </Query>
);

PeopleList.propTypes = {
  searchTerm: PropTypes.string,
  page: PropTypes.number,
  sortOrder: PropTypes.string,
  setPageNumber: PropTypes.func.isRequired,
};

PeopleList.defaultProps = {
  searchTerm: null,
  page: 1,
  sortOrder: FORWARD,
};

export default PeopleList;

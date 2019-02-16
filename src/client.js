/**
 * @file client.js
 * @author Michael Glitzos
 * @description Sets up an initializes the Apollo client
 */

import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const restLink = new RestLink({
  uri: 'https://swapi.co/api/',
  typePatcher: {
    // Map people payload to a type so GQL doesn't complain
    PeoplePayload(data) {
      if (data != null && Array.isArray(data.results)) {
        /* eslint-disable no-param-reassign */
        data.results = data.results.map(person => ({
          __typename: 'Person',
          ...person,
        }));
        /* eslint-enable */
      }
      return data;
    },
  },
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;

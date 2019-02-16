/**
 * @file client.js
 * @author Michael Glitzos
 * @description Sets up an initializes the Apollo client
 */

import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const restLink = new RestLink({ uri: 'https://swapi.co/api' });

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;

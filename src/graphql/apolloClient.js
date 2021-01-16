import { ApolloClient } from '@apollo/client';
// API
import { API_URL } from './API_URL';
import cache from './cache';
import resolvers from './resolvers';
// Connection API
const client = new ApolloClient({
  uri: API_URL,
  cache: cache,
  resolvers: resolvers,
});
export default client;

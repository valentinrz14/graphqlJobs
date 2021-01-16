// Dependencies
import { InMemoryCache } from '@apollo/client';
// Queries
import { GET_FAVORITE_JOBS_COUNT, GET_FAVORITE_JOBS_LIST } from './queries';

const cache = new InMemoryCache({
  typePolicies: {
    Job: {
      fields: {
        favorite: {
          read(favorite = false) {
            return favorite;
          },
        },
      },
    },
  },
});
cache.writeQuery({
  query: GET_FAVORITE_JOBS_COUNT,
  data: {
    favoriteJobsCount: 0,
  },
});
cache.writeQuery({
  query: GET_FAVORITE_JOBS_LIST,
  data: {
    favoriteJobsList: [],
  },
});
export default cache;

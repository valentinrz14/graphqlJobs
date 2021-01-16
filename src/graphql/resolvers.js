// Queries
import {
  FAVORITE_JOB_FRAGMENT,
  GET_FAVORITE_JOBS_COUNT,
  GET_FAVORITE_JOBS_LIST,
} from './queries';
// Resolvers
const resolvers = {
  Job: {
    favorite() {
      return false;
    },
  },
  Mutation: {
    // Add and Remove Jobs from Favorites
    addOrRemoveJobFromFavorite(_root, args, { client, cache }) {
      // id identify
      const jobId = cache.identify({
        __typename: 'Job',
        id: args.jobId,
      });
      // Get Favorites
      const { favorite } = client.readFragment({
        fragment: FAVORITE_JOB_FRAGMENT,
        id: jobId,
      });
      // Set Favorite
      client.writeFragment({
        fragment: FAVORITE_JOB_FRAGMENT,
        id: jobId,
        data: {
          favorite: !favorite,
        },
      });
      // Get Favorite Count
      const { favoriteJobsCount } = client.readQuery({
        query: GET_FAVORITE_JOBS_COUNT,
      });
      // Set Favorite Count
      client.writeQuery({
        query: GET_FAVORITE_JOBS_COUNT,
        data: {
          favoriteJobsCount: favorite
            ? favoriteJobsCount - 1
            : favoriteJobsCount + 1,
        },
      });
      // Destructuring arguments
      const {
        company,
        title,
        description,
        countries,
        cities,
        postedAt,
        slug,
      } = args;
      // Create a new Favorite List
      const newFavoriteList = {
        id: args.jobId,
        company,
        title,
        description,
        countries,
        cities,
        postedAt,
        slug,
        favorite: !favorite,
      };

      // Get the current Favorite List
      const { favoriteJobsList } = client.readQuery({
        query: GET_FAVORITE_JOBS_LIST,
      });

      if (favorite === true) {
        // Filter Jobs Favorites with id
        const newFavoriteJobsList = favoriteJobsList.filter(
          ({ id }) => id !== args.jobId,
        );
        // Set List with filter favorite list
        client.writeQuery({
          query: GET_FAVORITE_JOBS_LIST,
          data: {
            favoriteJobsList: newFavoriteJobsList,
          },
        });
      } else {
        let data = true;
        // if favorite list contains data
        if (favoriteJobsList.length > 0) {
          data = favoriteJobsList.map(({ id }) => {
            if (id === newFavoriteList.id) {
              return true;
            }
          });
        }
        // if data is true
        if (data) {
          client.writeQuery({
            query: GET_FAVORITE_JOBS_LIST,
            data: {
              favoriteJobsList: [...favoriteJobsList, newFavoriteList],
            },
          });
        }
      }
    },
  },
};
export default resolvers;

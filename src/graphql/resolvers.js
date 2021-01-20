// Depencies
import { Alert } from 'react-native';
// Queries
import {
  FAVORITE_JOB_FRAGMENT,
  GET_FAVORITE_JOBS_COUNT,
  GET_FAVORITE_JOBS_LIST,
  GET_POSTULATE_JOBS_COUNT,
  GET_POSTULATE_JOBS_LIST,
  POSTULATES_JOB_FRAGMENT,
} from './queries';
// Resolvers
const resolvers = {
  Job: {
    favorite() {
      return false;
    },
    postulate() {
      return false;
    },
  },
  Mutation: {
    // Add or Remove Jobs from Favorites
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
    addOrRemoveJobFromPostulate(_root, args, { client, cache }) {
      // id identify
      const jobId = cache.identify({
        __typename: 'Job',
        id: args.jobId,
      });
      // Get Favorites
      const { postulate } = client.readFragment({
        fragment: POSTULATES_JOB_FRAGMENT,
        id: jobId,
      });
      // Set Favorite
      client.writeFragment({
        fragment: POSTULATES_JOB_FRAGMENT,
        id: jobId,
        data: {
          postulate: !postulate,
        },
      });

      // Get Favorite Count
      const { postulateJobsCount } = client.readQuery({
        query: GET_POSTULATE_JOBS_COUNT,
      });
      // Set Favorite Count
      client.writeQuery({
        query: GET_POSTULATE_JOBS_COUNT,
        data: {
          postulateJobsCount: postulateJobsCount + 1,
        },
      });
      const {
        company,
        title,
        description,
        countries,
        cities,
        postedAt,
        slug,
      } = args;
      const newPostulateList = {
        id: args.jobId,
        company: {
          name: company,
        },
        title,
        description,
        countries,
        cities,
        postedAt,
        slug,
        activated: true,
      };
      const { postulateJobsList } = client.readQuery({
        query: GET_POSTULATE_JOBS_LIST,
      });
      const renderAlert = () => {
        client.writeQuery({
          query: GET_POSTULATE_JOBS_LIST,
          data: {
            postulateJobsList: [...postulateJobsList, newPostulateList],
          },
        });
        return Alert.alert('Exito al postularse.', 'Suerte!');
      };
      if (postulateJobsList.length !== 0) {
        const postulateFilter = postulateJobsList.filter(
          ({ id }) => id === newPostulateList.id,
        );
        if (postulateFilter.length !== 0) {
          client.writeQuery({
            query: GET_POSTULATE_JOBS_COUNT,
            data: {
              postulateJobsCount: postulateJobsCount,
            },
          });
          return Alert.alert(
            '!Oops',
            'Ya se encuentra postulado para esta oferta laboral',
          );
        } else {
          console.log('poprque putas entras aca');
          return renderAlert();
        }
      } else {
        return renderAlert();
      }
    },
  },
};
export default resolvers;

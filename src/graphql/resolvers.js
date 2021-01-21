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
      const { favorite } = client.readFragment({
        fragment: FAVORITE_JOB_FRAGMENT,
        id: jobId,
      });
      client.writeFragment({
        fragment: FAVORITE_JOB_FRAGMENT,
        id: jobId,
        data: {
          favorite: !favorite,
        },
      });
      const { favoriteJobsCount } = client.readQuery({
        query: GET_FAVORITE_JOBS_COUNT,
      });
      client.writeQuery({
        query: GET_FAVORITE_JOBS_COUNT,
        data: {
          favoriteJobsCount: favorite
            ? favoriteJobsCount - 1
            : favoriteJobsCount + 1,
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

      const { favoriteJobsList } = client.readQuery({
        query: GET_FAVORITE_JOBS_LIST,
      });

      if (favorite === true) {
        const newFavoriteJobsList = favoriteJobsList.filter(
          ({ id }) => id !== args.jobId,
        );
        client.writeQuery({
          query: GET_FAVORITE_JOBS_LIST,
          data: {
            favoriteJobsList: newFavoriteJobsList,
          },
        });
      } else {
        const filterFavoriteJobsList = favoriteJobsList.find(
          ({ id }) => newFavoriteList.id === id,
        );

        if (filterFavoriteJobsList === undefined) {
          return client.writeQuery({
            query: GET_FAVORITE_JOBS_LIST,
            data: {
              favoriteJobsList: [...favoriteJobsList, newFavoriteList],
            },
          });
        }
      }
    },
    // Add from  Postulates
    addJobFromPostulate(_root, args, { client, cache }) {
      const jobId = cache.identify({
        __typename: 'Job',
        id: args.jobId,
      });
      const { postulate } = client.readFragment({
        fragment: POSTULATES_JOB_FRAGMENT,
        id: jobId,
      });
      client.writeFragment({
        fragment: POSTULATES_JOB_FRAGMENT,
        id: jobId,
        data: {
          postulate: !postulate,
        },
      });

      const { postulateJobsCount } = client.readQuery({
        query: GET_POSTULATE_JOBS_COUNT,
      });
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
      const postulateFilter = postulateJobsList.find(
        ({ id }) => id === newPostulateList.id,
      );
      if (postulateFilter !== undefined) {
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
        client.writeQuery({
          query: GET_POSTULATE_JOBS_LIST,
          data: {
            postulateJobsList: [...postulateJobsList, newPostulateList],
          },
        });
        return Alert.alert('Exito al postularse.', 'Suerte!');
      }
    },
  },
};
export default resolvers;

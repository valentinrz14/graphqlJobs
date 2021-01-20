// Dependencies
import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
// Components
import WarningData from '../../components/WarningData';
import RenderJobsList from '../job_list/RenderJobsList';
import { ErrorData, LoadingIndicator } from '../../components';
// Template
import MainContainer from '../../template/MainContainer';
// Queries
import { GET_POSTULATE_JOBS_LIST } from '../../graphql/queries';

const PostalatesList = ({ navigation }) => {
  const { data, loading, error, refetch } = useQuery(GET_POSTULATE_JOBS_LIST);
  console.log('postulatesList', data);

  if (error) {
    return <ErrorData error={error} retry={refetch} />;
  }

  if (loading) {
    return <LoadingIndicator size="large" title={true} />;
  }
  if (data.postulateJobsList.length === 0) {
    return <WarningData>No se postulo a ninguna oferta laboral</WarningData>;
  }
  return (
    <MainContainer>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 5 }}
        data={data.postulateJobsList}
        refreshing={loading}
        onRefresh={() => refetch}
        renderItem={({ item }) => <RenderJobsList {...item} {...navigation} />}
        keyExtractor={({ id }) => id}
      />
    </MainContainer>
  );
};
export default PostalatesList;

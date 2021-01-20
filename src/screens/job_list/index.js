// Dependencies
import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
// Components
import RenderJobsList from './RenderJobsList';
import { LoadingIndicator, ErrorData } from '../../components/';
import WarningData from '../../components/WarningData';
// Template
import MainContainer from '../../template/MainContainer';
// Queries
import { GET_ALL_JOBS } from '../../graphql/queries';

export default function JobsList({ route, navigation }) {
  const { id } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_ALL_JOBS);

  if (loading) {
    return <LoadingIndicator size="large" title={true} />;
  }
  if (error) {
    return <ErrorData error={error} retry={refetch} />;
  }
  const jobs = data.jobs.filter(({ company }) => company.id === id);
  if (jobs.length === 0) {
    return <WarningData>No se han encontrado busquedas laborales</WarningData>;
  }

  return (
    <MainContainer>
      <FlatList
        contentContainerStyle={{ paddingVertical: 10 }}
        data={jobs}
        refreshing={loading}
        onRefresh={() => refetch}
        renderItem={({ item }) => <RenderJobsList {...item} {...navigation} />}
        keyExtractor={(item) => item.id}
      />
    </MainContainer>
  );
}

// Dependencies
import React, { createRef } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
// Components
import { ErrorData, LoadingIndicator } from '../../components';
import WarningData from '../../components/WarningData';
import RenderJobsList from '../job_list/RenderJobsList';
// API
import { GET_FAVORITE_JOBS_LIST } from '../../graphql/queries';
// Template
import MainContainer from '../../template/MainContainer';
import { ButtonUpList } from '../../components/ButtonsCustom';

const FavoritesList = ({ navigation }) => {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITE_JOBS_LIST, {
    fetchPolicy: 'cache-and-network',
  });

  const { favoriteJobsList } = data;

  let flatListRef = createRef();

  const upButtonHandler = () => {
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  if (loading) {
    return <LoadingIndicator size="large" title={true} />;
  }
  if (error) {
    return <ErrorData error={error} retry={refetch} />;
  }

  if (favoriteJobsList.length === 0) {
    return (
      <WarningData>
        No a seleccionado ninguna oferta laboral como favorita
      </WarningData>
    );
  }

  return (
    <MainContainer>
      <FlatList
        ref={(ref) => (flatListRef = ref)}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        data={favoriteJobsList}
        refreshing={loading}
        onRefresh={() => refetch}
        renderItem={({ item }) => <RenderJobsList {...item} {...navigation} />}
        keyExtractor={({ id }) => id}
      />
      {favoriteJobsList.length > 10 ? (
        <ButtonUpList upButtonHandler={upButtonHandler} />
      ) : null}
    </MainContainer>
  );
};
export default FavoritesList;

// Dependencies
import React from 'react';
import { FlatList } from 'react-native';
// Components
import WarningData from '../../components/WarningData';
import RenderJobsList from '../job_list/RenderJobsList';
// Template
import MainContainer from '../../template/MainContainer';

const PostalatesList = ({ navigation }) => {
  const data = { postulatedList: [] };
  const loading = false;
  const refetch = () => {};

  if (data.postulatedList.length === 0) {
    return (
      <WarningData>
        No a seleccionado ninguna oferta laboral como favorita
      </WarningData>
    );
  }
  return (
    <MainContainer>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 5 }}
        data={data.postulatedList}
        refreshing={loading}
        onRefresh={() => refetch}
        renderItem={({ item }) => <RenderJobsList {...item} {...navigation} />}
        keyExtractor={({ id }) => id}
      />
    </MainContainer>
  );
};
export default PostalatesList;

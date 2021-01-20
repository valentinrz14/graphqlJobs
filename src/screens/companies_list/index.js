// Dependencies
import React, { createRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client';
// Queries
import { GET_ALL_COMPANIES } from '../../graphql/queries';
// Components
import RenderCompaniesList from './RenderCompaniesList';
import { LoadingIndicator, ErrorData } from '../../components/';
import { ButtonUpList } from '../../components/ButtonsCustom';
// Colors
import { GREY_DEFAULT, WHITE } from '../../helpers/colors';
// Template
import MainContainer from '../../template/MainContainer';

export default function CompaniesList(props) {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (error) {
    return <ErrorData error={error} />;
  }
  if (loading && !data) {
    return <LoadingIndicator size="large" title={true} />;
  }
  console.log('data', data);
  let flatListRef = createRef();
  const upButtonHandler = () => {
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };
  const { itemSeparator } = styles;
  return (
    <MainContainer>
      <FlatList
        style={{ flex: 1 }}
        ref={(ref) => (flatListRef = ref)}
        data={data.companies}
        ItemSeparatorComponent={() => <View style={itemSeparator} />}
        refreshing={loading}
        onRefresh={() => refetch()}
        renderItem={({ item }) => <RenderCompaniesList {...props} {...item} />}
        keyExtractor={({ id }) => id}
      />
      <ButtonUpList upButtonHandler={upButtonHandler} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderColor: GREY_DEFAULT,
  },
});

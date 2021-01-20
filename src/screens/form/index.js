// Dependencies
import React from 'react';
import { View } from 'react-native';
// Template
import MainContainer from '../../template/MainContainer';
import FormPostulate from './FormPostulate';

const FormScreen = ({ route, navigation }) => {
  return (
    <MainContainer>
      <View style={{ paddingHorizontal: 10 }}>
        <FormPostulate {...route.params} navigation={navigation} />
      </View>
    </MainContainer>
  );
};
export default FormScreen;

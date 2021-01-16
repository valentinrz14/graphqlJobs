// Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Template
import MainContainer from '../../template/MainContainer';
import FormPostulate from './FormPostulate';

const FormScreen = (props) => (
  <MainContainer>
    <View style={{ paddingHorizontal: 10 }}>
      <FormPostulate />
    </View>
  </MainContainer>
);
export default FormScreen;

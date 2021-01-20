// Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Hooks
import { RenderIcons } from '.';
// Colors
import { BLACK, YELLOW } from '../helpers/colors';
// Template
import MainContainer from '../template/MainContainer';

const WarningData = ({ children }) => {
  const { containerNotFindJob, title } = styles;
  return (
    <MainContainer>
      <View style={containerNotFindJob}>
        <RenderIcons name="information-outline" size={100} color={YELLOW} />
        <Text style={title}>{children}</Text>
      </View>
    </MainContainer>
  );
};
export default WarningData;

const styles = StyleSheet.create({
  containerNotFindJob: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: BLACK,
  },
});

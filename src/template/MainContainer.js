import React from 'react';
import { StatusBar, View } from 'react-native';
import { BACKGROUND } from '../helpers/colors';
const MainContainer = ({ children }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, backgroundColor: BACKGROUND }}>{children}</View>
  </>
);

export default MainContainer;

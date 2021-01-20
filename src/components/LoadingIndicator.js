// Dependencies
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// Colors
import { REFRESH_CONTROL_COLOR } from '../helpers/colors';

const LoadingIndicator = ({ size, title }) => {
  const { container, titleStyle } = styles;
  return (
    <View style={container}>
      <ActivityIndicator size={size} color={REFRESH_CONTROL_COLOR} />
      {title ? <Text style={titleStyle}>Cargando...</Text> : null}
    </View>
  );
};
export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '300',
  },
});

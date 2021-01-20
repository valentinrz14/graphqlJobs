// Dependencies
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// Colors
import { BLACK, BLUE, WHITE } from '../helpers/colors';
// Icons
import RenderIcons from './RenderIcons';

export const ButtonList = ({
  children,
  _handleOnPress,
  btnListStyle,
  disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.btnList, btnListStyle]}
    onPress={_handleOnPress}>
    {children}
  </TouchableOpacity>
);

export const ButtonUpList = ({ children, upButtonHandler }) => (
  <TouchableOpacity style={styles.btnUpList} onPress={upButtonHandler}>
    <RenderIcons name="arrow-up-circle" size={35} color={BLACK} />
  </TouchableOpacity>
);

export const ButtonPostulate = ({
  children,
  _handleOnPress,
  btnPostulateStyle,
  disabled,
}) => (
  <TouchableOpacity
    onPress={_handleOnPress}
    disabled={disabled}
    style={[styles.btnPostulate, btnPostulateStyle]}>
    <Text style={styles.btnPostulateTitle}>{children}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  btnList: {
    margin: 5,
  },
  btnUpList: {
    justifyContent: 'center',
    backgroundColor: WHITE,
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  btnPostulate: {
    alignItems: 'center',
    backgroundColor: BLUE,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 30,
  },
  btnPostulateTitle: {
    color: WHITE,
    fontSize: 20,
  },
});

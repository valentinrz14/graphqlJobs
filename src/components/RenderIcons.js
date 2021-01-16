// Dependencies
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RenderIcons({ name, size, color, style }) {
  return (
    <Icon name={name} size={size ? size : 27} color={color} style={style} />
  );
}

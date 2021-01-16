// Dependencies
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
// Colors
import { WHITE } from '../helpers/colors';
// Strings
import { LOGO_EMPTY } from '../helpers/useStyles';
// Components
import LoadingIndicator from './LoadingIndicator';

export default function RenderImage({ size, foto, color, style, styleImage }) {
  const [error, setError] = useState(false);
  const { container, placeholder } = styles;
  return (
    <View style={[container, { borderColor: color, ...style }]}>
      <Image
        source={{
          uri:
            foto !== null && foto !== '' && error === false ? foto : LOGO_EMPTY,
        }}
        style={{ width: size, height: size, ...styleImage }}
        resizeMode="cover"
        onError={({ nativeEvent }) => {
          console.log('error', nativeEvent.error);
          setError(true);
        }}
        PlaceholderContent={
          <LoadingIndicator
            size={size === 50 ? 'small' : 'large'}
            title={false}
          />
        }
        placeholderStyle={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  placeholder: {
    backgroundColor: WHITE,
    alignItems: 'center',
  },
});

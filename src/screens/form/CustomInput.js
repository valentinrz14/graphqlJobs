// Dependencies
import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
// Colors
import { GREY_DEFAULT, RED, WHITE } from '../../helpers/colors';

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  const { errorText, errorInput, textInput } = styles;
  return (
    <>
      <TextInput
        style={[textInput, hasError && errorInput]}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 17,
    paddingLeft: 10,
    height: 45,
    width: '100%',
    marginVertical: 15,
    backgroundColor: WHITE,
    borderColor: GREY_DEFAULT,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    paddingLeft: 8,
    fontSize: 15,
    color: RED,
  },
  errorInput: {
    borderColor: RED,
  },
});

export default CustomInput;

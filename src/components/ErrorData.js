// Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Colors
import { BACKGROUND, BLUE, GREY_DARK, WHITE } from '../helpers/colors';
// Hooks
import { SHADOW_OFF_SET } from '../helpers/useStyles';
// Template
import MainContainer from '../template/MainContainer';
// Components
import { ButtonList } from './ButtonsCustom';
import RenderIcons from './RenderIcons';

const ErrorData = ({ error, retry }) => {
  console.log(error);
  const {
    mainContainer,
    container,
    content,
    title,
    subTitle,
    btn,
    btnText,
  } = styles;
  return (
    <MainContainer>
      <View style={mainContainer}>
        <View style={container}>
          <View style={content}>
            <RenderIcons name="emoticon-sad-outline" size={100} color={WHITE} />
            <Text style={title}>Error 404</Text>
          </View>
          <View style={[content, { backgroundColor: WHITE }]}>
            <Text style={subTitle}>An error ocurred while loading</Text>
            <Text style={subTitle}>Please try again</Text>
            <ButtonList _handleOnPress={() => retry} btnListStyle={btn}>
              <Text style={btnText}>RETRY</Text>
            </ButtonList>
          </View>
        </View>
      </View>
    </MainContainer>
  );
};
export default ErrorData;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 20,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    padding: 10,
    ...SHADOW_OFF_SET,
  },
  content: {
    flex: 1,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 25, fontWeight: 'bold', color: WHITE, marginVertical: 10 },
  subTitle: { fontSize: 23, color: GREY_DARK, fontWeight: '500' },
  btn: {
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 45,
    marginTop: 30,
    backgroundColor: BLUE,
    ...SHADOW_OFF_SET,
  },
  btnText: {
    color: WHITE,
    fontWeight: '500',
    fontSize: 20,
  },
});

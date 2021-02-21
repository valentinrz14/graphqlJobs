// Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Colors
import { WHITE, BLACK, BLUE } from '../../helpers/colors';
// Navigation Names
import { JOBS_SCREEN } from '../../navigation/navigation.names';
// Components
import { ButtonList } from '../../components/ButtonsCustom';
import RenderImage from '../../components/RenderImage';

const RenderCompaniesList = ({ id, name, logoUrl, websiteUrl, navigation }) => {
  const { container, contentImage, textContainer, title, website } = styles;
  const handleOnPress = () => navigation.navigate(JOBS_SCREEN, { id, name });

  return (
    <View style={container}>
      <ButtonList btnListStyle={container} _handleOnPress={handleOnPress}>
        <RenderImage
          foto={logoUrl}
          size={80}
          style={contentImage}
          color={BLACK}
        />
        <View style={textContainer}>
          <Text style={title}>{name}</Text>
          <Text style={website}>{websiteUrl}</Text>
        </View>
      </ButtonList>
    </View>
  );
};
export default RenderCompaniesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  contentImage: {
    margin: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    color: BLACK,
    fontSize: 23,
    fontWeight: 'bold',
  },
  website: {
    color: BLUE,
    marginTop: 5,
    fontSize: 18,
  },
});

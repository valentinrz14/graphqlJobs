// Dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Components
import { ButtonList } from '../../components/ButtonsCustom';
import RenderIcons from '../../components/RenderIcons';
// Hooks
import { BLACK, BLUE, RED, WHITE } from '../../helpers/colors';
import useTimeAgo from '../../helpers/useTimeAgo';
import { SHADOW_OFF_SET } from '../../helpers/useStyles';
import { useValidateCountries } from '../../helpers/useValidate';
// Names Navigation
import { JOB_DETAILS_SCREEN } from '../../navigation/navigation.names';
import { ADD_OR_REMOVE_JOB_FROM_FAVORITE } from '../../graphql/queries';

const RenderJobsList = ({
  id,
  company,
  title,
  description,
  countries,
  cities,
  postedAt,
  slug,
  navigate,
  favorite,
}) => {
  const { name } = company;
  const [addOrRemoveJobFromFavorite] = useMutation(
    ADD_OR_REMOVE_JOB_FROM_FAVORITE,
    {
      variables: {
        jobId: id,
        company,
        title,
        description,
        countries,
        cities,
        postedAt,
        slug,
      },
    },
  );

  const {
    container,
    contentFavorite,
    btn,
    titleStyle,
    content,
    contentData,
    subTitle,
  } = styles;
  const _handleOnPress = () => {
    navigate(JOB_DETAILS_SCREEN, {
      title,
      slug,
      company: name.toLowerCase(),
    });
  };
  const timestamp = useTimeAgo(postedAt);

  const addFavorite = async () => {
    await addOrRemoveJobFromFavorite();
    // await AsyncStorage.setItem(
    //   '@FAVORITES_STORAGE',
    //   JSON.stringify({ name, slug }),
    // );
  };
  return (
    <View style={container}>
      <ButtonList btnListStyle={btn} _handleOnPress={_handleOnPress}>
        <View style={contentFavorite}>
          <Text style={titleStyle}>{title}</Text>
          <ButtonList _handleOnPress={addFavorite}>
            <RenderIcons
              name={favorite ? 'heart' : 'heart-outline'}
              size={30}
              color={RED}
            />
          </ButtonList>
        </View>
        <Text numberOfLines={3} style={{ marginVertical: 5, fontSize: 17 }}>
          {description}
        </Text>
        <View style={content}>
          <View style={contentData}>
            <RenderIcons name="calendar-month-outline" color={RED} />
            <Text style={subTitle}>{timestamp}</Text>
          </View>
          <View style={contentData}>
            <RenderIcons name="map-marker" color={RED} />
            <Text style={subTitle}>
              {useValidateCountries(countries, cities)}
            </Text>
          </View>
        </View>
      </ButtonList>
    </View>
  );
};
export default RenderJobsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  btn: {
    flex: 1,
    margin: 0,
    backgroundColor: WHITE,
    borderRadius: 10,
    ...SHADOW_OFF_SET,
    shadowColor: BLACK,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentFavorite: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 20,
    color: BLUE,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  contentData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  subTitle: {
    fontSize: 17,
    marginLeft: 5,
  },
});

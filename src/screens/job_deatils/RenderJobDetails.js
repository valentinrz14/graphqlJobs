// Dependencies
import React, { useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
// Hooks
import {
  useValidateCountries,
  useValidateRemotes,
} from '../../helpers/useValidate';
import { SHADOW_OFF_SET } from '../../helpers/useStyles';
import useTimeAgo from '../../helpers/useTimeAgo';
// Components
import { RenderIcons, RenderImage } from '../../components/';
// Colors
import {
  BLACK,
  BLUE,
  GREY_DEFAULT,
  GREY_LITE,
  RED,
  TITLES,
  WHITE,
} from '../../helpers/colors';

const RenderJobDetails = ({
  postedAt,
  countries,
  cities,
  commitment,
  remotes,
  company,
  description,
}) => {
  const { logoUrl, websiteUrl, twitter, name } = company;
  const replaceTwitter =
    twitter !== null ? twitter.replace('https://twitter.com/', '') : null;

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(websiteUrl);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(websiteUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${websiteUrl}`);
    }
  });
  const handleOnPressTwitterLink = () => {
    if (twitter !== null) {
      const url = `https://twitter.com/${twitter}`;
      Linking.openURL(url)
        .then((data) => {})
        .catch(() => {
          Alert.alert('Something went wrong');
        });
    }
  };
  const {
    mainContainer,
    containerImage,
    imageStyle,
    titleName,
    container,
    content,
    titles,
    line,
    descriptionStyle,
  } = styles;

  return (
    <ScrollView style={mainContainer}>
      <RenderImage
        size={120}
        foto={logoUrl}
        color={GREY_DEFAULT}
        style={containerImage}
        styleImage={imageStyle}
      />
      <Text style={titleName}>{name}</Text>
      <View style={container}>
        <View style={content}>
          <RenderIcons name="calendar-month-outline" color={RED} />
          <Text style={titles}>{useTimeAgo(postedAt)}</Text>
        </View>
        <View style={[content, { marginBottom: 0 }]}>
          <RenderIcons name="map-marker" color={RED} />
          <Text style={titles}>{useValidateCountries(countries, cities)}</Text>
        </View>
        <View style={line} />
        <View style={[content, { marginTop: 0 }]}>
          <RenderIcons name="clock-time-three-outline" color={BLACK} />
          <Text style={titles}>{commitment.title}</Text>
        </View>
        <View style={[content, { marginBottom: 0 }]}>
          <RenderIcons name="home-variant-outline" color={BLACK} />
          <Text style={titles}>{useValidateRemotes(remotes)}</Text>
        </View>
        <>
          <View style={line} />
          {websiteUrl ? (
            <View style={[content, { marginTop: 0 }]}>
              <RenderIcons name="earth" color={BLUE} />
              <Text style={titlesOnPress} onPress={handlePress}>
                {websiteUrl}
              </Text>
            </View>
          ) : null}
          {twitter ? (
            <View style={[content, { marginBottom: 0 }]}>
              <RenderIcons name="twitter" color={BLUE} />
              <Text style={titlesOnPress} onPress={handleOnPressTwitterLink}>
                {replaceTwitter.indexOf('@') === -1
                  ? `@${replaceTwitter}`
                  : replaceTwitter}
              </Text>
            </View>
          ) : null}
        </>
      </View>
      <View style={[container, { paddingBottom: 0 }]}>
        <Text style={descriptionStyle}>{description}</Text>
      </View>
    </ScrollView>
  );
};
export default RenderJobDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 0,
    borderWidth: 0,
  },
  imageStyle: {
    borderWidth: 0.5,
    borderColor: GREY_DEFAULT,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    paddingTop: 5,
    ...SHADOW_OFF_SET,
  },
  titleName: {
    fontSize: 21,
    textAlign: 'center',
    color: BLACK,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  titles: {
    color: TITLES,
    marginLeft: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: GREY_LITE,
    marginVertical: 20,
  },
  descriptionStyle: {
    fontSize: 15,
    color: BLACK,
  },
});

const titlesOnPress = StyleSheet.compose(styles.titles, {
  color: BLUE,
  fontWeight: 'bold',
});

// Dependencies
import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
// Queries
import { GET_JOB } from '../../graphql/queries';
// Components
import { LoadingIndicator, ErrorData } from '../../components/';
import { ButtonPostulate } from '../../components/ButtonsCustom';
import RenderJobDetails from './RenderJobDetails';
// Template
import MainContainer from '../../template/MainContainer';
// Colors
import { FORM_POSTULATE } from '../../navigation/navigation.names';

const JobDetails = ({ route, navigation }) => {
  const { company, slug } = route.params;
  const useReplaceSpaces = (value) => value.replace(/\s+/g, '-');
  const { loading, data, error } = useQuery(GET_JOB, {
    variables: {
      job: useReplaceSpaces(slug),
      company: useReplaceSpaces(company),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <ErrorData error={error} />;
  }
  if (loading && !data) {
    return <LoadingIndicator size="large" title={true} />;
  }

  const { id, description, countries, cities, postedAt } = data.job;
  const handleOnPress = () => {
    navigation.navigate(FORM_POSTULATE, {
      title: `${company.toUpperCase()} / ${slug}`,
      id,
      company,
      description,
      countries,
      cities,
      postedAt,
      slug,
    });
  };

  return (
    <MainContainer>
      <RenderJobDetails {...data.job} />
      <View style={{ paddingHorizontal: 15 }}>
        <ButtonPostulate _handleOnPress={handleOnPress}>
          Postulate
        </ButtonPostulate>
      </View>
    </MainContainer>
  );
};
export default JobDetails;

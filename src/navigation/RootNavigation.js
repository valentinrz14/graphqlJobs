// Dependencies
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Connection API
import client from '../graphql/apolloClient';
import cache from '../graphql/cache';
// Screens Names
import {
  COMPANIES_SCREEN,
  FORM_POSTULATE,
  JOBS_SCREEN,
  JOB_DETAILS_SCREEN,
} from './navigation.names';
// Screens Header Titles
import { getHeaderTitle } from './getHeaderTitles';
// Screen Bottom Tabs
import BottomTabs from './BottomTabs';
// Screens
import JobsList from '../screens/job_list';
import JobDetails from '../screens/job_deatils';
import FormPostulate from '../screens/form/';
// Components
import { LoadingIndicator } from '../components';

const Stack = createStackNavigator();

const optionsStack = (title) => ({
  title: title,
  headerLeft: (props) => <HeaderBackButton {...props} />,
  headerBackTitle: 'Atrás',
});

const RootNavigation = () => {
  const [newClient, setNewClient] = useState(null);
  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background',
    }).then(() => {
      setNewClient(client);
    });
  }, []);

  if (!newClient) {
    return <LoadingIndicator size="large" title={true} />;
  }

  return (
    <ApolloProvider client={newClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={COMPANIES_SCREEN}>
            <Stack.Screen
              name={COMPANIES_SCREEN}
              component={BottomTabs}
              options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
            />
            <Stack.Screen
              name={JOBS_SCREEN}
              component={JobsList}
              options={({ route }) => optionsStack(route.params.name)}
            />
            <Stack.Screen
              name={JOB_DETAILS_SCREEN}
              component={JobDetails}
              options={({ route }) => optionsStack(route.params.title)}
            />
            <Stack.Screen
              name={FORM_POSTULATE}
              component={FormPostulate}
              options={({ route }) => optionsStack(route.params.title)}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default RootNavigation;

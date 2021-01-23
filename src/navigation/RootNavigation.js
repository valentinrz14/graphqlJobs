// Dependencies
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Connection API
import client from '../graphql/apolloClient';
import cache from '../graphql/cache';
// Components
import { LoadingIndicator } from '../components';
import StackNavigator from './StackNavigator';

const RootNavigation = () => {
  const [newClient, setNewClient] = useState(null);
  useEffect(() => {
    SplashScreen.hide();
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
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default RootNavigation;

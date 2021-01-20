// Dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens Names
import {
  COMPANIES_SCREEN,
  FORM_POSTULATE,
  JOBS_SCREEN,
  JOB_DETAILS_SCREEN,
} from './navigation.names';
// Screens Header Titles
import { getHeaderTitle } from './getHeaderTitles';
// Screens
import JobsList from '../screens/job_list';
import JobDetails from '../screens/job_deatils';
import FormPostulate from '../screens/form/';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const optionsStack = (title) => ({
  headerTitleAlign: 'center',
  title: title,
  headerBackTitle: 'Atrás',
});
const StackNavigator = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name={COMPANIES_SCREEN}
      component={BottomTabs}
      options={({ route }) => optionsStack(getHeaderTitle(route))}
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
);
export default StackNavigator;

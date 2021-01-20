// Dependencies
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/client';
// Screens
import CompaniesList from '../screens/companies_list';
import PostulatesList from '../screens/postulates_list';
import FavoritesList from '../screens/favorites_list';
// Screens Names
import {
  COMPANIES_SCREEN,
  FAVORITES_SCREEN,
  POSTULATES_SCREEN,
} from './navigation.names';
// Screens BottomBar Titles
import { getHeaderTitleBottomTab } from './getHeaderTitles';
// Components
import RenderIcons from '../components/RenderIcons';
// Colors
import { BLUE, BLACK, WHITE } from '../helpers/colors';
// API
import {
  GET_FAVORITE_JOBS_COUNT,
  GET_POSTULATE_JOBS_COUNT,
} from '../graphql/queries';

const Tab = createBottomTabNavigator();

const optionsTabBar = (name, route, count) => ({
  tabBarBadge: count,
  tabBarIcon: ({ color, size }) => (
    <RenderIcons name={name} size={size + 5} color={color} />
  ),
  title: getHeaderTitleBottomTab(route),
});
const BottomTabs = () => {
  const { data } = useQuery(GET_FAVORITE_JOBS_COUNT);
  const { data: postulate } = useQuery(GET_POSTULATE_JOBS_COUNT);
  return (
    <Tab.Navigator
      initialRouteName={COMPANIES_SCREEN}
      tabBarOptions={{
        activeTintColor: BLUE,
        labelStyle: { fontSize: 15, marginBottom: 5 },
        tabStyle: { height: 60 },
        style: { height: 60, backgroundColor: WHITE },
        indicatorStyle: { backgroundColor: BLACK },
      }}>
      <Tab.Screen
        name={COMPANIES_SCREEN}
        component={CompaniesList}
        options={({ route }) => optionsTabBar('home', route)}
      />
      <Tab.Screen
        name={POSTULATES_SCREEN}
        component={PostulatesList}
        options={({ route }) =>
          optionsTabBar('briefcase', route, postulate.postulateJobsCount)
        }
      />
      <Tab.Screen
        name={FAVORITES_SCREEN}
        component={FavoritesList}
        options={({ route }) =>
          optionsTabBar('heart', route, data.favoriteJobsCount)
        }
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;

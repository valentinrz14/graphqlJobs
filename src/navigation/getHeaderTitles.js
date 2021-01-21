// Dependencies
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// Screen Names
import {
  COMPANIES_SCREEN,
  FAVORITES_SCREEN,
  POSTULATES_SCREEN,
} from './navigation.names';
// Screen Titles
import {
  TITLE_COMPANIES,
  TITLE_FAVORITES,
  TITLE_POSTULATES,
} from './navigation.titles';

export const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? COMPANIES_SCREEN;

  switch (routeName) {
    case COMPANIES_SCREEN:
      return TITLE_COMPANIES;
    case POSTULATES_SCREEN:
      return TITLE_POSTULATES;
    case FAVORITES_SCREEN:
      return TITLE_FAVORITES;
  }
};

export const getHeaderTitleBottomTab = ({ name }) => {
  switch (name) {
    case COMPANIES_SCREEN:
      return 'Companias';
    case POSTULATES_SCREEN:
      return 'Postulaciones';
    case FAVORITES_SCREEN:
      return 'Favoritos';
  }
};

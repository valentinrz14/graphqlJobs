import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigation);

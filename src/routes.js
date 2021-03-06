import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import TestScreen from './screens/Test';

const AppNavigator = createStackNavigator({
  'Simulador': HomeScreen,
  'Configurações': SettingsScreen,
  'Test': TestScreen
},
{
  initialRouteName:'Test'
}
);

export default createAppContainer(AppNavigator);

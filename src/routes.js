import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';

const AppNavigator = createStackNavigator({
  'Simulador': HomeScreen,
  'Configurações': SettingsScreen,
},
{
  initialRouteName:'Configurações'
}
);

export default createAppContainer(AppNavigator);

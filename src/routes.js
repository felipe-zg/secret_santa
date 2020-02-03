import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Home from './pages/Home';
import NewGroup from './pages/NewGroup';
import GroupDetails from './pages/GroupDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

const Routes = createAppContainer(
  createStackNavigator(
    {
      TelaLogin: {
        screen: Login,
        navigationOptions: {
          title: 'Entrar',
        },
      },
      TelaHome: {
        screen: Home,
        navigationOptions: {
          title: 'Amigo Oculto',
        },
      },
      TelaNovoGrupo: {
        screen: NewGroup,
        navigationOptions: {
          title: 'Novo Grupo',
        },
      },
      TelaDetalhesDoGrupo: {
        screen: GroupDetails,
        navigationOptions: {
          title: 'Detalhes',
        },
      },
      TelaPoliticaDePrivacidade: {
        screen: PrivacyPolicy,
        navigationOptions: {
          title: 'Política de privacidade',
        },
      },
      TelaContato: {
        screen: Contact,
        navigationOptions: {
          title: 'Contato',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#D50000',
        },
      },
      initialRouteName: 'TelaHome',
    },
  ),
);

export default Routes;

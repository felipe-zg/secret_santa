import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Home from './pages/Home';
import NewGroup from './pages/NewGroup';
import GroupDetails from './pages/GroupDetails';

const Routes = createAppContainer(
    createStackNavigator(
        {
            TelaLogin:{
                screen: Login,
                navigationOptions:{
                    title: "Entrar",
                }
            },
            TelaHome:{
                screen: Home,
                navigationOptions:{
                    title: 'Amigo Oculto',
                }
            },
            TelaNovoGrupo:{
                screen: NewGroup,
                navigationOptions:{
                    title: 'Novo Grupo',
                }
            },
            TelaDetalhesDoGrupo:{
                screen: GroupDetails,
                navigationOptions:{
                    title: 'Detalhes',
                }
            },
        },
        {
            defaultNavigationOptions:{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor:'#D50000',
                },
            },
        },
        {
            initialRouteName: "TelaLogin",
        }
    )
);

export default Routes;
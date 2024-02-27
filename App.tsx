import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Projeto from './screens/Projeto';
import Ua from './screens/Ua';
import Individuos from './screens/Individuos';
import NovoIndividuo from './screens/NovoIndividuo';
import Camera from './screens/Camera';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Projeto" component={Projeto} options={{ headerShown: false }}/>
        <Stack.Screen name="Ua" component={Ua} options={{ headerShown: false }}/>
        <Stack.Screen name="Individuos" component={Individuos} options={{ headerShown: false }}/>
        <Stack.Screen name="NovoIndividuo" component={NovoIndividuo} options={{ headerShown: false }}/>
        <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
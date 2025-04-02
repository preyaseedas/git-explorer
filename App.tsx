/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import RepositoryDetails from './src/screens/RepositoryDetails';
import SplashScreen from './src/screens/SplashScreen';

import {Provider} from 'react-redux';
import store from './src/redux/Store';
import {PaperProvider} from 'react-native-paper';
import HomeScreenTabBar from './src/screens/HomeScreenTabBar';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreenTabBar} />
            <Stack.Screen
              name="RepositoryDetails"
              component={RepositoryDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import HomeScreen from './HomeScreen';
import Favorites from './Favorites';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const HomeScreenTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/image/homeBlue.png')}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 5,
                }}
              />
            ) : (
              <Image
                source={require('../assets/image/homeBlack.png')}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 5,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name={'Favorites'}
        component={Favorites}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/image/starBlue.png')}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            ) : (
              <Image
                source={require('../assets/image/starBlack.png')}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreenTabBar;

const styles = StyleSheet.create({
  changeBackground: {
    alignItems: 'center',
    width: 60,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#31ADD6',
  },
});

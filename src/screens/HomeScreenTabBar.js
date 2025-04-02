import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import HomeScreen from './HomeScreen';
import Favorites from './Favorites';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
//show a navigation bar on screen to navigate another Screen
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
                style={styles.tabBarIcon}
              />
            ) : (
              <Image
                source={require('../assets/image/homeBlack.png')}
                style={styles.tabBarIcon}
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
                style={styles.fabIcon}
              />
            ) : (
              <Image
                source={require('../assets/image/starBlack.png')}
                style={styles.fabIcon}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreenTabBar;

const styles = StyleSheet.create({
  homeIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
  },
  fabIcon: {
    height: 24,
    width: 24,
  },
});

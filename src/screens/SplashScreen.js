import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {CommonColor} from '../common/Color';
import { Text } from 'react-native-gesture-handler';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/gitExplore.png')}
       style={styles.logoImg}
      />
      <Text style={styles.text}>gitExplorer
      </Text>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 150,
    height: 150,
  },
  text:{color:'#8957e5', fontSize:30, fontWeight:600, padding:20}
});

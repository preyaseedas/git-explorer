import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackHeader = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              BackHandler.exitApp();
            }
          }}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.backArrow}
              source={require('../assets/image/back_arrow.png')}
            />
          </View>

          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
  },
  backText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  iconStyle: {
    marginBottom: -1,
  },
  backView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {height: 24, width: 24},
});

export default BackHeader;

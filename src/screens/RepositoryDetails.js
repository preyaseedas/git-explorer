import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonText} from '../common/CommonText';
import {CommonColor} from '../common/Color';
import {useDispatch, useSelector} from 'react-redux';
import BackHeader from '../common/BackHeader';
import {addFavorite} from '../redux/RepositoryData';

const RepositoryDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tempRepo = useSelector(state => state.repoReducer.tempRepo);

  const [languages, setLanguages] = useState({});

  useEffect(() => {
    getLanguages();
  }, [tempRepo]);

  /**
   * Function to get languages from language api
   * set language response to a useState [languages, setLanguages]
   */
  const getLanguages = async () => {
    const response = await fetch(tempRepo.languages_url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log('languages = ', json);

    setLanguages(json);
  };

  return (
    <ScrollView style={{backgroundColor: '#F1F1F1F1'}}>
      <BackHeader />
      <View
        style={{
          margin: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 6,
          padding: 20,
        }}>
        <View style={styles.ownerContainer}>
          <View style={styles.avatarView}>
            <Image
              source={{uri: tempRepo.owner.avatar_url}}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.repoOwnerText}>{tempRepo.owner.login}</Text>
            <Text style={styles.repoOwnerUrl}>{tempRepo.owner.html_url}</Text>
          </View>
        </View>
        <Text style={styles.repoNameText}>{tempRepo.name}</Text>

        <View style={{}}>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.descriptionText}>{tempRepo.description}</Text>
        </View>
        <View
          style={{
            borderRadius: 6,
            borderWidth: 0.2,
            padding: 15,
            marginVertical: 15,
          }}>
          <View style={styles.view}>
            <Image
              style={styles.icon}
              source={require('../assets/image/star.png')}
            />
            <Text style={{}}>{tempRepo.stargazers_count} Stars</Text>
          </View>
          <View style={styles.view}>
            <Image
              style={styles.icon}
              source={require('../assets/image/fork.png')}
            />
            <Text style={{}}>{tempRepo.forks_count} Forks</Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={styles.descriptionHeading}>Primary Language</Text>
            {/*<View style={styles.view}> <Image style={styles.icon} source={{uri: tempRepo.languages_url}}/> </View>*/}
            <Text style={styles.descriptionText}>{tempRepo.language}</Text>
          </View>

          <Text style={styles.descriptionHeading}>Languages Used</Text>
          {Object.entries(languages).map(([key, value]) => (
            <Text key={key} style={styles.descriptionText}>
              {key}: {value}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={styles.fevButton}
          onPress={() => {
            dispatch(addFavorite(tempRepo));
          }}>
          <Image
            source={require('../assets/image/favorite.png')}
            style={{
              height: 20,
              width: 20,
              marginRight: 5,
            }}
          />
          <Text style={styles.fevButtonText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            Linking.openURL(tempRepo.html_url);
          }}>
          <Image
            source={require('../assets/image/github.png')}
            style={{
              height: 24,
              width: 24,
              marginRight: 5,
            }}
          />
          <Text style={styles.buttonText}> View on GitHub</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RepositoryDetails;

const styles = StyleSheet.create({
  backArrow: {height: 28, width: 28},
  repoNameText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
  },
  ownerContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarView: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#8957e5',
  },
  avatar: {height: 58, width: 58, borderRadius: 50},
  repoOwnerText: {
    color: CommonColor.splashBackgroundColor,
    fontSize: 16,
    fontWeight: 400,
  },
  repoOwnerUrl: {
    color: '#1f6feb',
    fontSize: 12,
    fontWeight: 400,
  },
  descriptionText: {
    color: '#878C90',
    padding: 2,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#1A1A1A',
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  programHeading: {
    fontSize: 18,
    color: CommonColor.black,
    fontWeight: 500,
    marginTop: 20,
  },
  fevButton: {
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    flexDirection: 'row',
  },
  viewButton: {
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#46189b',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  fevButtonText: {
    fontSize: 16,
    color: '#7E49FF',
  },
});

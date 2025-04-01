import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTempRepo} from '../redux/RepositoryData';
import {CommonColor} from './Color';

const RepoCard = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setTempRepo(item));
        navigation.navigate('RepositoryDetails');
      }}
      style={styles.repositoryListContainer}>
      <View style={styles.avatarView}>
        <Image source={{uri: item.owner.avatar_url}} style={styles.avatar} />
      </View>
      <View style={styles.repoDetails}>
        <Text style={styles.repoNameText}>{item.name}</Text>
        <Text style={styles.descText}>
          {item.stargazers_count} Stars {'\u25CF'} {item.forks_count} Forks
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  repositoryListContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: CommonColor.darkColor,
    borderRadius: 6,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: CommonColor.darkColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  avatarView: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#8957e5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  repoDetails: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 5,
  },
  repoNameText: {
    color: CommonColor.black,
    fontSize: 20,
    fontWeight: '500',
  },
  descText: {
    color: CommonColor.grey,
    fontSize: 13,
    letterSpacing: 0.2,
  },
});

export default RepoCard;

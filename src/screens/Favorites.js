import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RepoCard from '../common/RepoCard';
import {setFavorites} from '../redux/RepositoryData';
import EncryptedStorage from 'react-native-encrypted-storage';

const Favorites = () => {
  const dispatch = useDispatch();

  const favRepos = useSelector(state => state.repoReducer.favorites);
  const getFavReposFromStorage = async () => {
    let favData = [];
    try {
      // Retrieve favorites from AsyncStorage
      const storedFavorites = await EncryptedStorage.getItem('favorites');

      favData = storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage:', error);
    }
    dispatch(setFavorites(favData));
  };

  useEffect(() => {
    getFavReposFromStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{backgroundColor: '#F1F1F1', paddingHorizontal: 10, flex: 1}}>
        {favRepos.length === 0 ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              No favorites repositories found
            </Text>
          </View>
        ) : (
          <FlatList
            data={favRepos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <RepoCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};
export default Favorites;
const styles = StyleSheet.create({});

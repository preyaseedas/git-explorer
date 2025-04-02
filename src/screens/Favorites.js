import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RepoCard from '../common/RepoCard';
import {setFavorites} from '../redux/RepositoryData';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CommonColor } from '../common/Color';
import { commonText } from '../common/CommonText';

const Favorites = () => {
  const dispatch = useDispatch();

  const favRepos = useSelector(state => state.repoReducer.favorites);

  //Method to get the favorites from EncryptedStorage
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

  //Get stored favorite list from storage
  useEffect(() => {
    getFavReposFromStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={styles.blankListContainer}>
        {favRepos.length === 0 ? (
          <View
            style={styles.blankListContainerView}>
            <Text
              style={commonText.blankListText}>
              No favorites repositories found
            </Text>
          </View>
        ) : (
          //Favorites list
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
const styles = StyleSheet.create({
   blankListContainer: {
      backgroundColor: CommonColor.backColor,
      paddingHorizontal: 10,
      flex: 1,
    },
    blankListContainerView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
});

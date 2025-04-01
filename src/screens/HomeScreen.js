import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchResult, setTempRepo} from '../redux/RepositoryData';
import {CommonColor} from '../common/Color';
import RepoCard from '../common/RepoCard';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchRepoText, setSearchRepoText] = useState('');

  const searchResult = useSelector(state => state.repoReducer.searchResult);
  const dispatch = useDispatch();

  const handleSearch = async data => {
    let url = `https://api.github.com/search/repositories?q={${data}}`;
    console.log('url ---', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log('search result = ', json);
    dispatch(setSearchResult(json));
  };

  const onTextChange = text => {
    console.log('text==', text);

    setSearchRepoText(text);
    const delayDebounce = setTimeout(() => {
      handleSearch(text);
    }, 500); // Debounce time: 500ms

    return () => clearTimeout(delayDebounce); // Cleanup function to prevent multiple calls
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'white',
        }}>
        <View style={styles.searchContainer}>
          <Image
            style={styles.searchIcon}
            source={require('../assets/image/searchIcon.png')}
          />
          <TextInput
            placeholder="Search for repositories"
            value={searchRepoText}
            onChangeText={onTextChange}
            style={styles.searchInput}
            placeholderTextColor={'#737373'}
          />
        </View>
      </View>

      <View
        style={{backgroundColor: '#F1F1F1', paddingHorizontal: 10, flex: 1}}>
        {!searchResult?.items || searchResult.items.length === 0 ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              No repositories found
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchResult.items}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <RepoCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#F2F2F2',
  },
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

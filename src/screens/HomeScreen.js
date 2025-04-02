import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchResult} from '../redux/RepositoryData';
import {CommonColor} from '../common/Color';
import RepoCard from '../common/RepoCard';
import {commonText} from '../common/CommonText';

const HomeScreen = () => {
  const [searchRepoText, setSearchRepoText] = useState('');

  //Get the search result data from reducer store
  const searchResult = useSelector(state => state.repoReducer.searchResult);

  const dispatch = useDispatch();

  // Function to handle search using api call
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

  //This function will be called when text on textinput will be changed
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
      <View style={styles.container}>
        {/**search bar for searching repository*/}
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

      <View style={styles.blankListContainer}>
        {/**It will show 'no repository found' if there is no searching for repository*/}
        {!searchResult?.items || searchResult.items.length === 0 ? (
          <View style={styles.blankListContainerView}>
            <Text style={commonText.blankListText}>No repositories found</Text>
          </View>
        ) : (
          //List of repositories
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
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  searchContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'commonColor.grey',
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
    backgroundColor: 'commonColor.grey',
  },
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

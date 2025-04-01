import {createSlice} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

const RepositoryData = createSlice({
  name: 'repository',
  initialState: {
    searchResult: {},
    tempRepo: {},
    favorites: [],
    loading: false,
    isError: false,
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setTempRepo: (state, action) => {
      state.tempRepo = action.payload;
    },
    setFavorite: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const newFavorite = action.payload;

      // Check if the item is already in the favorites list
      const isAlreadyFavorite = state.favorites.some(
        fav => fav.id === newFavorite.id,
      );

      if (!isAlreadyFavorite) {
        // Add to favorites if not already present
        let allFav = [...state.favorites, newFavorite];
        state.favorites = allFav;

        // Save the updated favorites to EncryptedStorage
        EncryptedStorage.setItem('favorites', JSON.stringify(allFav))
          .then(() => {
            console.log('Favorites saved securely');
          })
          .catch(error => {
            console.error('Error saving favorites to EncryptedStorage:', error);
          });
      } else {
        console.log('Item already in favorites');
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export default RepositoryData.reducer;

export const {
  setSearchResult,
  setTempRepo,
  setFavorites,
  setLoading,
  setIsError,
  addFavorite,
} = RepositoryData.actions;

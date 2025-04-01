import {configureStore} from '@reduxjs/toolkit';
import RepositoryData from './RepositoryData';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    repoReducer: RepositoryData,
  },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
 
});

export default store;
